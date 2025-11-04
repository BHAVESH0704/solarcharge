
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const addStationFormSchema = z.object({
  name: z.string().min(1, "Station name is required."),
  location: z.string().min(1, "Location is required."),
  connectorType: z.enum(["Type 2", "CCS", "CHAdeMO"]),
  powerOutput: z.coerce.number().min(1, "Power output must be greater than 0."),
});

type AddStationFormValues = z.infer<typeof addStationFormSchema>;

export default function AddStationPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AddStationFormValues>({
    resolver: zodResolver(addStationFormSchema),
    defaultValues: {
      name: "",
      location: "",
      connectorType: "Type 2",
    },
  });

  function onSubmit(data: AddStationFormValues) {
    console.log(data);
    toast({
      title: "Station Added",
      description: `The station "${data.name}" has been successfully registered.`,
    });
    router.push("/dashboard/stations");
  }

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">
        Add a New Charging Station
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Station Details</CardTitle>
          <CardDescription>
            Fill out the form below to register a new station.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Station Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Koregaon Park Power-Up" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lane 7, Koregaon Park, Pune" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="powerOutput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Power Output (kW)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 7.2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="connectorType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Connector Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a connector type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Type 2">Type 2</SelectItem>
                        <SelectItem value="CCS">CCS</SelectItem>
                        <SelectItem value="CHAdeMO">CHAdeMO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" aria-label="Submit new station form">Add Station</Button>
                <Button variant="outline" onClick={() => router.back()} aria-label="Cancel and go back">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
