// import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import React, { useContext, useState } from "react";

function AIResumeInfo() {
  //   const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);

  const [activeFormIndex, setActiveFormIndex] = useState(3);

  return (
    <div>
        {/* Personal Details */}
        
      <div className="flex justify-between items-center">
        <Button className="flex gap-2" variant={"outline"} size="sm">
          <LayoutGrid /> Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              size="sm"
              className=""
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            className="flex gap-2"
            size="sm"
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Details */}
      <div className="p-5 shadow-lgrounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Personal Details</h2>
        <p className="">Get Started With Some Basic Information</p>
      </div>
    </div>
  );
}

export default AIResumeInfo;
