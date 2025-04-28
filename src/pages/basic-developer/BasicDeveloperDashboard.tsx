import OverView from "@/common/OverView";
import OrderModal from "@/components/Appointment/OrderModal";
import HandShake from "@/components/basic-consumer/HandShake";
import { useState } from "react";

const object = {
  title: "OverView",
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

const BasicDeveloperDashboard = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    postcode: "",
    phone: "",
  });
  const [showHand, setShowHand] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderModalOpen(false);
  };
  const handleNext = () => {
    setIsOrderModalOpen(true);
  };
  const handleNextOrder = () => {
    setShowHand(true);
  };

  return (
    <div>
      <OverView handleNext={handleNext} object={object} />
      {isOrderModalOpen && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          formData={formData}
          handleChange={handleChange}
          handleOrderSubmit={handleOrderSubmit}
          handleNextOrder={handleNextOrder}
        />
      )}
      {showHand && <HandShake setShowHand={setShowHand} />}
    </div>
  );
};

export default BasicDeveloperDashboard;
