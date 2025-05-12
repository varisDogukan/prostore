import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignPage = async () => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex-center'>
            <Image
              src='/images/logo.svg'
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <CardTitle className='text-center'>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Sign in to your account
          </CardDescription>
          <CardContent className='space-y-4'>
            <CredentialsSignInForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SignPage;
