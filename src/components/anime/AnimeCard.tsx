
import React from "react";
import { Link } from "react-router-dom";
import { Anime } from "@/types";
import { Play, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnimeCardProps {
  anime: Anime;
  size?: "small" | "medium" | "large";
}

const AnimeCard = ({ anime, size = "medium" }: AnimeCardProps) => {
  const getCardSizeClass = () => {
    switch (size) {
      case "small":
        return "w-full max-w-[170px]";
      case "large":
        return "w-full max-w-[300px]";
      case "medium":
      default:
        return "w-full max-w-[240px]";
    }
  };

  const getThumbnailSizeClass = () => {
    switch (size) {
      case "small":
        return "h-[240px]";
      case "large":
        return "h-[400px]";
      case "medium":
      default:
        return "h-[320px]";
    }
  };

  return (
    <Link to={`/anime/${anime.id}`} className="group">
      <div className={`${getCardSizeClass()} transition-all duration-300 hover:scale-[1.02]`}>
        <div className="relative overflow-hidden rounded-lg shadow-md mb-3">
          <div className={`relative ${getThumbnailSizeClass()} overflow-hidden`}>
            <img
              src={anime.coverImage}
              alt={anime.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-orange-600 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Play className="h-6 w-6 fill-white text-white" />
              </div>
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs font-medium">{anime.rating.toFixed(1)}</span>
            </div>
            {anime.status === "ongoing" && (
              <Badge 
                className="absolute top-2 left-2 bg-orange-600 hover:bg-orange-700 text-[10px] uppercase tracking-wider"
              >
                Ongoing
              </Badge>
            )}
          </div>
        </div>
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {anime.title}
        </h3>
        <div className="flex items-center text-gray-500 text-xs">
          <span>{anime.releaseYear}</span>
          <span className="mx-1.5">•</span>
          <span>{anime.episodes.length} Episodes</span>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
