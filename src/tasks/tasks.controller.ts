import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatusvalidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusvalidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
