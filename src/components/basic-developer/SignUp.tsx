import { ContinueButtonType } from "@/types";
import ContinueButton from "@/common/ContinueButton";
import DashBoardHeader from "@/common/DashBoardHeader";
import CommonPersonalInfo from "@/common/form/CommonPersonalInfo";
import CommonDropdown from "@/common/form/CommonDropdown";
import FormSubheader from "../../common/FormSubheader";
import { useForm } from "react-hook-form";
import {
  basicConsumer,
  TbasicConsumer,
} from "../basic-consumer/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
const SignUp: React.FC<ContinueButtonType> = ({ nextStep, prevStep }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TbasicConsumer>({
    resolver: zodResolver(basicConsumer),
  });
  const onSubmit = async (data: TbasicConsumer) => {
    try {
      nextStep?.();

      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DashBoardHeader>Sung Up</DashBoardHeader>
      <CommonPersonalInfo
        control={control}
        register={register}
        errors={errors}
      />
      <div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col mt-5 ">
          <FormSubheader> Internship Interest</FormSubheader>
          <span className="text-primary-gray font-extralight mt-2">
            Internship Interest (must select at least one)
          </span>
          <CommonDropdown />
        </div>
      </div>
      <ContinueButton prevStep={prevStep} />
    </form>
  );
};

export default SignUp;
