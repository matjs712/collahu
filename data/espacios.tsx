'use client'
import { Espacio } from "@/app/_components/espacios/epsacios_columns";

export async function getEspaciosData(): Promise<Espacio[]> {
    try {
      const response = await fetch('/api/espacios');
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error en el fetch de wings:', error);
      throw error;
    }
  }