import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import album_art from "../assets/album_art.png";
import playlist_art from "../assets/playlist_art.jpg";
import is_favorite from "../assets/is_favorite.png";
import "../Styles/Index.css";

const API = import.meta.env.VITE_API;

export default function Album () {
    const navigate = useNavigate();
    const { id } = useParams();
    const [songs, setSongs] = useState([]);
    const [album, setAlbum] = useState({

    })

    useEffect(() => {
        fetch(`${API}/albums/${id}/songs`)
        .then(response => response.json())
        .then(response => {
            setAlbum(response)
            setSongs(response.songs)
        })
        .catch(error => console.error(error))
    },[]);

    return (
        <div className="Index">
            {songs.length ? <div className="main">
                <header>
                    <img src={playlist_art} alt="Album Art" className="album-art" />
                    <div className="description">
                        <h1>{album.name}<Link id="new-song-button" to={`/albums/${id}/songs/new`}>+</Link></h1>
                        <a style={{cursor:"pointer"}} onClick={() => navigate(`/albums`)}><h2>All Albums</h2></a>
                    </div>
                </header>
                <table>
                    <thead>
                        <tr className="table-headers">
                            <th>Name</th>
                            <th><span>|</span>Artist</th>
                            <th><span>|</span>Track #</th>
                            <th><span>|</span>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.sort((x, y) => x.track_no - y.track_no).map(song => 
                            <tr onClick={() => navigate(`/albums/${album.id}/songs/${song.track_no}/edit/`)} key={song.track_no}>
                                <td>
                                    <img className="album-art" src={ song.is_favorite ? is_favorite : album_art} alt="Album Art" />
                                    {song.name}
                                </td>
                                <td>{song.artist}</td>
                                <td>{song.track_no}</td>
                                <td>{song["length"]}</td>
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