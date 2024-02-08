'use client'
import { Motivo } from "@/app/_components/motivos/motivos_columns";

export async function getMotivosData(): Promise<Motivo[]> {
    try {
      const response = await fetch('/api/motivos');
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error en el fetch de los motivos:', error);
      throw error;
    }
  }