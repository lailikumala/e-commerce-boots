"use client"

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const UserButton = () => {

  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Loader className='size-6 mr-4 mt-4 float-right animate-spin' />
    )
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut({
      redirect: false
    });
    router.push("/sign-in")
  }

  return (
    <div>
      {session ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className='outline-none relative float-right p-4 md:p-8'>
            <div className='flex gap-4 items-center'>
              <span>{session?.user?.name}</span>
              <Avatar className='size-10 hover:opacity-75 transition'>
                <AvatarImage 
                  className='size-10 hover:opacity-75 transition rounded-full'
                  src={session.user?.image||undefined} 
                />
                <AvatarFallback className="bg-sky-900 text-whie w-10 h-10">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='center' side='bottom' className='w-50'>
            <DropdownMenuItem onClick={() => handleSignOut()} className='h-10'>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='flex justify-end p-4 gap-4'>
          <Button>
            <Link href={"sign-in"}>Sign In</Link>
          </Button>
          <Button>
            <Link href={"sign-up"}>Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserButton