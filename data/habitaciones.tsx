'use client'

import { Habitacion } from "@/app/_components/habitaciones/habitaciones_columns";


export async function getHabitacionesData(): Promise<Habitacion[]> {
    try {
      const response = await fetch('/api/habitaciones');
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error en el fetch de wings:', error);
      throw error;
    }
  }