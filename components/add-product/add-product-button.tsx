"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkle, Upload } from "lucide-react";
import { StringParam, useQueryParam } from "use-query-params";
import AddProductDialog from "./add-product-dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AddProductButton() {
    const [uploadMode, setUploadMode] = useQueryParam("mode", StringParam)
    
    return (
        <Sheet>
            <SheetTrigger>
                <Button>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Product
                </Button>
            </SheetTrigger>

            <SheetContent side="right">
                <div>
                    <h1 className="font-bold text-2xl">Add Product</h1>
                    <p>How do you want to upload this product?</p>
                </div>
                <div className="flex flex-col gap-4 mt-10">
                    <AddProductDialog
                        trigger={
                            <Button onClick={() => setUploadMode("manual")}>
                                <Upload className="h-4 w-4 mr-2"/>
                                Manual Upload
                            </Button>
                        }
                    />

                    <AddProductDialog
                        trigger={
                            <Button variant="secondary" onClick={() => setUploadMode("ai")}>
                                <Sparkle className="h-4 w-4 mr-2"/>
                                AI Upload
                            </Button>
                        }
                    />
                </div>

            </SheetContent>
        </Sheet>

    )
}
