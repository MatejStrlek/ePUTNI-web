import React from 'react';
import { TimeUtils } from '../../utils/TimeUtils';
import FileLinks from '../Files/FileLinks';
import generateWarrant from '../../utils/generateWarrant';
import './warrantDetails.css';

const WarrantDetails = ({ warrant, setIsViewing }) => {
  const startTime = TimeUtils.millsToReadableDateWithHoursMinutes(warrant.startTime);
  const endTime = warrant.endTime ? TimeUtils.millsToReadableDateWithHoursMinutes(warrant.endTime) : 'Nije završen put';

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Detalji naloga</h2>
      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title">Član: {warrant.userName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Pozicija: {warrant.role}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Email: {warrant.email}</h6>
          <hr className="styled-hr" />
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="card-text">Početna lokacija: <strong>{warrant.startCity}</strong></p>
              <p className="card-text">Destinacija: <strong>{warrant.endCity}</strong></p>
              <p className="card-text">Zadatak/opis puta: <strong>{warrant.description}</strong></p>
              <p className="card-text">Početno stanje brojila: <strong>{warrant.startKilometers}</strong></p>
              <p className="card-text">Nalog potvrđen? <strong>{warrant.checkedByFinanceTeam ? 'Da' : 'Ne'}</strong></p>
            </div>
            <div className="col-md-6">
              <p className="card-text">Vrsta vozila: <strong>{warrant.vehicleType}</strong></p>
              <p className="card-text">Model vozila: <strong>{warrant.vehicleModel}</strong></p>
              <p className="card-text">Registracija: <strong>{warrant.licensePlate}</strong></p>
              <p className="card-text">Datum početka puta: <strong>{startTime}</strong></p>
              <p className="card-text">Datum završetka puta: <strong>{endTime}</strong></p>
              <p className="card-text">Završen put?: <strong>{warrant.finished ? 'Da' : 'Ne'}</strong></p>
            </div>
          </div>
          <FileLinks files={warrant.files} />
        </div>
      </div>
      <button className="btn btn-primary mt-4" onClick={() => setIsViewing(false)}>Natrag na listu</button>
      <button className="btn btn-dark mt-4 float-end" onClick={() => generateWarrant(warrant)}>Preuzmi putni nalog</button>
    </div>
  );
};

export default WarrantDetails;