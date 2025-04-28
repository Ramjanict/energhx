import image_1 from "../../assets/history/Rectangle 1.png";
import image_2 from "../../assets/history/Rectangle 2.png";
import image_3 from "../../assets/history/Rectangle 3.png";
import image_4 from "../../assets/history/Rectangle 4.png";
import image_5 from "../../assets/history/Rectangle 5.png";

const historyData = [
  {
    id: 1,
    title: "Purchases: Energhx Fan Fixing Course",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    time: "12:45 PM",
    date: "20 February 2024",
    icon: image_1,
  },
  {
    id: 2,
    title: "New Course: Energhx Fan Fixing Course",
    description:
      "It is a long established fact that a reader will be distracted...",
    time: "12:45 PM",
    date: "20 February 2024",
    icon: image_2,
  },
  {
    id: 3,
    title: "Completed Course: Energhx Fan Fixing Course",
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum...",
    time: "12:45 PM",
    date: "20 February 2024",
    icon: image_3,
  },
  {
    id: 4,
    title: "Purchases: Energhx Fan Fixing Course",
    description:
      "Various versions have evolved over the years, sometimes by accident...",
    time: "12:45 PM",
    date: "20 February 2024",
    icon: image_4,
  },
  {
    id: 5,
    title: "Cancel Course: Energhx Fan Fixing Course",
    description:
      "Lorem Ipsum is therefore always free from repetition, injected humour...",
    time: "12:45 PM",
    date: "20 February 2024",
    icon: image_5,
  },
];

const StandardHistory = () => {
  return (
    <div className="mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">
        History
      </h2>
      <div className="space-y-4">
        {historyData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-white shadow-md rounded-lg"
          >
            {/* Image Section */}
            <img
              src={item.icon}
              alt={item.title}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />

            {/* Content Section */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-normal text-[#394A3F] text-[18px]">
                {item.title}
              </h3>
              <p className="text-[#758179] text-[14px]">{item.description}</p>
            </div>

            {/* Date & Time Section */}
            <div className="text-[#758179] text-[14px] text-center sm:text-right">
              <p>{item.time}</p>
              <p>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StandardHistory;
