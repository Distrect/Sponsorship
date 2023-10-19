import { IsEmail } from 'class-validator';
import { Role } from 'src/database/user';
import { Index, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';

export default class BaseUser {
  @Index()
  @PrimaryGeneratedColumn()
  userId: number;

  @Index()
  @Column('string')
  name: string;

  @Column('string')
  lastname: string;

  @Column('string')
  fullName: string;

  @Column('string')
  password: string;

  @IsEmail()
  @Column('string')
  email: string;

  @Column({ type: 'enum', default: Role.Authority })
  role: Role;

  @BeforeInsert()
  setFullName() {
    this.fullName = this.name + ' ' + this.lastname;
  }
}
