import { createProduct } from "@/actions/products";
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { StringParam, useQueryParams } from "use-query-params";

interface AddProductFormProps {
    tabSwitchFunction: (tab: "image" | "product") => any;
}

export default function AddProductForm({ tabSwitchFunction }: AddProductFormProps) {
    const { toast } = useToast();
    const [query, _] = useQueryParams({
        product_name: StringParam,
        product_url: StringParam
    })
    
    const handleSubmit = async (formData: FormData) => {
        // Handle the submission of product details here
        try {
            await createProduct(formData, query.product_url || null)
            return toast({
                title: "Product created",
                description: "Product created successfully",
                variant: "default"
            })
        } catch (error) {
            return toast({
                title: "Error",
                description: "Error creating product",
                variant: "destructive"
            })
        }
    }

    return (
        <form action={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={query.product_name!}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input
                        type="number"
                        id="price"
                        name="price"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="quantity_left">Quantity Left</Label>
                    <Input
                        type="number"
                        id="quantity_left"
                        name="quantity_left"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                        type="date"
                        id="expiry_date"
                        name="expiry_date"
                    />
                </div>
            </div>
            <AlertDialogFooter>
                {
                    !query.product_name ? 
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    :
                    <Button 
                        onClick={() => tabSwitchFunction("image")} 
                        type="button"
                        variant="outline"
                    >
                        Back
                    </Button>
                }
                <AlertDialogAction type="submit">Add Product</AlertDialogAction>
            </AlertDialogFooter>
        </form>
    )
}