"use client"
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
import { makePayment } from "@/services/api";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  senderName: z.string().min(2).max(50),
  upiNumber: z.string().min(2).max(50),
  transactionId: z.string().min(2).max(50),
});

export default function Home() {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      const response = await makePayment(values)
      console.log("Transaction: ", { response });
     if(response.error){
      toast({
        title:"UPI ID is reported as Fraud !"
      })
     }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
    <h1 className="text-2xl font-bold my-8">Payment Details</h1>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[20rem]"
      >
        <FormField
          control={form.control}
          name="senderName"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Sender's Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="John doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
          control={form.control}
          name="upiNumber"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>UPI number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
          control={form.control}
          name="transactionId"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                />
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
  )
}
