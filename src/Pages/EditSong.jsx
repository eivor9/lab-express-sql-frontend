import Album from "./Album";
import "../Styles/Home.css";
import SongForm from "../Components/SongForm";

export default function EditSong () {
    return (
        <>
            <Album/>
            <div className="continue-background">
                <SongForm/>
            </div>
        </>
    )
}