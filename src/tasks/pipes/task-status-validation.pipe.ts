import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.status.enum';

export class TaskStatusvalidationPipe implements PipeTransform {
  readonly allowedSatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusvalid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isStatusvalid(status: any) {
    const idx = this.allowedSatuses.indexOf(status);
    return idx !== -1;
  }
}
