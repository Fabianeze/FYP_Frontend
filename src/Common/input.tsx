import { ErrorMessage, FastField } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  style?: React.CSSProperties;
}

export const Input = ({
  label,
  name,
  onChange,
  type,
  ...rest
}: IInputProps) => {
  const passwordBoolean = useSelector((state: RootState) => {
    return state.password.password;
  });
  return (
    <>
      {type === "file" ? (
        <FastField
          name={name}
          onChange={onChange}
          {...rest}
          placeholder={label}
        />
      ) : type === "password" ? (
        <>
          {" "}
          <FastField
            name={name}
            {...rest}
            type={passwordBoolean ? "password" : "text"}
            placeholder={label}
            className="ps-2 w-full h-[80%] rounded"
          />
          <div className="ps-2 text-red-500">
            <ErrorMessage name={name} />
          </div>
        </>
      ) : (
        <>
          {" "}
          <FastField
            name={name}
            {...rest}
            type={type}
            placeholder={label}
            className="ps-3 w-full h-[80%] rounded"
          />
          <div className="ps-2 text-red-500">
            <ErrorMessage name={name} />
          </div>
        </>
      )}
    </>
  );
};
