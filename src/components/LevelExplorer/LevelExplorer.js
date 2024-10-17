import React, { useEffect, useState } from "react";
import axios from "axios";

const LevelExplorer = ({ loadLevel }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      const res = await axios.get("http://localhost:5000/levels");
      setLevels(res.data);
    };
    fetchLevels();
  }, []);

  return (
    <div>
      <h2>Niveaux créés par les utilisateurs</h2>
      <ul>
        {levels.map((level) => (
          <li key={level._id}>
            <strong>{level.name}</strong> par utilisateur {level.creator}
            <button onClick={() => loadLevel(level._id)}>Charger</button>{" "}
            {/* Ce bouton appelle loadLevel */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LevelExplorer;
