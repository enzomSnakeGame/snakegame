import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function App({ capacity, currentUsers }) {
  const [roomNumber, setRoomNumber] = useState(1);
  const navigate = useNavigate();

  const incrementRoomNumber = () => {
    setRoomNumber(roomNumber + 1);
  };

  const routeChange = () =>{ 
    let path = `/Pending`; 
    navigate(path);
  }

  const handelClick= ()=>{
    incrementRoomNumber() ; 
    routeChange() ; 
  }

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
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue', marginBottom: '10px' }}>Room {roomNumber}</h3>
        <p style={{ marginBottom: '10px' }}>
          Capacity: {capacity}<br />
        </p>
        {/* <div>
          <h3></h3>
        </div> */}
        <button
        onClick={handelClick}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '10px'
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
}
