'use client'
import { Wing } from "@/app/_components/wings/wings_columns";

export async function getWingsData(): Promise<Wing[]> {
    try {
      const response = await fetch('/api/wings');
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error en el fetch de wings:', error);
      throw error;
    }
  }