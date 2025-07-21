"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { analyzeChargingPatterns } from "@/ai/flows/analyze-charging-patterns";
import { recommendOptimizedCharging } from "@/ai/flows/recommend-optimized-charging";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Bot, CalendarIcon, Cpu, Zap, Clock, Gauge } from "lucide-react";
import type {
  AnalyzeChargingPatternsOutput,
  RecommendOptimizedChargingOutput,
} from "@/ai/flows/types";
import { ComponentShell } from "@/components/component-shell";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  stationId: z.string().min(1, { message: "Station ID is required." }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type AIResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export default function SmartChargePage() {
  const { toast } = useToast();
  const [analysis, setAnalysis] = useState<AIResponse<AnalyzeChargingPatternsOutput>>({
    data: null,
    loading: false,
    error: null,
  });
  const [recommendation, setRecommendation] = useState<AIResponse<RecommendOptimizedChargingOutput>>({
      data: null,
      loading: false,
      error: null,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stationId: "SC-001",
      dateRange: { from: new Date(new Date().setDate(new Date().getDate() - 30)), to: new Date() },
    },
  });

  async function onAnalyze(values: z.infer<typeof formSchema>) {
    setAnalysis({ data: null, loading: true, error: null });
    try {
      const result = await analyzeChargingPatterns({
        stationId: values.stationId,
        startDate: values.dateRange.from.toISOString(),
        endDate: values.dateRange.to.toISOString(),
      });
      setAnalysis({ data: result, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setAnalysis({ data: null, loading: false, error: errorMessage });
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage,
      });
    }
  }
  
  async function onRecommend() {
    setRecommendation({ data: null, loading: true, error: null });
    try {
      const result = await recommendOptimizedCharging({
          userId: 'user-123',
          recentChargingSessions: JSON.stringify([
              { stationId: 'SC-001', startTime: '2023-10-26T18:00:00Z', endTime: '2023-10-26T22:00:00Z', energyConsumed: 40 },
              { stationId: 'SC-002', startTime: '2023-10-24T19:00:00Z', endTime: '2023-10-24T21:30:00Z', energyConsumed: 35 },
          ]),
          currentGridConditions: JSON.stringify({ price: 'off-peak', availability: 'high' }),
      });
      setRecommendation({ data: result, loading: false, error: null });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        setRecommendation({ data: null, loading: false, error: errorMessage });
        toast({
            variant: "destructive",
            title: "Recommendation Failed",
            description: errorMessage,
        });
    }
  }


  return (
    <>
      <div className="flex items-center gap-4">
        <Bot className="h-8 w-8 text-primary" />
        <h1 className="text-lg font-semibold md:text-2xl">
          AI-Powered Smart Charging
        </h1>
      </div>
      <p className="text-muted-foreground">
        Leverage AI to analyze charging patterns and receive personalized recommendations.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
            <ComponentShell
                title="Personalized Recommendation"
                description="Get an AI-generated charging plan based on your habits and grid status."
                icon={Cpu}
                isLoading={recommendation.loading}
                error={recommendation.error}
                isEmpty={!recommendation.data}
                emptyTitle="No Recommendation Yet"
                emptyDescription="Click the button to generate your personalized charging recommendation."
            >
                {recommendation.data && (
                    <div className="space-y-4 text-sm">
                        <p className="text-base font-medium leading-relaxed">{recommendation.data.recommendation}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Gauge className="h-4 w-4" />
                            <span>Confidence Score:</span>
                            <Badge variant="secondary">{(recommendation.data.confidenceScore * 100).toFixed(0)}%</Badge>
                        </div>
                    </div>
                )}
            </ComponentShell>
            <Button onClick={onRecommend} disabled={recommendation.loading} className="w-full">
                {recommendation.loading ? "Generating..." : "Get My Recommendation"}
            </Button>
        </div>


        <div className="space-y-6">
            <ComponentShell
                title="Charging Pattern Analysis"
                description="Analyze historical data for a station to identify trends and risks."
                icon={Zap}
                isLoading={analysis.loading}
                error={analysis.error}
                isEmpty={!analysis.data}
                emptyTitle="No Analysis Performed"
                emptyDescription="Enter a station ID and date range, then click 'Analyze' to see the results."
            >
                {analysis.data && (
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Peak Usage Times:</span>
                      <span>{analysis.data.peakUsageTimes.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Avg. Duration:</span>
                      <span>{analysis.data.averageChargingDuration} mins</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="font-semibold">Overload Risk:</span>
                       <Badge variant={analysis.data.predictedOverloadRisk ? "destructive" : "default"}>
                         {analysis.data.predictedOverloadRisk ? "High" : "Low"}
                       </Badge>
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Suggested Schedule:</p>
                        <p className="text-muted-foreground">{analysis.data.suggestedChargingSchedule}</p>
                    </div>
                  </div>
                )}
            </ComponentShell>
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onAnalyze)} className="space-y-4 p-4 border rounded-lg bg-card">
                <FormField
                  control={form.control}
                  name="stationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Station ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., SC-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date range</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value.from && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                    {format(field.value.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(field.value.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date range</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            selected={{ from: field.value.from, to: field.value.to }}
                            onSelect={(range) => field.onChange(range || { from: new Date(), to: new Date() })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={analysis.loading} className="w-full">
                  {analysis.loading ? "Analyzing..." : "Analyze Patterns"}
                </Button>
              </form>
            </Form>
        </div>
      </div>
    </>
  );
}

// Add a dummy types file to satisfy the import
declare module "@/ai/flows/types" {
  export type AnalyzeChargingPatternsOutput = {
    peakUsageTimes: string[];
    averageChargingDuration: number;
    predictedOverloadRisk: boolean;
    suggestedChargingSchedule: string;
  };
  export type RecommendOptimizedChargingOutput = {
    recommendation: string;
    confidenceScore: number;
  };
}
