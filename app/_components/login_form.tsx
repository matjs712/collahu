'use client'
import * as z from 'zod';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

const Login_form = () => {
  
  const router = useRouter();
  
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async ( values: z.infer<typeof LoginSchema> ) => {
    console.log(values);

    // startTransition(() =>{
      // const res = await signIn('credentials', {
      //   email: values.email,
      //   password: values.password,
      //   redirect: false
      // })
      // console.log(res);
      
      // if(res?.ok){
        router.push('/campamentos')
      //   router.refresh()
      // }
    // })
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center flex flex-col items-center justify-center">
        <Image src="/collahuasi.jpg" width={250} height={250} alt="login_form_logo"/>
        <CardTitle className='text-xl'>Inicio de Sesiòn</CardTitle>
        <CardDescription>Gestiòn de Campamentos.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-md'>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="tom@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-md'>Contraseña</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className='w-full text-md font-semibold'>Entrar</Button>
        </form>
      </Form>
      </CardContent>
    </Card>
  )
}

export default Login_form;