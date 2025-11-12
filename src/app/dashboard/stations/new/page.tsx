
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
  CardFooter,
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
import { useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";

const addStationFormSchema = z.object({
  name: z.string().min(1, "Station name is required."),
  location: z.string().min(1, "Location is required."),
  connectorType: z.enum(["Type 2", "CCS", "CHAdeMO"]),
  powerOutput: z.coerce.number().min(1, "Power output must be greater than 0."),
  status: z.enum(["Available", "Charging", "Unavailable", "Maintenance"]),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

type AddStationFormValues = z.infer<typeof addStationFormSchema>;

interface QuickAddStation {
    name: string;
    location: string;
    lat: number;
    lng: number;
}

export default function AddStationPage() {
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();

  const form = useForm<AddStationFormValues>({
    resolver: zodResolver(addStationFormSchema),
    defaultValues: {
      name: "",
      location: "",
      powerOutput: 7.2 as any,
      connectorType: "Type 2",
      status: "Available",
      lat: 18.5204, // Default Pune lat
      lng: 73.8567, // Default Pune lng
    },
  });
  
  const quickAddStations: QuickAddStation[] = [
      { name: "Deccan Gymkhana", location: "Deccan Gymkhana, Pune", lat: 18.5143, lng: 73.8441 },
      { name: "Hinjewadi IT Park", location: "Rajiv Gandhi Infotech Park, Hinjewadi", lat: 18.5912, lng: 73.7389 },
      { name: "Pune Airport", location: "Pune International Airport, Lohegaon", lat: 18.5793, lng: 73.9089 },
  ]

  const handleQuickAdd = (station: QuickAddStation) => {
    form.reset({
        ...form.getValues(),
        name: station.name,
        location: station.location,
        lat: station.lat,
        lng: station.lng,
    })
  }

  async function onSubmit(data: AddStationFormValues) {
    if (!firestore) return;
    const stationsCollection = collection(firestore, 'chargingStations');
    
    try {
      addDocumentNonBlocking(stationsCollection, {
        ...data,
        energyConsumed: 0, // Initial value
      });

      toast({
        title: "Station Added",
        description: `The station "${data.name}" has been successfully registered.`,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding station:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add the station. Please try again.",
      });
    }
  }

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">
        Add a New Charging Station
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>Station Details</CardTitle>
                <CardDescription>
                    Fill out the form below to register a new station, or use a quick add option.
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="lat"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Latitude</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="e.g., 18.5204" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="lng"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Longitude</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="e.g., 73.8567" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
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
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select initial status" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Available">Available</SelectItem>
                                <SelectItem value="Maintenance">Maintenance</SelectItem>
                                <SelectItem value="Unavailable">Unavailable</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="flex gap-2">
                        <Button type="submit" aria-label="Submit new station form">Add Station</Button>
                        <Button variant="outline" type="button" onClick={() => router.back()} aria-label="Cancel and go back">
                        Cancel
                        </Button>
                    </div>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Quick Add (Pune)</CardTitle>
                    <CardDescription>
                        Select a location to pre-fill the form.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {quickAddStations.map((station) => (
                        <Button key={station.name} variant="secondary" onClick={() => handleQuickAdd(station)}>
                            {station.name}
                        </Button>
                    ))}
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">More locations coming soon.</p>
                </CardFooter>
             </Card>
        </div>
      </div>
    </>
  );
}
