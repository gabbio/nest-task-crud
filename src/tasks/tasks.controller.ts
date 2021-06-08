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
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { TaskService } from './tasks.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new task' })
  @ApiResponse({})
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  async getAll() {
    return await this.taskService.getAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a new task' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found' })
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

  @Delete()
  @ApiOperation({ summary: 'Delete one or many tasks' })
  @ApiQuery({ name: 'ids', type: String, example: '1,2,3' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found' })
  async delete(@Query('ids') id: string) {
    const ids = id
      .split(',')
      .map((taskId) => parseInt(taskId))
      .filter((taskId) => taskId > 0);
    const numberOfdestroyedTasks = await this.taskService.delete(ids);

    if (numberOfdestroyedTasks < 1) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'No task found' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (numberOfdestroyedTasks === ids.length)
      return 'Tasks successfully deleted';

    return `Only ${numberOfdestroyedTasks} task(s) deleted`;
  }
}
