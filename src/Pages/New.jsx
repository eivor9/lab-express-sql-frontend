import Index from "./Index";
import "../Styles/Home.css";
import AlbumForm from "../Components/AlbumForm";

export default function New () {
    return (
        <>
            <Index/>
            <div className="continue-background">
                <AlbumForm/>
            </div>
        </>
    )
}