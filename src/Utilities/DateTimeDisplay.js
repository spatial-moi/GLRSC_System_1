import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
        <div className="counter">
        <div className={isDanger ? 'countdown danger' : 'countdown'}>
            <p>{value}</p>
            <span>{type}</span>
        </div>
        </div>
    );
};

export default DateTimeDisplay;