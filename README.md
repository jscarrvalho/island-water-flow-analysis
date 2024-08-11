# Island Water Flow Analysis

## This is a simple one-resource REST API under 5000 port with a React app single page on port 3000.

With both services running you just have to give a spreadsheet URL in the form and click in 'Fetch data'.
The web app will fetch data from the spreadsheet and show the calculated paths.
You can also click into a cell and edit it, creating your own cases realtime.
<br />

On the backend service, the only resource http://localhost:5000/find-paths (GET, POST) always return the body:

`{'data': LIST<LIST<INT>>, 'paths': {'nw_se': LIST<INT>, 'se_nw': LIST<INT>}}` <br />

In GET a query param spreadsheet_url is mandatory: http://localhost:5000/find-paths?spreadsheet_url=[docs-spreadsheet-url]<br />
In POST a json body is mandatory: `{'data': LIST<LIST<INT>>}`<br />

This is all you have to know about the project, don't worry about run it, it's dockerized!

## Run

### With docker compose

1 - Download (or clone) the project files and put into a target folder.<br />
2 - Go to the target folder.<br />
3 - Run `docker compose up --build`.<br />
4 - Go to http://localhost:3000.<br />

### OR <br />

### Without docker

1 - Download (or clone) the project files and put into a target folder.<br />
2 - Go to the target folder > island-water-flow-analysis/.<br />

### Backend service
3.1 - Go to the backend service folder > backend/.<br />
4.1 - Run `pip install -r requirements.txt`.<br />
5.1 - Run `python backend_service.py`.<br />

### Frontend service
3.2 - Go to the frontend service folder > frontend/.<br />
4.2 - Run `npm install && npm run build && npm install -g serve`.<br />
5.2 - Run `serve -s build -l 3000`.<br />
6.2 - Go to http://localhost:3000.<br />