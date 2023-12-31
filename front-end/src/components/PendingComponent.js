import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { socket } from "../App";

export let NumTokens;
export let CurrentPlayer;

const PendingPage = ({ socket }) => {
  const [points, setPoints] = useState("..."); // Initial state with three dots
  const [statusGame, setStatusGame] = useState("");
  const [cap, setCapacity] = useState("");
  const [tur, setTurn] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const gameId = location.state;

  console.log("gameid");
  console.log(NumTokens);
  console.log(CurrentPlayer);
  console.log(sessionStorage.getItem("capacity"));
  console.log(sessionStorage.getItem("turn"));

  useEffect(() => {
    // Function to update the points every second
    const interval = setInterval(() => {
      setPoints((prevPoints) => {
        if (prevPoints === "...") {
          return ".."; // Change to two dots
        } else if (prevPoints === "..") {
          return "."; // Change to one dot
        } else {
          return "..."; // Change back to three dots
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);

  const startGameHandler = async () => {
    const url = "http://localhost:3000/game/games/start";

    let headers = {};
    if (sessionStorage.getItem("token")) {
      headers = {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ gameId }),
      });

      const data = await response.json();

      if (data === "can not Start Game") {
        // Handle error condition
      } else {
        console.log("in start");
        console.log(data);
        console.log(data.capacity);
        setCapacity(data.capacity);
        setTurn(data.turn);
        sessionStorage.setItem("capacity", data.capacity);
        NumTokens = parseInt(sessionStorage.getItem("capacity"));
        sessionStorage.setItem("turn", data.turn);
        CurrentPlayer = parseInt(sessionStorage.getItem("turn"));
        console.log(NumTokens);
        console.log(CurrentPlayer);
        sessionStorage.setItem("gameId", gameId);
        let path = `/board`;
        navigate(path);
        console.log("avasd");
        console.log(gameId);
        console.log(data.gameid);
        socket.emit("start-game", {
          capacity: data.capacity,
          turn: data.turn,
          gameId: gameId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on('start', (data) => {
      console.log("here");
      sessionStorage.setItem("capacity", data.capacity);
      console.log(sessionStorage.getItem("capacity"));
      NumTokens = parseInt(sessionStorage.getItem("capacity"));
      sessionStorage.setItem("turn", data.turn);
      sessionStorage.setItem("gameId", data.gameId);
      CurrentPlayer = parseInt(sessionStorage.getItem("turn"));
      console.log(NumTokens);
      console.log(CurrentPlayer);
      let path = `/board`;
      navigate(path);
      console.log(data);
    });

    socket.on('join', (data) => {
      
    });
  }, [socket]);

  useEffect(() => {
    startGameHandler();
  }, []); // Run the startGameHandler function once on page load

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom, #000000, #1a1a1a);
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Waiting for Players{points}
        </h1>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "40px",
            whiteSpace: "nowrap",
          }}
        >
          Please wait while other players join the game.
        </p>
        <button
          className="start-button"
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            backgroundColor: "blue",
            color: "#ffffff",
            borderRadius: "4px",
            border: "none",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "transform 0.3s ease",
          }}
          onClick={() => {
            startGameHandler();
          }}
        >
          Start Game
        </button>
      </div>
    </>
  );
};

export default PendingPage;
