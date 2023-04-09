export default function sortDependencies(packageJson: any) {
  const sorted: any = {};

  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

  for (const type of depTypes) {
    if (packageJson[type]) {
      sorted[type] = {};

      Object.keys(packageJson[type])
        .sort()
        .forEach((name) => {
          sorted[type][name] = packageJson?.[type]?.[name] ?? null;
        });
    }
  }

  return {
    ...packageJson,
    ...sorted,
  };
}
