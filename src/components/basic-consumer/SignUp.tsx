import CommonWrapper from "@/common/CommonWrapper";
import DashBoardHeader from "@/common/DashBoardHeader";
import CommonPersonalInfo from "@/common/form/CommonPersonalInfo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicConsumer, TbasicConsumer } from "./ValidationSchema";

import { basicConsumerStore } from "@/store/ConsumerStore";
import { useEffect } from "react";
import ConsumerButton, {
  TconsumerButton,
} from "@/pages/basic-consumer/ConsumerButton";
import { CreateConsumer } from "@/store/ConsumerType";

const SignUp: React.FC<TconsumerButton> = ({ nextStep, prevStep, step }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TbasicConsumer>({
    resolver: zodResolver(basicConsumer),
  });

  const { createConsumer, getAllCountries } = basicConsumerStore();

  const onSubmit = async (data: CreateConsumer) => {
    try {
      const newUser = {
        ...data,
        userRole: "USER",
        userType: "Energy Installers",
      };
      createConsumer(newUser);
      nextStep();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <CommonWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-8 px-4 pt-10"
      >
        <DashBoardHeader>Personal Information</DashBoardHeader>

        <CommonPersonalInfo
          register={register}
          errors={errors}
          control={control}
        />

        <ConsumerButton
          prevStep={prevStep}
          nextStep={nextStep}
          step={step}
          className="py-10"
        />
      </form>
    </CommonWrapper>
  );
};

export default SignUp;
