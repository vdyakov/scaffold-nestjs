import * as fs from 'node:fs';
import * as path from 'node:path';

import deepMerge from '@/utils/deep-merge.js';
import sortDependencies from '@/utils/sort-dependencies.js';
import { render } from '@/utils/template-renderer.js';

export default function renderTemplate(src: string, dest: string, config: object) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (path.basename(src) === 'node_modules') {
      return;
    }

    fs.mkdirSync(dest, { recursive: true });

    for (const file of fs.readdirSync(src)) {
      renderTemplate(
        path.resolve(src, file),
        path.resolve(dest, file),
        config,
      );
    }

    return;
  }

  const filename = path.basename(src);

  if (filename === 'package.json' && fs.existsSync(dest)) {
    const existing = JSON.parse(fs.readFileSync(dest, 'utf8'));
    const newPackage = JSON.parse(render(src, config));
    const pkg = sortDependencies(deepMerge(existing, newPackage));

    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n');

    return;
  }

  if (filename.startsWith('_')) {
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'));
  }

  if (['_gitignore', '_env'].includes(filename) && fs.existsSync(dest)) {
    const existing = fs.readFileSync(dest, 'utf8');
    const newFile = render(src, config);

    fs.writeFileSync(dest, existing + '\n' + newFile);

    return;
  }

  fs.writeFileSync(dest, render(src, config));
};
