import CommonWrapper from "@/common/CommonWrapper";
import {
  upgradeFacilitesSchema,
  upgradeFacilitiesType,
} from "@/components/basic-sever/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleRight, FaAngleLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import Breadcrumbs from "@/common/Breadcrumbs";
import DashBoardHeader from "@/common/DashBoardHeader";

interface upgradeFacilitiesProps {
  formData: any;
  updateFormData: (field: string, value: string | number | File) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const UpgradeFacilities: React.FC<upgradeFacilitiesProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<upgradeFacilitiesType>({
    resolver: zodResolver(upgradeFacilitesSchema),
    defaultValues: { ...formData },
  });

  const onSubmit = (data: upgradeFacilitiesType) => {
    Object.entries(data).forEach(([field, value]) => {
      updateFormData(field, value);
    });
    nextStep();
    toast.success("Form submitted successfully!");
  };

  const handlePrevious = () => {
    prevStep();
  };
  return (
    <div>
      <CommonWrapper>
        <div>
          <div className=" pb-10">
            <Breadcrumbs />
          </div>

          <DashBoardHeader> Upgrade Facilities</DashBoardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-sm font-medium text-primary-gray my-5 leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 opacity-70">
              In addition, you agree that:
            </p>
            <div className="flex flex-col gap-6 ">
              <div className="flex items-center space-x-2">
                <Root
                  id="terms"
                  className="peer h-5 w-5 rounded-sm border border-primary-green bg-transparent 
                 data-[state=checked]:bg-primary-green 
                 data-[state=checked]:border-primary-green 
                 focus:ring-0 focus:outline-none"
                >
                  <Indicator className="hidden" />
                </Root>

                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-primary-green leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 opacity-70"
                >
                  You are either the account holder, or the authorized agent of
                  the account holder.
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Root
                  id="terms"
                  className="peer h-5 w-5 rounded-sm border border-primary-green bg-transparent 
                 data-[state=checked]:bg-primary-green 
                 data-[state=checked]:border-primary-green 
                 focus:ring-0 focus:outline-none"
                >
                  <Indicator className="hidden" />
                </Root>

                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-primary-green leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 opacity-70"
                >
                  You have read and understood the Price Comparison sheet and
                  the Disclosure Statement.
                </label>
              </div>
            </div>
            {/* select option  */}
            <div>
              <p className="text-sm font-medium text-primary-gray my-5 leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 opacity-70">
                Please select which one applies to you
              </p>
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full md:w-[486px] rounded-none border-primary-gray text-primary-gray">
                      <SelectValue placeholder="Choose Service" />
                    </SelectTrigger>
                    <SelectContent className="bg-light-green">
                      <SelectItem
                        value="light"
                        className="hover:bg-primary-green hover:text-white"
                      >
                        Light
                      </SelectItem>
                      <SelectItem
                        value="dark"
                        className="hover:bg-primary-green hover:text-white"
                      >
                        Dark
                      </SelectItem>
                      <SelectItem
                        value="system"
                        className="hover:bg-primary-green hover:text-white"
                      >
                        System
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.service && (
                <p className="text-red-500">{errors.service.message}</p>
              )}
            </div>
            <h1 className="text-primary-green font-semibold text-md my-5 ">
              Service Address for Natural Gas
            </h1>
            <div className="flex flex-col gap-6 md:flex-row mt-12">
              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="utilityName"
                  className="text-primary-gray text-md font-light mb-3"
                >
                  Utility Name
                </label>
                <input
                  type="text"
                  id="utilityName"
                  {...register("utilityName")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.utilityName && (
                  <p className="text-red-500">{errors.utilityName.message}</p>
                )}
              </div>

              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="accountNo"
                  className="text-primary-gray text-md font-light mb-3 opacity-70"
                >
                  Account No
                </label>
                <input
                  type="text"
                  id="accountNo"
                  {...register("accountNo")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.accountNo && (
                  <p className="text-red-500">{errors.accountNo.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row mt-12">
              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="upgradeFacilitiesHomeTel"
                  className="text-primary-gray text-md font-light mb-3"
                >
                  Home Tel
                </label>
                <input
                  type="text"
                  id="upgradeFacilitiesHomeTel"
                  {...register("upgradeFacilitiesHomeTel")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.upgradeFacilitiesHomeTel && (
                  <p className="text-red-500">
                    {errors.upgradeFacilitiesHomeTel.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="upgradeFacilitiesAltTel"
                  className="text-primary-gray text-md font-light mb-3 opacity-70"
                >
                  Alt Tel
                </label>
                <input
                  type="text"
                  id="upgradeFacilitiesAltTel"
                  {...register("upgradeFacilitiesAltTel")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.upgradeFacilitiesAltTel && (
                  <p className="text-red-500">
                    {errors.upgradeFacilitiesAltTel.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row mt-12">
              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="streetAddress"
                  className="text-primary-gray text-md font-light mb-3"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  {...register("streetAddress")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.streetAddress && (
                  <p className="text-red-500">{errors.streetAddress.message}</p>
                )}
              </div>

              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="suite"
                  className="text-primary-gray text-md font-light mb-3 opacity-70"
                >
                  Suite/Unit
                </label>
                <input
                  type="text"
                  id="suite"
                  {...register("suite")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.suite && (
                  <p className="text-red-500">{errors.suite.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row mt-12">
              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="upgradeFacilitiesCity"
                  className="text-primary-gray text-md font-light mb-3 opacity-70"
                >
                  City
                </label>
                <input
                  type="text"
                  id="upgradeFacilitiesCity"
                  {...register("upgradeFacilitiesCity")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.upgradeFacilitiesCity && (
                  <p className="text-red-500">
                    {errors.upgradeFacilitiesCity.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full md:w-[486px]">
                <label
                  htmlFor="upgradeFacilitiesPostalCode"
                  className="text-primary-gray text-md font-light mb-3"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="upgradeFacilitiesPostalCode"
                  {...register("upgradeFacilitiesPostalCode")}
                  className="w-full p-2 border border-primary-gray"
                />
                {errors.upgradeFacilitiesPostalCode && (
                  <p className="text-red-500">
                    {errors.upgradeFacilitiesPostalCode.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-5 mt-10">
              <Button
                variant="outline"
                className="bg-light-green border-primary-green text-primary-green py-5 rounded-md"
                onClick={handlePrevious}
              >
                <FaAngleLeft />
                Previous
              </Button>
              <Button
                type="submit"
                className="bg-primary-green text-white py-5 rounded-md"
              >
                Continue <FaAngleDoubleRight />
              </Button>
            </div>
          </form>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default UpgradeFacilities;
