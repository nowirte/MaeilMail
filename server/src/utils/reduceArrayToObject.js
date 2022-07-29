async function reduceArrayToObject(array) {
  const result = await array.reduce((acc, cur) => {
    acc[cur.value] = cur.selected;
    return acc;
  }, {});
  return result;
}

export { reduceArrayToObject };
