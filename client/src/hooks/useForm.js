import { useState } from 'react';

function useForm({ initialValues, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleChange = stateObject => {
    setValues({ ...values, ...stateObject });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({ ...errors, ...validate(values) });
    if (Object.keys(errors).length === 0) {
      onSubmit(values);
    } else {
      console.log(errors);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleInputChange,
    handleSubmit,
  };
}

export default useForm;
