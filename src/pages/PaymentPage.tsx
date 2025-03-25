
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPlanById, createPayment } from "@/services/animeData";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

// Form schema
const paymentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits."),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format."),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits."),
  paymentMethod: z.enum(["Credit Card", "Debit Card"]),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const plan = planId ? getPlanById(planId) : undefined;
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paymentMethod: "Credit Card",
    },
  });
  
  const onSubmit = (data: PaymentFormValues) => {
    setIsSubmitting(true);
    
    // Create a new payment
    const payment = createPayment({
      id: `payment-${uuidv4().slice(0, 8)}`,
      userId: `user-${uuidv4().slice(0, 8)}`,
      planId: planId || "",
      amount: plan?.price || 0,
      paymentDate: new Date().toISOString(),
      status: "pending",
      paymentMethod: data.paymentMethod,
    });
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Payment Processing",
        description: "Your payment is being processed. You will be redirected shortly.",
      });
      
      // Redirect to confirmation page
      navigate(`/payment/confirmation/${payment.id}`);
    }, 2000);
  };
  
  if (!plan) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Plan Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">Sorry, the selected plan was not found.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate("/premium")}>View Available Plans</Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.duration} days subscription</p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Features:</p>
                  <ul className="space-y-1 pl-5 list-disc">
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{(plan.price / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg mt-4">
                    <span>Total</span>
                    <span>₹{(plan.price / 100).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name on Card</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-4"
                            >
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <RadioGroupItem value="Credit Card" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Credit Card
                                </FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <RadioGroupItem value="Debit Card" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Debit Card
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234 5678 9012 3456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="•••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : `Pay ₹${(plan.price / 100).toFixed(2)}`}
                    </Button>
                    
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      Your payment information is secure. We use industry-standard encryption to protect your data.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;
