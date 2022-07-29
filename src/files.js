import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getExtension = (filepath) => path.extname(filepath).slice(1);

export const createPath = (paths) => path.resolve(__dirname, '..', ...paths);

export const readFile = (filepath) => {
  const absolutePath = createPath([filepath]);
  const data = fs.readFileSync(absolutePath).toString();
  return data;
};
