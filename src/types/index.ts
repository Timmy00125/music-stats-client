// API response structure
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string; // For messages like sync status
}

// User profile structure from backend
export interface UserProfile {
  user_id: string;
  spotify_user_id: string;
  spotify_display_name?: string;
  email?: string;
  // Add other fields if your /user/profile endpoint returns more
}

// Based on your insights.py and potential Spotify API responses
export interface TopArtistItem {
  artist_id: string;
  artist_name: string;
  listen_count?: number;
  rank?: number;
  genres?: string; // Comma-separated string
  popularity?: number;
  image_url?: string; // You might want to fetch this separately or ensure backend provides it
}

export interface TopTrackItem {
  track_id: string;
  track_name: string;
  artist_name: string;
  album_name?: string;
  listen_count?: number;
  rank?: number;
  popularity?: number;
  album_art_url?: string; // You might want to fetch this separately or ensure backend provides it
}

export interface TimeOfDayDistribution {
  morning: number;
  afternoon: number;
  evening: number;
  night: number;
}

export interface ListeningTimeStats {
  total_listening_hours: number;
  average_hours_per_day: number;
  days_of_data: number;
  earliest_listen?: string; // ISO date string
  latest_listen?: string; // ISO date string
}

export interface AudioFeaturesAverages {
  danceability: number;
  energy: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
}

export interface BasicInsights {
  total_tracks_listened: number;
  top_artists: TopArtistItem[];
  top_tracks: TopTrackItem[];
  listening_time_stats: ListeningTimeStats;
  listening_by_time_of_day: TimeOfDayDistribution;
  recent_favorites: TopTrackItem[];
  audio_features_averages: AudioFeaturesAverages;
}

export interface GenreDistributionItem {
  genre: string;
  score: number; // Or count, based on backend
}

export interface MonthlyListeningTrend {
  [monthYear: string]: number; // e.g., "2023-01": 150
}

export interface PopularityDistribution {
  mainstream: number;
  popular: number;
  mixed: number;
  niche: number;
  obscure: number;
}

export interface PopularVsObscureRatio {
  average_popularity: number;
  popularity_distribution: PopularityDistribution;
}

export interface MoodAnalysis {
  primary_mood: string;
  mood_indicators: {
    happiness: number;
    energy: number;
    danceability: number;
    calmness: number;
  };
  mood_quadrant_values: {
    valence: number;
    energy: number;
  };
}

export interface DetailedInsights extends BasicInsights {
  genre_distribution: GenreDistributionItem[];
  listening_trends_by_month: MonthlyListeningTrend;
  popular_vs_obscure: PopularVsObscureRatio;
  mood_analysis: MoodAnalysis;
}

// For Chart.js components
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    [key: string]: any; // Allow other Chart.js dataset options
  }[];
}

export interface ChartOptions {
  [key: string]: any; // Allow any Chart.js options
}
