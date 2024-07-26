import React, { useState } from 'react';

const Filter = ({ users, onFilter }) => {
    const [selectedUser, setSelectedUser] = useState('');

    const handleFilterChange = (e) => {
        setSelectedUser(e.target.value);
        onFilter(e.target.value);
    };

    return (
        <div className="mb-3">
            <label htmlFor="userFilter" className="form-label">Filtriraj po članovima</label>
            <select
                id="userFilter"
                className="form-select"
                value={selectedUser}
                onChange={handleFilterChange}
            >
                <option value="">Svi članovi</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.displayName}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;