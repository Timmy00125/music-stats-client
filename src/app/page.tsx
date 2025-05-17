"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { checkAuthentication, SPOTIFY_LOGIN_URL } from "@/lib/auth";
import { Icons } from "@/components/icons"; // You'll need to create this for a Spotify icon

// Create this file for SVG icons
// components/icons.tsx
// export const Icons = {
//   spotify: (props: React.SVGProps<SVGSVGElement>) => (
//     <svg fill="currentColor" viewBox="0 0 168 168" {...props}>...</svg> // Add Spotify SVG path
//   ),
//   spinner: (props: React.SVGProps<SVGSVGElement>) => (
//    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
//   ),
// };

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuthentication();
      if (isAuthenticated) {
        router.replace("/dashboard");
      } else {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-spotify-black">
        {/* <Icons.spinner className="h-12 w-12 animate-spin text-spotify-green" /> */}
        <p className="text-spotify-white text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-spotify-black p-6 text-center">
      {/* <Icons.spotify className="h-24 w-24 text-spotify-green mb-8" /> */}
      <h1 className="text-5xl font-bold text-spotify-white mb-4">
        Music Stats
      </h1>
      <p className="text-xl text-spotify-lightgray mb-10">
        Discover your listening habits on Spotify.
      </p>
      <Button
        size="lg"
        className="bg-spotify-green hover:bg-green-500 text-spotify-black font-semibold py-4 px-8 rounded-full text-lg"
        onClick={() => (window.location.href = SPOTIFY_LOGIN_URL)}
      >
        {/* <Icons.spotify className="h-6 w-6 mr-2" /> */}
        Log in with Spotify
      </Button>
      <footer className="absolute bottom-8 text-spotify-lightgray text-sm">
        Connect your Spotify account to see your personalized statistics.
      </footer>
    </div>
  );
}
