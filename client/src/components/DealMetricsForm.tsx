import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dealMetricsSchema, type DealMetrics, type CalculationResult } from "@/lib/schemas";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

interface DealMetricsFormProps {
  onCalculated: (results: CalculationResult) => void;
}

export function DealMetricsForm({ onCalculated }: DealMetricsFormProps) {
  const { toast } = useToast();
  
  const { data: industries } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      const response = await fetch("/api/industries");
      return response.json() as Promise<string[]>;
    },
  });

  const form = useForm<DealMetrics>({
    resolver: zodResolver(dealMetricsSchema),
    defaultValues: {
      industry: "",
      revenue: 0,
      ebitda: 0,
      growthPercentage: 0,
    },
  });

  const calculateMutation = useMutation({
    mutationFn: async (data: DealMetrics) => {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Calculation failed");
      }
      
      return response.json() as Promise<CalculationResult>;
    },
    onSuccess: (data) => {
      onCalculated(data);
      toast({
        title: "Calculation Complete",
        description: "Your metrics have been calculated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to calculate metrics. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: DealMetrics) {
    calculateMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries?.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry.charAt(0).toUpperCase() + industry.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="revenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Revenue</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Annual revenue"
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ebitda"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EBITDA</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Annual EBITDA"
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="growthPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Growth Percentage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Annual growth rate"
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={calculateMutation.isPending}
        >
          {calculateMutation.isPending ? "Calculating..." : "Calculate Metrics"}
        </Button>
      </form>
    </Form>
  );
}
