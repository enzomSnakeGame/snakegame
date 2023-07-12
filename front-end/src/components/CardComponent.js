import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {  socket } from '../App';


export default function App({ capacity, idRoom , remaining   }) {

  const [roomNumber, setRoomNumber] = useState(idRoom);
  const [Data, setData] = useState(1);
  const navigate = useNavigate();

    // setRoomNumber(idRoom);
  const gameId ={ "gameId": idRoom } ; 
   const routeChange = () =>{ 
    let path = `/Pending`; 
    let state = gameId.gameId;
    navigate(path, { state });
    // navigate(path);
  }
  

  const handelClick= ()=>{
    routeChange() ; 
    fetchData()   
  }

  const fetchData = async () => {
    console.log(gameId) ; 
      const url = 'http://localhost:3000/game/games/join' ; 
      let headers = {}
      if (sessionStorage.getItem('token')) {
          headers['authorization']= sessionStorage.getItem('token')  ;
      }
       fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify({gameId})
      }).then(response => response.json())
      .then(data => {
         console.log(data);
          socket.emit('join-game' , data.gameid);
      }).catch(error => {
          // Handle error
          console.log(error) ; 
        });
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
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue', marginBottom: '10px' }}>Room {roomNumber}</h3>
        <p style={{ marginBottom: '10px' }}>
          Capacity: {capacity}<br />
          remainning : {remaining}<br />
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
