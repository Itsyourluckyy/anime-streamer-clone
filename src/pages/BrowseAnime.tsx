
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimeCard from "@/components/anime/AnimeCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Anime } from "@/types";
import { 
  animeData, 
  getRecentAnime, 
  getTrendingAnime, 
  getAnimeByGenre,
  getAllGenres,
  searchAnime
} from "@/services/animeData";
import { Filter, SlidersHorizontal, SortAsc, ListFilter, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const BrowseAnime = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const genres = getAllGenres();
  const query = searchParams.get("q");
  const filter = searchParams.get("filter");
  const genre = searchParams.get("genre");
  
  // Initialize the state based on URL params
  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      setActiveTab("search");
    } else if (filter) {
      setActiveTab(filter);
    } else if (genre) {
      setSelectedGenres([genre]);
      setActiveTab("all");
    } else {
      setActiveTab("all");
    }
  }, [query, filter, genre]);
  
  // Update anime list based on active tab and filters
  useEffect(() => {
    let filtered: Anime[] = [];
    
    if (activeTab === "search" && searchTerm) {
      filtered = searchAnime(searchTerm);
    } else if (activeTab === "trending") {
      filtered = getTrendingAnime();
    } else if (activeTab === "new") {
      filtered = getRecentAnime();
    } else if (activeTab === "popular") {
      filtered = [...animeData].sort((a, b) => b.rating - a.rating);
    } else {
      filtered = [...animeData];
    }
    
    // Apply genre filter if any are selected
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(anime => 
        anime.genres.some(genre => selectedGenres.includes(genre))
      );
    }
    
    setAnimeList(filtered);
  }, [activeTab, selectedGenres, searchTerm]);
  
  // Update URL based on active tab and search
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (activeTab === "search" && searchTerm) {
      newParams.set("q", searchTerm);
    } else if (activeTab !== "all") {
      newParams.set("filter", activeTab);
    }
    
    if (selectedGenres.length === 1) {
      newParams.set("genre", selectedGenres[0]);
    }
    
    setSearchParams(newParams);
  }, [activeTab, searchTerm, selectedGenres, setSearchParams]);
  
  // Handle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedGenres([]);
    if (activeTab === "search") {
      setSearchTerm("");
    }
  };
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setActiveTab("search");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">Browse Anime</h1>
            
            <div className="flex gap-3">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 pr-10"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Anime</SheetTitle>
                    <SheetDescription>
                      Apply filters to find the perfect anime for you.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <h3 className="font-medium mb-3 flex items-center justify-between">
                      <span>Genres</span>
                      {selectedGenres.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="h-8 text-xs text-gray-500"
                        >
                          Clear
                        </Button>
                      )}
                    </h3>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-2">
                        {genres.map((genre) => (
                          <Button
                            key={genre}
                            variant={selectedGenres.includes(genre) ? "default" : "outline"}
                            className={`mr-2 mb-2 ${
                              selectedGenres.includes(genre)
                                ? "bg-orange-600 hover:bg-orange-700"
                                : ""
                            }`}
                            onClick={() => toggleGenre(genre)}
                          >
                            {genre}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {/* Filter badges */}
          {(selectedGenres.length > 0 || searchTerm) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedGenres.map(genre => (
                <div key={genre} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm">{genre}</span>
                  <button
                    onClick={() => toggleGenre(genre)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {searchTerm && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm">Search: {searchTerm}</span>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setActiveTab("all");
                    }}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {(selectedGenres.length > 0 || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-600 hover:text-orange-700"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New Releases</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              {searchTerm && (
                <TabsTrigger value="search">Search Results</TabsTrigger>
              )}
            </TabsList>
          </Tabs>
          
          {/* Results */}
          {animeList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 animate-fade-in">
              {animeList.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <h3 className="text-xl font-medium mb-2">No anime found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <div className="mt-16"></div>
      <Footer />
    </div>
  );
};

export default BrowseAnime;
