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
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/holy-logo.png";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { register, UpdateUser } from "@/app/utils/strapi";

const formSchema = z.object({
  fullName: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),

  email: z.string().min(10, {
    message: "Email must be at least 10 characters.",
  }),

  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),

  phone: z.string().length(10, {
    message: "Phone must be at least 10 characters.",
  }),

  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function RegisterCard() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    },
  });

  // Define a submit handler.
  const [isregistering, setIsregistering] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsregistering(true);
    try {
      const res = await register({email:values.email,password:values.password,username:values.email});
      console.log(res);
      if (res.status === 200) {
        const updateRes = await UpdateUser({fullName:values.fullName,email:values.email,phone:values.phone,address:values.address},res.data.user.id,res.data.jwt);
        console.log(updateRes);
        toast.success("User Registered Successfully");
        localStorage.setItem("accessToken", res?.data.jwt);
        form.reset();
        setIsregistering(false);
        window.location.replace("/");
      }else{
        toast.error(res.data.error.message);
        setIsregistering(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message);
      console.log(error);
      setIsregistering(false);
    } finally {
      setIsregistering(false);
    }
  };

  const router = useRouter();
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
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login
                </Link>
              </p>
            </div>
          </div>

          <Card className=" w-full  lg:w-[450px]">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Please register before purchasing any product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Phone Number "
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
                        type="password"
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
              <Button disabled={isregistering}>
                {isregistering ? (
                  <p className=" flex items-center gap-1">
                    <LoaderSpin /> Register{" "}
                  </p>
                ) : (
                  "Register"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
