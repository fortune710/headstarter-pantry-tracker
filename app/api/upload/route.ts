import uploadImage from "@/actions/upload-object"

export async function POST(request: Request) {
    const formData = await request.formData();
    const result = await uploadImage(formData)

    return Response.json({ ...result });
}