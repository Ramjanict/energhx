interface item {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

interface SettingCommonForm {
  formList: item[];
  ClassName?: string;
}
const SettingCommonForm: React.FC<SettingCommonForm> = ({
  formList,
  ClassName,
}) => {
  return (
    <>
      {formList.map((item) => (
        <form
          className={` text-primary-gray text-sm  sm:text-lg ${ClassName} `}
        >
          <label htmlFor={item.id} className="block w-fit">
            {item.label}
          </label>
          <input
            className=" w-full outline-none  rounded-xs border border-[#9DA6A0] p-2  col-span-3"
            type={item.type}
            placeholder={item.placeholder}
            id={item.id}
          />
        </form>
      ))}
    </>
  );
};

export default SettingCommonForm;
