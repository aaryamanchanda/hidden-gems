import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: number;
}

export function StarRating({ value, onChange, readonly = false, size = 18 }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={`transition-transform ${!readonly && "hover:scale-110 cursor-pointer"} disabled:cursor-default`}
        >
          <Star
            size={size}
            className={`transition-colors ${
              star <= display
                ? "fill-[#fbbf24] text-[#fbbf24]"
                : "text-gray-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
