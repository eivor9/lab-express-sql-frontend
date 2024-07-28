import pursuit_logo from "../assets/pursuit_logo.svg";
import { Link, useParams } from "react-router-dom";
import "../Styles/NavBar.css"

export default function NavBar() {
    const currentURL = window.location.href
    const id = Number(currentURL.split('/').pop());
    console.log(id);
    return (
        <nav>
            <Link to="/">
                <h1>
                    <img src={pursuit_logo} alt="Pursuit Logo"/>
                    Tuner
                </h1>
            </Link>
            <Link className="new-song-button" to={id ? `/albums/${id}/songs/new` : `/albums/new`}>Add To Library</Link>
            <footer>
                <p>By Nasheed Jeremiah</p>
                <a target="_blank" href="https://github.com/eivor9/lab-express-sql-frontend">
                    GitHub Repo
                    <i className="fa-solid fa-arrow-up"></i>
                </a>
            </footer>
            
        </nav>
    )
}