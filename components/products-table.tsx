"use client"

import Image from "next/image"
import { Delete, Edit, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { deleteProduct, editProduct, Product } from "@/actions/products"
import { ProductStatusBadge } from "@/components/product-status-badge"
import { NumberParam, StringParam, useQueryParams } from "use-query-params"
import EditProductDialog from "./dialogs/edit-product-dialog"
import DeleteProductDialog from "./dialogs/delete-product-dialog"

interface ProductTableProps {
  products: Product[]
}


export default function ProductTable({ products }: ProductTableProps) {

  const [activeProduct, setActiveProduct] = useQueryParams({
    product_id: NumberParam,
    mode: StringParam,
  })

  const triggerParamChange = (open?: boolean, mode?: string, product_id?: number) => {
    if (open === undefined) {
      return setActiveProduct({ product_id, mode })
    }

    if (!open) {
      return setActiveProduct({ product_id: null, mode: null })
    }
  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Quantity Left
              </TableHead>
              <TableHead className="hidden md:table-cell">Expiry Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              products.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    <h2 className="font-medium text-xl">No products found</h2>
                  </TableCell>
                </TableRow>
              ) :               
              products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="44"
                    src={product.image || "/placeholder.png"}
                    width="44"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {product.name}
                </TableCell>
                <TableCell>
                  <ProductStatusBadge quantityLeft={product.quantity_left} />
                </TableCell>
                <TableCell className="hidden md:table-cell">${product.price}</TableCell>
                <TableCell className="hidden md:table-cell">{product.quantity_left}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.expiry_date}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => triggerParamChange(undefined, "edit", product.id)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => triggerParamChange(undefined, "delete", product.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <DeleteProductDialog 
                  open={activeProduct.mode === "delete"} 
                  onChange={triggerParamChange}
                  productId={activeProduct.product_id!}
                />


                <EditProductDialog 
                  open={activeProduct.mode === "edit"} 
                  onChange={triggerParamChange}
                  product={products.find((product) => product.id === activeProduct.product_id!)!}
                />
              </TableRow>
            ))}

            
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{Math.min(10, products.length)}</strong> of <strong>{products.length}</strong> products
        </div>
      </CardFooter>


      




    </Card>
  )
}