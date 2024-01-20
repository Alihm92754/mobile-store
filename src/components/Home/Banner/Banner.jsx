import "./Banner.scss";
import BannerVideo from "../../../assets/banner-video.mp4";
import { useRef, useState, useEffect } from "react";

const Banner = () => {

    const [videoPlayed, setVideoPlayed] = useState(true);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            }
            else {
                videoRef.current.pause();
            }
            setVideoPlayed(!videoRef.current.paused);
        }
    };

    const handleReplay = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setVideoPlayed(true);
        }
    };

    useEffect(() => {
        const handleVideoEnded = () => {
            videoRef.current.pause();
            setVideoPlayed(false);
        };

        if (videoRef.current) {
            videoRef.current.addEventListener("ended", handleVideoEnded);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener("ended", handleVideoEnded);
            }
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, []);



    return (
        <div className="hero-banner">
            <video
                ref={videoRef} 
                autoPlay={false} 
                muted 
                className="video-bg"
                onClick={handlePlayPause}
            >
                <source src={ BannerVideo } type="video/mp4" />
            </video>
                <button className="play-pause-button" onClick={handlePlayPause}>
                    {videoPlayed ? 'Pause' : 'Resume'}
                </button>
                {videoPlayed && (
                    <button className="replay-button" onClick={handleReplay}>
                        Replay
                    </button>
                )}

                
        </div>
    );
};

export default Banner;
