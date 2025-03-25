
import React from "react";
import { useNavigate } from "react-router-dom";
import { Anime } from "@/types";
import { Play, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AnimeHeroProps {
  anime: Anime;
}

const AnimeHero = ({ anime }: AnimeHeroProps) => {
  const navigate = useNavigate();

  // Add null/undefined check to prevent errors
  if (!anime) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <h2 className="text-2xl font-bold mb-4">Anime data not available</h2>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  const handleWatchNow = () => {
    navigate(`/anime/${anime.id}/watch/1`);
  };

  const handleDetails = () => {
    navigate(`/anime/${anime.id}`);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={anime.bannerImage || anime.coverImage}
          alt={anime.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto h-full max-w-7xl px-4 relative z-10 flex flex-col justify-end pb-24">
        <div className="max-w-2xl animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-orange-600 hover:bg-orange-700 px-3 py-1">
              Featured
            </Badge>
            {anime.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="px-3 py-1">
                {genre}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {anime.title}
          </h1>

          <p className="text-gray-200 mb-8 text-base md:text-lg line-clamp-3">
            {anime.description}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <Button
              onClick={handleWatchNow}
              className="bg-orange-600 hover:bg-orange-700 text-white gap-2 px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Play className="h-5 w-5 fill-white text-white" />
              Watch Now
            </Button>
            <Button
              onClick={handleDetails}
              variant="outline"
              className="border-white text-white hover:bg-white/10 gap-2 px-6 py-6 rounded-full"
              size="lg"
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 rounded-full"
              size="icon"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeHero;
