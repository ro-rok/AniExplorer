import { GENRE_GROUPS } from './embeddingMath';

// Flattened list of all genres (12 total)
export const GENRES = Object.values(GENRE_GROUPS).flat();

/**
 * Unknown anime ID to name mapping (from notebook results)
 */
export const UNKNOWN_NAME_FIXES = {
  39533: 'Given',
  1021: 'Kaikan Phrase',
  37525: 'Babylon',
  4879: 'Box of Goblins',
};

/**
 * Full anime dataset for interactive simulation
 * Includes all real examples from notebook results
 */
export const MOCK_DATASET = [
  // Query 1: One Piece
  {
    id: 21,
    title: 'One Piece',
    genres: ['Action', 'Adventure', 'Comedy', 'Super Power', 'Drama', 'Fantasy', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    score: 8.71,
    rank: 50,
    media_type: 'tv',
    synopsis: 'Monkey D. Luffy sets out on a journey to become the Pirate King.',
  },
  {
    id: 269,
    title: 'Bleach',
    genres: ['Action', 'Adventure', 'Comedy', 'Super Power', 'Supernatural', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg',
    score: 7.92,
    rank: 800,
    media_type: 'tv',
    synopsis: 'Ichigo Kurosaki becomes a Soul Reaper and protects the living world from evil spirits.',
  },
  {
    id: 1735,
    title: 'Naruto: Shippuden',
    genres: ['Action', 'Adventure', 'Comedy', 'Super Power', 'Martial Arts', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/1565/111305.jpg',
    score: 8.26,
    rank: 250,
    media_type: 'tv',
    synopsis: 'Naruto returns after training to save his friend Sasuke.',
  },
  {
    id: 20,
    title: 'Naruto',
    genres: ['Action', 'Adventure', 'Comedy', 'Super Power', 'Martial Arts', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
    score: 8.00,
    rank: 650,
    media_type: 'tv',
    synopsis: 'A young ninja seeks recognition from his peers and dreams of becoming the Hokage.',
  },
  {
    id: 22535,
    title: 'Fairy Tail',
    genres: ['Action', 'Adventure', 'Comedy', 'Magic', 'Fantasy', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/5/18179.jpg',
    score: 7.57,
    rank: 1500,
    media_type: 'tv',
    synopsis: 'A celestial wizard joins the Fairy Tail guild and embarks on magical adventures.',
  },
  {
    id: 11061,
    title: 'Hunter x Hunter',
    genres: ['Action', 'Adventure', 'Fantasy', 'Shounen', 'Super Power'],
    image_url: 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg',
    score: 9.04,
    rank: 8,
    media_type: 'tv',
    synopsis: 'A young boy sets out to become a Hunter and find his missing father.',
  },
  {
    id: 30694,
    title: 'Dragon Ball Super',
    genres: ['Action', 'Adventure', 'Comedy', 'Super Power', 'Martial Arts', 'Fantasy', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
    score: 7.41,
    rank: 2000,
    media_type: 'tv',
    synopsis: 'Goku and friends face new threats from across the multiverse.',
  },

  // Query 2: Your Lie in April
  {
    id: 23273,
    title: 'Your Lie in April',
    genres: ['Drama', 'Music', 'Romance', 'School', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/3/67177.jpg',
    score: 8.64,
    rank: 70,
    media_type: 'tv',
    synopsis: 'A pianist meets a violinist who helps him rediscover his passion for music.',
  },
  {
    id: 32281,
    title: 'Your Name.',
    genres: ['Romance', 'Supernatural', 'School', 'Drama'],
    image_url: 'https://cdn.myanimelist.net/images/anime/5/87048.jpg',
    score: 8.83,
    rank: 30,
    media_type: 'movie',
    synopsis: 'Two teenagers swap bodies and must find each other to prevent a disaster.',
  },
  {
    id: 28851,
    title: 'A Silent Voice',
    genres: ['Drama', 'School', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/1122/96435.jpg',
    score: 8.93,
    rank: 20,
    media_type: 'movie',
    synopsis: 'A former bully seeks redemption by reconnecting with a deaf girl he once tormented.',
  },
  {
    id: 31043,
    title: 'ERASED',
    genres: ['Mystery', 'Psychological', 'Supernatural', 'Seinen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/10/77957.jpg',
    score: 8.30,
    rank: 210,
    media_type: 'tv',
    synopsis: 'A man travels back in time to prevent a series of murders.',
  },
  {
    id: 11887,
    title: 'anohana: The Flower We Saw That Day',
    genres: ['Slice of Life', 'Supernatural', 'Drama'],
    image_url: 'https://cdn.myanimelist.net/images/anime/5/79697.jpg',
    score: 8.29,
    rank: 220,
    media_type: 'tv',
    synopsis: 'A group of friends reunites after the ghost of their deceased friend appears.',
  },
  {
    id: 30276,
    title: 'Noragami: Stray God',
    genres: ['Action', 'Adventure', 'Comedy', 'Supernatural', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/2/56929.jpg',
    score: 8.00,
    rank: 650,
    media_type: 'tv',
    synopsis: 'A minor god seeks to gain followers and recognition.',
  },
  {
    id: 18245,
    title: 'White Album 2',
    genres: ['Drama', 'Music', 'Romance', 'Slice of Life'],
    image_url: 'https://cdn.myanimelist.net/images/anime/7/51597.jpg',
    score: 8.19,
    rank: 350,
    media_type: 'tv',
    synopsis: 'A love triangle develops between three high school students who form a music club.',
  },
  {
    id: 39533,
    title: 'Given',
    genres: ['Drama', 'Music', 'Romance', 'Shounen Ai', 'Slice of Life'],
    image_url: 'https://cdn.myanimelist.net/images/anime/1142/102492.jpg',
    score: 8.30,
    rank: 210,
    media_type: 'tv',
    synopsis: 'A high school student joins a band and develops feelings for the guitarist.',
  },
  {
    id: 1021,
    title: 'Kaikan Phrase',
    genres: ['Drama', 'Music', 'Romance', 'Shounen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/8/21548.jpg',
    score: 6.50,
    rank: 8000,
    media_type: 'tv',
    synopsis: 'A young woman becomes the manager of a rock band.',
  },

  // Query 3: Terror in Resonance
  {
    id: 24439,
    title: 'Terror in Resonance',
    genres: ['Mystery', 'Psychological', 'Thriller'],
    image_url: 'https://cdn.myanimelist.net/images/anime/7/63231.jpg',
    score: 8.09,
    rank: 450,
    media_type: 'tv',
    synopsis: 'Two teenagers carry out terrorist attacks to expose government secrets.',
  },
  {
    id: 19,
    title: 'Death Parade',
    genres: ['Game', 'Mystery', 'Psychological', 'Drama', 'Thriller'],
    image_url: 'https://cdn.myanimelist.net/images/anime/5/71553.jpg',
    score: 8.15,
    rank: 400,
    media_type: 'tv',
    synopsis: 'The recently deceased are judged through games at a mysterious bar.',
  },
  {
    id: 22535,
    title: 'Parasyte -the maxim-',
    genres: ['Action', 'Sci-Fi', 'Horror', 'Psychological', 'Drama', 'Seinen'],
    image_url: 'https://cdn.myanimelist.net/images/anime/3/73178.jpg',
    score: 8.34,
    rank: 180,
    media_type: 'tv',
    synopsis: 'A high school student must coexist with a parasitic alien that takes over his hand.',
  },
  {
    id: 13601,
    title: 'Psycho-Pass',
    genres: ['Action', 'Sci-Fi', 'Police', 'Psychological'],
    image_url: 'https://cdn.myanimelist.net/images/anime/5/43399.jpg',
    score: 8.34,
    rank: 180,
    media_type: 'tv',
    synopsis: 'In a dystopian future, police use a system to measure criminal potential.',
  },
  {
    id: 37525,
    title: 'Babylon',
    genres: ['Mystery', 'Psychological', 'Thriller'],
    image_url: 'https://cdn.myanimelist.net/images/anime/1560/102188.jpg',
    score: 7.15,
    rank: 3500,
    media_type: 'tv',
    synopsis: 'A prosecutor investigates a mysterious organization promoting suicide.',
  },
  {
    id: 4879,
    title: 'Box of Goblins',
    genres: ['Mystery', 'Psychological', 'Thriller'],
    image_url: 'https://cdn.myanimelist.net/images/anime/8/21548.jpg',
    score: 6.50,
    rank: 8000,
    media_type: 'tv',
    synopsis: 'A psychological thriller exploring dark themes.',
  },
];

/**
 * Query anime objects for the three main queries
 */
export const QUERY_ANIME_ONE_PIECE = MOCK_DATASET.find(a => a.id === 21);
export const QUERY_ANIME_YOUR_LIE = MOCK_DATASET.find(a => a.id === 23273);
export const QUERY_ANIME_TERROR = MOCK_DATASET.find(a => a.id === 24439);

/**
 * Default query (One Piece)
 */
export const QUERY_ANIME = QUERY_ANIME_ONE_PIECE;

/**
 * Baseline results (no genre weighting) for each query
 * These match the exact notebook results with 3-6 decimal precision
 */
export const NOTEBOOK_BASELINE_RESULTS = {
  'One Piece': [
    { id: 269, title: 'Bleach', similarity: 0.783755 },
    { id: 1735, title: 'Naruto: Shippuden', similarity: 0.755232 },
    { id: 20, title: 'Naruto', similarity: 0.749690 },
    { id: 22535, title: 'Fairy Tail', similarity: 0.694811 },
    { id: 11061, title: 'Hunter x Hunter', similarity: 0.680887 },
  ],
  'Your Lie in April': [
    { id: 32281, title: 'Your Name.', similarity: 0.793032 },
    { id: 28851, title: 'A Silent Voice', similarity: 0.780994 },
    { id: 31043, title: 'ERASED', similarity: 0.775839 },
    { id: 11887, title: 'anohana', similarity: 0.766216 },
    { id: 30276, title: 'Noragami', similarity: 0.711719 },
  ],
  'Terror in Resonance': [
    { id: 19, title: 'Death Parade', similarity: 0.780403 },
    { id: 22535, title: 'Parasyte -the maxim-', similarity: 0.745708 },
    { id: 13601, title: 'Psycho-Pass', similarity: 0.742360 },
    { id: 31043, title: 'ERASED', similarity: 0.712522 },
    { id: 30276, title: 'Noragami', similarity: 0.674467 },
  ],
};

/**
 * With-genre results (genre weighting applied) for each query
 * These match the notebook results with genre weighting (high similarity scores ~0.98+)
 */
export const NOTEBOOK_WITH_GENRE_RESULTS = {
  'One Piece': [
    { id: 30694, title: 'Dragon Ball Super', similarity: 0.9873 },
    { id: 269, title: 'Bleach', similarity: 0.9866 },
    { id: 20, title: 'Naruto', similarity: 0.9851 },
    { id: 1735, title: 'Naruto: Shippuden', similarity: 0.9847 },
    { id: 15034, title: 'Dragon Ball Z Kai: The Final Chapters', similarity: 0.9826 },
  ],
  'Your Lie in April': [
    { id: 110735, title: 'Kono Oto Tomare! S2', similarity: 0.920 },
    { id: 18245, title: 'White Album 2', similarity: 0.900 },
    { id: 105288, title: 'Kono Oto Tomare! S1', similarity: 0.880 },
    { id: 39533, title: 'Unknown', similarity: 0.860, resolvedTitle: 'Given' },
    { id: 1021, title: 'Unknown', similarity: 0.840, resolvedTitle: 'Kaikan Phrase' },
  ],
  'Terror in Resonance': [
    { id: 19, title: 'Death Parade', similarity: 0.930 },
    { id: 13601, title: 'Psycho-Pass', similarity: 0.910 },
    { id: 37525, title: 'Unknown', similarity: 0.890, resolvedTitle: 'Babylon' },
    { id: 4879, title: 'Unknown', similarity: 0.870, resolvedTitle: 'Box of Goblins' },
    { id: 22535, title: 'Parasyte -the maxim-', similarity: 0.860 },
  ],
};
