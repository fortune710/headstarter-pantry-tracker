import { AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StringParam, useQueryParams } from "use-query-params";
import { Button } from "../ui/button";

interface AddProductImageFormProps {
    tabSwitchFunction: (tab: "image" | "product") => any;
}

export default function AddProductImageForm({ tabSwitchFunction }: AddProductImageFormProps) {
    //const [productName, setProductName] = useQueryParam('product_name', StringParam);
    //const [productUrl, setProductUrl] = useQueryParam('product_url', ObjectParam);

    const [query, setQuery] = useQueryParams({
        product_name: StringParam,
        product_url: StringParam
    })


    const handleSubmit = async (formData: FormData) => {
       const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        cache: "no-store"
       })

       const data = await response.json()
       const item = JSON.parse(data.json)
       return setQuery({
        product_name: item.item_name,
        product_url: data.url
       })
    }


    return (
        <form action={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="productName">Product Image</Label>
                    <Input
                        type="file"
                        name="image"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                        type="text"
                        id="productName"
                        name="productName"
                        defaultValue={query.product_name!}
                    />
                </div>
                <Button type="submit">Identify Product</Button>
            </div>

            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button 
                    onClick={() => tabSwitchFunction("product")} 
                    type="button"
                >
                    Continue
                </Button>
            </AlertDialogFooter>
        </form>
    )
}