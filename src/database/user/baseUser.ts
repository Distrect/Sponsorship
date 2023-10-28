import { IsEmail } from 'class-validator';
import { CityEnum, Role } from 'src/database/user';
import { Index, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';

export default class BaseUser {
  @Index()
  @PrimaryGeneratedColumn()
  userId: number;

  @Index()
  @Column('varchar')
  name: string;

  @Column('varchar')
  lastname: string;

  @Column('varchar')
  fullName: string;

  @Column('varchar')
  password: string;

  @IsEmail()
  @Column('varchar')
  email: string;

  @Column({ type: 'enum', default: Role.Authority, enum: Role })
  role: Role;

  @Column('boolean', { default: false })
  isDeleted: boolean;

  @Column('enum', { enum: CityEnum })
  city: CityEnum;

  @BeforeInsert()
  setFullName() {
    this.fullName = this.name + ' ' + this.lastname;
  }
}
