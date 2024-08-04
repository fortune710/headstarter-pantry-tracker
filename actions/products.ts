"use server"

import { supabase } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export interface Product {
    id: number,
    name: string,
    expiry_date: string,
    quantity_left: number,
    price: number,
    image: string
}

// Create a new product
export async function createProduct(formData: FormData, imageUrl: string|null) {
    const name = formData.get('name') as string;
    const expiry_date = formData.get('expiry_date') as string;
    const quantity_left = parseInt(formData.get('quantity_left') as string, 10);
    const price = parseFloat(formData.get('price') as string);
    const image = imageUrl;

    const { data, error } = await supabase
        .from('products')
        .insert([{ name, expiry_date, quantity_left, price, image }]);

    revalidatePath('/');
    return data;
}


// Edit a product
export async function editProduct(formData: FormData, id: number) {
    const expiry_date = formData.get('expiry_date') as string;
    const quantity_left = parseInt(formData.get('quantity_left') as string, 10);
    const price = parseFloat(formData.get('price') as string);

    const { data, error } = await supabase
    .from('products')
    .update({ expiry_date, quantity_left, price })
    .eq('id', id)
    .select();
    
    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/');
    return data;
}

// Delete a product
export async function deleteProduct(id: number) {
    const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/');
    return data;
}
