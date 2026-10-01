import React, { useState, useRef, useEffect } from 'react';
import './VideoCarousel.css';

const VideoCarousel = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // When the component mounts or the current index changes, play the video
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.error("Error playing video:", error));
    }
  }, [currentIndex]);

  const handleVideoEnded = () => {
    // Play the next video, loop back to the beginning if at the end
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  if (!videos || videos.length === 0) return null;

  return (
    <div className="video-carousel-container">
      <video
        ref={videoRef}
        key={videos[currentIndex]}
        className="carousel-video"
        src={videos[currentIndex]}
        onEnded={handleVideoEnded}
        muted
        playsInline
        autoPlay
      />
    </div>
  );
};

export default VideoCarousel;
