from flask import Flask, request, abort
import pandas as pd
from flask_cors import CORS


def get_dataframe_from_csv(raw_url):
    try:
        treated_url = raw_url.replace('?', '&').replace('/edit', '/export?format=csv')
        return pd.read_csv(treated_url, header=None)
    except Exception as e:
        print(f'{e}')
        print('Dataframe probably empty. Change the link or the sheet in google docs.')


def flow_in_neighbors_dfs(df, init_row, init_col, end_row, end_col):
    nrows = df.shape[0]
    ncolns = df.shape[1]

    stack = [(init_row, init_col, [(init_row, init_col)])]

    neighbors_directions = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]

    all_paths = []

    while stack:
        current_row, current_col, path = stack.pop()

        if (current_row, current_col) == (end_row, end_col) and path not in all_paths:
            all_paths.append(path)

        for direction in neighbors_directions:
            new_row = current_row + direction[0]
            new_col = current_col + direction[1]

            if 0 <= new_row < nrows and 0 <= new_col < ncolns and (new_row, new_col) not in path:
                if df.iloc[current_row, current_col] >= df.iloc[new_row, new_col]:
                    stack.append((new_row, new_col, path + [(new_row, new_col)]))

    return all_paths


app = Flask(__name__)

CORS(app)

@app.route('/find-paths', methods=['POST'])
def find_watter_flow_paths_from_matrix():
    data = request.get_json()

    matrix = data.get('data')

    if not matrix:
        abort(400, description="Missing 'data' in body request")

    df = pd.DataFrame(matrix)

    nw_se = []
    se_nw = []
    df_val_list = []

    if df is not None and not df.empty:
        nw_se = flow_in_neighbors_dfs(df, 0, 0, df.shape[0] - 1, df.shape[1] - 1)
        se_nw = flow_in_neighbors_dfs(df, df.shape[0] - 1, df.shape[1] - 1, 0, 0)
        df_val_list = df.values.tolist()

    return {'data': df_val_list, 'paths': {'nw_se': nw_se, 'se_nw': se_nw}}

@app.route('/find-paths', methods=['GET'])
def find_watter_flow_paths_from_spreadsheet():
    url = request.args.get('spreadsheet_url')

    if not url:
        abort(400, description="Missing 'spreadsheet_url' parameter")

    df = get_dataframe_from_csv(url)

    nw_se = []
    se_nw = []
    df_val_list = []

    if df is not None and not df.empty:
        nw_se = flow_in_neighbors_dfs(df, 0, 0, df.shape[0] - 1, df.shape[1] - 1)
        se_nw = flow_in_neighbors_dfs(df, df.shape[0] - 1, df.shape[1] - 1, 0, 0)
        df_val_list = df.values.tolist()

    return {'data': df_val_list, 'paths': {'nw_se': nw_se, 'se_nw': se_nw}}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
