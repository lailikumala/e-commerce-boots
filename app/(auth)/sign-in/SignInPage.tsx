"use client"

import React, {useEffect, useState} from 'react';
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
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import {signIn} from "next-auth/react";
import { useRouter } from 'next/navigation';
import { TriangleAlert } from 'lucide-react';
const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [callbackUrl, setCallbackUrl] = useState('/');
  const { push } = useRouter();

  useEffect(() => {
    // ✅ avoid error when building
    if (typeof window != 'undefined') {
      const params = new URLSearchParams(window?.location?.search);
      const url = params.get('callbackUrl') ?? '/';
      setCallbackUrl(url);
    }
  }, []);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (!result) {
      setError("No response from server.");
      return;
    }

    if (result.ok && result.status === 200) {
      push(result.url || callbackUrl);
    } else if (result.status === 401 && result?.error == 'CredentialsSignin') {
      // setError("Email or password is incorrect.");
    } else {
      setError(result.error || "Unexpected error occurred.");
    }
  } catch (error) {
    setError((error as Error).message);
  } finally {
    setLoading(false);
  }
};


const handleGoogleLogin = () => {
  signIn("google", { callbackUrl });
};


  return (
    <div className='h-full flex items-center justify-center'>
      <Card className='md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8'>
        <CardHeader>
          <CardTitle className='text-center'>
            Sign In
          </CardTitle>

          <CardDescription className='text-sm text-center text-accent-foreground'>
            Use email or service, to sign in
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
            <TriangleAlert/>
            <p>{error}</p>
          </div>
        )}
        <CardContent className='px-2 sm:px-6'>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type='email'
              disabled={loading}
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type='password'
              disabled={loading}
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              className='w-full'
              size="lg"
              disabled={loading}
            >
              Continue
            </Button>
            <Separator />
            <div className="flex my-2 justify-center mx-auto items-center">
              <Button
                disabled={false}
                onClick={handleGoogleLogin} 
                variant={'outline'}
                size="lg"
                className='bg-slate-300 hover:bg-slate-400 hover:scale-110 w-full'
              >
                <FcGoogle className='size-8 left-2.5 top-2.5' />
                Sign In With Google
              </Button>
            </div>
            <div className="flex flex-center mt-2 justify-center items-center">
              <p className="text-center text-sm text-muted-foreground">
                Create new acount?
              </p>
              <Link href="/sign-up" className='text-sky-700 m-2 hover:underline cursor-pointer'>
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInPage