import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../../Common/input";
import { Select } from "../../Common/select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setPasswordToggle } from "../../redux/slices/password-slice";
import { setCredentails } from "../../redux/slices/auth-slice";
import { ToastContainer, toast } from "react-toastify";
import { useCreateGuestMutation } from "../../redux/api/slices/guest-api-slice";

const RegisterComponent = () => {
  const passwordBoolean = useSelector((state: RootState) => {
    return state.password.password;
  });
  const token = useSelector((state: RootState) => {
    return state.auth.token;
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [createGuest] = useCreateGuestMutation();
  const initialValues = {
    email: "",
    password: "",
    name: "",
  };
  const validationSchema = Yup.object({});
  return (
    <>
      <div className="mt-2">
        <img
          src="/assets/cu-logoo.png"
          alt="Logo"
          className="logo"
          width="110"
          height="100"
        />
        <div className="mt-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const result = await createGuest({
                  email: values.email,
                  password: values.password,
                  name: values.name,
                }).unwrap();

                if (result) {
                  console.log(result);
                  toast.success(result.message);
                  setTimeout(()=>{
                    navigate("/");
                  },3000)
                  
                  
                }
              } catch (err) {
                console.log(err)
                // if (err && typeof err === 'object' && 'data' in err && err.data && typeof err.data === 'object' && 'message' in err.data) {
                // } else {
                //   console.log('An error occurred:', err);
                // }
              }
            }}
          >
            {(formikProps) => {
              return (
                <Form className="flex justify-center pt-5">
                  <div className="flex flex-col w-[32rem] h-[30rem]">
                    <div className="flex mb-5 font-bold text-[30px] justify-center text-[#470A34] ">
                      <h1>Register</h1>
                    </div>
                    <div
                      style={{ border: "0.1rem solid grey" }}
                      className="h-[3.1rem] mt-2 pt-2 rounded"
                    >
                      <Input
                        name="name"
                        label="Name"
                        style={{
                          outline: "none",
                        }}
                      />
                    </div>

                    <div
                      style={{ border: "0.1rem solid grey" }}
                      className="h-[3.1rem] mt-2 pt-2 rounded"
                    >
                      <Input
                        name="email"
                        label="Email"
                        style={{
                          outline: "none",
                        }}
                      />
                    </div>
                    <div
                      style={{ border: "0.1rem solid grey" }}
                      className="h-[3.1rem] rounded flex mt-2 "
                    >
                      <div className="w-[29rem] pt-2">
                        <Input
                          name="password"
                          label="Password"
                          type="password"
                          style={{
                            outline: "none",
                          }}
                        />
                      </div>

                      <span
                        onClick={() => {
                          dispatch(setPasswordToggle());
                          console.log(passwordBoolean);
                        }}
                        className=" flex justify-center items-center ms-1 w-[2.8rem]"
                      >
                        {passwordBoolean ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          </>
                        )}
                      </span>
                    </div>
                    <div
                      style={{ border: "0.1rem solid grey" }}
                      className="h-[3.1rem] rounded flex mt-2 "
                    >
                      <div className="w-[29rem] pt-2">
                        <Input
                          name="cpassword"
                          label="Confirm Password"
                          type="password"
                          style={{
                            outline: "none",
                          }}
                        />
                      </div>

                      <span
                        onClick={() => {
                          dispatch(setPasswordToggle());
                          console.log(passwordBoolean);
                        }}
                        className=" flex justify-center items-center ms-1 w-[2.8rem]"
                      >
                        {passwordBoolean ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          </>
                        )}
                      </span>
                    </div>

                    <div>
                      <button className="bg-[#470A34] text-[#FFFFFF] h-[2.95rem] rounded w-full mt-3 ">
                        Register
                      </button>
                    </div>
                    <div className="mt-2">
                      <a className="text-[16px] text-[#470A34]" href="/">
                        Already have an account? Login
                      </a>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterComponent;
