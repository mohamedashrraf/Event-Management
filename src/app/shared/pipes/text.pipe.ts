import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text_trim'
})
export class TextPipe implements PipeTransform {

  transform(value: string, ...args: boolean[]): string {
    if(args[0]&&value.length>=50){
        return  value.slice(0,50)+"...."
    }
    return value;
  }

}
