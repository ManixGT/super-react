import { useForm } from 'react-hook-form'

type Field = {
  name: string,
  label: string,//above the password
  type: string,
  required?: boolean
};

type Props = {
  fields: Field[];
  onSubmit: (data: any) => void;
};

export default function ReusableFormComponent({ fields, onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return <form onSubmit={handleSubmit(onSubmit)}>
    {/* Dynamically render input fields based on the fields prop */}
    {fields.map((field) => (
      <div key={field.name} style={{ marginBottom: "1rem" }}>
        {/* Input label */}
        <label>{field.label}</label>

        {/* Input field with validation rule for 'required' */}
        <input
          {...register(field.name, {
            required: field.required ? `${field.label} is required` : false,
          })}
          type={field.type}
        />

        {/* Display validation error if present */}
        <p style={{ color: "red" }}></p> {/*{errors[field.name]?.message}*/}
      </div>
    ))}

    {/* Submit button */}
    <button type="submit">Submit</button>
  </form>
}