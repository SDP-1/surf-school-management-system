import './App.css';
import AddStudent from './components/AddStudent';
import Heder from './components/Heder';
import AllStudent from './components/AlllStudent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() { 
  return (
    <Router>
      <div>
        
        <Heder/>

        <Routes>
          <Route path="/add" exact Component={AddStudent} />
        </Routes>

        <Routes>
        <Route path="/" exact Component={AllStudent} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
