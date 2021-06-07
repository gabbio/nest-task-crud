import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  async getAll() {
    return await this.taskService.getAll();
  }
}
