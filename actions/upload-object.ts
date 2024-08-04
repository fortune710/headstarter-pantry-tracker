"use server"

import {
    GoogleGenerativeAI,
    FunctionDeclarationSchemaType,
    GenerationConfig,
} from "@google/generative-ai";
import { uploadImage as uploadImageToVercel } from "@/utils/uploadImageToVercel";

const apiKey = "AIzaSyDTDLRXVeYsFyenjfVSYtv6p7ar3Ocp0bE"
const genAI = new GoogleGenerativeAI(apiKey);


const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    //systemInstruction: "Response should strictly be in JSON format with the value of the response in attached to a key called item_name",
});
  
const generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
            item_name: {
                type: FunctionDeclarationSchemaType.STRING,
                properties: {}
            }
        },
    }
};

async function uploadToGemini(file: File) {
    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer).toString("base64")

    return { data: fileBuffer, mimeType: file.type }
}


export default async function uploadImage(formData: FormData) {
    const image = formData.get('image') as File;
    
    const prompt = "What item is in the image? I need a maximum of 3 word response in sentence case. You do not need to use the 3 word limit, shorten the response to as little as possible";

    const [file, fileUpload] = await Promise.all([
        await uploadToGemini(image),
        await uploadImageToVercel(image)
    ])

    const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            data: file.data,
                            mimeType: file.mimeType
                        }
                    }
                ]
            }
        ],
        generationConfig
    })

    const responseText = result.response.text()
    return { json: responseText, url: fileUpload }
}