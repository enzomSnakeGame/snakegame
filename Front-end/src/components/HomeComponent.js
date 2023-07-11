import React, { useState } from 'react';
import '../Styles/home.css'; // Import the CSS file

const Container = ({ children }) => {
  return (
    <div style={{ width: '100%' }}>
      {children}
    </div>
  );
};
function  App() {
  const [showCapacityInput, setShowCapacityInput] = useState(false);

  const handleCreateClick = () => {
    setShowCapacityInput(true);
  };

  // Function to handle capacity input change
  const handleCapacityChange = (e) => {
    // Update the state or perform any required actions
  };

  return (
    <Container>
    <div>
      <button
        className="create-button"
        onClick={handleCreateClick}
        style={{ position: 'absolute', top: '0', right: '0' }}
      >
        Create
      </button>
      {showCapacityInput && (
        <div>
          <label htmlFor="capacity">Capacity:</label>
          <input type="text" id="capacity" name="capacity" onChange={handleCapacityChange} />
        </div>
      )}
      {/* {cards.map((card) => (
        <CardComponent
          key={card.id}
          remaining={card.capacity - card.currentUsers}
        />
      ))} */}
    </div>
    </Container>
  );
};

export default App;
