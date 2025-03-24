
export interface Anime {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  bannerImage?: string;
  genres: string[];
  episodes: Episode[];
  rating: number;
  releaseYear: number;
  status: "ongoing" | "completed";
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

export interface PaymentStatus {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  paymentDate: string;
  status: "pending" | "completed" | "failed";
}
