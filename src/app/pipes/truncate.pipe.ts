import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, length: number): string {
    if (text.length <= length) {
      return text;
    } else {
      const words = text.split(' ');

      text = words[0];

      for (const word of words) {
        if (text.length + word.length > length) {
          return text.trim() + '...';
        } else {
          text += ` ${word}`;
        }
      }

      return text.trim() + '...';
    }
  }
}
