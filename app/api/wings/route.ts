'use server'
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const wings = await db.wing.findMany({
        include:{
            campamento: true
        }
    });
    console.log(wings);
    return NextResponse.json(wings, {headers: {
        'Cache-Control': 'public, max-age=1'
        }
    });
}