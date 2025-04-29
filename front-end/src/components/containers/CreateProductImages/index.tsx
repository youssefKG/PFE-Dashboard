import ImagesDropZone from "../ImagesDropZone";
import Button from "../../common/button";
import { LinearProgress } from "@mui/material";

interface CreateProductImagesPropsI {
  handleClose: () => Promise<void>;
}

interface ListImagesPropsI {
  images: string[];
}

const ListImages = () => {
  return (
    <div className="flex gap-2 flex-col">
      {new Array(4).fill(0).map(() => (
        <div className="flex  gap-2  p-2 shadow-sm w-full">
          <img
            className="w-10 h-10"
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
          />
          <div className="flex g flex-col w-full gap-2">
            <p className="text-xs">Imaga 1 .png</p>
            <LinearProgress color="success" className="w-full " />
          </div>
        </div>
      ))}
    </div>
  );
};

const CreateProductImages = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <img
        className="w-full h-60 shadow-sm rounded-xl"
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
      />
      <ImagesDropZone />
      <ListImages />
    </div>
  );
};

export default CreateProductImages;
