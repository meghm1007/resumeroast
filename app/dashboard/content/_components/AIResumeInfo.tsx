// import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import React, { useContext, useState } from "react";
import PersonalInfo from "./PersonalInfo";

function AIResumeInfo() {
  //   const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);

  const [activeFormIndex, setActiveFormIndex] = useState(1);

  return (
    <div>
      {/* Next and Back toggle buttons */}

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
      {activeFormIndex == 1 ? <PersonalInfo /> : null}
    </div>
  );
}

export default AIResumeInfo;
