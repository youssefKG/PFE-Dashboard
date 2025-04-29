import { Form, Formik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createProductSchema } from "../../../lib/Validator";
import { CreateProductI } from "../../../types/product";

const createProductInitialValues: CreateProductI = {
  name: "",
  description: "",
  brand: "",
  catergory: "",
  images: [],
  regularPrice: 0,
  salesPrice: 0,
};
const CreateProductInfo = () => {
  return (
    <Formik
      initialValues={createProductInitialValues}
      onSubmit={() => {}}
      validationSchema={createProductSchema}
    >
      {({ errors, values, touched, handleChange, handleBlur }) => {
        console.log(errors);
        console.log(touched);
        return (
          <Form className="flex flex-col gap-6 p-4 relative w-full">
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
                onChange={handleChange}
                theme="snow"
                placeholder="Type description here"
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
                  value={values.catergory}
                  onChange={handleChange}
                />
              </div>
              {touched.catergory && errors.catergory && (
                <p className="text-xs text-red-500">{errors.catergory}</p>
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
                  <p className="text-xs text-red-500">{errors.regularPrice}</p>
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
                  <p className="text-xs text-red-500">{errors.salesPrice}</p>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateProductInfo;
