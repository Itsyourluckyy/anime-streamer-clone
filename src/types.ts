
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
  role?: "user" | "developer" | "admin";
  subscriptionStatus?: "active" | "inactive" | "pending";
  subscriptionEndDate?: string;
}

export interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in months
  features: string[];
  popular?: boolean;
}

export interface PaymentStatus {
  id: string;
  userId: string;
  planId: string;
  status: "pending" | "completed" | "failed";
  amount: number;
  paymentDate: string;
  paymentMethod: string;
}
