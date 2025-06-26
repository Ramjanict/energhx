import video from "/src/assets/courses/carousel-video.png";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { FaCrown } from "react-icons/fa6";
import ProgressBar from "@/dashboard/components/ProgressBar";
import { WatchedContentProgress } from "@/store/AdminStore/type/allProgress";
import AdminCommonButton from "../../dashboard/Common/AdminCommonButton";
import StarRating from "@/dashboard/components/StarRating";
import { useState } from "react";
import CertificateCard from "@/dashboard/Common/CertificateCard";
import Loading from "@/components/basic-consumer/Loading";

export type CourseData = {
  id: string;
  title: string;
  thumbnail: string;
  averageRating: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  programId: string;
  _count: { modules: number; reviews: number };
};

interface CourseCardProps {
  course: CourseData;
  courseProgress: WatchedContentProgress;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, courseProgress }) => {
  const {
    getAllModule,
    payment,
    isPaymentProcessing,
    submitCertificate,
    isCertificateSubmitting,
    getResult,
    result,
    getCalculatedMark,
    calculatedMark,
    DevUser,
  } = useAdminStore();

  const handlePayment = async (programId: string) => {
    if (programId) {
      await payment(programId);
    }
  };

  const [isModuleFetch, setIsModuleFetch] = useState(false);

  const handleModule = async (id: string) => {
    try {
      setIsModuleFetch(true);
      await getAllModule(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Failed to fetch module:", error);
      // Optionally show an error message to the user
    } finally {
      setIsModuleFetch(false);
    }
  };
  const userId = DevUser?.userId;

  const [isCertificateDownloading, setIsCertificateDownloading] =
    useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleCertificate = async (courseId: string) => {
    if (!userId || !courseId) return;

    try {
      setIsCertificateDownloading(true);

      await submitCertificate(courseId, userId);
      await getResult(courseId, userId);
      await getCalculatedMark(courseId, userId);
    } catch (error) {
      console.error("Certificate handling failed:", error);
    } finally {
      setIsCertificateDownloading(false);
      setShowCertificate(true);
    }
  };
  return (
    <div className=" w-full">
      {isCertificateDownloading ? (
        <Loading />
      ) : (
        <div className="w-full rounded-xl shadow-[0_0_1px_2px_rgba(0,0,0,0.04)] p-4 bg-white transition duration-300 ">
          <div className="flex flex-col md:flex-row gap-10">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full md:w-[250px] h-[200px] object-cover rounded-lg"
            />

            <div className="w-full flex flex-col gap-4">
              <h2 className="font-semibold  text-xl md:text-2xl text-gray-800">
                {course.title}
              </h2>

              <div className="flex  gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <img src={video} alt="Modules" className="w-5 h-5" />
                  <span>{course._count?.modules} modules</span>
                </div>
                <div className="flex items-center">
                  <StarRating />
                </div>
              </div>

              <div className="flex  items-center gap-6  pb-4">
                <button
                  onClick={() => handlePayment(course.programId)}
                  className="cursor-pointer px-4 py-2 rounded-lg bg-primary text-white transition hover:bg-green-500"
                >
                  <div className="flex items-center gap-1 text-xs sm:text-lg">
                    <span>
                      <FaCrown />
                    </span>
                    {isPaymentProcessing ? "Processing..." : " Upgrade"}
                  </div>
                </button>

                <button
                  onClick={() => handleModule(course.id)}
                  className="cursor-pointer px-4 py-2 rounded-lg bg-primary text-white transition hover:bg-green-500"
                >
                  {isModuleFetch ? "Processing..." : " Enroll"}
                </button>
              </div>

              <div className=" flex gap-10 items-center">
                <div className=" flex-1">
                  <ProgressBar percentage={courseProgress?.percentage} />
                </div>
                {courseProgress?.percentage === 100 && (
                  <AdminCommonButton
                    onClick={() => handleCertificate(course.id)}
                  >
                    {isCertificateSubmitting
                      ? "Downloading..."
                      : "Get certificate"}
                  </AdminCommonButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {DevUser?.user && showCertificate && (
        <CertificateCard
          user={DevUser?.user}
          certificate={result}
          calculatedMark={calculatedMark?.data ?? null}
        />
      )}
    </div>
  );
};

export default CourseCard;
