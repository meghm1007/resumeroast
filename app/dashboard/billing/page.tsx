"use client";
import { Button } from "@/components/ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Coins, CreditCard, Check } from "lucide-react";
import React, { useContext, useState, useRef } from "react";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import { db } from "@/utils/db";
import { User } from "@/utils/schema";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { useRouter } from "next/navigation";
import { FaCcPaypal, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { eq } from "drizzle-orm";

interface CreditOption {
  credits: number;
  amount: number;
  description: string;
  popular?: boolean;
}

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

  const selectedCreditsRef = useRef(creditOptions[1]);
  const [selectedCredits, setSelectedCredits] = useState<CreditOption>(
    creditOptions[1]
  );
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const onPaymentSuccess = async () => {
    console.log("payment success");

    // Early return if required values are missing
    if (!userDetail?.id || !selectedCreditsRef.current?.credits) {
      console.error("Missing required information:", {
        userId: userDetail?.id,
        selectedCredits: selectedCreditsRef.current?.credits,
      });
      return;
    }

    try {
      const result = await db
        .update(User)
        .set({
          credits:
            (userDetail.credits || 0) + selectedCreditsRef.current.credits,
        })
        .where(eq(User.id, userDetail.id))
        .returning();

      console.log("Update result:", result);

      if (result && result.length > 0) {
        setUserDetail((prev: any) => ({
          ...prev,
          credits: (prev.credits || 0) + selectedCreditsRef.current.credits,
        }));
        router.push("/dashboard");
      } else {
        console.error("No rows were updated");
      }
    } catch (error) {
      console.error("Error updating credits:", error);
    }
  };

  const handleCreateOrder = (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    console.log("Creating order with amount:", selectedCredits.amount);
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: selectedCredits.amount.toString(),
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const handleCreditSelection = (option: CreditOption) => {
    console.log("Selected credit option:", option);
    setSelectedCredits(option);
    selectedCreditsRef.current = option;
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
            onClick={() => handleCreditSelection(option)}
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
          <>
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-3">
                Secure payment powered by PayPal
              </p>
              <div className="flex justify-center items-center gap-4 text-gray-400">
                <FaCcPaypal className="w-8 h-8" />
                <FaCcVisa className="w-8 h-8" />
                <FaCcMastercard className="w-8 h-8" />
                <FaCcAmex className="w-8 h-8" />
              </div>
            </div>
            <PayPalButtons
              onApprove={async () => await onPaymentSuccess()}
              onCancel={() => console.log("payment cancelled")}
              onError={(err) => console.log(err)}
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                console.log(
                  "Selected amount:",
                  selectedCreditsRef.current.amount
                );
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        value: selectedCreditsRef.current.amount.toString(),
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          </>
        )}
      </div>

      <div className="mt-6">
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>Credits never expire and can be used for any AI-powered feature</p>
          <div className="flex items-center justify-center gap-2 text-xs">
            <CreditCard className="w-4 h-4" />
            <span>256-bit SSL Encrypted Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingPage;
