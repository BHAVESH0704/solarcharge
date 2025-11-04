
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDoc, useFirestore, useUser, setDocumentNonBlocking, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const profileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  vehicleModel: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: profile, isLoading: isProfileLoading } = useDoc(userDocRef);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicleModel: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.fullName || "",
        email: user?.email || profile.email || "",
        phone: profile.phone || "",
        vehicleModel: profile.vehicleModel || "",
      });
    } else if (user) {
      form.reset({
        email: user.email || "",
        fullName: user.displayName || "",
      })
    }
  }, [profile, user, form]);

  function onSubmit(data: ProfileFormValues) {
    if (!userDocRef) return;
    
    setDocumentNonBlocking(userDocRef, {
      id: user?.uid,
      ...data
    }, { merge: true });

    toast({
      title: "Profile Updated",
      description: "Your personal details have been successfully updated.",
    });
  }
  
  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const isLoading = isUserLoading || isProfileLoading;

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">
        User Profile
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
           <Card>
            <CardHeader className="items-center">
                {isLoading ? (
                  <Skeleton className="h-24 w-24 rounded-full mb-4" />
                ) : (
                  <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={profile?.photoURL || "https://placehold.co/100x100.png"} alt="@user" data-ai-hint="user avatar" />
                      <AvatarFallback>{getInitials(form.watch("fullName"))}</AvatarFallback>
                  </Avatar>
                )}
                <CardTitle>
                  {isLoading ? <Skeleton className="h-6 w-40" /> : form.watch("fullName")}
                </CardTitle>
                <CardDescription>
                  {isLoading ? <Skeleton className="h-4 w-48 mt-1" /> : form.watch("email")}
                </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
               <Button variant="outline" aria-label="Change profile photo">Change Photo</Button>
            </CardContent>
           </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>
                Update your personal information here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                 <div className="space-y-8">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                 </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email address" {...field} disabled />
                          </FormControl>
                          <FormDescription>
                            This is the email you use to log in. It cannot be changed.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicleModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Model</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Tata Nexon EV" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" aria-label="Submit profile updates">Update Profile</Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
