import { Link } from "react-router-dom";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { registerValidationSchema } from "../../lib/Validator";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { RegisterFormDataType } from "../../types/auth";
import { useAuthContext } from "../../hooks/useContext";
import Button from "../../components/common/button";

const InitialLoginFormData: RegisterFormDataType = {
  first_name: "youssef",
  last_name: "taoussi",
  email: "yousseftaoussi894@gmail.com",
  password: "Password1234",
  password_confirmation: "Password1234",
};

const Register = () => {
  const { register, isLoading } = useAuthContext();
  return (
    <div className="flex h-screen m-0 overflow-hidden w-screen items-center justify-center">
      <Formik
        initialValues={InitialLoginFormData}
        onSubmit={register}
        validationSchema={registerValidationSchema}
      >
        <Form className="flex gap-6 p-4 border-blue-500 rounded-md max-w-md w-full flex-col">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold text-xl tracking-wider text-center text-blue-950">
              Register
            </h1>
            <p className="text-gray-500 text-sm">
              You alreadty have an account{" "}
              <Link to="/login" className="text-black underline">
                Sign in here
              </Link>
            </p>
          </div>
          <div className="flex w-full  flex-col gap-1">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-blue-800 text-sm font-bold">
                  First name
                  <span className="text-red-400 mx-1 font-extrabold text-xl">
                    *
                  </span>
                  :
                </label>
                <Field
                  name="first_name"
                  className="w-full text-sm border flex-1 p-1 pl-2 border-black rounded-md"
                  placeholder="Enter your first name"
                />
                <ErrorMessage
                  name="first_name"
                  render={(msg: string) => (
                    <div error-message-container>
                      <p className="text-sm text-red-700">{msg}</p>
                    </div>
                  )}
                  className="text-sm text-red-700"
                />
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <label className="text-blue-800 text-sm font-bold">
                  Last name
                  <span className="text-red-400 mx-1 font-extrabold text-xl">
                    *
                  </span>
                  :
                </label>
                <Field
                  name="last_name"
                  className="w-full text-sm border p-1 pl-2 border-black rounded-md"
                  placeholder="Enter your last name"
                />
                <ErrorMessage
                  name="last_name"
                  render={(msg: string) => (
                    <div error-message-container>
                      <p className="text-sm text-red-700">{msg}</p>
                    </div>
                  )}
                  className="text-sm text-red-700"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-blue-800 text-sm font-bold">
                Email
                <span className="text-red-400 mx-1 font-extrabold text-xl">
                  *
                </span>
                :
              </label>
              <Field
                name="email"
                className="w-full text-sm border p-1 pl-2 border-black rounded-md"
                placeholder="Enter your email"
                type="email"
              />
              <ErrorMessage
                name="email"
                render={(msg: string) => (
                  <div error-message-container>
                    <p className="text-sm text-red-700">{msg}</p>
                  </div>
                )}
                className="text-sm text-red-700"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-blue-800 tracking-wider text-sm font-bold">
                Password
                <span className="text-red-400 mx-1 font-extrabold text-xl">
                  {" "}
                  *
                </span>
                :
              </label>
              <Field
                className="w-full border tracking-wider p-1 border-black
                  rounded-md text-sm pl-2"
                name="password"
                placeholder="Enter your password"
                type="password"
              />
              <ErrorMessage
                name="password"
                render={(msg: string) => (
                  <p className="text-sm text-red-700">{msg}</p>
                )}
                className="text-xl text-red-700"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-blue-800 tracking-wider text-sm font-bold">
                Confirm password
                <span className="text-red-400 mx-1 font-extrabold text-xl">
                  {" "}
                  *
                </span>
                :
              </label>
              <Field
                className="w-full border tracking-wider p-1 border-black
                  rounded-md text-sm pl-2"
                name="password_confirmation"
                placeholder="Enter your password"
                type="password"
              />
              <ErrorMessage
                name="password_confirmation"
                render={(msg: string) => (
                  <p className="text-sm text-red-700">{msg}</p>
                )}
                className="text-xl text-red-700"
              />
            </div>
          </div>
          <Button
            isLoading={isLoading}
            className="flex items-center hover:opacity-80 transition-all
              cursor-pointer gap-2 justify-center border bg-blue-800 p-1
              rounded-md"
          >
            <p className="text-white text-md text-sm tracking-wider font-semibold">
              Register
            </p>
            <ArrowRightEndOnRectangleIcon className="size-6 text-white" />
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
