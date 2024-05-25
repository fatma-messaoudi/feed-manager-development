import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

export async function POST() {
    
    console.log("Post request executed")

     const writeClient = createClient ({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset:  process.env.NEXT_PUBLIC_SANITY_DATASET,
      token: process.env.SANITY_AUTH_TOKEN,
      useCdn: false
    })

    try {
        const newDocument = {
            _type: "document",
            title: "test212121"
        }

        const result = await writeClient.create(newDocument)
        return NextResponse.json({ message : "Document Created !!!", result})
    
    } catch (error) {
        console.log("Error Creating Document !!", error)
        return NextResponse.json({message : "Document failed to be created ", error}, {status: 500})
    }
    
}