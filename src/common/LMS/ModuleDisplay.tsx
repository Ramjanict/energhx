import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { AllModule } from "@/store/AdminStore/type/allModule";
import { useEffect } from "react";
import CommonHeader from "../CommonHeader";
import SubmitQuiz from "@/dashboard/components/SubmitQuiz";

interface ModuleDisplayProps {
  modules: AllModule;
  singleContentId: string | null;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({
  modules,
  singleContentId,
}) => {
  const { singleContent, getSingleContent, courseProgress, mark } =
    useAdminStore();

  useEffect(() => {
    if (singleContentId) {
      getSingleContent(singleContentId);
    }
  }, []);

  console.log("mark=============", mark);
  return (
    <div className="w-[70%] space-y-6">
      {courseProgress?.watchedContents?.includes(singleContent?.id ?? "") &&
      singleContent?.contentType ? (
        <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-200">
          {singleContent?.contentType === "VIDEO" && singleContent.video && (
            <div className="aspect-video w-full rounded-xl overflow-hidden border mb-4 shadow-sm">
              <video
                src={singleContent.video ?? undefined}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {singleContent?.contentType === "DESCRIPTION" &&
            singleContent.description && (
              <div className="text-gray-700 text-base leading-relaxed space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p>{singleContent.description}</p>
              </div>
            )}

          {singleContent?.contentType === "QUIZ" && singleContent.quiz && (
            <div className="text-gray-700 text-base">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quiz Summary
              </h3>
              <p>Total Marks: {singleContent.quiz.totalMark}</p>

              <SubmitQuiz
                quizzes={singleContent?.quiz.quizzes}
                contentId={singleContent.quiz.contentId}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-200">
          <CommonHeader className="!pb-4">{modules.title}</CommonHeader>
          <div className="rounded-xl overflow-hidden shadow">
            <img
              src={modules.thumbnail}
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
