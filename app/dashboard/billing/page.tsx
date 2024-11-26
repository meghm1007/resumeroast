import React, { useState } from "react";

function BillingPage() {
  const creditOptions = [
    {
      credits: 10,
      amount: "$10",
    },
    {
      credits: 20,
      amount: "$20",
    },
    {
      credits: 30,
      amount: "$30",
    },
    {
      credits: 40,
      amount: "$40",
    },
    {
      credits: 50,
      amount: "$50",
    },
  ];

  const [selectedCredits, setSelectedCredits] = useState(creditOptions[0]);
  return (
    <div className="">
      
    </div>
  );
}

export default BillingPage;
