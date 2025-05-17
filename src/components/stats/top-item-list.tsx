import { TopArtistItem, TopTrackItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image"; // For displaying images if available
import { getArtistImageUrl, getTrackAlbumArtUrl } from "@/lib/api"; // Placeholder image URLs
import { cn } from "@/lib/utils";

interface TopItemsListProps<T extends TopArtistItem | TopTrackItem> {
  title: string;
  items: T[] | undefined;
  itemType: "artist" | "track";
  isLoading: boolean;
}

export function TopItemsList<T extends TopArtistItem | TopTrackItem>({
  title,
  items,
  itemType,
  isLoading,
}: TopItemsListProps<T>) {
  if (isLoading) {
    return (
      <Card className="bg-spotify-gray border-spotify-black text-spotify-white">
        <CardHeader>
          <CardTitle className="text-spotify-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-spotify-black animate-pulse rounded-md"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Card className="bg-spotify-gray border-spotify-black text-spotify-white">
        <CardHeader>
          <CardTitle className="text-spotify-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-spotify-lightgray">No data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-spotify-gray border-spotify-black text-spotify-white">
      <CardHeader>
        <CardTitle className="text-spotify-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={
                itemType === "artist"
                  ? (item as TopArtistItem).artist_id
                  : (item as TopTrackItem).track_id
              }
              className="flex items-center space-x-3 p-2 hover:bg-spotify-black rounded-md transition-colors"
            >
              <span className="text-sm font-semibold text-spotify-lightgray w-6 text-center">
                {index + 1}.
              </span>
              {/* Placeholder for image - replace with actual image if available */}
              <Image
                src={
                  itemType === "artist"
                    ? getArtistImageUrl((item as TopArtistItem).artist_id)
                    : getTrackAlbumArtUrl((item as TopTrackItem).track_id)
                }
                alt={
                  itemType === "artist"
                    ? (item as TopArtistItem).artist_name
                    : (item as TopTrackItem).track_name
                }
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <p className="text-sm font-medium text-spotify-white truncate">
                  {itemType === "artist"
                    ? (item as TopArtistItem).artist_name
                    : (item as TopTrackItem).track_name}
                </p>
                {itemType === "track" && (
                  <p className="text-xs text-spotify-lightgray truncate">
                    {(item as TopTrackItem).artist_name}
                  </p>
                )}
              </div>
              {item.listen_count && (
                <span className="ml-auto text-xs text-spotify-lightgray">
                  {item.listen_count} plays
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
