import { UserIcon } from "@heroicons/react/24/outline";
import UserType from "../../../types/user";

interface PersonalInformationPropsI {
  user: UserType;
}
const PersonalInformation = ({ user }: PersonalInformationPropsI) => {
  return (
    <div className="flex flex-col gap-3 max-w-4xl">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <UserIcon className="size-6 text-blue-800" />
          <p className="text-black text-sm font-semibold">
            Personal information
          </p>
        </div>
      </div>
      <div className="flex flex-wrap flex-1 gap-2">
        <div className="flex flex-1 flex-col">
          <label className="text-blue-800 text-sm font-bold">
            First name
            <span className="text-red-400 mx-1 font-extrabold text-xl">*</span>:
          </label>
          <input
            className="w-full border border-gray-500 p-1 pl-2 text-sm rounded-md"
            placeholder="Enter your first name"
            value={user.first_name}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-blue-800 text-sm font-bold">
            First name
            <span className="text-red-400 mx-1 font-extrabold text-xl">*</span>:
          </label>
          <input
            className="w-full border border-gray-500 p-1 pl-2 text-sm rounded-md"
            placeholder="Enter your first name"
            value={user.last_name}
          />
        </div>
      </div>
      <div className="flex flex-wrap flex-1 gap-2">
        <div className="flex flex-1 flex-col">
          <label className="text-blue-800 text-sm font-bold">
            Email
            <span className="text-red-400 mx-1 font-extrabold text-xl">*</span>
          </label>
          <input
            className="w-full border border-gray-500 p-1 pl-2 text-sm rounded-md"
            placeholder="Enter your first name"
            type="email"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-blue-800 text-sm font-bold">
            Phone number
            <span className="text-red-400 mx-1 font-extrabold text-xl">*</span>:
          </label>
          <input
            className="w-full border border-gray-500 p-1 pl-2 text-sm rounded-md"
            placeholder="Enter your phone number"
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
