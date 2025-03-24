
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { getPremiumPlans } from "@/services/animeData";
import { PremiumPlan } from "@/types";

const PremiumPlans: React.FC = () => {
  const navigate = useNavigate();
  const plans = getPremiumPlans();

  const handleSelectPlan = (plan: PremiumPlan) => {
    navigate(`/payment/${plan.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-16 pt-32 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Premium Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full AnimeStream experience with ad-free viewing, HD quality, and exclusive content.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-orange-500 transform scale-105 md:scale-110' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-orange-500 text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-600">/{plan.duration} month{plan.duration > 1 ? 's' : ''}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-orange-600 hover:bg-orange-700' 
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                  size="lg"
                >
                  Select Plan
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Why Go Premium?</h3>
          
          <div className="grid sm:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Ad-Free Experience</h4>
              <p className="text-gray-600">Enjoy uninterrupted viewing without any advertisements.</p>
            </div>
            
            <div>
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Download Episodes</h4>
              <p className="text-gray-600">Watch your favorite anime offline, anytime, anywhere.</p>
            </div>
            
            <div>
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.5 20.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9a2.25 2.25 0 0 1 2.25-2.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25Z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Early Access</h4>
              <p className="text-gray-600">Get episodes before they're available to free users.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PremiumPlans;
