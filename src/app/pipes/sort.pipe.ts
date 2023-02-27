import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any, sortBy: string) {
    const sorted = value.sort((a: string, b: string) =>
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 : 1
    );
    return sorted;
  }
}
