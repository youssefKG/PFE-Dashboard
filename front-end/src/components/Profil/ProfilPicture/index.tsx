import {
  ArrowPathIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Button from "../../common/button";
import { Avatar } from "@mui/material";

const ProfilePicture = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <PhotoIcon className="size-6 text-blue-800" />
          <p className="text-black text-sm font-semibold">Profil picutre</p>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <Avatar
          // alt="avater imgae"
          sx={{ width: 90, height: 90 }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Dh-hCRQx8d2VZzrmMMLcpUhAh53KlS1s5A&s"
        />
        <Button
          className="flex gap-2 items-center bg-blue-200 px-2
          text-blue-700 shadow font-medium p-1 text-sm w-full rounded-md
          max-w-40"
        >
          <ArrowPathIcon className="size-4" />
          <p>Change picture</p>
        </Button>
        <Button
          className="flex gap-2 items-center bg-red-100 shadow
          text-red-600 px-2  font-medium p-1 text-sm w-full rounded-md
          max-w-40"
        >
          <TrashIcon className="size-4" />
          <p>Delete picture</p>
        </Button>
      </div>
    </div>
  );
};

export default ProfilePicture;
