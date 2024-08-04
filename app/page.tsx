import { readProducts } from "@/utils/products";
import AddProductButton from "@/components/add-product/add-product-button";
import ProductTable from "@/components/products-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Status } from "@/utils/constants";

export const dynamic = "force-dynamic"

export default async function Home() {

  const products = await readProducts();

  const inStockProducts = products.filter((product) => product.quantity_left > Status.IN_STOCK);
  const lowStockProducts = products.filter((product) => product.quantity_left <= Status.IN_STOCK && product.quantity_left > Status.OUT_OF_STOCK);
  const outOfStockProducts = products.filter((product) => product.quantity_left === Status.OUT_OF_STOCK);
  

  return (
    <main className="min-h-screen p-4 md:p-7 lg:p-12">
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-stock">In Stock</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            <TabsTrigger value="out-of-stock" className="hidden sm:flex">
              Out of Stock
            </TabsTrigger>
          </TabsList>

          <AddProductButton/>
        </div>

        
        <TabsContent value="all">
          <ProductTable products={products}/>
        </TabsContent>
        <TabsContent value="in-stock">
          <ProductTable products={inStockProducts}/>
        </TabsContent>
        <TabsContent value="low-stock">
          <ProductTable products={lowStockProducts}/>
        </TabsContent>
        <TabsContent value="out-of-stock">
          <ProductTable products={outOfStockProducts}/>
        </TabsContent>
      </Tabs>
    </main>
  );
}
