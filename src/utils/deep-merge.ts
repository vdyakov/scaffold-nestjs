const isObject = (val: object) => val && typeof val === 'object';
const mergeArrayWithDedupe = (a: string[], b: string[]) => Array.from(new Set([...a, ...b]));

interface DeepObject {
  [key: string]: [] | {} | string | null,
}

function deepMerge(target: DeepObject, obj: DeepObject) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key] ?? {};
    const newVal = obj[key] ?? {};

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }

  return target;
}

export default deepMerge;
