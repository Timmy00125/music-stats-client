"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DetailedInsights, UserProfile } from "@/types";
import { getDetailedInsights, getUserProfile } from "@/lib/api";
import { checkAuthentication, redirectToLogin } from "@/lib/auth";
import DashboardLayout from "./layout"; // Import the layout
import { StatCard } from "@/components/stats/stats-card";
import { TopItemsList } from "@/components/stats/top-item-list";
import { BarChart } from "@/components/charts/bar-chart";
import { PieChart } from "@/components/charts/pie-chart";
import { LineChart } from "@/components/charts/line-chart";
import { Icons } from "@/components/icons";
import { formatNumber, formatDate } from "@/lib/utils";
import { ChartData, ChartOptions } from "chart.js";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [insights, setInsights] = useState<DetailedInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        redirectToLogin();
        return;
      }

      try {
        const userProfileRes = await getUserProfile();
        if (userProfileRes.data) {
          setUser(userProfileRes.data);
        } else {
          throw new Error(
            userProfileRes.error || "Failed to fetch user profile"
          );
        }

        const insightsRes = await getDetailedInsights();
        if (insightsRes.data) {
          setInsights(insightsRes.data);
        } else {
          throw new Error(insightsRes.error || "Failed to fetch insights");
        }
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred");
        console.error("Dashboard fetch error:", e);
        // Optional: redirect to login if auth fails mid-way, or show error
        // if (e.message.includes("auth") || e.message.includes("401")) redirectToLogin();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <DashboardLayout user={user ?? undefined}>
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <Icons.spinner className="h-16 w-16 animate-spin text-spotify-green" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout user={user ?? undefined}>
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Error loading dashboard
          </h2>
          <p className="text-spotify-lightgray">{error}</p>
          <p className="text-spotify-lightgray mt-2">
            Please try refreshing the page or logging in again.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!insights) {
    return (
      <DashboardLayout user={user ?? undefined}>
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-spotify-white mb-4">
            No insights data available.
          </h2>
          <p className="text-spotify-lightgray">
            Try syncing your data from the header button.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // Prepare chart data
  const listeningTimeByMonthData: ChartData<"line"> = {
    labels: Object.keys(insights.listening_trends_by_month || {}),
    datasets: [
      {
        label: "Tracks Listened",
        data: Object.values(insights.listening_trends_by_month || {}),
        borderColor: "#1DB954", // Spotify Green
        backgroundColor: "rgba(29, 185, 84, 0.2)",
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const genreDistributionData: ChartData<"pie"> = {
    labels: insights.genre_distribution?.map((g) => g.genre) || [],
    datasets: [
      {
        label: "Genre Distribution",
        data: insights.genre_distribution?.map((g) => g.score) || [],
        backgroundColor: [
          // Add more colors if needed
          "#1DB954",
          "#1ED760",
          "#28B48C",
          "#30A3A3",
          "#388DAE",
          "#4078B9",
          "#4862C4",
          "#504DCF",
          "#5837DA",
          "#6022E5",
        ],
        borderColor: "#191414", // Spotify Black for border
        borderWidth: 2,
      },
    ],
  };

  const listeningByTimeOfDayData: ChartData<"bar"> = {
    labels: ["Morning", "Afternoon", "Evening", "Night"],
    datasets: [
      {
        label: "Tracks Played",
        data: [
          insights.listening_by_time_of_day?.morning || 0,
          insights.listening_by_time_of_day?.afternoon || 0,
          insights.listening_by_time_of_day?.evening || 0,
          insights.listening_by_time_of_day?.night || 0,
        ],
        backgroundColor: "#1DB954",
        borderColor: "#1ED760",
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardLayout user={user ?? undefined}>
      <div className="space-y-6">
        {/* Overview Stats */}
        <section>
          <h2 className="text-2xl font-semibold text-spotify-white mb-4">
            Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              title="Total Listening Hours"
              value={formatNumber(
                insights.listening_time_stats?.total_listening_hours || 0
              )}
              description={`Avg ${formatNumber(
                insights.listening_time_stats?.average_hours_per_day || 0
              )} hrs/day`}
            />
            <StatCard
              title="Total Tracks Listened"
              value={formatNumber(insights.total_tracks_listened || 0)}
              description={`Over ${
                insights.listening_time_stats?.days_of_data || 0
              } days`}
            />
            <StatCard
              title="Data Since"
              value={formatDate(insights.listening_time_stats?.earliest_listen)}
              description={`Last listen: ${formatDate(
                insights.listening_time_stats?.latest_listen
              )}`}
            />
          </div>
        </section>

        {/* Top Items */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TopItemsList
            title="Your Top Artists"
            items={insights.top_artists?.slice(0, 5)}
            itemType="artist"
            isLoading={isLoading}
          />
          <TopItemsList
            title="Your Top Tracks"
            items={insights.top_tracks?.slice(0, 5)}
            itemType="track"
            isLoading={isLoading}
          />
        </section>

        {/* Recent Favorites - could be another TopItemsList or specific component */}
        {insights.recent_favorites && insights.recent_favorites.length > 0 && (
          <section>
            <TopItemsList
              title="Recent Favorites (Last 30 Days)"
              items={insights.recent_favorites.slice(0, 5)}
              itemType="track"
              isLoading={isLoading}
            />
          </section>
        )}

        {/* Charts Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-spotify-white mb-4">
            Visual Insights
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.listening_trends_by_month &&
              Object.keys(insights.listening_trends_by_month).length > 0 && (
                <LineChart
                  titleText="Listening Trends by Month"
                  data={listeningTimeByMonthData}
                />
              )}
            {insights.genre_distribution &&
              insights.genre_distribution.length > 0 && (
                <PieChart
                  titleText="Genre Distribution (from Top Artists)"
                  data={genreDistributionData}
                  options={{ cutout: "50%" }}
                />
              )}
          </div>
          {insights.listening_by_time_of_day && (
            <div className="mt-6">
              {" "}
              {/* Added mt-6 for spacing if it's a single chart in a row */}
              <BarChart
                titleText="Most Active Listening Times"
                data={listeningByTimeOfDayData}
              />
            </div>
          )}
        </section>

        {/* More Detailed Insights Cards */}
        <section>
          <h2 className="text-2xl font-semibold text-spotify-white my-4">
            Deeper Dive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              title="Primary Mood"
              value={insights.mood_analysis?.primary_mood || "N/A"}
              description={`Energy: ${insights.mood_analysis?.mood_indicators.energy.toFixed(
                2
              )}, Happiness: ${insights.mood_analysis?.mood_indicators.happiness.toFixed(
                2
              )}`}
            />
            <StatCard
              title="Music Popularity"
              value={
                insights.popular_vs_obscure?.average_popularity.toFixed(1) +
                  " / 100" || "N/A"
              }
              description={`Mainstream: ${insights.popular_vs_obscure?.popularity_distribution.mainstream}, Obscure: ${insights.popular_vs_obscure?.popularity_distribution.obscure}`}
            />
            <StatCard
              title="Avg. Danceability"
              value={
                insights.audio_features_averages?.danceability.toFixed(2) ||
                "N/A"
              }
              description={`Avg. Energy: ${insights.audio_features_averages?.energy.toFixed(
                2
              )}`}
            />
          </div>
        </section>

        {/* Raw Data for Debug (Optional) */}
        {/* <section>
          <details className="text-spotify-lightgray">
            <summary className="cursor-pointer text-spotify-white">Show Raw Insights Data (for debugging)</summary>
            <pre className="bg-spotify-gray p-4 rounded-md mt-2 text-xs overflow-x-auto">
              {JSON.stringify(insights, null, 2)}
            </pre>
          </details>
        </section> */}
      </div>
    </DashboardLayout>
  );
}
