import { useAdminStore } from "@/store/AdminStore/AdminStore";

interface VideoInterface {
  videoUrl: string;
}

const VideoInterface: React.FC<VideoInterface> = ({ videoUrl }) => {
  const { allModule } = useAdminStore();
  return (
    <div className="w-[60%]">
      {videoUrl ? (
        <div className="aspect-video w-full rounded-md overflow-hidden border">
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        allModule?.thumbnail && (
          <img
            className=" w-full max-h-[400px] object-cover rounded-md "
            src={allModule.thumbnail}
            alt=""
          />
        )
      )}
    </div>
  );
};

export default VideoInterface;
