import React from 'react';
import Swal from 'sweetalert2';

const Table = ({ warrants, handleView, handleAccept }) => {
  const confirmAccept = (warrantId) => {
    Swal.fire({
      title: 'Jeste li sigurni?',
      text: 'Želite li prihvatiti ovaj nalog?',
      icon: 'warning',
      showDenyButton: true,
      denyButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      denyButtonText: 'Ne, odustani!',
      confirmButtonText: 'Da, prihvati!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleAccept(warrantId);
        Swal.fire('Prihvaćeno!', 'Putni nalog prihvaćen.', 'success');
      }
    });
  };

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
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={warrant.userPhotoUrl}
                    alt={warrant.userName}
                    onError={(e) => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/deault-profile.png'; }}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '15px' }}
                  />
                  {warrant.userName}
                </div>
              </td>
              <td>{warrant.startCity}</td>
              <td>{warrant.endCity}</td>
              <td>{warrant.finished ? 'Da' : 'Ne'}</td>
              <td>
                <button
                  onClick={() => handleView(warrant.id)}
                  className="btn btn-info mr-2"
                >
                  Pregled
                </button>
                <span style={{ marginLeft: '0.5rem' }}>
                  <button
                    onClick={() => confirmAccept(warrant.id)}
                    className="btn btn-success"
                    disabled={warrant.checkedByFinanceTeam}
                  >
                    {warrant.checkedByFinanceTeam ? 'Prihvaćeno' : 'Prihvati nalog'}
                    <span style={{ marginLeft: '0.5rem' }}>
                      {warrant.checkedByFinanceTeam && <i className="ml-2 fas fa-check-circle"></i>}
                    </span>
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;