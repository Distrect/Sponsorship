import Child from 'src/database/user/child/child.entity';

export class EditChildDTO implements Partial<Child> {
  name?: string;
  lastname?: string;
  dateOfBirth?: Date;
  story?: string;
  //   idNumber?: string;
}
