import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import BaseUser from 'src/database/user/baseUser';
import { ServerError } from 'src/utils/error';

type FrontIDName = 'ID_FRONT_PAGE.jpg';
type BackIDName = 'ID_BACK_PAGE.jpg';

type FileType = 'identification';
type IDSide = FrontIDName | BackIDName;

export interface IIDFile {
  front: Buffer;
  back: Buffer;
}

@Injectable()
export default class FileService {
  private idFrontName: FrontIDName = 'ID_FRONT_PAGE.jpg';
  private idBackName: BackIDName = 'ID_BACK_PAGE.jpg';

  private storagePath: string = path.join(__dirname, '/../../../storage');

  private createFile(
    file: Express.Multer.File,
    filePath: string,
    fileName: IDSide,
  ) {
    const fullFilePath = path.join(filePath, fileName);
    console.log('PATH1', path, fullFilePath);
    fs.writeFileSync(fullFilePath, file.buffer);
  }

  private createDirectory(path: string) {
    console.log('PATH', path);
    fs.mkdirSync(path, { recursive: true });
  }

  private getUserPath(user: BaseUser, type: FileType) {
    return path.join(
      this.storagePath,
      user.role.toLocaleLowerCase('en'),
      user.userId + '-' + user.name + '-' + user.lastname,
      type,
    );
  }

  private getIdentificationOfUser(user: BaseUser): IIDFile {
    const frontPageID = path.join(
      this.getUserPath(user, 'identification'),
      this.idFrontName,
    );
    const backPageID = path.join(
      this.getUserPath(user, 'identification'),
      this.idBackName,
    );

    const front = fs.readFileSync(frontPageID);
    const back = fs.readFileSync(backPageID);

    console.log(front);
    console.log(back);

    return { front, back };
  }

  public getFile(user: BaseUser, type: FileType) {
    return this.getIdentificationOfUser(user);
  }

  public saveFile(
    file: Express.Multer.File,
    type: FileType,
    user: BaseUser,
    side: IDSide,
  ) {
    if (!file) throw new ServerError();

    try {
      const targetPath = this.getUserPath(user, type);

      if (!fs.existsSync(targetPath)) {
        this.createDirectory(targetPath);
      }

      switch (type) {
        case 'identification':
          this.createFile(file, targetPath, side);
      }

      return targetPath;
    } catch (error) {
      console.log(error);
      throw new ServerError();
    }
  }

  public checker() {
    console.log('File Serice is Active');
  }
}
