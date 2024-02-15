'use client'

import { Sector } from "@/app/_components/sectores/sectores_columns";


export async function getSectoresData(): Promise<Sector[]> {
    try {
      const response = await fetch('/api/sectores');
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error en el fetch de sectores:', error);
      throw error;
    }
  }