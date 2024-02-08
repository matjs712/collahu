'use server'
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const campamentos = await db.campamento.findMany();
    return NextResponse.json(campamentos, {headers: {
        'Cache-Control': 'public, max-age=1'
        }
    });
}