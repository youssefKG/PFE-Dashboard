import { ChangeEvent, FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerDetailI } from "@/types/customers";

interface CustomerGeneralInfomationPropsI {
  isEditing: boolean;
  handleInputChanges: (event: ChangeEvent<HTMLInputElement>) => void;
  customer: CustomerDetailI | null;
}

const CustomerGeneralInfomation: FC<CustomerGeneralInfomationPropsI> = ({
  isEditing,
  handleInputChanges,
  customer,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full lg:max-w-3xl">
      <h1 className="font-bold text-xl">General Information</h1>
      <div className="flex gap-2 w-full items-center">
        <div className="flex flex-col gap-1 w-full">
          <Label className="font-semibold text-gray-700">
            First name <span className="text-red-500 m-1">*</span>:
          </Label>
          <Input
            onChange={handleInputChanges}
            name="firstName"
            disabled={!isEditing}
            placeholder="first name"
            value={customer?.firstName}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label className="text-gray-700 font-semibold ">
            Last name <span className="m-1 text-red-500">*</span>:
          </Label>
          <Input
            onChange={handleInputChanges}
            value={customer?.lastName}
            name="lastName"
            disabled={!isEditing}
            placeholder="last name"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-gray-700 font-semibold ">
          Email <span className="ml-1 text-red-500">*</span>
        </Label>
        <Input
          name="email"
          value={customer?.email}
          disabled={true}
          className=""
          placeholder="Email"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-gray-700 font-semibold">
          Phone number <span className="text-red-500 ml-1"> * </span>:
        </Label>
        <Input
          disabled={!isEditing}
          className=""
          value={customer?.phoneNumber}
          onChange={handleInputChanges}
          type="number"
          name="phoneNumber"
          placeholder="phone number"
        />
      </div>
    </div>
  );
};

export default CustomerGeneralInfomation;
