import Album from "./Album";
import AlbumForm from "../Components/AlbumForm";
import "../Styles/Home.css";
import { useParams } from "react-router-dom";

export default function AlbumEdit () {
    const { id } = useParams();
    return (
        <>
            <Album/>
            <div className="continue-background">
                <AlbumForm id={id}/>
            </div>
        </>
    )
}