// This is a simplified client-side auth check.
// For HttpOnly cookies, the most reliable check is to try fetching protected data.
import { getUserProfile } from "./api";

export const SPOTIFY_LOGIN_URL = `${
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
}/api/v1/auth/login`;

export const checkAuthentication = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;

  // Attempt to fetch user profile. If successful, user is authenticated.
  const response = await getUserProfile();
  return !!response.data; // True if data exists, false if error or no data
};

export const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.href = SPOTIFY_LOGIN_URL;
  }
};
