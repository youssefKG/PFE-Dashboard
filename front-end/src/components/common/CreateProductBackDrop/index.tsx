import { useState } from "react";
import { Form, Formik } from "formik";
import { Backdrop, LinearProgress } from "@mui/material";
import { CreateProductI, ProductImageI } from "../../../types/product";
import Button from "../button";
import ReactQuill from "react-quill";
import { createProductSchema } from "../../../lib/Validator";
import ImagesDropZone from "../../containers/ImagesDropZone";
import api from "../../../api";
import "react-quill/dist/quill.snow.css";

interface CreateProductBackDropPropsI {
  isOpen: boolean;
  handleClose: () => void;
  createProduct: (values: CreateProductI) => Promise<void>;
}

const createProductInitialValues: CreateProductI = {
  name: "",
  brand: "",
  category: "",
  images: [],
  description: "",
  regularPrice: 0,
  salesPrice: 0,
};

const CreateProductBackDrop = ({
  isOpen,
  handleClose,
}: CreateProductBackDropPropsI) => {
  const [images, setImages] = useState<ProductImageI[]>([]);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = (imgFiles: File[]) => {
    const reader = new FileReader();
    imgFiles.forEach((img) => {
      console.log(imgFiles);
      reader.onload = (e) => {
        if (e.target)
          setImages([
            ...images,
            {
              name: img.name,
              id: images.length,
              url: e.target.result as string,
              file: img,
              isLoading: false,
            },
          ]);
      };

      reader.readAsDataURL(img);
    });
  };

  const createProduct = async (values: CreateProductI) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", description);
      formData.append("regular_price", values.regularPrice.toString());
      formData.append("sales_price", values.salesPrice.toString());
      formData.append("category", values.category);
      formData.append("brand", values.brand);

      images.forEach((img: ProductImageI) => {
        formData.append("images[]", img.file);
      });

      console.log("form data", formData.get("images[]"));
      const response = await api.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Backdrop
      open={isOpen}
      className="relative flex overflow-x-scroll
    gap-2"
    >
      <Formik
        initialValues={createProductInitialValues}
        onSubmit={createProduct}
        validationSchema={createProductSchema}
      >
        {({ errors, values, touched, handleChange, handleBlur }) => {
          console.log(errors);
          return (
            <Form className="bg-white py-4 flex flex-col md:flex-nowrap md:mt-40 mt-[400px]  md:ml-80 justify-center px-5  gap-5 relative m-5 rounded-xl ">
              <div className="flex flex-wrap md:flex-nowrap  justify-center px-5 gap-5 relative ">
                <div className="flex flex-col gap-6 p-4 relative w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-sm">Product Name</h1>
                    <div className="border-gray-400 border p-1 rounded-md">
                      <input
                        className="w-full border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                        placeholder="Type product name here"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-xs">{errors.name}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-sans text-sm">Description</h1>
                    <ReactQuill
                      theme="snow"
                      placeholder="Type description here"
                      value={description}
                      onChange={setDescription}
                    />
                  </div>
                  <div className="flex sm:mt-14 flex-col gap-2">
                    <h1 className="text-sm">Category</h1>
                    <div className="border-gray-400 border p-1 rounded-md">
                      <input
                        className="w-full rounded-e border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                        placeholder="Type Category here"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                      />
                    </div>
                    {touched.category && errors.category && (
                      <p className="text-xs text-red-500">{errors.category}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-sm">Brand</h1>
                    <div className="border-gray-400 border p-1 rounded-md">
                      <input
                        className="w-full rounded-e border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                        name="brand"
                        value={values.brand}
                        placeholder="Type brand here"
                        onChange={handleChange}
                      />
                    </div>
                    {touched.brand && errors.brand && (
                      <p className="text-red-500 text-xs"> {errors.brand} </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-1 flex-col gap-2">
                      <h1 className="font-medium text-sm">Regular Price</h1>
                      <div className="border-gray-400 border p-1 rounded-md">
                        <input
                          className="w-full rounded-e border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                          placeholder="Type brand here"
                          name="regularPrice"
                          value={values.regularPrice}
                          onChange={handleChange}
                        />
                      </div>
                      {touched.regularPrice && errors.regularPrice && (
                        <p className="text-xs text-red-500">
                          {errors.regularPrice}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <h1 className="font-medium text-sm">Sales Price</h1>
                      <div className="border-gray-400 border p-1 rounded-md">
                        <input
                          className="w-full rounded-e border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                          placeholder="Type brand here"
                          type="number"
                          name="salesPrice"
                          value={values.salesPrice}
                          onChange={handleChange}
                        />
                      </div>
                      {touched.salesPrice && errors.salesPrice && (
                        <p className="text-xs text-red-500">
                          {errors.salesPrice}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <CreateProductImages
                  isLoading={isLoading}
                  images={images}
                  onDrop={onDrop}
                />
              </div>
              <div className="flex gap-2 justify-end self-end">
                <Button
                  handleClick={handleClose}
                  className="bg-red-600 text-sm p-1 px-4 hover:opacity-75
          transition-all text-white"
                >
                  <p className="text-xs font-semibold tracking-wider">Cancel</p>
                </Button>
                <Button
                  isLoading={isLoading}
                  className="bg-blue-500 hover:opacity-75 text-sm p-1 px-4
          transition-all text-white"
                >
                  <p className="text-xs font-semibold tracking-wider">Create</p>
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Backdrop>
  );
};

interface ListImagesPropsI {
  images: ProductImageI[];
  isLoading: boolean;
}
const ListImages = ({ images, isLoading }: ListImagesPropsI) => {
  return (
    <div className="flex gap-2 max-h-44 overflow-y-scroll flex-col">
      {images.map((img: ProductImageI) => (
        <div key={img.id} className="flex  gap-2  p-2 shadow-sm w-full">
          <img className="w-10 h-10" src={img.url} />
          <div className="flex g flex-col w-full gap-2">
            <p className="text-xs">{img.name}</p>
            {isLoading && (
              <LinearProgress color="success" className="w-full " />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

interface CreateProductImagesPropsI {
  images: ProductImageI[];
  isLoading: boolean;
  onDrop: (images: File[]) => void;
}

const CreateProductImages = ({
  onDrop,
  images,
  isLoading,
}: CreateProductImagesPropsI) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <img
        className="w-full h-60 shadow-sm rounded-xl"
        src={images.length > 0 ? images[0].url : ""}
      />
      <ImagesDropZone onDrop={onDrop} />
      <ListImages images={images} isLoading={isLoading} />
    </div>
  );
};

export default CreateProductBackDrop;
