import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SpreadsheetForm from './components/SpreadsheetForm';
import Table from './components/Table';
import Legend from './components/Legend';
import './App.css';

function App() {
  const [spreadsheetUrl, setSpreadsheetUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [editingCell, setEditingCell] = useState(null);

  const tableRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setEditingCell(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSpreadsheetInputChange = (e) => {
    setSpreadsheetUrl(e.target.value);
  };

  const handleSpreadsheetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await axios.get('http://localhost:5000/find-paths', {
        params: {
          spreadsheet_url: spreadsheetUrl,
        },
      });
      setResponse(result.data);
      setTableData(result.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCellChange = async (e, rowIndex, colIndex) => {
    const newValue = Number(e.target.value);
    const updatedData = [...tableData];
    updatedData[rowIndex][colIndex] = newValue;
    setTableData(updatedData);
    try {
      const result = await axios.post('http://localhost:5000/find-paths', {
        data: tableData
      });
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    setEditingCell([rowIndex, colIndex]);
  };

  return (
      <div className="App">
        <div className="centered-div">
          <header>
            <h1>Island Water Flow Analysis</h1>
            <SpreadsheetForm
                spreadsheetUrl={spreadsheetUrl}
                onInputChange={handleSpreadsheetInputChange}
                onSubmit={handleSpreadsheetSubmit}
                loading={loading}
                error={error}
            />
          </header>
          <div className="table-container" ref={tableRef}>
            {response && (
                <Table
                    data={tableData}
                    paths={response.paths}
                    editingCell={editingCell}
                    onCellClick={handleCellClick}
                    onCellChange={handleCellChange}
                />
            )}
          </div>
          <br />
          <br />
          <Legend />
        </div>
      </div>
  );
}

export default App;
