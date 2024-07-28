import is_favorite from "../assets/is_favorite.png";
import album_art from "../assets/album_art.png";
import "../Styles/SongForm.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

export default function AlbumForm({id}) {
    const navigate = useNavigate();
    const [album, setAlbum] = useState({
        "id": null,
        "name": "",
        "artist": "",
        "length_in_minutes": 0,
        "number_of_songs": 0,
        "release_year": 2024,
        "genre": ""
    });

    useEffect(() => {
        fetch(`${API}/albums/${id || ""}`)
        .then(response => response.json())
        .then(response => {
            setAlbum(response);
        })
        .catch(error => console.error(error))
    },[]);

    const handleTextChange = (event) => {
        setAlbum({...album, [event.target.id]: event.target.value});
    };

    const handleNumberChange = (event) => {
        setAlbum({...album, [event.target.id]: Number(event.target.value)});
    };

    const updateSong = () => {
        fetch(`${API}/albums/${id}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(album)
        })
        .then((response) => {
            console.log(response)
          navigate("/albums")
        })
        .catch((error) => console.error("bad edit form", error));
    };

    const addSong = () => {
        fetch(`${API}/albums`, {
          method: "POST",
          body: JSON.stringify(album),
          headers: {"Content-Type": "application/json"}
        })
        .then(() => {
            navigate(`/albums`);
        })
        .catch((error) => console.error("catch", error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        id ? updateSong() : addSong();
    };

    const handleDelete = () => {
        fetch(`${API}/albums/${id}`, { method: "DELETE" })
        .then(() => {
            navigate("/albums");
        })
        .catch((error) => console.error(error));
    }

    return (
        <form onSubmit={handleSubmit}>
            <header>
                <img src={album_art} alt="Album Art" />
                <div className="old-details">
                    <h1>{album.name}</h1>
                    <h2>{album.artist}</h2>
                </div>
            </header>
            <div className="input">
                <label htmlFor="name">name</label>
                <input required onChange={handleTextChange} id="name" value={album.name} type="text" />
            </div>
            
            <div className="input">
                <label htmlFor="artist">artist</label>
                <input required onChange={handleTextChange} id="artist" value={album.artist} type="text" />
            </div>

            <div className="input">
                <label htmlFor="genre">genre</label>
                <input required onChange={handleTextChange} id="genre" value={album.genre} type="text" />
            </div>
            
            <div className="input">
                <label htmlFor="length_in_minutes">length</label>
                <input required onChange={handleNumberChange} min="0" id="length_in_minutes" value={album.length_in_minutes} type="number" />
                minutes
            </div>

            <div className="input">
                <label htmlFor="number_of_songs"># of songs</label>
                <input required onChange={handleNumberChange} min="0" id="number_of_songs" value={album.number_of_songs} type="number" />
            </div>
    
            <div className="input">
                <label htmlFor="release_year">year</label>
                <input required onChange={handleNumberChange} min="-70000" max="2024" id="release_year" value={album.release_year} type="number" />
            </div>
            
            <div className="buttons">
                {id ? <div onClick={handleDelete} className="delete-button">Delete</div> : <div className="delete-button"></div>}
                <span>
                    <Link to="/albums">Cancel</Link>
                    <button>OK</button>
                </span>
            </div>
        </form>
    )
}