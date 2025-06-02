import { Backdrop, BreadcrumbsOwnerState, Divider } from "@mui/material";
import ImagesDropZone from "../ImagesDropZone";
import Button from "../../common/button";
import { FC, useState } from "react";
import { CategoryI, CreateCategoryFormDataType } from "../../../types/category";
import { Form, Formik } from "formik";
import { createCategorySchema } from "../../../lib/Validator";
import { useNotification } from "../../../hooks/useContext";
import api from "../../../api";

interface CreateCategoryBackDropPropsI {
  isOpen: boolean;
  handleClose: () => void;
  isLoading: boolean;
  createCategory: (values: CreateCategoryFormDataType) => Promise<void>;
}

const categoryInitialValues = {
  name: "name of product",
  description: "the description of the product",
};
const CreateCategoryBackDrop: FC<CreateCategoryBackDropPropsI> = ({
  isOpen,
  isLoading,
  handleClose,
  createCategory,
}) => {
  const [categoryData, setCategoryData] = useState<CreateCategoryFormDataType>(
    {} as CreateCategoryFormDataType,
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const handleCreateCategory = async (values: {
    name: string;
    description: string;
  }) => {
    createCategory({ ...values, image: categoryData.image });
  };

  const onDrop = (images: File[]) => {
    if (images.length >= 2) {
      showNotification("info", "You can drop only one image");
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target)
          setCategoryData({
            ...categoryData,
            image: images[0],
          });
        setImageUrl(e.target?.result as string);
      };

      reader.readAsDataURL(images[0]);
    }
  };

  return (
    isOpen && (
      <Backdrop className="items-center justify-center" open={isOpen}>
        <Formik
          initialValues={categoryInitialValues}
          validationSchema={createCategorySchema}
          onSubmit={handleCreateCategory}
        >
          {({ values, errors, handleChange, handleBlur, touched }) => {
            console.log(errors);
            return (
              <Form
                className="bg-white p-3 overflow-y-visible flex flex-col max-w-3xl
        w-full  gap-6  rounded-xl"
              >
                <h1 className="font-bold text-black uppercase text-center">
                  Create Category
                </h1>
                <div className="flex gap-4 flex-1">
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex flex-col gap-2 w-full">
                      <h1 className="text-sm">Category Name</h1>
                      <div className="border-gray-400 border p-1 rounded-md">
                        <input
                          className="w-full border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                          placeholder="Type category name here"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        {touched.name && errors.name && (
                          <p className="text-red-600 text-xs">{errors.name}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <h1 className="text-sm">Category Description</h1>
                      <div className="border-gray-400 border p-1 rounded-md">
                        <textarea
                          className="w-full border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                          placeholder="Type category name here"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.description && errors.description && (
                          <p className="text-red-600 text-xs">
                            {errors.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Divider />
                  {imageUrl ? (
                    <img className="max-w-sm rounded-lg" src={imageUrl} />
                  ) : (
                    <ImagesDropZone onDrop={onDrop} />
                  )}
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleClose}
                    className="px-4 p-1 rounded-xl  text-sm text-black border border-gray-400
          font-medium shadow hover:opacity-70 transition-all cursor-pointer"
                  >
                    Discart
                  </button>
                  <Button
                    isLoading={isLoading}
                    className="px-4 p-1 rounded-xl bg-black max-w-36 w-full text-sm text-white font-medium shadow hover:opacity-70 transition-all cursor-pointer"
                  >
                    Create Category
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Backdrop>
    )
  );
};

export default CreateCategoryBackDrop;
