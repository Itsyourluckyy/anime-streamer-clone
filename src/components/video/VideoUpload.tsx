
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, Check } from "lucide-react";

interface VideoUploadProps {
  onUploadComplete?: (videoUrl: string, videoTitle: string) => void;
}

const VideoUpload = ({ onUploadComplete }: VideoUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      // Check if file is a video
      if (!selectedFile.type.startsWith('video/')) {
        toast.error("Please select a video file");
        return;
      }
      
      // Check if file size is less than 2GB (2 * 1024 * 1024 * 1024 bytes)
      if (selectedFile.size > 2 * 1024 * 1024 * 1024) {
        toast.error("File size should be less than 2GB");
        return;
      }
      
      setFile(selectedFile);
      
      // Auto-generate title from filename if empty
      if (!title) {
        const fileName = selectedFile.name.split('.')[0];
        setTitle(fileName);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a video file");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title for the video");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Create a function to update progress
      const updateProgress = (progress: { loaded: number; total: number }) => {
        const percent = (progress.loaded / progress.total) * 100;
        setProgress(percent);
      };

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      if (!publicUrlData.publicUrl) {
        throw new Error("Failed to get public URL");
      }

      toast.success("Video uploaded successfully!");
      
      // Call the callback with video URL and title
      if (onUploadComplete) {
        onUploadComplete(publicUrlData.publicUrl, title);
      }
    } catch (error: any) {
      console.error("Error uploading video:", error);
      toast.error(`Upload failed: ${error.message || "Unknown error"}`);
    } finally {
      setUploading(false);
      setFile(null);
      setTitle("");
      setProgress(0);
    }
  };

  // Manual progress update function since we can't use onUploadProgress with Supabase storage
  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress > 95) {
        currentProgress = 95;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 500);

    return () => clearInterval(interval);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-medium">Upload Video</h3>
      
      <div className="space-y-3">
        <Input 
          type="text" 
          placeholder="Video title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          disabled={uploading}
        />
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => document.getElementById('videoFile')?.click()}
            disabled={uploading}
            className="w-full"
          >
            <input
              id="videoFile"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            Select Video
          </Button>
          
          <Button 
            onClick={() => {
              handleUpload();
              // Start simulating progress when uploading
              if (file) simulateProgress();
            }} 
            disabled={!file || uploading} 
            className="bg-orange-600 hover:bg-orange-700 w-full"
          >
            {uploading ? (
              <span className="flex items-center">
                <Upload className="mr-2 h-4 w-4 animate-pulse" /> Uploading...
              </span>
            ) : (
              <span className="flex items-center">
                <Upload className="mr-2 h-4 w-4" /> Upload
              </span>
            )}
          </Button>
        </div>
        
        {file && (
          <div className="text-sm text-gray-500">
            Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </div>
        )}
        
        {uploading && (
          <div className="space-y-1">
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-gray-500 text-right">{Math.round(progress)}%</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
