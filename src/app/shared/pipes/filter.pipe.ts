import { Pipe, PipeTransform } from '@angular/core';
import { task } from 'src/app/config/config.types';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: task[], condition: string): task[] {
    value = value?.filter((task)=>task.status === condition)
    return value
  }

}
