"use client";
import React, { FormEvent, useState } from "react";
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
import { makePayment, verifyOtp } from "@/services/api";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  senderName: z.string().min(2).max(50),
  upiNumber: z.string().min(2).max(50),
  transactionId: z.string().min(2).max(50),
});

const otpFormSchema = z.object({
  otp: z.string().max(4).min(4),
});

export default function Home() {
  const [showOtp, setShowOtp] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const otpForm = useForm({
    resolver: zodResolver(otpFormSchema),
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      const response = await makePayment(values);
      console.log("Transaction: ", { response });
      if (response) {
        toast({
          title: response.data,
        });
      }
      if (response.status === 201) {
        setShowOtp(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onOtpSubmit(values) {
    try {
      const response = await verifyOtp(values);
      if (response.status === 401) {
        toast({
          title: response.data,
        });
      } else {
        toast({
          title: response.data,
        });
        setTimeout(() => {
          setShowOtp(false);
        }, 500);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error,
      });
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {!showOtp && (
        <>
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
                      <Input type="text" placeholder="John doe" {...field} />
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
                      <Input type="text" {...field} />
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
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                className="w-full"
                type="submit"
              >
                {!form.formState.isSubmitting ? (
                  "Submit"
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </>
      )}

      {showOtp && (
        <>
          <h1 className="text-2xl text-center font-bold my-8">Your Transaction is in queue. To Proceed,<br/> Enter the OTP</h1>
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="space-y-8 w-[20rem]"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Enter the 4 Digits OTP</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={otpForm.formState.isSubmitting}
                className="w-full"
                type="submit"
              >
                {!otpForm.formState.isSubmitting ? (
                  "Submit"
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
