import {
  ApiResponse,
  UserProfile,
  BasicInsights,
  DetailedInsights,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_V1_PREFIX = "/api/v1";

async function fetchWithCredentials<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_V1_PREFIX}${endpoint}`, {
      ...options,
      credentials: "include", // Important for cookie handling
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON
        errorData = {
          detail: response.statusText || "An unknown error occurred",
        };
      }
      return { error: errorData.detail || "An error occurred" };
    }

    // For 204 No Content or similar, response.json() will fail
    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return { data: undefined }; // Or an appropriate empty state for T
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    if (error instanceof Error) {
      return { error: error.message || "Network error or service unavailable" };
    }
    return { error: "Network error or service unavailable" };
  }
}

// Auth
export const getUserProfile = () =>
  fetchWithCredentials<UserProfile>("/user/profile");
export const logoutUser = () =>
  fetchWithCredentials<any>("/auth/logout", { method: "POST" });

// Data Sync
export const syncUserData = () =>
  fetchWithCredentials<{ message: string }>("/data/sync", { method: "POST" });

// Insights
export const getBasicInsights = () =>
  fetchWithCredentials<BasicInsights>("/insights/basic");
export const getDetailedInsights = () =>
  fetchWithCredentials<DetailedInsights>("/insights/detailed");

// Example of how you might fetch an image if the backend doesn't provide full URLs
// This is a placeholder; actual implementation depends on your backend/Spotify API proxy
export const getArtistImageUrl = (artistId: string): string => {
  // Replace with actual logic if needed, or ensure backend provides full URLs
  return `https://via.placeholder.com/150/1DB954/191414?text=Artist`;
};

export const getTrackAlbumArtUrl = (trackId: string): string => {
  // Replace with actual logic
  return `https://via.placeholder.com/150/1DB954/191414?text=Track`;
};
