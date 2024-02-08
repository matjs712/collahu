'use server'
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET ({id}:{id:string}) {
    const campamento = await db.campamento.findUnique({
        where: {id}
    });
    return NextResponse.json(campamento, {headers: {
        'Cache-Control': 'public, max-age=1'
        }
    });
}