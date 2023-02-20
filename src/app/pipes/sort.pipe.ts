import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any, sortBy: string) {
    return value.sort((a: string, b: string) => a[sortBy] > b[sortBy]);
  }
}
