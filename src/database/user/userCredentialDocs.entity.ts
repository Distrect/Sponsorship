import { existsSync } from 'fs';
import { DataTypes } from 'sequelize';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Identification } from './identification.entity';

@Table
export class UserCredentialDocuments extends Model {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  credentialId: number;

  @Column(DataTypes.STRING)
  path: string;

  @ForeignKey(() => Identification)
  identificationId: number;

  @BelongsTo(() => Identification)
  identification: Identification;

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
