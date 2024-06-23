import { ErrorMessage, FastField } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  style?: React.CSSProperties;
}

export const Textarea = ({ label, name, type, ...rest }: IInputProps) => {
  return (
    <>
      <FastField as="textarea"
        rows={6}
        cols={100}
        name={name}
        {...rest}
        style={rest.style}
        className="ps-2 pt-1 w-full h-[80%] rounded"
      />
      <div className="ps-2 text-red-500">
        <ErrorMessage name={name} />
      </div>
    </>
  );
};
