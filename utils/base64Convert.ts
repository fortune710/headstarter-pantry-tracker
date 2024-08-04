import fs from "fs";

export const toBase64 = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return base64;
};
