import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readingTime',
  pure: true,
  // standalone: true ... pipes are standalone by default in Angular 20
})
export class ReadingTimePipe implements PipeTransform {
  transform(body: string): number {
    if (!body) return 0;
    const text = body
      .replace(/[#*_~`>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, '');
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    return Math.ceil(words / 200);
  }
}
