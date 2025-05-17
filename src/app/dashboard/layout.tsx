"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutUser, syncUserData } from "@/lib/api";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { UserProfile } from "@/types"; // Assuming UserProfile type is defined

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: UserProfile; // User passed from page
}

export default function DashboardLayout({
  children,
  user,
}: DashboardLayoutProps) {
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/"); // Redirect to login page
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    const response = await syncUserData();
    if (response.data?.message) {
      setSyncMessage(response.data.message);
      // Optionally, refresh data on the page or prompt user
      // window.location.reload(); // Simple way to refresh
    } else if (response.error) {
      setSyncMessage(`Sync failed: ${response.error}`);
    }
    setIsSyncing(false);
    setTimeout(() => setSyncMessage(null), 5000); // Clear message after 5s
  };

  return (
    <div className="min-h-screen flex flex-col bg-spotify-black">
      <header className="bg-spotify-gray shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Icons.spotify className="h-8 w-8 text-spotify-green" />
              <h1 className="ml-3 text-xl font-semibold text-spotify-white">
                Music Stats Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              {user && (
                <span className="text-sm text-spotify-lightgray hidden sm:block">
                  Hi, {user.spotify_display_name || user.user_id}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSync}
                disabled={isSyncing}
                className="text-spotify-lightgray hover:text-spotify-white hover:bg-spotify-black"
              >
                {isSyncing ? (
                  <Icons.spinner className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Icons.sync className="h-4 w-4 mr-2" />
                )}
                Sync Data
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-spotify-lightgray hover:text-spotify-white hover:bg-spotify-black"
              >
                <Icons.logout className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          {syncMessage && (
            <div
              className={`text-center py-1 text-xs ${
                syncMessage.includes("failed")
                  ? "bg-red-700"
                  : "bg-spotify-green"
              } text-spotify-white`}
            >
              {syncMessage}
            </div>
          )}
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-spotify-lightgray border-t border-spotify-gray">
        Music Stats &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
