import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayCircle } from "lucide-react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { AllModule } from "@/store/AdminStore/type/allModule";
import CommonHeader from "../CommonHeader";

type ModuleInterfaceProps = {
  modules: AllModule;
  setSingleContentId: (id: string) => void;
  handleSetProgress: (courseId: string, singleContentId: string) => void;
  handleGetProgress: (courseId: string) => void;
};

const ModuleInterface: React.FC<ModuleInterfaceProps> = ({
  modules,
  setSingleContentId,
  handleSetProgress,
  handleGetProgress,
}) => {
  const [courseId, setCourseId] = useState("");
  const { getAllContent, allContent, getSingleContent, courseProgress } =
    useAdminStore();

  const handleContent = async (moduleId: string) => {
    if (moduleId) {
      await getAllContent(moduleId);
    }
  };

  const displayObject = modules?.basicContents?.length
    ? modules.basicContents
    : modules.modules ?? [];

  const handleSingleContent = async (id: string) => {
    await getSingleContent(id);
    setSingleContentId(id);
  };

  const handleProgress = (courseId: string, singleContentId: string) => {
    handleSingleContent(singleContentId);
    handleSetProgress(courseId, singleContentId);
    handleGetProgress(courseId);
  };

  useEffect(() => {
    if (courseId) {
      handleGetProgress(courseId);
    }
  }, [courseId]);

  return (
    <div className="rounded-2xl shadow-[0_0_1px_2px_rgba(0.04)] bg-white w-[30%] ">
      <CommonHeader className="!pb-4">Course Modules</CommonHeader>

      <Accordion type="single" collapsible className="  flex flex-col gap-2">
        {displayObject.map((module) => (
          <AccordionItem
            onClick={() => {
              handleContent(module.id);
              setCourseId(module.courseId);
            }}
            key={module.id}
            value={module.id}
            className="border border-gray-200 rounded-xl overflow-hidden transition hover:shadow-lg"
          >
            <AccordionTrigger className="px-6 py-4 text-lg  font-medium bg-gray-50 hover:bg-gray-100 text-left flex justify-between items-center hover:no-underline cursor-pointer">
              <div className="flex items-center gap-3">
                <PlayCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-800">{module.title}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="bg-white border-t px-6 py-4 space-y-4 text-gray-700 text-sm">
              {allContent?.contents.map((content) => (
                <div
                  key={content.id}
                  onClick={() => handleProgress(content.courseId, content.id)}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-100 shadow-sm cursor-pointer"
                >
                  <div className="font-semibold text-base text-gray-800 ">
                    {content.title}
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-4">
                    {content.description}
                  </div>
                  <div className=" flex justify-between py-2">
                    <div className="text-xs font-medium text-green-600 uppercase mt-1">
                      {content.contentType}
                    </div>
                    <div className="text-xs font-medium text-red-600 uppercase mt-1">
                      {courseProgress?.watchedContents?.includes(content.id)
                        ? "Completed"
                        : "Locked"}
                    </div>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ModuleInterface;
