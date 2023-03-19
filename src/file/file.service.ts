import { writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, path: string) {
    return await writeFile(path, file.buffer);
  }
}
