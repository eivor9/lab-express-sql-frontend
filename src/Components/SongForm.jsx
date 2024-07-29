import is_favorite from "../assets/is_favorite.png";
import album_art from "../assets/album_art.png";
import "../Styles/SongForm.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API;

export default function SongForm({newSong}) {
    const { id, track_no } = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState({
        "track_no": 0,
        "name": "",
        "artist": "",
        "length": "0:00",
        "is_favorite": false,
        "album_id": id
    });

    const [time, setTime] = useState({
        minutes: 0,
        seconds: 0
    })

    if(!newSong){
        useEffect(() => {
            fetch(`${API}/albums/${id}/songs/${track_no}`)
            .then(response => response.json())
            .then(response => {
                if (typeof response.is_favorite === "boolean"){
                    setSong({
                        "track_no": response.track_no,
                        "name": response.name,
                        "artist": response.artist,
                        "length": response["length"],
                        "is_favorite": response.is_favorite,
                        "album_id": id
                    });
                    setTime({
                        minutes: Number(response["length"].split(":")[0]),
                        seconds: Number(response["length"].split(":")[1])
                    })
                }
            })
            .catch(error => console.error(error))
        },[]);
    }

    const handleTextChange = (event) => {
        setSong({...song, [event.target.id]: event.target.value});
    };

    const handleNumberChange = (event) => {
        setSong({...song, [event.target.id]: Number(event.target.value)});
    };

    const handleSecondChange = (event) => {
        setTime({...time, [event.target.id]: Number(event.target.value)});
        setSong({...song, "length": `${song["length"].split(":")[0]}:${Number(event.target.value) < 10 ? "0" + Number(event.target.value) : Number(event.target.value)}`});
    }

    const handleMinuteChange = (event) => {
        setTime({...time, [event.target.id]: Number(event.target.value)});
        setSong({...song, "length": `${Number(event.target.value)}:${song["length"].split(":")[1]}`});
    }

    const handleCheckbox = (event) => {
        setSong({...song, [event.target.id]: !song.is_favorite});
    }

    const updateSong = () => {
        console.log(song);
        console.log(time);
        fetch(`${API}/albums/${id}/songs/${track_no}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(song)
        })
        .then(() => {
          navigate(`/albums/${id}`)
        })
        .catch((error) => console.error("bad edit form", error));
    };

    const addSong = () => {
        fetch(`${API}/albums/${id}/songs`, {
          method: "POST",
          body: JSON.stringify(song),
          headers: {"Content-Type": "application/json"}
        })
        .then(() => {
            navigate(`/albums/${id}`);
        })
        .catch((error) => console.error("catch", error));
    };

    const handleSubmit = (event) => {
        setSong({...song, "length": `${time.minutes}:${time.seconds}`})
        event.preventDefault();
        newSong ? addSong() : updateSong();
    };

    const handleDelete = () => {
        fetch(`${API}/albums/${id}/songs/${track_no}`, { method: "DELETE" })
        .then(() => {
            navigate(`/albums/${id}`);
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
            <label className="time-input" htmlFor="minutes">time</label>
                <input required onChange={handleMinuteChange} min="0" max="120" id="minutes" value={time.minutes} type="number"/>
                :
                <input required onChange={handleSecondChange} min="0" max="59" id="seconds" value={time.seconds} type="number"/>      
            </div>

            {newSong ? <div className="input">
                    <label htmlFor="track_no">track #</label>
                    <input required onChange={handleNumberChange} id="track_no" value={song.track_no} type="number" />
                </div>
            : 
            null}

            <div className="input">
                <label className="checkbox" htmlFor="is_favorite">favorite</label>
                <input onChange={handleCheckbox} id="is_favorite" checked={song.is_favorite} type="checkbox" />
            </div>
            
            <div className="buttons">
                {!newSong ? <div onClick={handleDelete} className="delete-button">Delete</div> : <div className="delete-button"></div>}
                <span>
                    <Link to={`/albums/${song.album_id}`}>Cancel</Link>
                    <button>OK</button>
                </span>
            </div>
        </form>
    )
}