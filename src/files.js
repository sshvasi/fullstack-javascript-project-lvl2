import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const getExtension = (filepath) => path.extname(filepath).slice(1);

export const createPath = (paths) => path.resolve(__dirname, '..', ...paths);

export const readFile = (filepath) => fs.readFileSync(createPath([filepath]), 'utf-8');
