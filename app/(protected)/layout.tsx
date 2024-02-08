import { Inter } from "next/font/google";
import Sidebar from "@/components/auth/sidebar";
import Navbar from "@/components/auth/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};
const inter = Inter({ subsets: ['latin'] })

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
  <div className="flex w-full">
    <Sidebar />
    <main className="flex-1">
      <div className="flex flex-col md:ml-60 sm:border-r sm:border-zinc-700 min-h-screen">
          <div className="flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-4">
            <Navbar/>
            {children}
          </div>
      </div>
    </main>
  </div>
   );
}
 
export default ProtectedLayout;
