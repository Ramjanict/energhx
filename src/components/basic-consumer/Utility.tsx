import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashBoardHeader from "@/common/DashBoardHeader";
import ContinueButton from "@/common/ContinueButton";
import Breadcrumbs from "@/common/Breadcrumbs";
import lightGreen from "../../assets/Profile/lightGreen.svg";
import { basicConsumerStore } from "@/store/ConsumerStore";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tutility, utility } from "./ValidationSchema";
import { TconsumerButton } from "@/pages/basic-consumer/ConsumerButton";

const Utility: React.FC<TconsumerButton> = ({ prevStep, nextStep }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Tutility>({
    resolver: zodResolver(utility),
  });
  const {
    allCommodities,
    getAllCommodities,
    getAllServices,
    allServices,
    user,
  } = basicConsumerStore();

  console.log("user", user);

  const countryId = user?.country.id;
  const statesId = user?.country?.states[0]?.id;
  const onSubmit = async () => {
    try {
      getAllCommodities();
      nextStep();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllCommodities();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-10 px-4 flex flex-col h-[calc(100vh-120px)] "
    >
      <Breadcrumbs />
      <div className="py-10">
        <DashBoardHeader className="pb-6">Utility selection</DashBoardHeader>

        <p className="text-accent">
          Welcome to our secure service activation centre!
        </p>
        <p className="text-accent">
          Congratulations for choosing to monitor your energy consumption with
          EnerghxPlus.
        </p>
        <div className=" flex items-start gap-2 text-primary">
          <img className="pt-1" src={lightGreen} alt="" />
          <p>
            To make your enrolment process as easy as possible, please have your
            electricity and/or natural gas bill with you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <div className="">
          <label htmlFor="province" className="text-primary-gray block mb-1">
            Select commodity
          </label>
          <Controller
            name="commodity"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);

                  const selectedCommodity = allCommodities?.find(
                    (c) => c.name === value
                  );
                  if (selectedCommodity && countryId && statesId) {
                    getAllServices(countryId, statesId, selectedCommodity.id);
                  }
                }}
                value={field.value}
              >
                <SelectTrigger
                  ref={field.ref}
                  onBlur={field.onBlur}
                  className="w-full outline-none  text-primary-gray py-5 rounded-none"
                >
                  <SelectValue placeholder="Choose Commodity" />
                </SelectTrigger>

                {}
                <SelectContent className="bg-light-green">
                  {allCommodities?.map((commodity, index) => (
                    <SelectItem
                      key={index}
                      value={commodity.name}
                      className="hover:bg-primary-green hover:text-white"
                    >
                      {commodity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.commodity && (
            <p className="text-red-500">{errors.commodity.message}</p>
          )}
        </div>
        <div className="">
          <label htmlFor="province" className="text-primary-gray block mb-1">
            Select service
          </label>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger
                  ref={field.ref}
                  onBlur={field.onBlur}
                  className="w-full outline-none  text-primary-gray py-5 rounded-none"
                >
                  <SelectValue placeholder="Choose Service" />
                </SelectTrigger>

                {}
                <SelectContent className="bg-light-green">
                  {allServices?.map((service, index) => (
                    <SelectItem
                      key={index}
                      value={service.name}
                      className="hover:bg-primary-green hover:text-white"
                    >
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.service && (
            <p className="text-red-500">{errors.service.message}</p>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <ContinueButton nextStep={nextStep} prevStep={prevStep} />
      </div>
    </form>
  );
};

export default Utility;
