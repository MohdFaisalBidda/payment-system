"use client";
import React, { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signUp } from "@/services/api";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

function RegisterForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await signUp(values)
      console.log("From Register Form", { response });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold my-8">Register</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[20rem]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John doe" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} className="w-full" type="submit">
            {!form.formState.isSubmitting ?"Submit" :<Loader2 className="animate-spin"/>}
          </Button>
        </form>
      </Form>
    </div>
    // <form
    //   onSubmit={handleSubmit}
    //   className="w-full h-screen flex flex-col justify-center items-center"
    // >
    //   <input name="email" type="email" />
    //   <input name="password" type="password" />
    //   <button type="submit">Register</button>
    // </form>
  );
}

export default RegisterForm;