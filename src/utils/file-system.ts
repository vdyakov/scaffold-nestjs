import * as fs from 'node:fs';
import * as path from 'node:path';

export function canSkipEmptying(dir: string): boolean {
  if (!fs.existsSync(dir)) {
    return true;
  }

  const files = fs.readdirSync(dir);

  return files.length === 0;
}

export function clearDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const filename of fs.readdirSync(dir)) {
    const fullPath = path.resolve(dir, filename);

    if (fs.lstatSync(fullPath).isDirectory()) {
      clearDir(fullPath);
      fs.rmdirSync(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }
}
