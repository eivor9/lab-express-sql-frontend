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
        time: "00:00",
        is_favorite: false
    });

    const [time, setTime] = useState({
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        fetch(`${API}/album/${id || ""}`)
        .then(response => response.json())
        .then(response => {
            if (response.id){
                setSong(response);
                setTime({
                    minutes: Number(response.time.split(":")[0]),
                    seconds: Number(response.time.split(":")[1])
                })
            }
        })
        .catch(error => console.error(error))
    },[]);

    const handleTextChange = (event) => {
        setSong({...song, [event.target.id]: event.target.value});
    };

    const handleSecondChange = (event) => {
        setTime({...time, [event.target.id]: Number(event.target.value)});
        setSong({...song, "time": `${song.time.split(":")[0]}:${Number(event.target.value) < 10 ? "0" + Number(event.target.value) : Number(event.target.value)}`});
    }

    const handleMinuteChange = (event) => {
        setTime({...time, [event.target.id]: Number(event.target.value)});
        setSong({...song, "time": `${Number(event.target.value)}:${song.time.split(":")[1]}`});
    }

    const handleCheckbox = (event) => {
        setSong({...song, [event.target.id]: !song.is_favorite});
    }

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
            <div className="input">
                <label htmlFor="name">name</label>
                <input required onChange={handleTextChange} id="name" value={song.name} type="text" />
            </div>
            
            <div className="input">
                <label htmlFor="artist">artist</label>
                <input required onChange={handleTextChange} id="artist" value={song.artist} type="text" />
            </div>
            
            <div className="input">
                <label htmlFor="album">album</label>
                <input required onChange={handleTextChange} id="album" value={song.album} type="text" />
            </div>
            
            <div className="input">
            <label className="time-input" htmlFor="minutes">time</label>
                <input required onChange={handleMinuteChange} min="0" max="120" id="minutes" value={time.minutes} type="number"/>
                :
                <input required onChange={handleSecondChange} min="0" max="59" id="seconds" value={time.seconds} type="number"/>      
            </div>

            <div className="input">
                <label className="checkbox" htmlFor="is_favorite">favorite</label>
                <input onChange={handleCheckbox} id="is_favorite" checked={song.is_favorite} type="checkbox" />
            </div>
            
            <div className="buttons">
                {id ? <div onClick={handleDelete} className="delete-button">Delete</div> : <div className="delete-button"></div>}
                <span>
                    <Link to={`/albums/${song.album_id}`}>Cancel</Link>
                    <button>OK</button>
                </span>
            </div>
        </form>
    )
}