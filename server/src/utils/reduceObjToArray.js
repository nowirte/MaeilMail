async function reduceObjToArray(obj) {
  const keys = Object.keys(obj);
  const result = await keys.reduce((acc, cur) => {
    const element = {}
    element.value = cur
    element.label = cur.charAt(0).toUpperCase() + cur.slice(1);
    element.selected = obj[cur];
    return [...acc, element]
  }, [])
  return result;
}
export { reduceObjToArray };
