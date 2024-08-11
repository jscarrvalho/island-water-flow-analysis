import React from 'react';

function Legend() {
    return (
        <div className="card">
            <div className="card-header">
                <h3>Legend</h3>
            </div>
            <div className="card-body legend">
                <div className="legend-item" style={{backgroundColor: '#3892fc'}}>
                    <span>From northwest to southeast</span>
                </div>
                <div className="legend-item" style={{backgroundColor: '#1fa275'}}>
                    <span>From southeast to northwest</span>
                </div>
                <div className="legend-item" style={{backgroundColor: '#0042e1'}}>
                    <span>Both ways</span>
                </div>
            </div>
        </div>
    );
}

export default Legend;
