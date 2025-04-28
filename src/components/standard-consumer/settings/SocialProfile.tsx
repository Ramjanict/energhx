import CommonButton from "@/common/CommonButton";
import SettingCommonForm from "./SettingCommonForm";

const formList = [
  {
    label: "Facebook",
    id: "first",
    type: "text",
    placeholder: "https//facebook.com/username",
  },
  {
    label: "Instagram",
    id: "second",
    type: "text",
    placeholder: "https//facebook.com/username",
  },
  {
    label: "YouTube",
    id: "YouTube",
    type: "text",
    placeholder: "https//facebook.com/username",
  },
  {
    label: "LinkedIn",
    id: "LinkedIn",
    type: "text",
    placeholder: "https//facebook.com/username",
  },
];
const SocialProfile = () => {
  return (
    <div className="">
      <h2 className="text-lg text-[#112518]  py-6">Social Media</h2>
      <div className="pb-10  flex flex-col gap-6">
        <SettingCommonForm
          formList={formList}
          ClassName=" grid sm:grid-cols-4 "
        />
      </div>

      <CommonButton> Save Social Media</CommonButton>
    </div>
  );
};

export default SocialProfile;
