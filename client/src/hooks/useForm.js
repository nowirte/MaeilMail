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

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(validate(values));
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      // onSubmit(values);
      console.log(Object.keys(errors).length);
      console.log(errors.email);
    }
    console.log(errors.email);
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
