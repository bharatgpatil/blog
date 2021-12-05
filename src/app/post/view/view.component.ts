import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { Comment } from '../post';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id: number;
  post: Post;
  comments: Comment[];

  constructor(public postService: PostService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];

    this.postService.getPost(this.id).subscribe((data: Post) => {
      this.post = data;
      if (this.post) {
        this.postService.getComments(this.id).subscribe((data) => {
          this.comments = data;
          console.log(this.comments);
        });
      }
    });
  }
}
