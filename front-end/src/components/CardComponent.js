import React, { useState } from 'react';

export default function App() {
  const [roomNumber, setRoomNumber] = useState(1);
 const capacity = 5;
 const remaining= 2;
  const incrementRoomNumber = () => {
    setRoomNumber(roomNumber + 1);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '5px',
          display: 'inline-block',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue' , marginBottom: '10px'}}>Room {roomNumber}</h3>
        <p style={{ marginBottom: '10px' }}>
          Capcity : {capacity}<br/>
          Remaining : {remaining}
        </p>
        <button onClick={incrementRoomNumber}  style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}>Join</button>
      </div>
    </div>
  );
}
