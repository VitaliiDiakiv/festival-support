import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddStudent from "./students/AddStudent";
import EditStudent from "./students/EditStudent";
import StudentsTable from "./students/StudentsTable";
import InfoTable from "./info/InfoTable";
import AddInfo from "./info/AddInfo";
import EditInfo from "./info/EditInfo";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/allinfo" element={<InfoTable />} />
          <Route exact path="/addinfo" element={<AddInfo />} />
          <Route exact path="/editinfo/:id" element={<EditInfo />} />
          <Route exact path="/allstudents" element={<StudentsTable />} />
          <Route exact path="/addstudent" element={<AddStudent />} />
          <Route exact path="/editstudent/:id" element={<EditStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
