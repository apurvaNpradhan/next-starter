"use client"
import { Button } from "@/components/ui/button";
import { signInWithGithubAction } from "../actions";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInWithProviders() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignInWithGithub = async () => {
    try {
      setIsLoading(true);
      await signInWithGithubAction();
      toast.success("Sign in with Github successful");
    } catch (error) {
      console.error("Sign in with Github failed");
      toast.error("Sign in with Github failed");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-none ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Sign in</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignInWithGithub} disabled={isLoading} className="w-full">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center">

                Sign in with GitHub
              </span>
            )}
          </Button>
        </CardContent>

      </Card>
    </div>
  )
}
