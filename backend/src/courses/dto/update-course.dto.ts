import { Users } from '../../users/entities/user.entity';

export class UpdateCourseDto {
  title: string;
  pdf_path: string;
  user_id: Users;
  status: string;
  level: string;
}
