import { Role } from 'src/database/user';

export interface SocketQuery {
  role: Role;
}

export interface MessageDTO {
  toUserId: number;
  message: string;
}
