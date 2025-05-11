import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dhrfunv4c', 
    api_key: '455443365792839', 
    api_secret: 'BlSJ1I6BLM9LBLChu8J5mbsqNCI' 
});

export async function POST(request: Request) {
    const data = await request.formData();
    const image = data.get("file") as File;

    if (!image) {
        return NextResponse.json("Nenhum arquivo enviado", { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                format: "jpg", 
                transformation: [
                    { width: 400, crop: "scale" }, 
                    { quality: "auto" } 
                ],
                
                public_id: image.name.replace(/\.[^/.]+$/, "")
            },
            (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            }
        ).end(buffer);
    });

    return NextResponse.json({
        url: (response as { secure_url: string }).secure_url,
        format: "jpg", 
        width: 400 
    });
}