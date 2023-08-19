import { existsSync } from 'fs';
import { DataTypes } from 'sequelize';
import { BeforeCreate, Column, PrimaryKey, Table } from 'sequelize-typescript';

export class UserCredentialDocuments {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  credentialId: number;

  @Column(DataTypes.STRING)
  path: string;

  @BeforeCreate
  static checkifPath(userCredentials: UserCredentialDocuments) {
    const isExists = existsSync(userCredentials.path);

    if (!isExists) {
      throw new Error(
        `The given '${userCredentials.path}' path is invalid. Please enter correct file path.`,
      );
    }
  }
}
