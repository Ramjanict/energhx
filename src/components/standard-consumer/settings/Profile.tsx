import camera from "../../../assets/camera.svg";
import banner from "../../../assets/profile-banner.jpeg";
import { RiDeleteBinLine } from "react-icons/ri";
import user from "../../../assets/man.jpeg";
import SettingCommonForm from "./SettingCommonForm";
import CommonButton from "@/common/CommonButton";

const formList = [
  {
    label: "First Name",
    id: "first",
    type: "text",
    placeholder: "Type here",
  },
  {
    label: "Last Name",
    id: "second",
    type: "text",
    placeholder: "Type here",
  },
  {
    label: "User Name",
    id: "third",
    type: "text",
    placeholder: "Type here",
  },
  {
    label: "Phone Number",
    id: "Streets",
    type: "number",
    placeholder: "Type here",
  },
  {
    label: "Skill/Occupation",
    id: "City",
    type: "text",
    placeholder: "Type here",
  },
  {
    label: "Time zone",
    id: "time",
    type: "text",
    placeholder: "Type here",
  },
];
const Profile = () => {
  return (
    <>
      <div className="max-h-60  w-full relative ">
        <img
          className="w-full max-h-60  object-cover rounded-lg "
          src={banner}
          alt="Banner"
        />
        <label className=" absolute -bottom-10 pl-10 z-10 cursor-pointer">
          <div className=" relative !overflow-hidden rounded-full ">
            <img
              className="w-30 h-30 sm:w-45 sm:h-45 border-2 border-white rounded-full"
              src={user}
              alt=""
            />
            <div className=" absolute flex items-center justify-center bottom-2 w-full py-2 bg-black/50">
              <img className="w-5 h-5 " src={camera} alt="" />
            </div>
          </div>
          <input type="file" className=" hidden" />
        </label>

        <div className=" flex flex-col h-60  absolute  justify-between top-0 right-0  p-3 ">
          <div className="p-2.5 bg-white/20 w-12 h-12 rounded-full text-2xl flex items-center justify-center text-white  self-end  cursor-pointer">
            <RiDeleteBinLine />
          </div>
          <label className="sm:flex items-center gap-1 bg-primary text-white rounded-sm p-1.5 w-fit px-2 cursor-pointer hidden">
            <img src={camera} alt="" />
            <p>Upload Cover Photo</p>
            <input type="file" className=" hidden " />
          </label>
        </div>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 py-10">
        <SettingCommonForm formList={formList} />
      </div>

      <div className="pb-10">
        <textarea
          className="w-full outline-none  rounded-xs border border-[#9DA6A0] p-2  "
          rows={5}
          placeholder="Enter your bio"
        />
      </div>
      <CommonButton>Save Profile</CommonButton>
    </>
  );
};

export default Profile;
