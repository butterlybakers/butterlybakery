import React from 'react';
import './VideoCarousel.css';

const VideoCarousel = ({ videos }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="video-carousel-wrapper">
      <div className="video-carousel-scroll">
        {videos.map((video, index) => (
          <div key={index} className="video-card">
            <video
              className="card-video"
              muted
              playsInline
              autoPlay
              loop
            >
              <source src={video} />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
