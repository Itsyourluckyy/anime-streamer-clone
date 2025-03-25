
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VideoUpload from "@/components/video/VideoUpload";
import VideoList from "@/components/video/VideoList";
import VideoPlayer from "@/components/anime/VideoPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Video {
  id: string;
  url: string;
  title: string;
  created_at: string;
  thumbnail?: string;
  duration?: number;
}

// Developer credentials - these would normally be stored securely
const DEV_EMAIL = "itsyourluckyy@gmail.com";
const DEV_PASSWORD = "mlpnkobj";

const VideoManagement = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "library">("library");
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
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

  const authorizeAccess = () => {
    if (email === DEV_EMAIL && password === DEV_PASSWORD) {
      setIsDeveloper(true);
      localStorage.setItem("isDeveloper", "true");
      toast.success("Developer access granted");
    } else {
      toast.error("Invalid developer credentials");
    }
    setIsAuthorizing(false);
  };

  useEffect(() => {
    // Check if user is already authorized as developer
    const devStatus = localStorage.getItem("isDeveloper");
    if (devStatus === "true") {
      setIsDeveloper(true);
    }
  }, []);

  if (isAuthorizing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-2xl font-bold mb-6 text-center">Developer Authentication</h1>
              <p className="text-gray-600 mb-6 text-center">Enter developer credentials to access upload features</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter developer email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter developer password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex space-x-4">
                  <Button 
                    onClick={authorizeAccess}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    Authenticate
                  </Button>
                  <Button 
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-2xl font-bold mb-6">Video Management</h1>
          
          {!isDeveloper && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-yellow-800">Developer access required</h3>
                <p className="text-yellow-700 text-sm">You need developer privileges to upload videos.</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAuthorizing(true)}
              >
                Login as Developer
              </Button>
            </div>
          )}
          
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
                    {isDeveloper && <TabsTrigger value="upload">Upload Video</TabsTrigger>}
                  </TabsList>
                  
                  <TabsContent value="library">
                    <VideoList onSelectVideo={setSelectedVideo} />
                  </TabsContent>
                  
                  {isDeveloper && (
                    <TabsContent value="upload">
                      <VideoUpload onUploadComplete={handleUploadComplete} />
                    </TabsContent>
                  )}
                </Tabs>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Video Management Tips</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Upload videos in MP4, WebM, or MOV format</li>
                    <li>• Maximum file size is 2GB</li>
                    <li>• Give your videos clear, descriptive titles</li>
                    <li>• Allow time for processing after upload</li>
                    <li>• Only developers can upload videos</li>
                    {isDeveloper && <li className="text-green-600 font-medium">• You are logged in as a developer</li>}
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
