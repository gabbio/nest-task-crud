import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'First task', description: 'The name of the task' })
  name: string;
}
