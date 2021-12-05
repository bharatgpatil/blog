import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './post';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], searchInput: string): any[] {
    if (!searchInput) {
      return [];
    }
    searchInput = searchInput.toLowerCase();
    return posts.filter((p) => p.title.toLowerCase().includes(searchInput));
  }
}
