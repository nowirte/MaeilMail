import { useEffect, useState } from "react";

function useForm( {initialValues, onSubmit}) {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const handleChange = (stateObject) => {
    setValues({ ...values, ...stateObject});
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(values);
  };

 
  return {
    values,
    handleChange,
    handleInputChange,
    handleSubmit,
  };
}

export default useForm;
