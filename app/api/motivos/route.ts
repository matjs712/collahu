'use server'
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const motivos = await db.motivos.findMany();
    return NextResponse.json(motivos, {headers: {
        'Cache-Control': 'public, max-age=1'
        }
    });
}