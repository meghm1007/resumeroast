import React from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Image from "next/image";

interface PROPS {
  selectedTemplate?: TEMPLATE;
}

function FormSection({ selectedTemplate }: PROPS) {
  return (
    <div className="p-5 shadow-md border rounded-lg">
      <Image src={selectedTemplate?.icon} alt="icon" width={50} height={50} />
      <h2 className="font-boldtext-2xl mb-2 text-primary">
        {selectedTemplate?.name}
      </h2>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>
      <form>
        {}
      </form>
    </div>
  );
}

export default FormSection;
