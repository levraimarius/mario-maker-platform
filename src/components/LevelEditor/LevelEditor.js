import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const LevelEditor = ({ levelData }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLevelData, setCurrentLevelData] = useState([]); // Initialisé comme tableau vide
  const [selectedTool, setSelectedTool] = useState("block"); // Type d'élément sélectionné

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    if (levelData) {
      loadLevel(levelData); // Charge les données du niveau
    }
  }, [levelData]);

  const renderLevel = (levelData) => {
    if (!Array.isArray(levelData)) {
      console.error(
        "Données du niveau incorrectes ou non définies :",
        levelData
      );
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Réinitialise le canvas

    levelData.forEach((item) => {
      if (item.tool === "block") {
        context.fillStyle = "#000000";
      } else if (item.tool === "enemy") {
        context.fillStyle = "#FF0000";
      } else if (item.tool === "powerup") {
        context.fillStyle = "#00FF00";
      }
      context.fillRect(item.x, item.y, 20, 20); // Positionne l'objet sur le canvas
    });
  };

  const loadLevel = async (levelId) => {
    try {
      const res = await axios.get(`http://localhost:5000/levels/${levelId}`);
      const level = res.data;

      if (!Array.isArray(level.data)) {
        console.error(
          "Les données du niveau ne sont pas un tableau :",
          level.data
        );
        return;
      }

      console.log("Niveau chargé :", level);
      setCurrentLevelData(level.data); // Met à jour les objets du niveau
      renderLevel(level.data); // Dessine le niveau sur le canvas
    } catch (error) {
      console.error("Erreur lors du chargement du niveau", error);
    }
  };

  const saveLevel = async () => {
    const level = {
      name: "Mon niveau",
      creator: "12345", // ID de l'utilisateur à gérer
      data: currentLevelData,
    };

    try {
      await axios.post("http://localhost:5000/levels/add", level);
      alert("Niveau sauvegardé !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du niveau", error);
    }
  };

  const addObjectToLevel = (x, y) => {
    if (!Array.isArray(currentLevelData)) {
      console.error(
        "currentLevelData n'est pas un tableau :",
        currentLevelData
      );
      return;
    }
    setCurrentLevelData([...currentLevelData, { tool: selectedTool, x, y }]);
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    addObjectToLevel(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (selectedTool === "block") {
      context.fillStyle = "#000000";
    } else if (selectedTool === "enemy") {
      context.fillStyle = "#FF0000";
    } else if (selectedTool === "powerup") {
      context.fillStyle = "#00FF00";
    }
    context.fillRect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 20, 20);
  };

  return (
    <div>
      <div>
        <button onClick={() => setSelectedTool("block")}>Bloc</button>
        <button onClick={() => setSelectedTool("enemy")}>Ennemi</button>
        <button onClick={() => setSelectedTool("powerup")}>Power-up</button>
        <button onClick={saveLevel}>Sauvegarder le niveau</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />
    </div>
  );
};

export default LevelEditor;
