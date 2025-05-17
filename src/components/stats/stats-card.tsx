import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // shadcn/ui
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  className,
}) => {
  return (
    <Card
      className={cn(
        "bg-spotify-gray border-spotify-black text-spotify-white",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-spotify-lightgray">
          {title}
        </CardTitle>
        {icon && <div className="text-spotify-green">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-spotify-white">{value}</div>
        {description && (
          <p className="text-xs text-spotify-lightgray pt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
