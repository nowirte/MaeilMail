async function getObjectForDB(array) {
  const result = {};
  await array.forEach(el => {
    result[el.value] = el.selected;
  });
  return result;
}

export { getObjectForDB };
