import Index from "./Index";
import "../Styles/Home.css";
import music from "../assets/music.png"
import { Link } from "react-router-dom";

export default function Home () {
    return (
        <>
            <Index/>
            <div className="continue-background">
                <div className="continue-popup">
                    <svg class="svg-monogram-logo" color="rgba(255,255,255,0.85)" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 51"><path d="M24.0499 16.1033C20.9578 15.7893 14.9453 16.3276 9.35855 23.4597C8.20087 24.94 7.14028 26.5996 6.17679 28.4462C5.15355 25.538 5.08633 22.5476 6.01248 19.6694C7.40916 15.3034 11.054 11.4233 15.8266 9.15811L14.6092 13.8904L18.5752 14.9072L21.6225 3.04274L9.79175 0L8.7685 3.96976L13.5486 5.2033C7.74526 8.04419 3.45064 12.7615 1.68051 18.2863C0.0224067 23.4747 0.731954 28.8574 3.73446 33.8514L3.78674 33.9336C2.05395 38.7183 0.784236 44.3701 0 50.8593H4.57097C5.2133 45.8055 6.13945 41.4919 7.26725 37.8361C11.3901 41.0882 17.2831 42.3965 23.0715 41.0732C29.8607 39.5182 34.4317 34.7111 34.9919 28.5359C35.552 22.3533 30.645 16.7762 24.0499 16.1033ZM30.4657 28.1248C30.0848 32.3337 26.9404 35.5185 22.0557 36.6399C16.327 37.9557 11.5918 35.982 8.94029 33.2159C13.0482 23.5195 18.8142 20.1404 23.5868 20.6263C27.7171 21.045 30.8018 24.4092 30.4657 28.1248Z" fill="rgba(255,255,255,0.5"></path></svg>
                    <img src={music} alt="Eigth Notes icon"/>
                    <h1>Welcome to Tuner!</h1>
                    <p>This full-stack web app enables users to seamlessly add, remove, update, and view songs from their personalized list. With a user-friendly interface, navigating through song entries is intuitive and efficient, ensuring a smooth experience for music enthusiasts. The app combines robust back-end functionality with an attractive front-end design to provide an all-encompassing solution for managing this song collection.</p>
                    <Link to="/songs">Continue</Link>
                </div>
            </div>
        </>
    )
}