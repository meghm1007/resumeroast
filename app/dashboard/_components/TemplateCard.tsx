import React from "react";
import { TEMPLATE } from "./TemplateListSection";
import Image from "next/image";
import Link from "next/link";

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={"/dashboard/content/" + item?.slug}>
      <div
        className="p-5 shadow-md rounded-md border bg-white 
        flex flex-col items-center justify-center gap-2 cursor-pointer 
        hover:scale-105 transition-all"
        style={{ width: "300px", height: "300px" }} // Fixed width and height for square
      >
        <Image src={item.icon} alt={item.name} width={50} height={50} />
        <h2 className="font-medium text-lg text-center">{item.name}</h2>
        <p className="text-gray-500 text-center overflow-hidden">
          {item.desc}
        </p>
      </div>
    </Link>
  );
}

export default TemplateCard;