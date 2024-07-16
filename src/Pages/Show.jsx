import Index from "./Index";
import SongForm from "../Components/SongForm";
import "../Styles/Home.css";
import { useParams } from "react-router-dom";

export default function Show () {
    const { id } = useParams();
    
    return (
        <>
            <Index/>
            <div className="continue-background">
                <SongForm id={id}/>
            </div>
        </>
    )
}