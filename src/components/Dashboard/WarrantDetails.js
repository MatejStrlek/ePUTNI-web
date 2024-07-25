import React from 'react';
import { TimeUtils } from '../../utils/TimeUtils';

const WarrantDetails = ({ warrant, setIsViewing }) => {
    const endTime = warrant.endTime ? TimeUtils.millsToReadableDate(warrant.endTime) : 'Nije završen put';
    console.log(warrant);

  return (
    <div>
      <h2 className="text-center mb-4">Detalji naloga</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Član: {warrant.userName}</h5>
          <p className="card-text">Početna lokacija: {warrant.startCity}</p>
          <p className="card-text">Destinacija: {warrant.endCity}</p>
          <p className="card-text">Zadatak/opis puta: {warrant.description}</p>
          <p className="card-text">Početno stanje brojila: {warrant.startKilometers}</p>
          <p className="card-text">Model vozila: {warrant.vehicleModel}</p>
          <p className="card-text">Registracija: {warrant.licensePlate}</p>
          <p className="card-text">Datum završetka puta: {endTime}</p>
          <p className="card-text">Završen put?: {warrant.finished ? 'Da' : 'Ne'}</p>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => setIsViewing(false)}>Natrag na listu</button>
    </div>
  );
};

export default WarrantDetails;