"use client";
import { Button } from "@/components/ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Coins, CreditCard, Sparkles, Check } from "lucide-react";
import React, { useContext, useState } from "react";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import { db } from "@/utils/db";
import { User } from "@/utils/schema";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { useRouter } from "next/navigation";

function BillingPage() {
  const creditOptions = [
    {
      credits: 100,
      amount: 10,
      description: "Perfect for small projects",
    },
    {
      credits: 250,
      amount: 20,
      description: "Most popular for medium projects",
      popular: true,
    },
    {
      credits: 500,
      amount: 35,
      description: "Best value for larger projects",
    },
    {
      credits: 1000,
      amount: 60,
      description: "Ideal for professional use",
    },
    {
      credits: 2000,
      amount: 100,
      description: "Enterprise-grade capacity",
    },
  ];

  const [selectedCredits, setSelectedCredits] = useState(creditOptions[1]); // Default to most popular option
  const { userDetail, getUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const onPaymentSuccess = async () => {
    console.log("payment success");
    const result = await db
      .update(User)
      .set({
        credits: userDetail?.credits + selectedCredits?.credits,
      })
      .returning({ id: User.id });

    if (result) {
      setUserDetail((prev: any) => ({
        ...prev,
        credits: userDetail?.credits + selectedCredits?.credits,
      }));
      router.push("/dashboard");
    }

    //update the credits in the database
  };

  const handleCreateOrder = (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: Math.round(selectedCredits.amount).toString(),
            currency_code: "USD",
          },
        },
      ],
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Purchase Credits</h1>
        <p className="text-gray-600">
          Choose the credit package that suits your needs
        </p>
      </div>

      <div className="grid gap-6">
        {creditOptions.map((option) => (
          <div
            key={option.credits}
            className={`relative border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md
              ${
                selectedCredits.credits === option.credits
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            onClick={() => setSelectedCredits(option)}
          >
            {option.popular && (
              <span className="absolute -top-3 right-4 bg-primary text-white text-sm px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full 
                  ${
                    selectedCredits.credits === option.credits
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {option.credits} Credits
                  </h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">${option.amount}</span>
                {selectedCredits.credits === option.credits && (
                  <div className="text-primary">
                    <Check className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        {selectedCredits?.amount && (
          <PayPalButtons
            onApprove={async () => await onPaymentSuccess()}
            onCancel={() => console.log("payment cancelled")}
            onError={(err) => console.log(err)}
            style={{ layout: "horizontal" }}
            createOrder={handleCreateOrder}
          />
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Credits never expire and can be used for any AI-powered feature
      </div>
    </div>
  );
}

export default BillingPage;
