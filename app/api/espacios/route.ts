'use server'
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const wings = await db.espacio.findMany({
        include:{
            campamento: true,
            wing: true,
            Sector: true
        }
    });
    return NextResponse.json(wings, {headers: {
        'Cache-Control': 'public, max-age=1'
        }
    });
}