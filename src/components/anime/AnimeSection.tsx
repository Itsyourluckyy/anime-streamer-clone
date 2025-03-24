
import React from "react";
import { Anime } from "@/types";
import AnimeCard from "./AnimeCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AnimeSectionProps {
  title: string;
  animeList: Anime[];
  viewAllLink?: string;
  cardSize?: "small" | "medium" | "large";
}

const AnimeSection = ({ title, animeList, viewAllLink, cardSize = "medium" }: AnimeSectionProps) => {
  return (
    <section className="py-12 animate-fade-in">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink}>
              <Button variant="ghost" className="group gap-1 text-gray-700 hover:text-orange-600">
                View All 
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} size={cardSize} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimeSection;
