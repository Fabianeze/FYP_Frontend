import { Field, useFormikContext } from "formik";

interface ISelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  roles: { option: string; value: string }[];
  name: string;
  style?: React.CSSProperties;
  special: boolean;
  label?: string;
}
export const Select = ({
  roles,
  name,
  style,
  special,
  label,
  onChange,
  ...rest
}: ISelectProps) => {
  const { setFieldValue } = useFormikContext();

  

  return (
    <>
      {special ? (
        <>
          <Field
            as="select"
            style={style}
            className="ps-2 w-full h-full rounded"
            name={name}
            {...rest}
            
          >
            <option value={roles[0].value}>{roles[0].option}</option>
            {roles &&
              roles
                .filter((role) => role !== roles[0])
                .map((role) => (
                  <option value={role.value}>{role.option}</option>
                ))}
          </Field>
        </>
      ) : (
        <>
          <Field
            as="select"
            style={style}
            className="ps-2 w-full h-full rounded"
            name={name}
          >
            <option disabled value="">
              {roles[0].option}
            </option>
            {roles &&
              roles
                .filter((role) => role !== roles[0])
                .map((role) => (
                  <option value={role.value}>{role.option}</option>
                ))}
          </Field>
        </>
      )}
    </>
  );
};
