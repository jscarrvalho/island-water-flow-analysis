import React from 'react';

function SpreadsheetForm({ spreadsheetUrl, onInputChange, onSubmit, loading, error }) {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={spreadsheetUrl}
                onChange={onInputChange}
                placeholder="Enter spreadsheet URL"
            />
            <button type="submit">Fetch Data</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </form>
    );
}

export default SpreadsheetForm;