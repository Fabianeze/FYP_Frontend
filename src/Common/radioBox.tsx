import { Field } from "formik";
interface IRadioBox extends React.InputHTMLAttributes<HTMLInputElement> {
  options: { option: string; value: string }[];
  name: string;
  style?: React.CSSProperties;
  label?: string;
}
export const RadioBox = ({ options, name, style, label }: IRadioBox) => {
  return (
    <>
      {options.map((option) => (
        <label className="flex items-center">
          <Field className="mt-1" type="radio" name={name} value={option.value} />
         <span className="ms-1">{option.option}</span> 
        </label>
      ))}
    </>
  );
};
