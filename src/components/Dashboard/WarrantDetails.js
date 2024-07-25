import React from 'react';
import { TimeUtils } from '../../utils/TimeUtils';
import FileLinks from '../Files/FileLinks';
import './warrantDetails.css';

const WarrantDetails = ({ warrant, setIsViewing }) => {
  const startTime = TimeUtils.millsToReadableDate(warrant.startTime);
  const endTime = warrant.endTime ? TimeUtils.millsToReadableDate(warrant.endTime) : 'Nije završen put';
  console.log(warrant);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Detalji naloga</h2>
      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title">Član: {warrant.userName}</h5>
          <hr className="styled-hr" />
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="card-text"><strong>Početna lokacija:</strong> {warrant.startCity}</p>
              <p className="card-text"><strong>Destinacija:</strong> {warrant.endCity}</p>
              <p className="card-text"><strong>Zadatak/opis puta:</strong> {warrant.description}</p>
              <p className="card-text"><strong>Početno stanje brojila:</strong> {warrant.startKilometers}</p>
            </div>
            <div className="col-md-6">
              <p className="card-text"><strong>Model vozila:</strong> {warrant.vehicleModel}</p>
              <p className="card-text"><strong>Registracija:</strong> {warrant.licensePlate}</p>
              <p className="card-text"><strong>Datum početka puta:</strong> {startTime}</p>
              <p className="card-text"><strong>Datum završetka puta:</strong> {endTime}</p>
              <p className="card-text"><strong>Završen put?:</strong> {warrant.finished ? 'Da' : 'Ne'}</p>
            </div>
          </div>
          <FileLinks files={warrant.files} />
        </div>
      </div>
      <button className="btn btn-primary mt-4" onClick={() => setIsViewing(false)}>Natrag na listu</button>
    </div>
  );
};

export default WarrantDetails;