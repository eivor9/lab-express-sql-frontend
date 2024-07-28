import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import album_art from "../assets/album_art.png";
import playlist_art from "../assets/playlist_art.jpg";
import is_favorite from "../assets/is_favorite.png";
import "../Styles/Index.css";

const API = import.meta.env.VITE_API;

export default function Index () {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    

    useEffect(() => {
        fetch(`${API}/albums`)
        .then(response => response.json())
        .then(response => setAlbums(response))
        .catch(error => console.error(error))
    },[]);

    return (
        <div className="Index">
            {albums.length ? <div className="main">
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
                            <th>Name</th>
                            <th><span>|</span>Artist</th>
                            <th><span>|</span># of Tracks</th>
                            <th><span>|</span>Length</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albums.sort((x, y) => x.id - y.id).map(album => 
                            <tr key={album.id}>
                                <td onClick={() => navigate(`/albums/${album.id}`)}>
                                    <img className="album-art" src={album_art} alt="Album Art" />
                                    {album.name}
                                </td>
                                <td onClick={() => navigate(`/albums/${album.id}`)} >{album.artist}</td>
                                <td onClick={() => navigate(`/albums/${album.id}`)} >{album.number_of_songs}</td>
                                <td onClick={() => navigate(`/albums/${album.id}`)} >{album.length_in_minutes} minutes</td>
                                <td onClick={() => navigate(`/albums/${album.id}/edit`)}  className="edit-button"><span className="edit-button">...</span></td>
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