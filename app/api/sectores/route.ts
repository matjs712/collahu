'use server'
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const sectores = await db.sector.findMany({
        include:{
            campamento: true
        }
    });
    console.log(sectores);
    return NextResponse.json(sectores, {headers: {
        'Cache-Control': 'public, max-age=1'
        }
    });
}