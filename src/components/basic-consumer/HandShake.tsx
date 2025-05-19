import handshake from "../../assets/Profile/handshake.png";
import snap from "../../assets/Profile/snap.svg";
import t from "../../assets/Profile/t.svg";
import linkedin from "../../assets/Profile/linkedin.svg";
import dribble from "../../assets/Profile/dribble.svg";
import { MdClose } from "react-icons/md";

interface HandShake {
  handleClose: () => void;
}
const HandShake: React.FC<HandShake> = ({ handleClose }) => {
  return (
    <div className="w-full h-screen fixed inset-0 backdrop-blur-md  bg-black/30 flex items-center  justify-center z-50 min-h-full">
      <div className="bg-white rounded-xl  max-w-[430px] ">
        <div
          onClick={handleClose}
          className=" cursor-pointer  w-full  flex justify-end p-2"
        >
          <MdClose />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center px-10 py-4">
          <div className=" w-30 h-30">
            <img className="w-full h-full" src={handshake} alt="" />
          </div>
          <h2 className="text-[#758179] text-xl font-secondary font-extrabold text-center">
            Thanks <br /> for you Booking
          </h2>
          <h2 className=" border-b border-[#9DA6A0]">Follow US</h2>
          <div>
            <div className="flex gap-4">
              <img src={dribble} alt="" />
              <img src={linkedin} alt="" />
              <img src={t} alt="" />
              <img src={snap} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandShake;
