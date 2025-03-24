
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimeById } from "@/services/animeData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EpisodeCard from "@/components/anime/EpisodeCard";
import { Play, Star, Heart, Share2, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AnimeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"episodes" | "details">("episodes");
  
  const anime = id ? getAnimeById(id) : undefined;

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!anime) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Anime not found</h1>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    );
  }

  const handleWatchNow = () => {
    navigate(`/anime/${anime.id}/watch/1`);
  };

  const handleAddToList = () => {
    toast.success("Added to your list!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Banner Section */}
      <div className="relative pt-16">
        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={anime.bannerImage || anime.coverImage}
            alt={anime.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
      </div>
      
      {/* Anime Info Section */}
      <section className="container mx-auto max-w-7xl px-4 -mt-40 relative z-10 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full max-w-xs mx-auto md:mx-0 flex-shrink-0">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src={anime.coverImage}
                alt={anime.title}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="mt-6 space-y-4">
              <Button 
                onClick={handleWatchNow}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2"
                size="lg"
              >
                <Play className="h-5 w-5 fill-white text-white" />
                Watch Now
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={handleAddToList}
                >
                  <Plus className="h-4 w-4" />
                  Add to List
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => toast.success("Added to favorites!")}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{anime.title}</h1>
            
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded">
                <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                <span className="font-medium">{anime.rating.toFixed(1)}</span>
              </div>
              
              <span className="text-gray-500">•</span>
              
              <span className="text-gray-700">{anime.releaseYear}</span>
              
              <span className="text-gray-500">•</span>
              
              <span className="text-gray-700">{anime.episodes.length} Episodes</span>
              
              <span className="text-gray-500">•</span>
              
              <span className="capitalize text-gray-700">{anime.status}</span>
              
              <span className="text-gray-500">•</span>
              
              <span className="text-gray-700">{anime.studio}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="px-3 py-1">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <p className="text-gray-700 mb-8 leading-relaxed">{anime.description}</p>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-8">
                <button
                  className={`pb-3 font-medium text-sm ${
                    activeTab === "episodes"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("episodes")}
                >
                  Episodes
                </button>
                <button
                  className={`pb-3 font-medium text-sm ${
                    activeTab === "details"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            {activeTab === "episodes" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {anime.episodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} animeId={anime.id} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Synopsis</h3>
                  <p className="text-gray-700">{anime.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Information</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="w-32 text-gray-500">Type:</span>
                      <span>TV</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-gray-500">Studio:</span>
                      <span>{anime.studio}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-gray-500">Date aired:</span>
                      <span>{anime.releaseYear}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-gray-500">Status:</span>
                      <span className="capitalize">{anime.status}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-gray-500">Genres:</span>
                      <span>{anime.genres.join(", ")}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-gray-500">Episodes:</span>
                      <span>{anime.episodes.length}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-gray-500">Rating:</span>
                      <span>{anime.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open("https://www.crunchyroll.com", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Official Website
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <div className="mt-16"></div>
      <Footer />
    </div>
  );
};

export default AnimeDetails;
