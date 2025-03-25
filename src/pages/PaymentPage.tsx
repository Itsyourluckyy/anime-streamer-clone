import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { createPayment, getPlanById } from "@/services/animeData";
import { PremiumPlan } from "@/types";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle, DollarSign } from "lucide-react";

const PaymentPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<PremiumPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    if (planId) {
      const selectedPlan = getPlanById(planId);
      if (selectedPlan) {
        setPlan(selectedPlan);
      } else {
        toast.error("Invalid plan selected");
        navigate("/premium");
      }
    }
    setIsLoading(false);
  }, [planId, navigate]);

  const handleInitiatePayment = () => {
    if (!plan) return;
    
    // In a real app, we would authenticate the user first
    // Here we just use a mock user ID
    const userId = "user_" + Date.now().toString();
    
    const payment = createPayment(userId, plan.id, plan.price);
    setPaymentId(payment.id);
    setPaymentInitiated(true);
    
    toast.success("Payment initiated. Scan the QR code to pay");
  };

  const handleConfirmPayment = () => {
    if (paymentId) {
      navigate(`/payment/confirmation/${paymentId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Plan not found</h1>
          <p className="mb-8">The selected plan could not be found.</p>
          <Button onClick={() => navigate("/premium")}>
            Go Back to Plans
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-16 pt-32 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => navigate("/premium")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Plans
        </Button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-orange-600 text-white p-6">
            <h1 className="text-2xl font-bold">Complete Your Payment</h1>
            <p className="opacity-90">You're just one step away from premium anime content</p>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{plan.duration} month{plan.duration > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-medium">₹{plan.price}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{plan.price}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {!paymentInitiated ? (
                    <Button 
                      onClick={handleInitiatePayment}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      size="lg"
                    >
                      <DollarSign className="h-5 w-5 mr-2" />
                      Pay Now
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleConfirmPayment}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      I've Completed Payment
                    </Button>
                  )}
                  
                  <p className="text-sm text-gray-500 text-center">
                    By proceeding with the payment, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
              
              <div className={`${!paymentInitiated ? 'opacity-50' : ''} transition-opacity duration-300`}>
                <h2 className="text-xl font-semibold mb-4 text-center">Scan QR Code to Pay</h2>
                
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 flex flex-col items-center">
                  <div className="w-full max-w-[250px] mx-auto">
                    <img 
                      src="/lovable-uploads/c5808b16-a107-4ad6-97bf-87febcd4776f.png" 
                      alt="PhonePe Payment QR Code" 
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <div className="text-center mt-4 space-y-1">
                    <p className="font-semibold text-lg">Scan & Pay Using PhonePe App</p>
                    <p className="text-gray-600 text-sm">Shivraj Singh</p>
                  </div>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  {paymentInitiated ? (
                    <p>After completing payment, click "I've Completed Payment" button to verify.</p>
                  ) : (
                    <p>Click "Pay Now" to initiate payment process</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;
