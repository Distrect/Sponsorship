import * as fs from 'fs';
import * as path from 'path';
import BaseUser from 'src/database/user/baseUser';
import { ServerError } from 'src/utils/error';

type FileType = 'identification';

export default class FileService {
  private static storagePath: string = path.join(
    __dirname,
    '/../../../storage',
  );

  private static createFile(file: Express.Multer.File, path: string) {
    fs.writeFileSync(file.buffer, path);
  }

  private static createDirectory(path: string) {
    fs.mkdirSync(path, { recursive: true });
  }

  private static getUserPath(user: BaseUser, type: FileType) {
    return path.join(
      this.storagePath,
      user.role.toLocaleLowerCase('en'),
      user.userId + '-' + user.name + '-' + user.lastname,
      type,
    );
  }

  public static saveFile(
    file: Express.Multer.File,
    type: FileType,
    user: BaseUser,
  ) {
    if (!file) throw new ServerError();

    try {
      const targetPath = this.getUserPath(user, type);

      if (!fs.existsSync(targetPath)) {
        this.createDirectory(targetPath);
      }

      this.createFile(file, targetPath);

      return targetPath;
    } catch (error) {
      throw new ServerError();
    }
  }
}
