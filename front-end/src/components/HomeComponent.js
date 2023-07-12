import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import CardComponent from './CardComponent'; // Import the component you want to send data to
import '../Styles/home.css'; // Import the CSS file




function App() {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [capacity, setCapacity] = useState('');

  const handleButtonClick = () => {
    setShowForm(!showForm);
    const dropForm = document.querySelector('.drop-form');
    dropForm.classList.add('clicked');
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setCapacity(value);
    }

   };

   const routeChange = () =>{ 
    let path = `/Pending`; 
    navigate(path);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary action with the capacity value here
    console.log('Submitted capacity:', capacity);
  };
  

  // use this way to fetch the Api 

    const url = 'http://localhost:3000/game/games' ;

    const fetchData =  async ()=>{

      let headers = {}
      if (sessionStorage.getItem('token')) {
          headers = { 'authorization': sessionStorage.getItem('token') }
      }
      
     await fetch(url , {
      headers:headers
     })
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the state
        if (data === null) {
          console.log('Received null data');
        } else {
          // Set the fetched data to the state
          console.log(data);
          setCards(data); 
      }}
      )
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }

  useEffect(() => {
    fetchData()    
  }, []);

  // useEffect(() => {
  //   const data = [ 
  //     {
  //       capacity: 4,
  //       currentUsers: 4
  //     },
  //     {
  //       capacity: 4,
  //       currentUsers: 3
  //     },
  //     {
  //       capacity: 4,
  //       currentUsers: 2
  //     },
  //     {
  // //       capacity: 4,
  //       currentUsers: 1
  //     },
  //     {
  //       capacity: 4,
  //       currentUsers: 5
  //     },
  //     {
  //       capacity: 4,
  //       currentUsers: 48
  //     }
  //   ];
  //   setCards(data);
  // }, []);

  return (
    <div>
    <div class="drop-form">
          <button class="create-button" onClick={handleButtonClick}>
            Create
          </button>
          {showForm && (
            <form class="dropdown-form" onSubmit={handleSubmit}>
                <div class="label-container">
              <label>
                Capacity:
                <input
                  type="number"
                   value={capacity || ''}                 
                    onChange={handleInputChange}
                  class="capacity-input"
                  inputMode="numeric"
                />
              </label>
              </div>
              <button type="submit" class="submit-button"
               onClick={routeChange} 
               >Join</button>
            </form>
          )}
    </div>

      <div className="container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <CardComponent
              capacity={card.capacity}
              currentUsers={card.currentUsers}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
