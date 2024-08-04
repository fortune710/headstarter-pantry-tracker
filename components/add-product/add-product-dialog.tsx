'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import AddProductForm from './add-product-form'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs';
import AddProductImageForm from './add-product-image-form';
import { StringParam, useQueryParam, useQueryParams } from "use-query-params";
import { useState } from "react";

interface ProductInputDialogProps {
  trigger: React.ReactNode;
}

export default function AddProductDialog({ trigger }: ProductInputDialogProps) {

  const [tab, setTab] = useState<"image" | "product">("image");
  const [query, setQuery] = useQueryParams({
    product_name: StringParam,
    product_url: StringParam,
    mode: StringParam
})

  const switchTab = (tab: "image" | "product") => {
    return setTab(tab)
  }


  const handleOpenChange = (open: boolean) => {
    if (!open) {
      return setQuery({
        product_name: null,
        product_url: null,
        mode: null
      })
    }
  }

  return (
    <AlertDialog onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Product</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the details of the new product below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {
          query.mode === 'manual' ? <AddProductForm tabSwitchFunction={switchTab}/> :
          <Tabs value={tab}>
            <TabsList>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger disabled={!query.product_name} value="product">Product</TabsTrigger>
            </TabsList>

            <TabsContent value="image">
              <AddProductImageForm tabSwitchFunction={switchTab}/>
            </TabsContent>

            <TabsContent value="product">
              <AddProductForm tabSwitchFunction={switchTab}/>
            </TabsContent>

          </Tabs>
        }

      </AlertDialogContent>
    </AlertDialog>
  )
}