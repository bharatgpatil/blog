import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  searchInput: string;
  foundPosts: Post[];
  nothingFound: boolean = false;
  resetShow: boolean = false;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }
  getAllPosts() {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  deletePost(id) {
    this.postService.delete(id).subscribe((res) => {
      this.posts = this.posts.filter((item) => item.id !== id);
      console.log('Post deleted successfully!');
    });
  }

  truncate(str) {
    return str.length > 100 ? str.substr(0, 100 - 1) + ' ...' : str;
  }

  filter() {
    const filterValue = this.searchInput.toLowerCase();
    // search only if string has more than 3 characters
    if (filterValue.length > 2) {
      this.posts = this.posts.filter(function (post) {
        return post.title.toLowerCase().includes(filterValue);
      });
      if (this.posts.length === 0) {
        this.nothingFound = true;
        this.resetShow = true;
      } else {
        this.resetShow = true;
        this.nothingFound = false;
      }
    }
  }

  reset() {
    this.searchInput = '';
    this.resetShow = false;
    this.getAllPosts();
  }
}
