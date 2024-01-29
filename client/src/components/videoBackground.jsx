import './video.css';
import shiningBrightVideo from '../assets/ShiningBright.mp4';

const VideoBackground = () => {
return (
    <div className="video-background">
    <video
        autoPlay
        loop
        muted
        style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
        }}
    >
        <source src={shiningBrightVideo} type="video/mp4" />
    </video>
    </div>
);
};

export default VideoBackground;