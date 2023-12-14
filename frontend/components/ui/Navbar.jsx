"use client";

import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Loader2 } from "lucide-react";
import { toast } from "./use-toast";
import { reportFraud } from "@/services/api";
import { Toaster } from "./toaster";


const formSchema = z.object({
  upiNumber: z.string().min(2).max(50),
});


const Navbar = () => {
  const { user, deleteUser } = useAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upiNumber: "",
    },
  });
  async function onSubmit(values) {
    console.log(values.upiNumber);
    try {
      const res = await reportFraud(values.upiNumber);
      console.log(res,"res");
      toast({
        title:"User Reported with UPI ID"
      })
    } catch (error) {
      console.log(error);
      toast({
        title:"UPI ID is already reported as fraud"
      })
    }
  }
  // const user =localStorage.getItem("user");
  console.log(user);
  return (
    <>
      <nav className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold bg-blue-100 p-1 rounded-md">
          Payment System
        </h1>
        <div className="flex gap-x-8">
          <NavigationMenu className="flex justify-end">
            <NavigationMenuList className="">
              {!user && (
                <>
                  <Link href="/login" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Login
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/signup" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Register
                    </NavigationMenuLink>
                  </Link>
                </>
              )}
              {!!user && (
                <>
                  <Dialog>
                    <DialogTrigger>
                      <Button>Report</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Report the user with their specific UPI ID</DialogTitle>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 w-[20rem]"
                          >
                            <FormField
                              control={form.control}
                              name="upiNumber"
                              render={({ field }) => (
                                <FormItem className="">
                                  <FormLabel>UPI ID</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder=""
                                      {...field}
                                    />
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
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <NavigationMenuLink
                      onClick={deleteUser}
                      className={navigationMenuTriggerStyle()}
                    >
                      Logout
                    </NavigationMenuLink>
                  </NavigationMenuLink>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
