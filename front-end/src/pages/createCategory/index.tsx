import { useState } from "react";
import Breadcrumb from "@/components/common/breadcrumbs";
import Button from "@/components/common/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import { createCategorySchema } from "@/lib/Validator";
import { useNotification } from "@/hooks/useContext";
import Response from "@/interfaces/response";
import api from "@/api";

const createCategoryInitialValue = {
  name: "",
  description: "",
  image: null,
};

type CreateCategoryDataType = {
  name: string;
  description: string;
  image: File | null;
};

const CreateCategory = () => {
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: CreateCategoryDataType) => {
    try {
      setIsLoading(true);
      const categoryFormData = new FormData();

      categoryFormData.append("name", values.name);
      categoryFormData.append("description", values.description);
      categoryFormData.append("image", values.image as File);

      await api.post<Response<null>, FormData>(
        "/categories",
        categoryFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      showNotification("success", "Category created successffully");
    } catch (error) {
      console.log(error);
      showNotification("error", "Error creating category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 md:p-6 p-2">
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="font-extrabold text-2xl">Create Category</h1>
        </div>
        <Breadcrumb links={[{ value: "Create category", to: "/" }]} />
      </div>

      <Formik
        onSubmit={handleSubmit}
        initialValues={createCategoryInitialValue}
        validationSchema={createCategorySchema}
      >
        {({
          errors,
          handleSubmit,
          touched,
          handleChange,
          values,
          setFieldValue,
        }) => (
          <div className="flex flex-col gap-6 mt-12">
            <Button
              isLoading={isLoading}
              handleClick={handleSubmit}
              className="bg-black text-white w-32 p-1 px-2 self-end text-sm
        rounded-md"
            >
              <p>Create Category</p>
            </Button>
            <div className="flex flex-col gap-4 max-w-4xl">
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="product name"
                  className="font-medium tracking-wider"
                >
                  Category Name <span className="text-red-600">*</span> :
                </Label>
                <Input
                  className="placeholder:text-gray-400 placeholder:text-xs"
                  id="picture"
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  onChange={handleChange}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <p className="text-red-400 text-xs">{errors.name}</p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="product description"
                  className="font-medium tracking-wider"
                >
                  Category Description
                  <span className="text-red-600 text-sm"> *</span> :
                </Label>
                <Textarea
                  className="placeholder:text-gray-400 placeholder:text-xs"
                  id="picture"
                  name="description"
                  onChange={handleChange}
                  placeholder="Enter category description"
                  value={values.description}
                />
                {errors.description && touched.description && (
                  <p className="text-red-400 text-sm">{errors.description}</p>
                )}
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="product description"
                  className="font-medium tracking-wider"
                >
                  Category Image
                  <span className="text-red-600"> *</span> :
                </Label>
                <Input
                  className="placeholder:text-gray-400 placeholder:text-xs"
                  placeholder="Enter image file"
                  type="file"
                  name="image"
                  onChange={(event) =>
                    setFieldValue("image", event.currentTarget.files[0] ?? null)
                  }
                />
                {errors.image && touched.image && (
                  <p className="text-red-400 text-xs">{errors.image}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategory;
