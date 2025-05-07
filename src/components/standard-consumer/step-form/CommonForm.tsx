import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface item {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  options?: { label: string; value: string }[];
  defaultValue?: string | number;
}

interface CommonFormProps {
  formList: item[];
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => void;
  formData: { [key: string]: string };
  errors?: { [key: string]: string };
}
const CommonForm: React.FC<CommonFormProps> = ({
  formList,
  onChange,
  formData,
  errors = {},
}) => {
  return (
    <>
      <form className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {formList.map((item, i) => (
          <div key={i}>
            <label
              htmlFor={item.id}
              className="block pb-1 text-sm  sm:text-lg text-[#758179]"
            >
              {item.label}
            </label>
            {item.type === "select" ? (
              <Select
                onValueChange={(value) =>
                  onChange({ target: { name: item.name, value } })
                }
              >
                <SelectTrigger className="w-full rounded-none border-1 border-gray-400 py-5">
                  <SelectValue placeholder={item.placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-light-green">
                  {item.options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className=""
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <input
                name={item.name}
                className={`w-full outline-none border p-2 rounded-xs ${
                  errors[item.name] ? "border-red-500" : "border-[#9DA6A0]"
                }`}
                type={item.type}
                placeholder={item.placeholder}
                id={item.id}
                onChange={onChange}
                defaultValue={item.defaultValue || formData[item.name]}
              />
            )}
            {errors[item.name] && (
              <p className="text-red-500 text-xs pt-1">{errors[item.name]}</p>
            )}
          </div>
        ))}
      </form>
    </>
  );
};

export default CommonForm;
