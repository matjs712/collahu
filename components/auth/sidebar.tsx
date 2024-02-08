'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDENAV_ITEMS } from '@/constants';
import { SideNavItem } from '@/types';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { Button } from '../../components/ui/button';

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

const Sidebar = () => {

  return (
    <div className="md:w-60 bg-[#2a3f54] h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex text-white">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/dashboard"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 h-12 w-full mt-3"
        >
          <span className='flex items-center text-center font-thin gap-2'>
            <div className='w-[50px] h-[50px] rounded-[50%] border-white border-2'></div>
            Bienvenido admin</span>
              
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <>
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between text-[#dee0e3] ${
              pathname.includes(item.path) ? '' : ''
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              <span className="font-normal flex text-[16px]">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? 'font-bold text-[#dee0e3]' : ''
                    }`}
                  >
                    <span className='font-normal text-[16px]'>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg text-[#dee0e3]${
            item.path === pathname ? '' : ''
          }`}
        >
          <span className="font-normal  flex text-[16px]">{item.title}</span>
        </Link>
      )}
    </div>
    </>
    
  );
};
