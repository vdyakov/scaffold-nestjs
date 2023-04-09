import * as ejs from 'ejs';
import * as fs from 'node:fs';

export function render(root: string, config: object): string {
  const template = fs.readFileSync(root, 'utf8');

  return ejs.render(template, config);
}
