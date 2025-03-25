
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface Video {
  id: string;
  url: string;
  title: string;
  created_at: string;
  thumbnail?: string;
  duration?: number;
}

interface VideoListProps {
  onSelectVideo: (video: Video) => void;
}

const VideoList = ({ onSelectVideo }: VideoListProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      
      // Get all files from the videos bucket
      const { data, error } = await supabase
        .storage
        .from('videos')
        .list();

      if (error) {
        throw error;
      }

      if (!data) {
        setVideos([]);
        return;
      }

      // Filter for video files only
      const videoFiles = data.filter(file => 
        file.name.match(/\.(mp4|webm|ogg|mov)$/i)
      );

      // Convert to Video objects
      const videoObjects: Video[] = await Promise.all(
        videoFiles.map(async (file) => {
          const { data: urlData } = supabase
            .storage
            .from('videos')
            .getPublicUrl(file.name);

          return {
            id: file.id,
            url: urlData.publicUrl,
            title: file.name.split('.')[0].replace(/_/g, ' '),
            created_at: file.created_at || new Date().toISOString(),
            // In a real app, you might extract thumbnail and duration
            thumbnail: undefined,
            duration: undefined
          };
        })
      );

      setVideos(videoObjects.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate video thumbnail (placeholder function)
  const getVideoThumbnail = (url: string) => {
    // In a real app, you would generate actual thumbnails
    // This is just a placeholder with a color based on the string
    const hash = url.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-20 w-32 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <p className="text-gray-500">No videos uploaded yet</p>
        <p className="text-sm text-gray-400 mt-2">Upload your first video to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">My Videos</h3>
      <div className="divide-y">
        {videos.map((video) => (
          <div key={video.id} className="py-3 flex gap-4">
            <div 
              className="relative w-32 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0"
              style={{ 
                backgroundColor: video.thumbnail || getVideoThumbnail(video.url),
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <Button 
                size="icon" 
                className="absolute inset-0 m-auto bg-black/30 hover:bg-black/50 h-8 w-8 rounded-full"
                onClick={() => onSelectVideo(video)}
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col">
              <h4 className="font-medium line-clamp-1" onClick={() => onSelectVideo(video)}>
                {video.title}
              </h4>
              <div className="flex text-xs text-gray-500 mt-1 gap-3">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(new Date(video.created_at), 'MMM d, yyyy')}
                </span>
                {video.duration && (
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
