import Index from "./Index";
import "../Styles/Home.css";
import SongForm from "../Components/SongForm";

export default function New () {
    return (
        <>
            <Index/>
            <div className="continue-background">
                <SongForm/>
            </div>
        </>
    )
}