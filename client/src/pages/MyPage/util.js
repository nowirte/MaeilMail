const objChangedarr = obj => {
  const result = [];
  const keys = Object.keys(obj);

  keys.forEach(key => {
    const element = {};
    element.value = key;
    element.label = key.charAt(0).toUpperCase() + key.slice(1);
    element.selected = obj[key];
    result.push(element);
  });
  return result;
};

export default objChangedarr;
