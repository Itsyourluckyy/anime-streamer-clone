
import { Anime } from "../types";

export const animeData: Anime[] = [
  {
    id: "1",
    title: "Demon Slayer",
    description: "A young man named Tanjiro joins the Demon Slayer Corps to find a cure for his sister, who has been turned into a demon after their family was slaughtered by demons.",
    coverImage: "https://i.pinimg.com/originals/d3/15/de/d315de0cb933e7bcaae099cf5f77af9f.jpg",
    bannerImage: "https://cdn.oneesports.gg/cdn-data/2023/02/DemonSlayer_SeasonAll_Anime.jpg",
    episodes: [
      {
        id: "1-1",
        title: "Cruelty",
        number: 1,
        thumbnail: "https://m.media-amazon.com/images/M/MV5BNzEzMzM2ODQtZDBkMS00NWEzLTk5NTYtMGEyM2ZiZGEwNzk5XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        duration: 24,
        videoUrl: "https://example.com/video1",
        releaseDate: "2019-04-06"
      },
      {
        id: "1-2",
        title: "Trainer Sakonji Urokodaki",
        number: 2,
        thumbnail: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/09/Demon-Slayer-Episode-2.jpg",
        duration: 24,
        videoUrl: "https://example.com/video2",
        releaseDate: "2019-04-13"
      },
      {
        id: "1-3",
        title: "Sabito and Makomo",
        number: 3,
        thumbnail: "https://m.media-amazon.com/images/M/MV5BODM1OTc1NTYtYmQ3Zi00M2ZmLWIwNDQtNTZmYWJiN2Y3MWU1XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        duration: 24,
        videoUrl: "https://example.com/video3",
        releaseDate: "2019-04-20"
      },
    ],
    genres: ["Action", "Fantasy", "Historical"],
    status: "ongoing",
    rating: 4.8,
    releaseYear: 2019,
    studio: "Ufotable"
  },
  {
    id: "2",
    title: "Attack on Titan",
    description: "In a world where humanity lives within cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager vows to rid the world of the Titan threat.",
    coverImage: "https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_UF1000,1000_QL80_.jpg",
    bannerImage: "https://i.ytimg.com/vi/qonX5gFFzRE/maxresdefault.jpg",
    episodes: [
      {
        id: "2-1",
        title: "To You, 2,000 Years From Now",
        number: 1,
        thumbnail: "https://i.ytimg.com/vi/ZHhr1z_bzNI/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://example.com/aot-video1",
        releaseDate: "2013-04-07"
      },
      {
        id: "2-2",
        title: "That Day",
        number: 2,
        thumbnail: "https://animetime.pl/wp-content/uploads/2023/02/atak-tytanow-sezon-1-odcinek-2-8.jpg",
        duration: 24,
        videoUrl: "https://example.com/aot-video2",
        releaseDate: "2013-04-14"
      },
    ],
    genres: ["Action", "Dark Fantasy", "Post-Apocalyptic"],
    status: "completed",
    rating: 4.9,
    releaseYear: 2013,
    studio: "MAPPA"
  },
  {
    id: "3",
    title: "Jujutsu Kaisen",
    description: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself.",
    coverImage: "https://images.justwatch.com/poster/301533545/s718/jujutsu-kaisen.jpg",
    bannerImage: "https://images.alphacoders.com/110/1108496.jpg",
    episodes: [
      {
        id: "3-1",
        title: "Ryomen Sukuna",
        number: 1,
        thumbnail: "https://qph.cf2.quoracdn.net/main-qimg-d6a9d6e8eccdff0d5e4bc9d5a5c9af3b-lq",
        duration: 23,
        videoUrl: "https://example.com/jjk-video1",
        releaseDate: "2020-10-03"
      },
      {
        id: "3-2",
        title: "For Myself",
        number: 2,
        thumbnail: "https://m.media-amazon.com/images/M/MV5BZDgxYzk1NzYtNzA5Ny00MDJiLWE5YzgtODk2ZjZkZGFhYTQxXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg",
        duration: 23,
        videoUrl: "https://example.com/jjk-video2",
        releaseDate: "2020-10-10"
      },
    ],
    genres: ["Action", "Fantasy", "Supernatural"],
    status: "ongoing",
    rating: 4.7,
    releaseYear: 2020,
    studio: "MAPPA"
  },
  {
    id: "4",
    title: "My Hero Academia",
    description: "A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.",
    coverImage: "https://m.media-amazon.com/images/M/MV5BOGZmYjdjN2UtNjAwZi00YmEyLWFhNTEtNjM1MTFjOGJkOTgwXkEyXkFqcGdeQXVyMTA1NjQyNjkw._V1_FMjpg_UX1000_.jpg",
    bannerImage: "https://www.crunchyroll.com/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/c5d82de3aca26ca9e1e4e10818ac37b0.jpe",
    episodes: [
      {
        id: "4-1",
        title: "Izuku Midoriya: Origin",
        number: 1,
        thumbnail: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/08/My-Hero-Academia-Season-1-Episode-1.jpg",
        duration: 24,
        videoUrl: "https://example.com/mha-video1",
        releaseDate: "2016-04-03"
      },
      {
        id: "4-2",
        title: "What It Takes to Be a Hero",
        number: 2,
        thumbnail: "https://m.media-amazon.com/images/M/MV5BOGI5YzEyYjEtMGI0MC00ZTRkLTg2YWYtYjI1YzQ2YTVkMzVkXkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_.jpg",
        duration: 24,
        videoUrl: "https://example.com/mha-video2",
        releaseDate: "2016-04-10"
      },
    ],
    genres: ["Action", "Superhero", "Comedy"],
    status: "ongoing",
    rating: 4.6,
    releaseYear: 2016,
    studio: "Bones"
  },
  {
    id: "5",
    title: "One Piece",
    description: "Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.",
    coverImage: "https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
    bannerImage: "https://sportshub.cbsistatic.com/i/2021/03/27/e2a7a31f-2151-442e-a42f-f5158ec2b047/one-piece-1000-luffy-zoro-sanji-1246931.jpg",
    episodes: [
      {
        id: "5-1",
        title: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!",
        number: 1,
        thumbnail: "https://m.media-amazon.com/images/M/MV5BM2QwZDJlZDktMGY5Mi00YmI1LTk0NmQtOTEwZjdjYWZlMGI5XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        duration: 24,
        videoUrl: "https://example.com/op-video1",
        releaseDate: "1999-10-20"
      },
      {
        id: "5-2",
        title: "Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!",
        number: 2,
        thumbnail: "https://www.yualrightboah.com/wp-content/uploads/2022/01/Pirate-Hunter-Roronoa-Zoro.png",
        duration: 24,
        videoUrl: "https://example.com/op-video2",
        releaseDate: "1999-10-27"
      },
    ],
    genres: ["Action", "Adventure", "Fantasy"],
    status: "ongoing",
    rating: 4.8,
    releaseYear: 1999,
    studio: "Toei Animation"
  },
  {
    id: "6",
    title: "Chainsaw Man",
    description: "Following a betrayal, a young man left for the dead is reborn as a powerful devil-human hybrid after merging with his pet devil and is soon enlisted into an organization dedicated to hunting devils.",
    coverImage: "https://flxt.tmsimg.com/assets/p23019195_b_v13_aa.jpg",
    bannerImage: "https://i0.wp.com/www.screenspy.com/wp-content/uploads/2022/10/chainsaw-man-e1666118409201.png?fit=2880%2C1463&ssl=1",
    episodes: [
      {
        id: "6-1",
        title: "Dog & Chainsaw",
        number: 1,
        thumbnail: "https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/10/chainsawmanepisode1-2.jpg",
        duration: 25,
        videoUrl: "https://example.com/csm-video1",
        releaseDate: "2022-10-11"
      },
      {
        id: "6-2",
        title: "Arrival in Tokyo",
        number: 2,
        thumbnail: "https://i0.wp.com/www.animegeek.com/wp-content/uploads/2022/10/Chainsaw-Man-Episode-2-Release-Date-Power-the-Blood-Fiend-introduced.jpg?resize=780%2C470&ssl=1",
        duration: 25,
        videoUrl: "https://example.com/csm-video2",
        releaseDate: "2022-10-18"
      },
    ],
    genres: ["Action", "Horror", "Supernatural"],
    status: "ongoing",
    rating: 4.7,
    releaseYear: 2022,
    studio: "MAPPA"
  }
];

export const getAnimeById = (id: string): Anime | undefined => {
  return animeData.find(anime => anime.id === id);
};

export const getRecentAnime = (): Anime[] => {
  return [...animeData].sort((a, b) => {
    const latestEpisodeA = a.episodes.length > 0 ? 
      new Date(a.episodes[a.episodes.length - 1].releaseDate).getTime() : 0;
    const latestEpisodeB = b.episodes.length > 0 ? 
      new Date(b.episodes[b.episodes.length - 1].releaseDate).getTime() : 0;
    return latestEpisodeB - latestEpisodeA;
  }).slice(0, 4);
};

export const getTrendingAnime = (): Anime[] => {
  return [...animeData].sort((a, b) => b.rating - a.rating).slice(0, 4);
};

export const getAnimeByGenre = (genre: string): Anime[] => {
  return animeData.filter(anime => anime.genres.includes(genre));
};

export const getAllGenres = (): string[] => {
  const genres = new Set<string>();
  animeData.forEach(anime => {
    anime.genres.forEach(genre => genres.add(genre));
  });
  return Array.from(genres).sort();
};

export const searchAnime = (query: string): Anime[] => {
  if (!query || query.trim() === '') return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  return animeData.filter(anime => 
    anime.title.toLowerCase().includes(normalizedQuery) || 
    anime.description.toLowerCase().includes(normalizedQuery) ||
    anime.genres.some(genre => genre.toLowerCase().includes(normalizedQuery)) ||
    anime.studio.toLowerCase().includes(normalizedQuery)
  );
};
