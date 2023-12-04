import ReactPlayer from "react-player";
import "./video.css";

const VideoBackground = () => {
  return (
    <div className="video-background">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=7vZOX5gV-K4"
        playing
        loop
        muted
        width="100%"
        height="100%"
        controls={false}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              autohide: 1,
              showinfo: 0,
              controls: 0,
              fs: 0,
              rel: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default VideoBackground;
