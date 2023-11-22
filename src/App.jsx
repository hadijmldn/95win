import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import startup from "./assets/sounds/startup.mp3";
import Modal from "./componenets/Modal";
import ShutDown from "./componenets/ShutDown";
import Notepad from "./componenets/Windows/Notepad";
import About from "./componenets/Windows/About";
import Icons from "./componenets/Icons/Icons";
import TaskBar from "./componenets/TaskBar/TaskBar";

function App({ aboutVisible, notepadVisible, shutDown, showModal }) {
  const [audio] = useState(new Audio(startup));

  useEffect(() => {
    window.addEventListener("contextmenu", contextDisable);
    audio.play();
    return () => {
      window.removeEventListener("contextmenu", contextDisable);
    };
    // eslint-disable-next-line
  }, []);

  function contextDisable(event) {
    event.preventDefault();
  }

  const aboutDisplay = aboutVisible ? <About /> : null;
  const notepadDisplay = notepadVisible ? <Notepad /> : null;
  const shutDownDisplay = shutDown ? <ShutDown /> : null;
  const modalDisplay = showModal ? <Modal /> : null;

  return (
    <div className="App">
      <Icons />
      {aboutDisplay}
      {notepadDisplay}
      {shutDownDisplay}
      {modalDisplay}
      <TaskBar />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    aboutVisible: state.about.show,
    notepadVisible: state.notepad.show,
    shutDown: state.shutDown,
    showModal: state.showModal,
  };
};

export default connect(mapStateToProps)(App);
