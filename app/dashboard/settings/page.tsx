import { UserProfile } from "@clerk/nextjs";
import React from "react";

function SettingsPage() {
  return (
    <div className="flex items-center justify-center h-full m-10">
      <UserProfile routing="hash" />
    </div>
  );
}

export default SettingsPage;
