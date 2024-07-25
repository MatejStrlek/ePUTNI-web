import React from 'react';
import Swal from 'sweetalert2';
import { getAuth, signOut } from 'firebase/auth';

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      Swal.fire({
        icon: 'question',
        title: 'Odjava',
        text: 'Jeste li sigurni da se želite odjaviti?',
        showCancelButton: false,
        confirmButtonText: 'Da'
      }).then(result => {
        if (result.value) {
          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              setIsAuthenticated(false);
            },
          });
        }
      });
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <button
      style={{ marginLeft: '12px' }}
      className="muted-button"
      onClick={handleLogout}
    >
      Odjava
    </button>
  );
};

export default Logout;