import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  animeData, 
  addAnime, 
  updateAnime, 
  deleteAnime, 
  getAllGenres,
  payments,
  updatePaymentStatus
} from "@/services/animeData";
import { Anime, Episode, PaymentStatus } from "@/types";
import { Plus, Trash, Edit, Check, X, Search, DollarSign, Image, Upload } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

const DEV_EMAIL = "itsyourluckyy@gmail.com";
const DEV_PASSWORD = "mlpnkobj";

const DevPortal: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingPayments, setPendingPayments] = useState<PaymentStatus[]>([]);

  useEffect(() => {
    setAnimeList(animeData);
    setPendingPayments(payments.filter(p => p.status === "pending"));
  }, []);

  const authorizeAccess = () => {
    if (email === DEV_EMAIL && password === DEV_PASSWORD) {
      setIsAuthenticated(true);
      toast.success("Developer access granted");
    } else {
      toast.error("Invalid developer credentials");
    }
    setIsAuthorizing(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === "") {
      setAnimeList(animeData);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = animeData.filter(anime => 
      anime.title.toLowerCase().includes(query) || 
      anime.id.toLowerCase().includes(query)
    );
    setAnimeList(filtered);
  };

  const handleAnimeDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this anime?")) {
      const success = deleteAnime(id);
      if (success) {
        setAnimeList(prevList => prevList.filter(anime => anime.id !== id));
        toast.success("Anime deleted successfully");
      } else {
        toast.error("Failed to delete anime");
      }
    }
  };

  const handleApprovePayment = (paymentId: string) => {
    const updatedPayment = updatePaymentStatus(paymentId, "completed");
    if (updatedPayment) {
      setPendingPayments(pendingPayments.filter(p => p.id !== paymentId));
      toast.success("Payment approved and user upgraded to premium");
    } else {
      toast.error("Failed to approve payment");
    }
  };

  const handleRejectPayment = (paymentId: string) => {
    const updatedPayment = updatePaymentStatus(paymentId, "failed");
    if (updatedPayment) {
      setPendingPayments(pendingPayments.filter(p => p.id !== paymentId));
      toast.success("Payment rejected");
    } else {
      toast.error("Failed to reject payment");
    }
  };

  const refreshData = () => {
    setAnimeList([...animeData]);
    setPendingPayments(payments.filter(p => p.status === "pending"));
    toast.success("Data refreshed");
  };

  if (isAuthorizing) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Developer Portal</h1>
            <p className="text-gray-600 mb-6 text-center">Enter developer credentials to access portal</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input 
                  type="email" 
                  placeholder="Enter developer email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Input 
                  type="password" 
                  placeholder="Enter developer password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                onClick={authorizeAccess}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Access Portal
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Access Denied</h1>
            <p className="text-red-600 mb-6 text-center">Invalid developer credentials</p>
            
            <div className="space-y-4">
              <Button 
                onClick={() => setIsAuthorizing(true)}
                className="w-full"
              >
                Try Again
              </Button>
              <Button 
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-28 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Developer Portal 777</h1>
          <Button 
            onClick={refreshData}
            variant="outline"
          >
            Refresh Data
          </Button>
        </div>

        <Tabs defaultValue="anime">
          <TabsList className="mb-6">
            <TabsTrigger value="anime">Anime Management</TabsTrigger>
            <TabsTrigger value="payments">Payment Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="anime" className="space-y-6">
            <div className="flex items-center justify-between">
              <form onSubmit={handleSearch} className="relative w-full max-w-sm">
                <Input
                  type="text"
                  placeholder="Search anime by title or ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="h-4 w-4 text-gray-500" />
                </button>
              </form>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Anime
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Anime</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new anime to the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <AnimeForm 
                    onSubmit={(anime) => {
                      addAnime(anime);
                      setAnimeList([...animeList, anime]);
                      setIsAddDialogOpen(false);
                      toast.success("Anime added successfully");
                    }} 
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Episodes</TableHead>
                    <TableHead>Studio</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {animeList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No anime found. Add a new anime to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    animeList.map((anime) => (
                      <TableRow key={anime.id}>
                        <TableCell className="font-mono">{anime.id}</TableCell>
                        <TableCell className="font-medium">{anime.title}</TableCell>
                        <TableCell>{anime.episodes.length}</TableCell>
                        <TableCell>{anime.studio}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            anime.status === "ongoing" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {anime.status}
                          </span>
                        </TableCell>
                        <TableCell>{anime.rating}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog open={isEditDialogOpen && selectedAnime?.id === anime.id} onOpenChange={(open) => {
                              setIsEditDialogOpen(open);
                              if (!open) setSelectedAnime(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => {
                                    setSelectedAnime(anime);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Anime</DialogTitle>
                                  <DialogDescription>
                                    Update the details for {anime.title}
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedAnime && (
                                  <AnimeForm 
                                    anime={selectedAnime}
                                    onSubmit={(updatedAnime) => {
                                      updateAnime(updatedAnime);
                                      setAnimeList(animeList.map(a => a.id === updatedAnime.id ? updatedAnime : a));
                                      setIsEditDialogOpen(false);
                                      setSelectedAnime(null);
                                      toast.success("Anime updated successfully");
                                    }} 
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleAnimeDelete(anime.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Pending Payment Approvals</h2>
                <p className="text-gray-500 text-sm">Review and approve user premium subscription payments</p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No pending payments to approve.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pendingPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono">{payment.id}</TableCell>
                        <TableCell>{payment.userId}</TableCell>
                        <TableCell>{payment.planId}</TableCell>
                        <TableCell>₹{payment.amount}</TableCell>
                        <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprovePayment(payment.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 border-red-600"
                              onClick={() => handleRejectPayment(payment.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

interface AnimeFormProps {
  anime?: Anime;
  onSubmit: (anime: Anime) => void;
}

const AnimeForm: React.FC<AnimeFormProps> = ({ anime, onSubmit }) => {
  const [episodes, setEpisodes] = useState<Episode[]>(anime?.episodes || []);
  const [newEpisode, setNewEpisode] = useState<Partial<Episode>>({
    title: "",
    number: 1,
    duration: 24,
    thumbnail: "",
    videoUrl: "",
    releaseDate: new Date().toISOString().split('T')[0]
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>(anime?.genres || []);
  const [newGenre, setNewGenre] = useState("");
  const allGenres = getAllGenres();
  
  const coverImageRef = useRef<HTMLInputElement>(null);
  const bannerImageRef = useRef<HTMLInputElement>(null);
  const episodeThumbnailRef = useRef<HTMLInputElement>(null);
  const episodeVideoRef = useRef<HTMLInputElement>(null);
  
  const [coverImagePreview, setCoverImagePreview] = useState<string>(anime?.coverImage || "");
  const [bannerImagePreview, setBannerImagePreview] = useState<string>(anime?.bannerImage || "");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const form = useForm<Partial<Anime>>({
    defaultValues: anime || {
      title: "",
      description: "",
      coverImage: "",
      bannerImage: "",
      status: "ongoing",
      rating: 4.5,
      releaseYear: new Date().getFullYear(),
      studio: ""
    }
  });

  const handleFileUpload = (
    file: File, 
    setPreview: (url: string) => void, 
    setUploading: (state: boolean) => void,
    setUrl: (url: string) => void
  ) => {
    if (!file) return;
    
    setUploading(true);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    setTimeout(() => {
      setUrl(objectUrl);
      setUploading(false);
      toast.success("File uploaded successfully");
    }, 1500);
  };

  const handleSubmit = (data: Partial<Anime>) => {
    const newAnime: Anime = {
      id: anime?.id || Date.now().toString(),
      title: data.title || "",
      description: data.description || "",
      coverImage: data.coverImage || coverImagePreview,
      bannerImage: data.bannerImage || bannerImagePreview,
      episodes: episodes,
      genres: selectedGenres,
      status: data.status as "ongoing" | "completed",
      rating: data.rating || 4.5,
      releaseYear: data.releaseYear || new Date().getFullYear(),
      studio: data.studio || ""
    };
    
    onSubmit(newAnime);
  };

  const addEpisode = () => {
    if (!newEpisode.title || (!newEpisode.thumbnail && !thumbnailPreview) || !newEpisode.videoUrl) {
      toast.error("Please fill all episode fields");
      return;
    }
    
    const episode: Episode = {
      id: `${anime?.id || "new"}-${newEpisode.number}`,
      title: newEpisode.title || "",
      number: newEpisode.number || episodes.length + 1,
      thumbnail: thumbnailPreview || newEpisode.thumbnail || "",
      duration: newEpisode.duration || 24,
      videoUrl: newEpisode.videoUrl || "",
      releaseDate: newEpisode.releaseDate || new Date().toISOString()
    };
    
    setEpisodes([...episodes, episode]);
    setNewEpisode({
      title: "",
      number: episodes.length + 2,
      duration: 24,
      thumbnail: "",
      videoUrl: "",
      releaseDate: new Date().toISOString().split('T')[0]
    });
    setThumbnailPreview("");
  };

  const removeEpisode = (index: number) => {
    setEpisodes(episodes.filter((_, i) => i !== index));
  };

  const addGenre = () => {
    if (newGenre && !selectedGenres.includes(newGenre)) {
      setSelectedGenres([...selectedGenres, newGenre]);
      setNewGenre("");
    }
  };

  const removeGenre = (genre: string) => {
    setSelectedGenres(selectedGenres.filter(g => g !== genre));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <div className="space-y-2">
                    {coverImagePreview && (
                      <div className="relative w-40 h-40 overflow-hidden rounded-md mb-2">
                        <img 
                          src={coverImagePreview} 
                          alt="Cover preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => coverImageRef.current?.click()}
                        disabled={uploadingCover}
                      >
                        {uploadingCover ? (
                          <span className="animate-pulse">Uploading...</span>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Upload Image
                          </>
                        )}
                      </Button>
                      <input 
                        type="file"
                        ref={coverImageRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(
                              e.target.files[0], 
                              setCoverImagePreview, 
                              setUploadingCover,
                              (url) => form.setValue("coverImage", url)
                            );
                          }
                        }}
                      />
                      <div className="relative flex-1">
                        <Input 
                          {...field} 
                          placeholder="Or enter image URL"
                          onChange={(e) => {
                            field.onChange(e);
                            setCoverImagePreview(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="bannerImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image (Optional)</FormLabel>
                  <div className="space-y-2">
                    {bannerImagePreview && (
                      <div className="relative w-full h-28 overflow-hidden rounded-md mb-2">
                        <img 
                          src={bannerImagePreview} 
                          alt="Banner preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => bannerImageRef.current?.click()}
                        disabled={uploadingBanner}
                      >
                        {uploadingBanner ? (
                          <span className="animate-pulse">Uploading...</span>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Upload Image
                          </>
                        )}
                      </Button>
                      <input 
                        type="file"
                        ref={bannerImageRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(
                              e.target.files[0], 
                              setBannerImagePreview, 
                              setUploadingBanner,
                              (url) => form.setValue("bannerImage", url)
                            );
                          }
                        }}
                      />
                      <div className="relative flex-1">
                        <Input 
                          {...field} 
                          placeholder="Or enter image URL"
                          onChange={(e) => {
                            field.onChange(e);
                            setBannerImagePreview(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="studio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Studio</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="releaseYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Year</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1950" 
                      max={new Date().getFullYear()} 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      max="5" 
                      step="0.1" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={4} 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedGenres.map((genre) => (
                <div 
                  key={genre} 
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {genre}
                  <button 
                    type="button" 
                    onClick={() => removeGenre(genre)}
                    className="ml-2 text-orange-600 hover:text-orange-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {selectedGenres.length === 0 && (
                <p className="text-gray-500 text-sm">No genres selected</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Select 
                value={newGenre} 
                onValueChange={setNewGenre}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                onClick={addGenre} 
                variant="outline"
              >
                Add
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Episodes</h3>
            {episodes.length > 0 ? (
              <div className="space-y-4 mb-4">
                {episodes.map((episode, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-md bg-gray-50">
                    <div className="flex-1">
                      <p className="font-medium">{episode.number}. {episode.title}</p>
                      <p className="text-sm text-gray-500">Duration: {episode.duration} min</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeEpisode(index)}
                      className="text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">No episodes added</p>
            )}

            <div className="space-y-4 border p-4 rounded-md">
              <h4 className="font-medium">Add New Episode</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input 
                    value={newEpisode.title} 
                    onChange={(e) => setNewEpisode({...newEpisode, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Episode Number</label>
                  <Input 
                    type="number"
                    value={newEpisode.number} 
                    onChange={(e) => setNewEpisode({...newEpisode, number: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input 
                    type="number"
                    value={newEpisode.duration} 
                    onChange={(e) => setNewEpisode({...newEpisode, duration: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Release Date</label>
                  <Input 
                    type="date"
                    value={newEpisode.releaseDate} 
                    onChange={(e) => setNewEpisode({...newEpisode, releaseDate: e.target.value})}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Thumbnail</label>
                  <div className="space-y-2">
                    {thumbnailPreview && (
                      <div className="relative w-40 h-24 overflow-hidden rounded-md mb-2">
                        <img 
                          src={thumbnailPreview} 
                          alt="Thumbnail preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => episodeThumbnailRef.current?.click()}
                        disabled={uploadingThumbnail}
                      >
                        {uploadingThumbnail ? (
                          <span className="animate-pulse">Uploading...</span>
                        ) : (
                          <>
                            <Image className="h-4 w-4" />
                            Upload Thumbnail
                          </>
                        )}
                      </Button>
                      <input 
                        type="file"
                        ref={episodeThumbnailRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(
                              e.target.files[0], 
                              setThumbnailPreview, 
                              setUploadingThumbnail,
                              (url) => setNewEpisode({...newEpisode, thumbnail: url})
                            );
                          }
                        }}
                      />
                      <div className="relative flex-1">
                        <Input 
                          value={newEpisode.thumbnail} 
                          placeholder="Or enter thumbnail URL"
                          onChange={(e) => {
                            setNewEpisode({...newEpisode, thumbnail: e.target.value});
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Video URL / File</label>
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => episodeVideoRef.current?.click()}
                      disabled={uploadingVideo}
                    >
                      {uploadingVideo ? (
                        <span className="animate-pulse">Uploading...</span>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Upload Video
                        </>
                      )}
                    </Button>
                    <input 
                      type="file"
                      ref={episodeVideoRef}
                      className="hidden"
                      accept="video/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setUploadingVideo(true);
                          const videoUrl = URL.createObjectURL(e.target.files[0]);
                          
                          setTimeout(() => {
                            setNewEpisode({...newEpisode, videoUrl: videoUrl});
                            setUploadingVideo(false);
                            toast.success("Video uploaded successfully");
                          }, 2000);
                        }
                      }}
                    />
                    <div className="relative flex-1">
                      <Input 
                        value={newEpisode.videoUrl} 
                        placeholder="Or enter video URL"
                        onChange={(e) => setNewEpisode({...newEpisode, videoUrl: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  type="button" 
                  onClick={addEpisode}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Episode
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
            {anime ? 'Update Anime' : 'Add Anime'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default DevPortal;
