"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosInstance } from "@/app/(repositories)/config";
import LoaderSpin from "@/components/website/LoaderSpin";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/holy-logo.png";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";
import { login } from "@/app/utils/strapi";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),

  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function Page() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  // Define a submit handler.
  const [isLoging, setIsLoging] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoging(true);
    try {
      const res = await login({identifier:values.email,password:values.password});
      if (res.status === 200) {
        localStorage.setItem("accessToken", res?.data.jwt);
        form.reset();
        setIsLoging(false);
        window.location.replace("/");
        toast.success("Login Successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message);
      setIsLoging(false);
    } finally {
      setIsLoging(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className=" flex flex-col ">
      <div
        onClick={goBack}
        className=" fixed top-0 mt-4 flex items-center gap-1 text-xs text-primary-700/90">
        <ArrowLeft /> Back
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="text-center mb-8">
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={150}
              className=" mx-auto"
            />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
              <p className="">
                Dont have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-red-600 hover:text-red-500">
                  Register
                </Link>
              </p>
            </div>
          </div>

          <Card className="w-full  lg:w-[450px]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Please login before purchasing any product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email "
                        {...field}
                      />
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
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className=" flex justify-end">
              <Button>
                {isLoging ? (
                  <p className=" flex items-center gap-1">
                    <LoaderSpin /> Login
                  </p>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
