import Dropzone from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface ImagesDropZonePropsI {
  onDrop: (images: File[]) => void;
}
const ImagesDropZone = ({ onDrop }: ImagesDropZonePropsI) => {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="flex w-full flex-col hover:opacity-85 cursor-pointer items-center justify-center gap-2 p-4 border-blue-700 border border-dashed"
        >
          <PhotoIcon className="w-9 h-9 text-blue-900" />
          <p className="text-xs text-blue-900">
            Drag your image Here <span>Browse</span>
          </p>
          <p className="text-gray-400 text-xs">
            PNG, JPG and GIF files are allowed
          </p>
          <input className="hidden" {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  );
};

export default ImagesDropZone;
