import OverView from "@/common/OverView";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const object = {
  title: "Overview",
  subTitle: "Upgrade Facilities",
  des: "Here is our some lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

  service: [
    "Cras egestas lectus tristique lectus mollis suscipit.",
    "Sed vestibulum nibh sed odio rutrum, id pretium risus luctus.",
    "Maecenas quis ligula sit amet ex dictum egestas.",
    "Mauris nec lorem aliquet, maximus orci at, tristique eros.",
    "Aenean a arcu eu magna interdum blandit non a arcu.",
    "Nunc ut mauris maximus, interdum lectus sit amet, venenatis turpis.",
  ],
  note: "Note: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock",
  button: "Upgrade Now",
  price: 25,
};
const BasicServerDashboard = () => {
  const navigate = useNavigate();

  const { DevToken } = useAdminStore();

  useEffect(() => {
    if (!DevToken) {
      navigate("/basic-server/form");
    }
  }, [DevToken]);

  return (
    <>
      <OverView object={object} />
    </>
  );
};

export default BasicServerDashboard;
