import React from "react";

const Toolbar = ({ setSelectedTool }) => {
  return (
    <div className="toolbar">
      <button onClick={() => setSelectedTool("block")}>Bloc</button>
      <button onClick={() => setSelectedTool("enemy")}>Ennemi</button>
      <button onClick={() => setSelectedTool("powerup")}>Power-up</button>
    </div>
  );
};

export default Toolbar;
