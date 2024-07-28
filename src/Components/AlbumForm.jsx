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
        "number_of_songs": 1,
        "release_year": 2024,
        "genre": ""
    });

    useEffect(() => {
        fetch(`${API}/songs/${id || ""}`)
        .then(response => response.json())
        .then(response => {
            setAlbum(response);
        })
        .catch(error => console.error(error))
    },[]);

    const handleTextChange = (event) => {
        setAlbum({...album, [event.target.id]: event.target.value});
    };

    const updateSong = () => {
        console.log(song);
        console.log(time);
        fetch(`${API}/songs/${id}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(song)
        })
        .then(() => {
          navigate("/songs")
        })
        .catch((error) => console.error("bad edit form", error));
    };

    const addSong = () => {
        fetch(`${API}/songs`, {
          method: "POST",
          body: JSON.stringify(song),
          headers: {"Content-Type": "application/json"}
        })
        .then(() => {
            navigate(`/songs`);
        })
        .catch((error) => console.error("catch", error));
    };

    const handleSubmit = (event) => {
        setSong({...song, "time": `${time.minutes}:${time.seconds}`})
        event.preventDefault();
        id ? updateSong() : addSong();
    };

    const handleDelete = () => {
        fetch(`${API}/songs/${id}`, { method: "DELETE" })
        .then(() => {
            navigate("/songs");
        })
        .catch((error) => console.error(error));
    }

    return (
        <form onSubmit={handleSubmit}>
            <header>
                <img src={song.is_favorite ? is_favorite : album_art} alt="Album Art" />
                <div className="old-details">
                    <h1>{song.name}</h1>
                    <h2>{song.artist}</h2>
                    <h2>{song.album}</h2>
                </div>
            </header>
            <label htmlFor="name">name
                <input required onChange={handleTextChange} id="name" value={song.name} type="text" />
            </label>
            <label htmlFor="artist">artist
                <input required onChange={handleTextChange} id="artist" value={song.artist} type="text" />
            </label>
            <label htmlFor="album">album
                <input required onChange={handleTextChange} id="album" value={song.album} type="text" />
            </label>
            <label className="time-input" htmlFor="minutes">time
                <input required onChange={handleMinuteChange} min="0" max="120" id="minutes" value={time.minutes} type="number"/>
                :
                <input required onChange={handleSecondChange} min="0" max="59" id="seconds" value={time.seconds} type="number"/>      
            </label>
            <label className="checkbox" htmlFor="is_favorite">favorite
                <input onChange={handleCheckbox} id="is_favorite" checked={song.is_favorite} type="checkbox" />
            </label>
            <div className="buttons">
                {id ? <div onClick={handleDelete} className="delete-button">Delete</div> : <div className="delete-button"></div>}
                <span>
                    <Link to="/songs">Cancel</Link>
                    <button>OK</button>
                </span>
            </div>
        </form>
    )
}