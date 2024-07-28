// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/App.css";

// PAGES
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import Album from "./Pages/Album";
import AlbumEdit from "./Pages/AlbumEdit";
import New from "./Pages/New";
import NewSong from "./Pages/NewSong";
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
          <Route path="/albums" element={<Index />} />
          <Route path="/albums/:id" element={<Album />} />
          <Route path="/albums/:id/edit" element={<AlbumEdit />} />
          <Route path="/albums/:id/songs/new" element={<NewSong />} />
          <Route path="/albums/new" element={<New />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
    </Router>
   </div>
  )
}

export default App;
