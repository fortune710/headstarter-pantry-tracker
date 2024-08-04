import { editProduct, Product } from "@/actions/products";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { ProductDialogProps } from "./types";

interface EditProductDialogProps extends ProductDialogProps {
    product: Product;
}


export default function EditProductDialog({ open, onChange, product }: EditProductDialogProps) {
    const { toast } = useToast();

    const handleSubmit = async (formData: FormData) => {
        try {
            await editProduct(formData, product.id);
            return toast({
                title: "Product edited",
                description: "Product edit successfully",
                variant: "default"
            })
        } catch (error) {
            return toast({
                title: "Error",
                description: "Error editing product",
                variant: "destructive"
            })
        }
    }
    
    
    return (
        <AlertDialog 
            onOpenChange={onChange} 
            open={open}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Product</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter the new data for this product
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                defaultValue={product?.price}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="quantity_left">Quantity Left</Label>
                            <Input
                                type="number"
                                id="quantity_left"
                                name="quantity_left"
                                defaultValue={product?.quantity_left}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                                type="date"
                                id="expiry_date"
                                name="expiry_date"
                                defaultValue={product?.expiry_date}
                            />
                        </div>

                    </div>


                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        <AlertDialogAction 
                            type="submit"
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>

    )
}