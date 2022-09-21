import { useEffect, useState } from "react";

function useForm( {initialValues, onSubmit}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(values);
  };

 
  return {
    values,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
