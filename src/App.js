import React, { useState } from "react";
import "./App.css";
import LevelEditor from "./components/LevelEditor/LevelEditor";
import LevelExplorer from "./components/LevelExplorer/LevelExplorer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  const [token, setToken] = useState(null);
  const [levelData, setLevelData] = useState([]);

  const loadLevel = (levelId) => {
    console.log("Chargement du niveau avec l'ID:", levelId);
    setLevelData(levelId); // On stocke l'ID dans le state
  };

  return (
    <div className="App">
      <h1>Plateforme de création de niveaux</h1>
      {!token ? (
        <div>
          <Login setToken={setToken} />
          <Register />
        </div>
      ) : (
        <div>
          <LevelEditor levelData={levelData} />{" "}
          {/* Passe levelData au LevelEditor */}
          <LevelExplorer loadLevel={loadLevel} />
        </div>
      )}
    </div>
  );
}

export default App;
