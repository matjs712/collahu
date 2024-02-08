'use client'
import { Campamento } from "@/app/_components/campamentos_columns";

export async function getCampamentosData(): Promise<Campamento[]> {
    try {
      const response = await fetch('/api/campamentos');
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error en el fetch de campanentos:', error);
      throw error;
    }
  }