
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BrowseAnime from "./pages/BrowseAnime";
import AnimeDetails from "./pages/AnimeDetails";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import Auth from "./pages/Auth";
import DevPortal from "./pages/DevPortal";
import PremiumPlans from "./pages/PremiumPlans";
import PaymentPage from "./pages/PaymentPage";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import Contact from "./pages/Contact";
import VideoManagement from "./pages/VideoManagement";
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<BrowseAnime />} />
            <Route path="/anime/:id" element={<AnimeDetails />} />
            <Route path="/anime/:id/watch/:episodeNumber" element={<VideoPlayerPage />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/dev/777" element={<DevPortal />} />
            <Route path="/premium" element={<PremiumPlans />} />
            <Route path="/payment/:planId" element={<PaymentPage />} />
            <Route path="/payment/confirmation/:paymentId" element={<PaymentConfirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/videos" element={<VideoManagement />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
