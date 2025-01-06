import React from 'react';
import './YouTubeVideo.css'; 

interface YouTubeVideoProps {
  videoId: string; // Может быть полным URL или только идентификатором
  width?: string;
  height?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, width = "1000px", height = "550px" }) => {
  // Извлекаем идентификатор из полного URL, если он передан
  const getVideoId = (url: string): string => {
    const match = url.match(/(?:v=|\/shorts\/|\/embed\/|\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : url; // Если URL валидный, возвращаем ID, иначе сам input
  };

  const extractedVideoId = getVideoId(videoId); // Получаем чистый идентификатор
  const videoUrl = `https://www.youtube.com/embed/${extractedVideoId}`;

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
