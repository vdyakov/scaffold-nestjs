export interface Options {
  _: string[],
  skipInstall?: boolean,
  interactive?: boolean,
  projectName?: string,
  shouldOverwrite?: boolean,
  database?: string,
  orm?: string,
  needAuth?: boolean,
  auth?: string,
  services?: string[],

  [key: string]: string | boolean | string[] | undefined,
}
