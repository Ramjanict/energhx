import CommonWrapper from "./CommonWrapper";

const notificationList = [
  {
    title: "Energhx New Fan Light Fix",
    time: "02 Minutes Ago",
  },
  {
    title: "Energhx New Fan Light Fix",
    time: "02 Minutes Ago",
  },
  {
    title: "Energhx New Fan Light Fix",
    time: "02 Minutes Ago",
  },
  {
    title: "Energhx New Fan Light Fix",
    time: "02 Minutes Ago",
  },
  {
    title: "Energhx New Fan Light Fix",
    time: "02 Minutes Ago",
  },
];

const NotificationPopUp = () => {
  return (
    <CommonWrapper>
      <div className=" w-full flex justify-end   ">
        <div className="bg-white rounded-xl px-3 pt-3  shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] max-w-[384px]  ">
          <div className="pb-4">
            <button className="w-full px-4 py-2 rounded-md bg-primary text-white ">
              Notification
            </button>
          </div>
          <div className="flex flex-col text-primary-gray">
            {notificationList.map((item, i) => (
              <div
                className="w-full flex justify-between items-start py-4  border-b border-[#E7E9E8]"
                key={i}
              >
                <div className="text-base font-medium">
                  <p>#12{i}</p>
                  <h2>{item.title}</h2>
                </div>
                <div className=" text-xs">
                  <p>{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[#00ADFF] py-4 text-center  ">
            See All Incoming Activity
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default NotificationPopUp;
