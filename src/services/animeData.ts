
// Import key types
import { Anime, Episode, PaymentStatus, PremiumPlan } from "@/types";

// Mock anime data
let animeData: Anime[] = [
  {
    id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=",
    title: "Attack on Titan",
    description: "In a world where humanity is threatened by giant creatures known as Titans, Eren Yeager joins the Survey Corps to fight back and uncover the mysteries of their existence.",
    coverImage: "https://s4.anilist.co/file/anime/cover/large/bx20958-whJfwjFuGTjV.jpg",
    bannerImage: "https://s4.anilist.co/file/anime/banner/20958-fWNJyc79t6N4.jpg",
    episodes: [
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-1",
        title: "To You, in 2000 Years: The Fall of Shiganshina, Part 1",
        number: 1,
        thumbnail: "https://i.ytimg.com/vi/Ncw8-T0kKJM/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=Ncw8-T0kKJM",
        releaseDate: "2013-04-07T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-2",
        title: "That Day",
        number: 2,
        thumbnail: "https://i.ytimg.com/vi/ikkFn4jS-wk/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=ikkFn4jS-wk",
        releaseDate: "2013-04-14T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-3",
        title: "A Dim Light Amid Despair: Humanity's Comeback, Part 1",
        number: 3,
        thumbnail: "https://i.ytimg.com/vi/j-fK_aQL-TQ/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=j-fK_aQL-TQ",
        releaseDate: "2013-04-21T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-4",
        title: "The Night of the Closing Ceremony: Humanity's Comeback, Part 2",
        number: 4,
        thumbnail: "https://i.ytimg.com/vi/J-Fu-EfuMnQ/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=J-Fu-EfuMnQ",
        releaseDate: "2013-04-28T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-5",
        title: "First Battle: The Struggle for Trost, Part 1",
        number: 5,
        thumbnail: "https://i.ytimg.com/vi/Q-JvjJzQQxI/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=Q-JvjJzQQxI",
        releaseDate: "2013-05-05T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-6",
        title: "The World the Girl Saw: The Struggle for Trost, Part 2",
        number: 6,
        thumbnail: "https://i.ytimg.com/vi/z_uoPYtfLio/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=z_uoPYtfLio",
        releaseDate: "2013-05-12T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-7",
        title: "Small Blade: The Struggle for Trost, Part 3",
        number: 7,
        thumbnail: "https://i.ytimg.com/vi/l_KMn9K-sTk/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=l_KMn9K-sTk",
        releaseDate: "2013-05-19T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-8",
        title: "I Can Hear His Heartbeat: The Struggle for Trost, Part 4",
        number: 8,
        thumbnail: "https://i.ytimg.com/vi/c_aqVX0cIho/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=c_aqVX0cIho",
        releaseDate: "2013-05-26T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-9",
        title: "Whereabouts of His Left Arm: The Struggle for Trost, Part 5",
        number: 9,
        thumbnail: "https://i.ytimg.com/vi/h_u-a6zxTak/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=h_u-a6zxTak",
        releaseDate: "2013-06-02T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-10",
        title: "Response: The Struggle for Trost, Part 6",
        number: 10,
        thumbnail: "https://i.ytimg.com/vi/j_y3mppiPEE/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=j_y3mppiPEE",
        releaseDate: "2013-06-09T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-11",
        title: "Idol: The Struggle for Trost, Part 7",
        number: 11,
        thumbnail: "https://i.ytimg.com/vi/49lYHqWtZXA/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=49lYHqWtZXA",
        releaseDate: "2013-06-16T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-12",
        title: "Wound: The Struggle for Trost, Part 8",
        number: 12,
        thumbnail: "https://i.ytimg.com/vi/c2e9JTwYR9w/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=c2e9JTwYR9w",
        releaseDate: "2013-06-23T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-13",
        title: "Primal Desire: The Struggle for Trost, Part 9",
        number: 13,
        thumbnail: "https://i.ytimg.com/vi/jJc9tESNqWQ/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=jJc9tESNqWQ",
        releaseDate: "2013-06-30T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-14",
        title: "Can't Look into His Eyes Yet: Eve of the Counterattack, Part 1",
        number: 14,
        thumbnail: "https://i.ytimg.com/vi/vdKzXViJLv8/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=vdKzXViJLv8",
        releaseDate: "2013-07-07T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-15",
        title: "Special Ops Squad: Eve of the Counterattack, Part 2",
        number: 15,
        thumbnail: "https://i.ytimg.com/vi/MZtdwT-DTw0/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=MZtdwT-DTw0",
        releaseDate: "2013-07-14T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-16",
        title: "What Needs to Be Done: Eve of the Counterattack, Part 3",
        number: 16,
        thumbnail: "https://i.ytimg.com/vi/TrKwtzyNqQA/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=TrKwtzyNqQA",
        releaseDate: "2013-07-21T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-17",
        title: "Female Titan: The 57th Exterior Scouting Mission, Part 1",
        number: 17,
        thumbnail: "https://i.ytimg.com/vi/wG3ZThnjfVQ/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=wG3ZThnjfVQ",
        releaseDate: "2013-07-28T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-18",
        title: "Forest of Giant Trees: The 57th Exterior Scouting Mission, Part 2",
        number: 18,
        thumbnail: "https://i.ytimg.com/vi/yQc-OPsFKnI/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=yQc-OPsFKnI",
        releaseDate: "2013-08-04T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-19",
        title: "Bite: The 57th Exterior Scouting Mission, Part 3",
        number: 19,
        thumbnail: "https://i.ytimg.com/vi/CCWMo8nPOlQ/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=CCWMo8nPOlQ",
        releaseDate: "2013-08-11T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-20",
        title: "Erwin Smith: The 57th Exterior Scouting Mission, Part 4",
        number: 20,
        thumbnail: "https://i.ytimg.com/vi/a_mKn-sY-lY/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=a_mKn-sY-lY",
        releaseDate: "2013-08-18T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-21",
        title: "Crushing Blow: The 57th Exterior Scouting Mission, Part 5",
        number: 21,
        thumbnail: "https://i.ytimg.com/vi/y_O9TN-Wtps/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=y_O9TN-Wtps",
        releaseDate: "2013-08-25T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-22",
        title: "The Defeated: The 57th Exterior Scouting Mission, Part 6",
        number: 22,
        thumbnail: "https://i.ytimg.com/vi/5w-jk-QtJQY/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=5w-jk-QtJQY",
        releaseDate: "2013-09-01T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-23",
        title: "Smile: Assault on Stohess District, Part 1",
        number: 23,
        thumbnail: "https://i.ytimg.com/vi/QpJoK-v3ZtY/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=QpJoK-v3ZtY",
        releaseDate: "2013-09-08T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-24",
        title: "Mercy: Assault on Stohess District, Part 2",
        number: 24,
        thumbnail: "https://i.ytimg.com/vi/9L000JlFzQw/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=9L000JlFzQw",
        releaseDate: "2013-09-15T17:30:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkxNzEzNjY0NzQ=-ep-25",
        title: "Wall: Assault on Stohess District, Part 3",
        number: 25,
        thumbnail: "https://i.ytimg.com/vi/cRAGB-haytM/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=cRAGB-haytM",
        releaseDate: "2013-09-22T17:30:00Z"
      }
    ],
    genres: ["Action", "Drama", "Fantasy"],
    status: "ongoing",
    rating: 4.7,
    releaseYear: 2013,
    studio: "Wit Studio"
  },
  {
    id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=",
    title: "My Hero Academia",
    description: "In a world where people with superpowers are the norm, Izuku Midoriya dreams of becoming a hero despite being born without powers.",
    coverImage: "https://s4.anilist.co/file/anime/cover/large/bx21889-CCEJXFUb9j9z.jpg",
    bannerImage: "https://s4.anilist.co/file/anime/banner/21889-4bTG2P3Eoftw.jpg",
    episodes: [
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-1",
        title: "Izuku Midoriya: Origin",
        number: 1,
        thumbnail: "https://i.ytimg.com/vi/UmKj4KxSjmk/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=UmKj4KxSjmk",
        releaseDate: "2016-04-03T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-2",
        title: "What It Takes to Be a Hero",
        number: 2,
        thumbnail: "https://i.ytimg.com/vi/TjJ3jJ_jE3k/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=TjJ3jJ_jE3k",
        releaseDate: "2016-04-10T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-3",
        title: "Roaring Muscles",
        number: 3,
        thumbnail: "https://i.ytimg.com/vi/Qv-Fgemiw9o/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=Qv-Fgemiw9o",
        releaseDate: "2016-04-17T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-4",
        title: "Start Line",
        number: 4,
        thumbnail: "https://i.ytimg.com/vi/vYw4lkdQgdo/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=vYw4lkdQgdo",
        releaseDate: "2016-04-24T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-5",
        title: "What I Can Do for Now",
        number: 5,
        thumbnail: "https://i.ytimg.com/vi/fT9TPs6Q-jQ/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=fT9TPs6Q-jQ",
        releaseDate: "2016-05-01T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-6",
        title: "Rage, You Damn Nerd",
        number: 6,
        thumbnail: "https://i.ytimg.com/vi/maTFmiek5ZA/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=maTFmiek5ZA",
        releaseDate: "2016-05-08T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-7",
        title: "Deku vs. Kacchan",
        number: 7,
        thumbnail: "https://i.ytimg.com/vi/TjJ3jJ_jE3k/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=TjJ3jJ_jE3k",
        releaseDate: "2016-05-15T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-8",
        title: "Bakugo's Start Line",
        number: 8,
        thumbnail: "https://i.ytimg.com/vi/maTFmiek5ZA/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=maTFmiek5ZA",
        releaseDate: "2016-05-22T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-9",
        title: "Yeah, Let's Do Our Best!",
        number: 9,
        thumbnail: "https://i.ytimg.com/vi/UmKj4KxSjmk/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=UmKj4KxSjmk",
        releaseDate: "2016-05-29T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-10",
        title: "Encounter with the Unknown",
        number: 10,
        thumbnail: "https://i.ytimg.com/vi/TjJ3jJ_jE3k/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=TjJ3jJ_jE3k",
        releaseDate: "2016-06-05T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-11",
        title: "Game Over",
        number: 11,
        thumbnail: "https://i.ytimg.com/vi/maTFmiek5ZA/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=maTFmiek5ZA",
        releaseDate: "2016-06-12T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-12",
        title: "All Might",
        number: 12,
        thumbnail: "https://i.ytimg.com/vi/UmKj4KxSjmk/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=UmKj4KxSjmk",
        releaseDate: "2016-06-19T17:00:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkyMzQ2OTg3NjU=-ep-13",
        title: "In Each of Our Hearts",
        number: 13,
        thumbnail: "https://i.ytimg.com/vi/TjJ3jJ_jE3k/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=TjJ3jJ_jE3k",
        releaseDate: "2016-06-26T17:00:00Z"
      }
    ],
    genres: ["Action", "Adventure", "Sci-Fi"],
    status: "ongoing",
    rating: 4.6,
    releaseYear: 2016,
    studio: "Bones"
  },
  {
    id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=",
    title: "One-Punch Man",
    description: "Saitama, a hero who can defeat any enemy with a single punch, seeks to find a worthy opponent who can give him a challenge.",
    coverImage: "https://s4.anilist.co/file/anime/cover/large/bx21087-WdQSPyxQ3vpP.jpg",
    bannerImage: "https://s4.anilist.co/file/anime/banner/21087-5j9otfkoDKXk.jpg",
    episodes: [
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-1",
        title: "The Strongest Man",
        number: 1,
        thumbnail: "https://i.ytimg.com/vi/ROB-iJseJvo/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=ROB-iJseJvo",
        releaseDate: "2015-10-05T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-2",
        title: "The Solitary Cyborg",
        number: 2,
        thumbnail: "https://i.ytimg.com/vi/ECyBAiLWBWQ/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=ECyBAiLWBWQ",
        releaseDate: "2015-10-12T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-3",
        title: "The Obsessed Scientist",
        number: 3,
        thumbnail: "https://i.ytimg.com/vi/M-J2fhWjmdw/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=M-J2fhWjmdw",
        releaseDate: "2015-10-19T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-4",
        title: "The Modern Ninja",
        number: 4,
        thumbnail: "https://i.ytimg.com/vi/vrezjE8wdwU/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=vrezjE8wdwU",
        releaseDate: "2015-10-26T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-5",
        title: "The Ultimate Master",
        number: 5,
        thumbnail: "https://i.ytimg.com/vi/m1qG8LqG-ic/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=m1qG8LqG-ic",
        releaseDate: "2015-11-02T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-6",
        title: "The Terrifying City",
        number: 6,
        thumbnail: "https://i.ytimg.com/vi/a-XyGjPAlj4/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=a-XyGjPAlj4",
        releaseDate: "2015-11-09T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-7",
        title: "The Disciples Arrive",
        number: 7,
        thumbnail: "https://i.ytimg.com/vi/2hJROe-ixGY/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=2hJROe-ixGY",
        releaseDate: "2015-11-16T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-8",
        title: "The Deep Sea King",
        number: 8,
        thumbnail: "https://i.ytimg.com/vi/l-1myMl-md4/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=l-1myMl-md4",
        releaseDate: "2015-11-23T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-9",
        title: "Unyielding Justice",
        number: 9,
        thumbnail: "https://i.ytimg.com/vi/hnz-ihKRhE8/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=hnz-ihKRhE8",
        releaseDate: "2015-11-30T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-10",
        title: "Unparalleled Power",
        number: 10,
        thumbnail: "https://i.ytimg.com/vi/QmW_JjQODEE/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=QmW_JjQODEE",
        releaseDate: "2015-12-07T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-11",
        title: "The Dominator of Space",
        number: 11,
        thumbnail: "https://i.ytimg.com/vi/Xo9jKmaqJgw/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=Xo9jKmaqJgw",
        releaseDate: "2015-12-14T01:05:00Z"
      },
      {
        id: "MDEwOlJlcG9zaXRvcnkzMDU0MzI1NDY=-ep-12",
        title: "The Strongest Hero",
        number: 12,
        thumbnail: "https://i.ytimg.com/vi/rmbjE-jze7A/maxresdefault.jpg",
        duration: 24,
        videoUrl: "https://www.youtube.com/watch?v=rmbjE-jze7A",
        releaseDate: "2015-12-21T01:05:00Z"
      }
    ],
    genres: ["Action", "Comedy", "Sci-Fi"],
    status: "completed",
    rating: 4.8,
    releaseYear: 2015,
    studio: "Madhouse"
  },
  {
    id: "MDEwOlJlcG9zaXRvcnkzODk0NzE2NzQ=",
    title: "Hunter x Hunter",
    description: "Gon Freecss aspires to become a Hunter, an elite class of adventurers who are licensed to track down secret treasures, rare beasts, and even other individuals.",
    coverImage: "https://s4.anilist.co/file/anime/cover/large/bx11061-tf1PAb5Wj94W.jpg",
    bannerImage: "https://s4.anilist.co/file/anime/banner/11061-3SrVjRyFHljV.jpg",
    episodes: [
      {
        id: "MDEwOlJlcG9zaXRvcnkzODk0NzE2NzQ=-ep-1",
        title: "Departure x and x Friends",
        number: 1,
        thumbnail: "https://i.ytimg.com/vi/j2QIHR5cLGQ/maxresdefault.jpg",
        duration: 23,
        videoUrl: "https://www.youtube.com/watch?v=j2QIHR5cLGQ",
        releaseDate: "2011-10-02T10:30:00Z"
      }
    ],
    genres: ["Action", "Adventure", "Fantasy"],
    status: "ongoing",
    rating: 4.9,
    releaseYear: 2011,
    studio: "Madhouse"
  }
];

// Mock premium plans
const premiumPlans: PremiumPlan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 499,
    duration: 30, // in days
    features: [
      "Ad-free viewing",
      "HD streaming",
      "Watch on 1 device at a time",
    ]
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: 799,
    duration: 30,
    features: [
      "Ad-free viewing",
      "Full HD streaming",
      "Watch on 2 devices at a time",
      "Download for offline viewing"
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 1299,
    duration: 30,
    features: [
      "Ad-free viewing",
      "4K Ultra HD streaming",
      "Watch on 4 devices at a time",
      "Download for offline viewing",
      "Early access to new episodes"
    ]
  },
  {
    id: "annual",
    name: "Annual Plan",
    price: 7999,
    duration: 365,
    features: [
      "All Premium Plan features",
      "Save 35% compared to monthly",
      "Free merchandise voucher"
    ]
  }
];

// Mock payment data
let payments: PaymentStatus[] = [
  {
    id: "payment-001",
    userId: "user-001",
    planId: "premium",
    amount: 1299,
    paymentDate: "2023-08-15T10:30:00Z",
    status: "completed",
    paymentMethod: "Credit Card"
  },
  {
    id: "payment-002",
    userId: "user-002",
    planId: "standard",
    amount: 799,
    paymentDate: "2023-08-16T14:45:00Z",
    status: "pending",
    paymentMethod: "UPI"
  },
  {
    id: "payment-003",
    userId: "user-003",
    planId: "annual",
    amount: 7999,
    paymentDate: "2023-08-17T09:15:00Z",
    status: "pending",
    paymentMethod: "Net Banking"
  },
  {
    id: "payment-004",
    userId: "user-004",
    planId: "basic",
    amount: 499,
    paymentDate: "2023-08-17T11:30:00Z",
    status: "failed",
    paymentMethod: "Credit Card"
  },
  {
    id: "payment-005",
    userId: "user-005",
    planId: "premium",
    amount: 1299,
    paymentDate: "2023-08-18T16:20:00Z",
    status: "pending",
    paymentMethod: "UPI"
  }
];

// Get all anime
export { animeData, premiumPlans, payments };

// Get anime by ID
export const getAnimeById = (id: string): Anime | undefined => {
  return animeData.find(anime => anime.id === id);
};

// Get anime by title
export const getAnimeByTitle = (title: string): Anime | undefined => {
  return animeData.find(anime => anime.title.toLowerCase().includes(title.toLowerCase()));
};

// Get all genres
export const getAllGenres = (): string[] => {
  const genres = new Set<string>();
  animeData.forEach(anime => {
    anime.genres.forEach(genre => genres.add(genre));
  });
  return Array.from(genres).sort();
};

// Add new anime
export const addAnime = (anime: Anime): boolean => {
  try {
    animeData.push(anime);
    return true;
  } catch (error) {
    console.error("Error adding anime:", error);
    return false;
  }
};

// Update anime
export const updateAnime = (updatedAnime: Anime): boolean => {
  try {
    const index = animeData.findIndex(anime => anime.id === updatedAnime.id);
    if (index !== -1) {
      animeData[index] = updatedAnime;
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating anime:", error);
    return false;
  }
};

// Delete anime
export const deleteAnime = (id: string): boolean => {
  try {
    const initialLength = animeData.length;
    animeData = animeData.filter(anime => anime.id !== id);
    return animeData.length < initialLength;
  } catch (error) {
    console.error("Error deleting anime:", error);
    return false;
  }
};

// Get episode by anime ID and episode number
export const getEpisodeByNumber = (animeId: string, episodeNumber: number): Episode | undefined => {
  const anime = getAnimeById(animeId);
  if (!anime) return undefined;
  
  return anime.episodes.find(episode => episode.number === episodeNumber);
};

// Update payment status
export const updatePaymentStatus = (paymentId: string, newStatus: "pending" | "completed" | "failed"): PaymentStatus | null => {
  const index = payments.findIndex(p => p.id === paymentId);
  if (index === -1) return null;
  
  const payment = { ...payments[index], status: newStatus };
  payments[index] = payment;
  return payment;
};

// Get plan by ID
export const getPlanById = (planId: string): PremiumPlan | undefined => {
  return premiumPlans.find(plan => plan.id === planId);
};

// Create new payment
export const createPayment = (payment: PaymentStatus): PaymentStatus => {
  payments.push(payment);
  return payment;
};
