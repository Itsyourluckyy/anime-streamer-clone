
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VideoUpload from "@/components/video/VideoUpload";
import VideoList from "@/components/video/VideoList";
import VideoPlayer from "@/components/anime/VideoPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Video {
  id: string;
  url: string;
  title: string;
  created_at: string;
  thumbnail?: string;
  duration?: number;
}

const VideoManagement = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "library">("library");
  
  const handleUploadComplete = (videoUrl: string, videoTitle: string) => {
    // Add the newly uploaded video to the library and switch to library tab
    const newVideo: Video = {
      id: Date.now().toString(),
      url: videoUrl,
      title: videoTitle,
      created_at: new Date().toISOString()
    };
    
    setSelectedVideo(newVideo);
    setActiveTab("library");
  };
  
  const handleBackToList = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-2xl font-bold mb-6">Video Management</h1>
          
          {selectedVideo ? (
            // Show selected video
            <div>
              <Button 
                variant="ghost" 
                onClick={handleBackToList} 
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to library
              </Button>
              
              <h2 className="text-xl font-semibold mb-4">{selectedVideo.title}</h2>
              
              <div className="mb-6">
                <VideoPlayer 
                  videoUrl={selectedVideo.url} 
                  thumbnail={selectedVideo.thumbnail || ""} 
                  title={selectedVideo.title} 
                />
              </div>
            </div>
          ) : (
            // Show video management UI
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="library">Video Library</TabsTrigger>
                    <TabsTrigger value="upload">Upload Video</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="library">
                    <VideoList onSelectVideo={setSelectedVideo} />
                  </TabsContent>
                  
                  <TabsContent value="upload">
                    <VideoUpload onUploadComplete={handleUploadComplete} />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Video Management Tips</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Upload videos in MP4, WebM, or MOV format</li>
                    <li>• Maximum file size is 100MB</li>
                    <li>• Give your videos clear, descriptive titles</li>
                    <li>• Allow time for processing after upload</li>
                    <li>• Uploaded videos can be shared publicly</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoManagement;
