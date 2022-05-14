import { Routes, Route } from "react-router-dom";
import Explorer from "./components/Explorer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Student from "./components/Student";
import Header from "./templates/Header";

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
