import React from 'react';
import Swal from 'sweetalert2';

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Odjava',
      text: 'Jeste li sigurni da se želite odjaviti?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      cancelButtonText: 'Ne'
    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', 'false');
            setIsAuthenticated(false);
          },
        });
      }
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