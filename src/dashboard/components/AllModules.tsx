import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/store/AdminStore/AdminStore";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { AllContentType } from "../pages/Content";

interface AllModulesProps {
  errors: FieldErrors<AllContentType>;
  control: Control<AllContentType>;
}

const AllModules: React.FC<AllModulesProps> = ({ control, errors }) => {
  const { allModule, getAllContent } = useAdminStore();

  return (
    <div>
      <Controller
        name="moduleId"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              getAllContent(value);
            }}
            value={field.value}
          >
            <SelectTrigger className="outline-none text-primary-gray rounded w-[180px]">
              <SelectValue placeholder="Choose Module" />
            </SelectTrigger>
            <SelectContent className="bg-light-green">
              {allModule?.modules?.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  {module.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.moduleId && (
        <p className="text-red-500 text-xs">{errors.moduleId.message}</p>
      )}
    </div>
  );
};

export default AllModules;
