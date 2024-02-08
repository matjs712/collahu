'use client'

import { User } from "@/app/_components/users/users_columns";

export async function getUserData(): Promise<User[]> {
    try {
      const response = await fetch('/api/usuarios');
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error en el fetch de los usuarios:', error);
      throw error;
    }
  }