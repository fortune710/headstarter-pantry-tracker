import { Badge } from "@/components/ui/badge"
import { Status } from "@/utils/constants"

interface ProductStatusBadgeProps {
  quantityLeft: number
}

export function ProductStatusBadge({ quantityLeft }: ProductStatusBadgeProps) {
  if (quantityLeft === Status.OUT_OF_STOCK) {
    return <Badge variant="destructive">Out of Stock</Badge>
  } else if (quantityLeft <= Status.IN_STOCK) {
    return <Badge variant="outline">Low Stock</Badge>
  } else if (quantityLeft > Status.IN_STOCK) {
    return <Badge variant="default">In Stock</Badge>
  } else {
    return <Badge variant="default">In Stock</Badge>
  }
}