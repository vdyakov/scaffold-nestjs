import fs from 'node:fs';
import { join } from 'path';
import { render } from '@/utils/template-renderer.js';

export default function renderModule(src: string, filePath: string, fileName: string, config: object) {
  fs.mkdirSync(filePath, { recursive: true });

  fs.writeFileSync(join(filePath, fileName), render(src, config));
}
