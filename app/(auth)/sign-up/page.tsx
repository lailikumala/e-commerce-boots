"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { TriangleAlert } from 'lucide-react';

const SignUp = () => {

  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    provider: 'credentials',
    role: 'admin'
  })
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      const result = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await result.json();

      if (result.ok) {
        setPending(false);
        toast.success(data.message);
        router.push("/sign-in");

      } else if (result.status === 400) {
        setError(data.message);
        setPending(false);
      } else if (result.status === 500) {
        setError(data.message);
        setPending(false);
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-full flex items-center justify-center'>
      <Card className='md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8'>
        <CardHeader>
          <CardTitle className='text-center'>
            Sign Up
          </CardTitle>

          <CardDescription className='text-sm text-center text-accent-foreground'>
            Use email or service, to create account
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className='px-2 sm:px-6'>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type='text'
              disabled={pending}
              placeholder='Full name'
              value={form.name}
              onChange={(e) => setform({ ...form, name: e.target.value })}
              required
            />
            <Input
              type='email'
              disabled={false}
              placeholder='email'
              value={form.email}
              onChange={(e) => setform({ ...form, email: e.target.value })}
              required
            />
            <Input
              type='password'
              disabled={pending}
              placeholder='password'
              value={form.password}
              onChange={(e) => setform({ ...form, password: e.target.value })}
              required
            />
            <Input
              type='password'
              disabled={pending}
              placeholder='confirm password'
              value={form.confirmPassword}
              onChange={(e) => setform({ ...form, confirmPassword: e.target.value })}
              required
            />
            <Button
              className='w-full'
              size="lg"
              disabled={pending}
            >
              Continue
            </Button>
            <Separator />
            <div className="flex flex-center mt-2 justify-center items-center">
              <p className="text-center text-sm text-muted-foreground">
                Already have an acount?
              </p>
              <Link href="/sign-in" className='text-sky-700 m-2 hover:underline cursor-pointer'>
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp