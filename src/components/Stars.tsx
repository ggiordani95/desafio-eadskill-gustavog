import { Star } from "lucide-react";

export const Stars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const fraction = rating % 1;
  const emptyStars = 5 - fullStars - (fraction > 0 ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="text-yellow-400 fill-yellow-400"
          size={24}
        />
      ))}
      {fraction > 0 && (
        <div className="relative w-6 h-6">
          <Star className="text-gray-300 fill-gray-300 absolute" size={24} />
          <div
            className="absolute overflow-hidden"
            style={{ width: `${fraction * 100}%` }}
          >
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
          </div>
        </div>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="text-gray-300 fill-gray-300"
          size={24}
        />
      ))}
    </div>
  );
};
