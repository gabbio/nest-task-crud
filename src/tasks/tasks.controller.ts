import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
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

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const [numberOfUpdatedTasks, [updatedTask]] = await this.taskService.update(
      id,
      createTaskDto,
    );

    if (numberOfUpdatedTasks < 1) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Task not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return updatedTask;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const numberOfdestroyedTasks = await this.taskService.delete(id);

    if (numberOfdestroyedTasks < 1) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Task not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return 'Task successfully deleted';
  }
}
