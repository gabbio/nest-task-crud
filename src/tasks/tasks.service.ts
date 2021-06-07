import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}

  async create(taskDto: CreateTaskDto): Promise<Task> {
    return await this.taskModel.create(taskDto);
  }

  async getAll(): Promise<Task[]> {
    return await this.taskModel.findAll();
  }
}
