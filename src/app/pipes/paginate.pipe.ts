import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(value: any, page,pageSize): any {
    page--;
    return value.slice(page * pageSize, (page + 1) * pageSize);
  }

}
