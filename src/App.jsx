import { useState } from "react";
import "./styles/global.css";
import "./App.css";
import { Landing } from "./components/Landing";
import { Horarios } from "./components/Horarios";
import { Materias } from "./components/Materias";

function App() {
  const [currentView, setCurrentView] = useState("landing");

  const handleSelectOption = (option) => {
    setCurrentView(option);
  };

  const handleBack = () => {
    setCurrentView("landing");
  };

  return (
    <>
      {currentView === "landing" && (
        <Landing onSelectOption={handleSelectOption} />
      )}
      {currentView === "horarios" && <Horarios onBack={handleBack} />}
      {currentView === "materias" && <Materias onBack={handleBack} />}
    </>
  );
}

export default App;
