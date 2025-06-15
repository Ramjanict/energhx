import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayCircle } from "lucide-react";

type ModuleContent = {
  id: string;
  title: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
};

type ModuleInterfaceProps = {
  module: ModuleContent[];
  setVideoUrl: (url: string) => void;
};

const ModuleInterface: React.FC<ModuleInterfaceProps> = ({
  module,
  setVideoUrl,
}) => {
  return (
    <div className="rounded-xl shadow-[0_0_1px_2px_rgba(0,0,0,0.04)] bg-white p-6  w-[40%] ">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Course Modules
      </h2>

      <Accordion type="single" collapsible className="w-full space-y-2 ">
        {module.map((content) => (
          <AccordionItem
            key={content.id}
            value={content.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md"
          >
            <AccordionTrigger className="px-4 py-3 text-lg font-medium bg-gray-50 hover:bg-gray-100 text-left flex justify-between items-center hover:no-underline cursor-pointer">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-green-600" />
                <span>{content.title}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="overflow-hidden transition-[height] duration-300 ease-in-out bg-white border-t border-gray-100 px-4 py-3">
              <div className="text-sm text-gray-700 space-y-2">
                <p
                  onClick={() => setVideoUrl(content.video)}
                  className=" cursor-pointer"
                >
                  <strong>Title:</strong> {content.title}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ModuleInterface;
