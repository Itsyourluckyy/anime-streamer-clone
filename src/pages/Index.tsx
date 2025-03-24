
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimeHero from "@/components/anime/AnimeHero";
import AnimeSection from "@/components/anime/AnimeSection";
import { getTrendingAnime, getRecentAnime, getAnimeByGenre, animeData } from "@/services/animeData";

const Index = () => {
  const featuredAnime = animeData[0]; // Demon Slayer is our featured anime
  const trendingAnime = getTrendingAnime();
  const newReleases = getRecentAnime();
  const actionAnime = getAnimeByGenre("Action");
  const fantasyAnime = getAnimeByGenre("Fantasy");

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <AnimeHero anime={featuredAnime} />
      </section>
      
      {/* Main Content */}
      <main className="flex-grow">
        {/* Trending Section */}
        <AnimeSection 
          title="Trending Now" 
          animeList={trendingAnime} 
          viewAllLink="/browse?filter=trending"
        />
        
        {/* New Releases Section */}
        <AnimeSection 
          title="New Episodes" 
          animeList={newReleases} 
          viewAllLink="/browse?filter=new"
        />
        
        {/* Action Anime Section */}
        <AnimeSection 
          title="Action Anime" 
          animeList={actionAnime} 
          viewAllLink="/browse?genre=Action"
        />
        
        {/* Fantasy Anime Section */}
        <AnimeSection 
          title="Fantasy Anime" 
          animeList={fantasyAnime} 
          viewAllLink="/browse?genre=Fantasy"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
