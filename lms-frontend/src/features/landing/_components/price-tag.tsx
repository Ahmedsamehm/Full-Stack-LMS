interface PriceTagProps {
  price: number
  originalPrice?: number
}

export default function PriceTag({ price, originalPrice }: PriceTagProps) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-bold text-foreground">${price}</span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
      )}
    </div>
  )
}
