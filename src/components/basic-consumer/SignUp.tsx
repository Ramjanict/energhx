import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CommonWrapper from "@/common/CommonWrapper";
import DashBoardHeader from "@/common/DashBoardHeader";
import CommonPersonalInfo from "@/common/form/CommonPersonalInfo";
import { basicConsumer, TbasicConsumer } from "./ValidationSchema";
import { FaAngleDoubleRight } from "react-icons/fa";
import { CreateConsumer } from "@/store/consumerStoreType/CreateConsumer";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useConsumerStore } from "@/store/ConsumerStore/ConsumerStore";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TbasicConsumer>({
    resolver: zodResolver(basicConsumer),
  });
  const { createConsumer, getAllCountries, userType } = useConsumerStore();

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  const onSubmit = async (data: TbasicConsumer) => {
    try {
      const newUser: CreateConsumer = {
        ...data,
        ...userType,
      };
      await createConsumer(newUser);
      navigate("/login");
    } catch (error) {
      console.error("Error creating consumer:", error);
    }
  };

  return (
    <CommonWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 px-4"
      >
        <DashBoardHeader>Personal Information</DashBoardHeader>

        <CommonPersonalInfo
          register={register}
          errors={errors}
          control={control}
        />
        <Button
          type="submit"
          className="bg-primary-green text-white py-5 rounded-md cursor-pointer w-fit"
        >
          Continue <FaAngleDoubleRight />
        </Button>
      </form>
    </CommonWrapper>
  );
};

export default SignUp;
