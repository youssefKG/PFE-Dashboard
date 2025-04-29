import { PhotoIcon } from "@heroicons/react/24/outline";

const PersonalLocation = () => {
  return (
    <div className="flex max-w-4xl flex-col gap-7">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <PhotoIcon className="size-6 text-blue-800" />
          <p className="text-black text-sm font-semibold">Personal Info</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-1 max-w-3xl flex-col">
          <label className="text-blue-800 text-sm font-bold">
            Address
            <span className="text-red-400 mx-1 font-extrabold text-xl">*</span>:
          </label>
          <input
            className="w-full border border-gray-500 p-1 pl-2 text-sm rounded-md"
            placeholder="Enter your Address"
          />
        </div>
        <div className="flex flex-wrap flex-1 gap-2">
          <div className="flex flex-1 flex-col">
            <label className="text-blue-800 text-sm font-bold">
              City
              <span className="text-red-400 mx-1 font-extrabold text-xl">
                *
              </span>
              :
            </label>
            <input
              className="w-full border border-gray-500 p-1 pl-2 text-sm rounded-md"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-blue-800 text-sm font-bold">
              Region
              <span className="text-red-400 mx-1 font-extrabold text-xl">
                *
              </span>
              :
            </label>
            <input
              className="w-full border border-gray-500 p-1 pl-2 text-sm rounded-md"
              placeholder="Enter your first name"
            />
          </div>
        </div>
        <div className="flex flex-wrap flex-1 gap-2">
          <div className="flex flex-1 flex-col">
            <label className="text-blue-800 text-sm font-bold">
              Code Postal
              <span className="text-red-400 mx-1 font-extrabold text-xl">
                *
              </span>
              :
            </label>
            <input
              className="w-full border border-gray-500 p-1 pl-2 text-sm rounded-md"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-blue-800 text-sm font-bold">
              Country
              <span className="text-red-400 mx-1 font-extrabold text-xl">
                *
              </span>
              :
            </label>
            <input
              className="w-full border border-gray-500 p-1 pl-2 text-sm rounded-md"
              placeholder="Enter your first name"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLocation;
