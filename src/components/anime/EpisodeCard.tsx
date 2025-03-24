
import React from "react";
import { Link } from "react-router-dom";
import { Episode } from "@/types";
import { Play, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface EpisodeCardProps {
  episode: Episode;
  animeId: string;
  isPremium?: boolean;
}

const EpisodeCard = ({ episode, animeId, isPremium = false }: EpisodeCardProps) => {
  const formattedReleaseDate = formatDistanceToNow(new Date(episode.releaseDate), { addSuffix: true });

  return (
    <Link 
      to={`/anime/${animeId}/watch/${episode.number}`}
      className="group block"
    >
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
        <div className="relative">
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-orange-600 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Play className="h-5 w-5 fill-white text-white" />
            </div>
          </div>
          
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-white text-xs font-medium">EP {episode.number}</span>
          </div>
          
          {isPremium && (
            <div className="absolute top-2 right-2 bg-orange-600/90 backdrop-blur-sm rounded-full p-1">
              <Lock className="h-3 w-3 text-white" />
            </div>
          )}
          
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-white text-xs">{episode.duration} min</span>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">
            {episode.title}
          </h3>
          <p className="text-gray-500 text-xs mt-1">{formattedReleaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default EpisodeCard;
