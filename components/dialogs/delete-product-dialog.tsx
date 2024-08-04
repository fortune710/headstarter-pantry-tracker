import { deleteProduct } from "@/actions/products";
import { ProductDialogProps } from "./types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface DeleteProductDialogProps extends ProductDialogProps {
    productId: number
}

export default function DeleteProductDialog({ open, onChange, productId }: DeleteProductDialogProps) {
    return (
        <AlertDialog 
            onOpenChange={onChange} 
            open={open}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to delete this product?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction 
                        className="bg-red-600"
                        onClick={() => deleteProduct(productId)}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}