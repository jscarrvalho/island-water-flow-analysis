import React from 'react';

function Table({ data, paths, editingCell, onCellClick, onCellChange }) {
    const combineUniquePaths = (paths) => {
        const combined = [];
        const seen = new Set();

        paths.forEach((path) => {
            path.forEach((coord) => {
                const coordStr = JSON.stringify(coord);
                if (!seen.has(coordStr)) {
                    seen.add(coordStr);
                    combined.push(coord);
                }
            });
        });

        return combined;
    };

    const combinedPathsSeNw = combineUniquePaths(paths.se_nw);
    const combinedPathsNwSe = combineUniquePaths(paths.nw_se);

    if (!data || data.length === 0) {
        return <p>No data available.</p>;
    }

    return (
        <table>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {Object.keys(row).map((key, colIndex) => {
                        const coord = [rowIndex, colIndex];
                        const isSeNwPathCell = combinedPathsSeNw.some(
                            (pathCoord) => JSON.stringify(pathCoord) === JSON.stringify(coord)
                        );
                        const isNwSePathCell = combinedPathsNwSe.some(
                            (pathCoord) => JSON.stringify(pathCoord) === JSON.stringify(coord)
                        );

                        let className = ''

                        if (isSeNwPathCell && isNwSePathCell) {
                            className = 'both-flow'
                        } else if (isSeNwPathCell) {
                            className = 'se_nw-flow'
                        } else if (isNwSePathCell) {
                            className = 'nw_se-flow'
                        }

                        const isEditing =
                            editingCell && editingCell[0] === rowIndex && editingCell[1] === colIndex;

                        return (
                            <td
                                key={colIndex}
                                className={`${className} ${isEditing ? 'editable' : ''}`}
                                onClick={() => onCellClick(rowIndex, colIndex)}
                            >
                                {isEditing ? (
                                    <input
                                        className={'table-cell'}
                                        type="number"
                                        value={row[key]}
                                        onChange={(e) => onCellChange(e, rowIndex, colIndex)}
                                        onBlur={() => onCellClick(null, null)}
                                    />
                                ) : (
                                    row[key]
                                )}
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;