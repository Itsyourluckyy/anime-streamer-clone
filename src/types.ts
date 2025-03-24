
export interface Anime {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  bannerImage?: string;
  episodes: Episode[];
  genres: string[];
  status: "ongoing" | "completed";
  rating: number;
  releaseYear: number;
  studio: string;
}

export interface Episode {
  id: string;
  title: string;
  number: number;
  thumbnail: string;
  duration: number; // in minutes
  videoUrl: string;
  releaseDate: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  premium: boolean;
}
