import { useAdminStore } from "@/store/AdminStore/AdminStore";
import {
  AllModule,
  BasicContent,
  Module,
} from "@/store/AdminStore/type/allModule";
import { useEffect, useState } from "react";
import CommonHeader from "../CommonHeader";
import SubmitQuiz from "@/dashboard/components/SubmitQuiz";
import QuizAssessmentCard from "@/dashboard/components/QuizAssessmentCard";
import { ContentItem } from "@/store/AdminStore/type/allContent";

interface ModuleDisplayProps {
  selectBasicContent: BasicContent | null;
  selectModulesId: string | null;
  isHandleProgress: boolean;
}

const VideoSkeleton = () => {
  return (
    <div className="aspect-video w-full overflow-hidden mb-4 animate-pulse bg-gray-200 relative p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({
  selectBasicContent,
  selectModulesId,
  isHandleProgress,
}) => {
  const { singleContent, getSingleContent, courseProgress, mark, allModule } =
    useAdminStore();

  useEffect(() => {
    if (selectModulesId) {
      getSingleContent(selectModulesId);
    }
  }, [selectModulesId]);

  return (
    <div className="w-[70%] space-y-6">
      {isHandleProgress ? (
        <VideoSkeleton />
      ) : (
        <>
          {selectBasicContent && (
            <div className="aspect-video w-full rounded-xl overflow-hidden border mb-4 shadow-sm">
              <video
                src={
                  typeof selectBasicContent.video === "string"
                    ? selectBasicContent.video
                    : URL.createObjectURL(selectBasicContent.video)
                }
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {selectModulesId &&
            courseProgress?.watchedContents?.includes(
              singleContent?.id ?? ""
            ) &&
            singleContent?.contentType && (
              <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-200">
                {/* VIDEO BLOCK */}
                {singleContent.contentType === "VIDEO" &&
                  singleContent.video && (
                    <>
                      <div className="aspect-video w-full rounded-xl overflow-hidden border mb-4 shadow-sm">
                        <video
                          src={singleContent.video}
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </>
                  )}

                {/* DESCRIPTION BLOCK */}
                {singleContent.contentType === "DESCRIPTION" &&
                  singleContent.description && (
                    <div className="text-gray-700 text-base leading-relaxed space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Description
                      </h3>
                      <p>{singleContent.description}</p>
                    </div>
                  )}

                {/* QUIZ BLOCK */}
                {singleContent.contentType === "QUIZ" && singleContent.quiz && (
                  <div className="text-gray-700 text-base">
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Quiz Assessment
                      </h3>
                      <p className="text-gray-700 text-base">
                        <span className="font-medium">Total Marks:</span>{" "}
                        {singleContent.quiz.totalMark}
                      </p>
                    </div>

                    {mark ? (
                      <QuizAssessmentCard
                        submission={mark?.data?.quizSubmission}
                        score={mark?.data?.score}
                        total={mark?.data?.total}
                      />
                    ) : (
                      <SubmitQuiz
                        quizzes={singleContent.quiz.quizzes}
                        contentId={singleContent.quiz.contentId}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
        </>
      )}

      {!selectModulesId && !selectBasicContent && (
        <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-200">
          <CommonHeader className="!pb-4">{allModule?.title}</CommonHeader>
          <div className="rounded-xl overflow-hidden shadow">
            <img
              src={allModule?.thumbnail}
              alt="Program Thumbnail"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleDisplay;
