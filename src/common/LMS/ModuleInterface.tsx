import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayCircle } from "lucide-react";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import CommonHeader from "../CommonHeader";
import AddComment, { ReviewSchema } from "@/dashboard/components/AddComment";
import ReviewCard from "@/dashboard/components/ReviewCard";

import {
  AllModule,
  BasicContent,
  Module,
} from "@/store/AdminStore/type/allModule";
import { ContentItem } from "@/store/AdminStore/type/allContent";

type ModuleInterfaceProps = {
  handleProgress: (courseId: string, singleContentId: string) => void;
  setSelectBasicContent: (data: BasicContent | null) => void;
};

const ModuleInterface: React.FC<ModuleInterfaceProps> = ({
  handleProgress,
  setSelectBasicContent,
}) => {
  const [courseId, setCourseId] = useState("");
  const [selectedReview, setSelectedReview] = useState<ReviewSchema | null>(
    null
  );
  const [reviewId, setReviewId] = useState<string | null>(null);

  const [isAddReviewOpen, isSetAddReviewOpen] = useState(false);
  const {
    getAllContent,
    allContent,
    courseProgress,
    getMyReview,
    allModule,
    myReview,
  } = useAdminStore();

  const handleContent = async (moduleId: string) => {
    if (moduleId) {
      // call single module only standard or certified
      await getAllContent(moduleId);
    }
  };

  const basicContents = allModule?.basicContents;
  const modules = allModule?.modules;

  useEffect(() => {
    getMyReview();
  }, []);

  const handleReview = (data: ReviewSchema, id: string) => {
    setSelectedReview(data);
    isSetAddReviewOpen(true);
    setReviewId(id);
  };

  console.log("modules", modules);
  return (
    <div className="w-[30%] ">
      <div className="rounded-2xl shadow-[0_0_1px_2px_rgba(0.04)] bg-white w-full pb-6 ">
        <CommonHeader className="!pb-4">Course Modules</CommonHeader>

        {basicContents && (
          <Accordion
            type="single"
            collapsible
            className="  flex flex-col gap-2"
          >
            {basicContents.map((basicContent) => (
              <AccordionItem
                key={basicContent.id}
                value={basicContent.id}
                onClick={() => setSelectBasicContent(basicContent)}
                className="border border-gray-200 rounded-xl overflow-hidden transition hover:shadow-lg"
              >
                <AccordionTrigger className="px-6 py-4 text-lg  font-medium bg-gray-50 hover:bg-gray-100 text-left flex justify-between items-center hover:no-underline cursor-pointer">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-6 h-6 text-green-600" />
                    <span className="text-gray-800">{basicContent.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-white border-t px-6 py-4 space-y-4 text-gray-700 text-sm">
                  <p>{basicContent.title}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {modules && (
          <Accordion
            type="single"
            collapsible
            className="  flex flex-col gap-2"
          >
            {modules.map((module) => (
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
                      onClick={() => {
                        handleProgress(content.courseId, content.id);
                      }}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-100 shadow-sm cursor-pointer"
                    >
                      <div className="font-semibold text-base text-gray-800 ">
                        {content.title}
                        {content?.videoDuration}
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
        )}
      </div>

      {courseId &&
        (myReview?.length > 0 && !isAddReviewOpen ? (
          <ReviewCard review={myReview} handleReview={handleReview} />
        ) : (
          <AddComment
            courseId={courseId}
            selectedReview={selectedReview}
            reviewId={reviewId}
            isSetAddReviewOpen={isSetAddReviewOpen}
          />
        ))}
    </div>
  );
};

export default ModuleInterface;
