import React from 'react';
import './YouTubeVideo.css'; 

interface YouTubeVideoProps {
  videoId: string;
  width?: string;
  height?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, width = "1000px", height = "550px" }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-video-container">
      <iframe
        className="youtube-video-iframe"
        width={width}
        height={height}
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video"
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;
