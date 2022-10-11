export default function validate(valuesObj) {
  const keys = Object.keys(valuesObj);
  const values = Object.values(valuesObj);
  const errors = {};

  values.map((currentValue, index) =>
    !currentValue ? (errors[keys[index]] = '비어있습니다!') : ''
  );

  return errors;
}
