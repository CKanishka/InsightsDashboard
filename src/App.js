import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import SidebarContainer from "./components/sidebar-container";


function App() {
  return (
    <div className="App">
      <Navbar />
      <SidebarContainer />
    </div>
  );
}

export default App;
