import React from 'react';

const Table = ({ warrants, handleView }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Član</th>
            <th>Početna lokacija</th>
            <th>Destinacija</th>
            <th>Završen put?</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {warrants.map((warrant) => (
            <tr key={warrant.id}>
              <td>{warrant.userName}</td>
              <td>{warrant.startCity}</td>
              <td>{warrant.endCity}</td>
              <td>{warrant.finished ? 'Da' : 'Ne'}</td>
              <td>
                <button
                  onClick={() => handleView(warrant.id)}
                  className="btn btn-info"
                >
                  Pregled
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;