import pursuit_logo from "../assets/pursuit_logo.svg";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css"

export default function NavBar() {
    return (
        <nav>
            <h1>
                <img src={pursuit_logo} alt="Pursuit Logo"/>
                Music
            </h1>
            <Link className="new-song-button" to="/songs/new">Add To Library</Link>
            <footer>
                <p>By Nasheed Jeremiah</p>
                <a target="_blank">
                    GitHub Repo
                    <i className="fa-solid fa-arrow-up"></i>
                </a>
            </footer>
            
        </nav>
    )
}