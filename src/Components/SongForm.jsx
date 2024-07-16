import is_favorite from "../assets/is_favorite.png";
import album_art from "../assets/album_art.png";
import "../Styles/SongForm.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

export default function SongForm({id}) {
    const navigate = useNavigate();
    const [song, setSong] = useState({
        id: "",
        name: "",
        artist: "",
        album: "",
        time: "",
        is_favorite: false
    });

    const [time, setTime] = useState({
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        fetch(`${API}/songs/${id}`)
        .then(response => response.json())
        .then(response => {
            setSong(response)
            setTime({
                minutes: Number(response.time.split(":")[0]),
                seconds: Number(response.time.split(":")[1])
            })
        })
        .catch(error => console.error(error))
    },[]);

    const handleTextChange = (event) => {
        setSong({...song, [event.target.id]: event.target.value});
    };

    const handleNumberChange = (event) => {
        setTime({...time, [event.target.id]: Number(event.target.value)});
    }

    const handleCheckbox = (event) => {
        setSong({...song, [event.target.id]: !song.is_favorite});
    }

    const updateSong = () => {
        console.log(JSON.stringify(song))
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

    const handleSubmit = (event) => {
        event.preventDefault();
        setSong({...song, "time": `${time.minutes}:${time.seconds < 10 ? "0" + time.seconds : time.seconds}`})
        updateSong();
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
                <input onChange={handleTextChange} id="name" value={song.name} type="text" />
            </label>
            <label htmlFor="artist">artist
                <input onChange={handleTextChange} id="artist" value={song.artist} type="text" />
            </label>
            <label htmlFor="album">album
                <input onChange={handleTextChange} id="album" value={song.album} type="text" />
            </label>
            <label className="time-input" htmlFor="minutes">time
                <input onChange={handleNumberChange} min="0" max="120" id="minutes" value={time.minutes} type="number"/>
                :
                <input onChange={handleNumberChange} min="0" max="59" id="seconds" value={time.seconds} type="number"/>      
            </label>
            <label className="checkbox" htmlFor="is_favorite">favorite
                <input onChange={handleCheckbox} id="is_favorite" checked={song.is_favorite} type="checkbox" />
            </label>
            <div className="buttons">
                <div onClick={handleDelete} className="delete-button">Delete</div>
                <span>
                    <Link to="/songs">Cancel</Link>
                    <button>OK</button>
                </span>
            </div>
        </form>
    )
}