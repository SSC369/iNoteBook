import { Routes, Route, BrowserRouter } from "react-router-dom";
import Notes from "./components/Notes";
import "./App.css";
import NoteState from "./context/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Project from "./components/Project";

const App = () => (
  <BrowserRouter>
    <NoteState>
      <Routes>
        <Route exact path="/" Component={Notes} />
        <Route exact path="/api/auth/login" Component={Login} />
        <Route exact path="/api/auth/signup" Component={Signup} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/projects" Component={Project} />
      </Routes>
    </NoteState>
  </BrowserRouter>
);

export default App;
