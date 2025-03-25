import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAnimeById, animeData } from "@/services/animeData";
import Navbar from "@/components/layout/Navbar";
import VideoPlayer from "@/components/anime/VideoPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ListOrdered, Info, Settings, Share2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import EpisodeCard from "@/components/anime/EpisodeCard";

const VideoPlayerPage = () => {
  const { id, episodeNumber } = useParams<{ id: string; episodeNumber: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"episodes" | "comments" | "details">("episodes");
  const [showRecommended, setShowRecommended] = useState(true);
  
  const currentEpisodeNumber = episodeNumber ? parseInt(episodeNumber) : 1;
  
  const anime = id ? getAnimeById(id) : undefined;
  
  const currentEpisode = anime?.episodes.find(
    (ep) => ep.number === currentEpisodeNumber
  );
  
  const prevEpisode = anime?.episodes.find(
    (ep) => ep.number === currentEpisodeNumber - 1
  );
  
  const nextEpisode = anime?.episodes.find(
    (ep) => ep.number === currentEpisodeNumber + 1
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, episodeNumber]);

  if (!anime || !currentEpisode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Episode not found</h1>
        <p className="text-gray-600 mb-6">
          The episode you're looking for doesn't exist or might have been removed.
        </p>
        <div className="flex gap-4">
          {id && (
            <Button onClick={() => navigate(`/anime/${id}`)}>
              View All Episodes
            </Button>
          )}
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const navigateToPrevEpisode = () => {
    if (prevEpisode) {
      navigate(`/anime/${anime.id}/watch/${prevEpisode.number}`);
    } else {
      toast.info("This is the first episode");
    }
  };

  const navigateToNextEpisode = () => {
    if (nextEpisode) {
      navigate(`/anime/${anime.id}/watch/${nextEpisode.number}`);
    } else {
      toast.info("This is the last episode");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Link 
                to={`/anime/${anime.id}`}
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                {anime.title}
              </Link>
              <span className="text-gray-500">›</span>
              <span className="text-gray-900">Episode {currentEpisode.number}</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-9">
                <VideoPlayer 
                  videoUrl={currentEpisode.videoUrl} 
                  thumbnail={currentEpisode.thumbnail} 
                  title={`${anime.title} - Episode ${currentEpisode.number}`}
                />
                
                <div className="mt-6">
                  <h1 className="text-2xl font-semibold mb-2">
                    {anime.title} - Episode {currentEpisode.number}: {currentEpisode.title}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <Button 
                      onClick={navigateToPrevEpisode}
                      disabled={!prevEpisode}
                      variant="outline"
                      className="gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous Episode
                    </Button>
                    
                    <Button 
                      onClick={navigateToNextEpisode}
                      disabled={!nextEpisode}
                      className="gap-2 bg-orange-600 hover:bg-orange-700"
                    >
                      Next Episode
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      onClick={() => toast.success("Link copied to clipboard!")}
                      className="gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab as any}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="episodes" className="gap-2">
                        <ListOrdered className="h-4 w-4" />
                        Episodes
                      </TabsTrigger>
                      <TabsTrigger value="details" className="gap-2">
                        <Info className="h-4 w-4" />
                        Details
                      </TabsTrigger>
                      <TabsTrigger value="comments" className="gap-2">
                        <Settings className="h-4 w-4" />
                        Comments
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="episodes" className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {anime.episodes.map((episode) => (
                          <Link 
                            key={episode.id} 
                            to={`/anime/${anime.id}/watch/${episode.number}`}
                            className={`p-3 rounded-md flex items-center gap-3 transition-colors ${
                              episode.number === currentEpisodeNumber
                                ? "bg-orange-50 border border-orange-200"
                                : "hover:bg-gray-50 border border-transparent"
                            }`}
                          >
                            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={episode.thumbnail} 
                                alt={episode.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium mb-1">
                                Episode {episode.number}
                              </div>
                              <div className="text-xs text-gray-500 line-clamp-1">
                                {episode.title}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="details" className="mt-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">About this episode</h3>
                          <p className="text-gray-700">
                            {currentEpisode.title} - Episode {currentEpisode.number} of {anime.title}. 
                            Duration: {currentEpisode.duration} minutes. Released on {new Date(currentEpisode.releaseDate).toLocaleDateString()}.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">About {anime.title}</h3>
                          <p className="text-gray-700">{anime.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Information</h3>
                          <div className="space-y-2">
                            <div className="flex">
                              <span className="w-32 text-gray-500">Studio:</span>
                              <span>{anime.studio}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-500">Release:</span>
                              <span>{anime.releaseYear}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-500">Status:</span>
                              <span className="capitalize">{anime.status}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-500">Rating:</span>
                              <span>{anime.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="comments" className="mt-4">
                      <div className="text-center py-8">
                        <h3 className="text-lg font-medium mb-2">Comments coming soon!</h3>
                        <p className="text-gray-600">
                          We're working on adding comments to enhance your viewing experience.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Recommended</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowRecommended(!showRecommended)}
                      className="h-8 text-xs"
                    >
                      {showRecommended ? "Hide" : "Show"}
                    </Button>
                  </div>
                  
                  {showRecommended && (
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4 pr-4">
                        {animeData.slice(0, 5).map((recommendedAnime) => (
                          <Link 
                            key={recommendedAnime.id}
                            to={`/anime/${recommendedAnime.id}`}
                            className="block group"
                          >
                            <div className="flex gap-3">
                              <div className="w-20 h-28 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={recommendedAnime.coverImage} 
                                  alt={recommendedAnime.title} 
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                  {recommendedAnime.title}
                                </h4>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span>{recommendedAnime.releaseYear}</span>
                                  <span className="mx-1.5">•</span>
                                  <span>{recommendedAnime.episodes.length} Eps</span>
                                </div>
                                <div className="mt-1 text-xs text-gray-500 line-clamp-2">
                                  {recommendedAnime.description}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPlayerPage;
