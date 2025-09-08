import React, { useState, useEffect } from 'react';
import './VideoSection.css';
import thumbYoutube from '../../assets/images/thumb-youtube.jpg';
import thumbInstagram from '../../assets/images/thumb-instagram.jpg';
import thumbTikTok from '../../assets/images/thumb-tiktok.jpg';

const videoData = [
  {
    id: 'yt1',
    type: 'youtube',
    title: 'Conheça a Unic Drop',
    thumbnail: thumbYoutube,
    embedUrl: 'https://www.youtube.com/embed/ZE85lmRAERk?autoplay=1'
  },
  {
    id: 'ig1',
    type: 'instagram',
    title: 'Vendas sem estoque?',
    thumbnail: thumbInstagram,
    permalink: 'https://www.instagram.com/reel/DKZx05xoTFR/'
  },
  {
    id: 'tt1',
    type: 'tiktok',
    title: 'O Lucro está na Compra',
    thumbnail: thumbTikTok,
    cite: 'https://www.tiktok.com/@italobto_unic/video/7491073601139985670',
    videoId: '7491073601139985670'
  }
];

function VideoSection() {
  const [likes, setLikes] = useState({});
  const [likedInSession, setLikedInSession] = useState({});
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    const storedLikes = localStorage.getItem('videoLikes');
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    } else {
      const initialLikes = videoData.reduce((acc, video) => {
        acc[video.id] = 0;
        return acc;
      }, {});
      setLikes(initialLikes);
      localStorage.setItem('videoLikes', JSON.stringify(initialLikes));
    }
  }, []);
  useEffect(() => {
    const loadScript = (src, id) => {
      if (document.getElementById(id)) return;
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    if (playingVideoId) {
      const video = videoData.find(v => v.id === playingVideoId);
      if (video && video.type === 'instagram') {
        loadScript("//www.instagram.com/embed.js", 'instagram-embed-script');
        if (window.instgrm) {
          setTimeout(() => {
            window.instgrm.Embeds.process();
          }, 100);
        }
      } else if (video && video.type === 'tiktok') {
        const oldScript = document.getElementById('tiktok-embed-script');
        if (oldScript) oldScript.remove();
        loadScript("https://www.tiktok.com/embed.js", 'tiktok-embed-script');
      }
    }
  }, [playingVideoId]);

  const handleLike = (e, videoId) => {
    e.stopPropagation();

    if (likedInSession[videoId]) {
      return;
    }

    const newLikes = {
      ...likes,
      [videoId]: (likes[videoId] || 0) + 1,
    };
    setLikes(newLikes);
    localStorage.setItem('videoLikes', JSON.stringify(newLikes));

    setLikedInSession({
      ...likedInSession,
      [videoId]: true,
    });
  };

  const handlePlayVideo = (videoId) => {
    setPlayingVideoId(videoId);
  };

  return (
    <section className="video-section">
      <div className="container">
        <h2 className="section-title text-center">Conheça a Unic Drop em Ação</h2>
        <div className="video-grid">
          {videoData.map((video) => (
            <div key={video.id} className="video-item">
              <div className="video-thumbnail-container">
                <div className={`video-player-embed ${playingVideoId === video.id ? 'active' : ''}`}>
                  {video.type === 'youtube' && (
                    <div className="video-player-wrapper">
                      <iframe 
                        src={video.embedUrl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {video.type === 'instagram' && (
                    <blockquote 
                      className="instagram-media" 
                      data-instgrm-permalink={`${video.permalink}?utm_source=ig_embed&utm_campaign=loading`}
                    ></blockquote>
                  )}
                  {video.type === 'tiktok' && (
                    <blockquote 
                      className="tiktok-embed" 
                      cite={video.cite} 
                      data-video-id={video.videoId}
                    >
                      <section></section>
                    </blockquote>
                  )}
                </div>

                {playingVideoId !== video.id && (
                  <>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className={`video-thumbnail video-thumbnail--${video.type}`} 
                    />
                    <div className="play-icon-overlay" onClick={() => handlePlayVideo(video.id)}>
                      <i className="bi bi-play-fill"></i>
                    </div>
                  </>
                )}
              </div>
              <div className="video-info">
                <div className="video-title">{video.title}</div>
                <div 
                  className={`like-container ${likedInSession[video.id] ? 'liked' : ''}`} 
                  onClick={(e) => handleLike(e, video.id)}
                >
                  <i className="bi bi-heart-fill"></i>
                  <span className="like-count">{likes[video.id] || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoSection;