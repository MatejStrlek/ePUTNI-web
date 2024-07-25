import React from 'react';

const FileLinks = ({ files }) => {
    if (!files || files.length === 0) {
        return <p>U nalogu nema računa!</p>;
    }

    return (
        <div>
            <h5 className="card-title">Računi:</h5>
            <ul>
                {files.map((file, index) => (
                    <li key={index} className="d-flex align-items-center mb-2">
                        <button
                            className="btn btn-secondary d-flex align-items-center"
                            onClick={() => window.open(file, '_blank')}
                        >
                            <i className="fas fa-download"></i>
                            <span style={{ marginLeft: '0.5rem' }}>
                                Pregledaj i preuzmi {index + 1}. račun
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileLinks;