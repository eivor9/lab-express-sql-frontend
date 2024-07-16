// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/App.css";

// PAGES
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import Show from "./Pages/Show";
import New from "./Pages/New";
import Loading from "./Components/Loading";
import FourOFour from "./Pages/FourOFour";

// COMPONENTS
import NavBar from "./Components/NavBar";

function App() {
  return (
   <div className="App">
    <Router>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hypnotize-me" element={<Loading />} />
          <Route path="/songs" element={<Index />} />
          <Route path="/songs/:id" element={<Show />} />
          <Route path="/songs/new" element={<New />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
    </Router>
   </div>
  )
}

export default App;
