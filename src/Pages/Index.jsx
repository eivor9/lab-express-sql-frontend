import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import album_art from "../assets/album_art.png";
import playlist_art from "../assets/playlist_art.png";
import is_favorite from "../assets/is_favorite.png";
import "../Styles/Index.css";

const API = import.meta.env.VITE_API;

export default function Index () {
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    

    useEffect(() => {
        fetch(`${API}/songs`)
        .then(response => response.json())
        .then(response => setSongs(response))
        .catch(error => console.error(error))
    },[]);

    return (
        <div className="Index">
            {songs.length ? <div className="main">
                <header>
                    <img src={playlist_art} alt="Album Art" className="album-art" />
                    <div className="description">
                        <h1>Tuner Playlist</h1>
                        <a target="_blank" href="https://pursuit.org"><h2>Pursuit</h2></a>
                    </div>
                </header>
                <table>
                    <thead>
                        <tr className="table-headers">
                            <th>Song</th>
                            <th><span>|</span>Artist</th>
                            <th><span>|</span>Album</th>
                            <th><span>|</span>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.sort((x, y) => x.id - y.id).map(song => 
                            <tr key={song.id}>
                                <td>
                                    <img className="album-art" src={song.is_favorite ? is_favorite : album_art} alt="Album Art" />
                                    {song.name}
                                </td>
                                <td>{song.artist}</td>
                                <td>{song.album}</td>
                                <td>{song.time}</td>
                                <td onClick={() => navigate(`/songs/${song.id}`)} className="edit-button"><span className="edit-button">...</span></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            :
            <div className="empty">
                <img src={album_art} alt="" />
                <h1>Empty Libray</h1>
                <p>To add to this playlist, click the "Add to Library" button.</p>
            </div>
            }

        </div>
    )
}