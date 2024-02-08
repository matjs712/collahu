'use client'
import { Button } from "../../components/ui/button"
import { redirect, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-end py-2 border-b border-gray-500 shadow-md">
      <Button variant="secondary" className="border-b bg-[#dcdcdc] text-[#595959] border-gray-600 font-normal hover:bg-[#dcdcdc]" > <span onClick={()=> router.push('/') }>CERRAR SESIÓN</span></Button>
    </div>
  )
}

export default Navbar