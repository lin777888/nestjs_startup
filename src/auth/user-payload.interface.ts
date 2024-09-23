import { JwtPayload } from './jwt-payload.interface';

export interface UserPayload extends JwtPayload {
  emplid: string;
  name: string;
  id: number;
}