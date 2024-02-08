'use server'
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const users = await db.user.findMany();
    return NextResponse.json(users, {headers: {
        'Cache-Control': 'public, max-age=1'
        }
    });
}