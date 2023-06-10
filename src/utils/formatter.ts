export const toValidPackageName = (projectName: string): string =>
  projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-');

export const kebabCaseToCamelcase = (str: string): string =>
  str.replace(/-./g, (x: string) => x[1].toUpperCase());
