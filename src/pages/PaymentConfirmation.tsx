import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getPaymentById } from "@/services/animeData";
import { PaymentStatus } from "@/types";
import { Clock, CheckCircle, Home, Play, X } from "lucide-react";
import { toast } from "sonner";

const PaymentConfirmation: React.FC = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (paymentId) {
      const paymentDetails = getPaymentById(paymentId);
      if (paymentDetails) {
        setPayment(paymentDetails);
      } else {
        toast.error("Payment not found");
        navigate("/premium");
      }
    }
    setIsLoading(false);
  }, [paymentId, navigate]);

  const getStatusDetails = () => {
    if (!payment) return null;

    switch (payment.status) {
      case "pending":
        return {
          title: "Payment Pending Verification",
          description: "Your payment is being verified by our team. This usually takes a few minutes to a few hours.",
          icon: <Clock className="h-12 w-12 text-yellow-500" />,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100"
        };
      case "completed":
        return {
          title: "Payment Successful!",
          description: "Congratulations! Your premium subscription is now active.",
          icon: <CheckCircle className="h-12 w-12 text-green-500" />,
          color: "text-green-600",
          bgColor: "bg-green-100"
        };
      case "failed":
        return {
          title: "Payment Failed",
          description: "Sorry, your payment couldn't be processed. Please try again.",
          icon: <X className="h-12 w-12 text-red-500" />,
          color: "text-red-600",
          bgColor: "bg-red-100"
        };
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Payment not found</h1>
          <p className="mb-8">The payment details could not be found.</p>
          <Button onClick={() => navigate("/premium")}>
            Go Back to Plans
          </Button>
        </div>
      </div>
    );
  }

  const statusDetails = getStatusDetails();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-16 pt-32 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className={`p-8 text-center ${statusDetails?.bgColor}`}>
            {statusDetails?.icon}
            <h1 className={`text-2xl font-bold mt-4 ${statusDetails?.color}`}>{statusDetails?.title}</h1>
            <p className="mt-2 text-gray-600">{statusDetails?.description}</p>
          </div>
          
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Payment ID</span>
                <span className="font-medium font-mono text-sm">{payment.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">₹{payment.amount}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{new Date(payment.paymentDate).toLocaleDateString()}</span>
              </div>
              {payment.paymentMethod && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">{payment.paymentMethod}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium capitalize ${
                  payment.status === "completed" ? "text-green-600" : 
                  payment.status === "pending" ? "text-yellow-600" : "text-red-600"
                }`}>
                  {payment.status}
                </span>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              {payment.status === "pending" && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    Your payment is awaiting verification by our team. Once verified, your premium features will be activated automatically.
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/")}
                  className="flex-1"
                  variant="outline"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go to Home
                </Button>
                
                <Button 
                  onClick={() => navigate("/browse")}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Browse Anime
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);

export default PaymentConfirmation;
