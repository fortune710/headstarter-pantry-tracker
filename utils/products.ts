import { Product } from "@/actions/products";
import { supabase } from "./supabase";

// Read all products
export async function readProducts() {
    const { data, error } = await supabase
        .from('products').select('id, name, expiry_date, quantity_left, price, image').order('created_at', { ascending: false })
    

    if (error) {
        throw new Error(error.message);
    }

    return data as Product[];
}