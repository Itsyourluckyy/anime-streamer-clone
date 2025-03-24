
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  title: string;
}

const VideoPlayer = ({ videoUrl, thumbnail, title }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const inactivityPeriod = 3000; // 3 seconds

  // Handle video loading
  useEffect(() => {
    // Simulate video loading (in real implementation, this would use actual video events)
    const loadTimer = setTimeout(() => {
      setIsVideoLoaded(true);
      setIsPlaying(true);
    }, 2000);
    
    return () => clearTimeout(loadTimer);
  }, []);

  // Handle play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.error("Failed to play video:", error);
          setIsPlaying(false);
          toast.error("Playback error. Please try again.");
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle progress tracking
  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);
      }
    };

    const intervalId = setInterval(updateProgress, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle volume changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle control visibility
  useEffect(() => {
    const hideControlsOnInactivity = () => {
      if (isPlaying) {
        if (controlsTimerRef.current) {
          clearTimeout(controlsTimerRef.current);
        }
        
        controlsTimerRef.current = setTimeout(() => {
          setShowControls(false);
        }, inactivityPeriod);
      }
    };
    
    const showControlsOnActivity = () => {
      setShowControls(true);
      hideControlsOnInactivity();
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', showControlsOnActivity);
      containerRef.current.addEventListener('click', showControlsOnActivity);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', showControlsOnActivity);
        containerRef.current.removeEventListener('click', showControlsOnActivity);
      }
      
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isPlaying]);

  // Video metadata loaded
  const handleMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Play/pause toggle
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        toast.error("Fullscreen error: " + err.message);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        toast.error("Exit fullscreen error: " + err.message);
      });
    }
  };

  // Seek video
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const seekTo = (value[0] / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTo;
      setProgress(value[0]);
    }
  };
  
  // Change volume
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Format time (seconds -> MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Skip forward/backward
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };
  
  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  // Video ended handler
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-xl"
    >
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
          <img 
            src={thumbnail} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-4 border-orange-600 border-t-transparent animate-spin mb-4"></div>
            <p className="text-white text-lg font-medium">Loading video...</p>
          </div>
        </div>
      )}
      
      {/* Actual video - in real implementation this would use the videoUrl */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={thumbnail}
        onEnded={handleVideoEnded}
        onLoadedMetadata={handleMetadata}
        onClick={togglePlay}
        loop
      >
        {/* Fallback video for demo - remove in actual implementation */}
        <source 
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      
      {/* Controls overlay */}
      {(showControls || !isPlaying) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 flex flex-col justify-between p-4 transition-opacity duration-300">
          {/* Top controls */}
          <div className="flex justify-between items-center">
            <h3 className="text-white text-lg font-medium">{title}</h3>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => toast.info("Settings coming soon")}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Center play/pause button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {!isPlaying && (
              <button 
                onClick={togglePlay}
                className="bg-orange-600/90 hover:bg-orange-600 text-white rounded-full p-6 transform transition-transform hover:scale-110 pointer-events-auto"
              >
                <Play className="h-8 w-8 fill-white text-white" />
              </button>
            )}
          </div>
          
          {/* Bottom controls */}
          <div className="space-y-3">
            {/* Progress bar */}
            <div className="px-1">
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={skipBackward}
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={skipForward}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
                
                <div className="flex items-center gap-2 group relative">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={toggleMute}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <div className="w-20 hidden group-hover:block absolute left-10 top-1/2 transform -translate-y-1/2 bg-black/80 rounded p-2">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                    />
                  </div>
                </div>
                
                <span className="text-white text-xs">
                  {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={toggleFullscreen}
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
