import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  created: boolean = false;
  post: Post;

  constructor(public postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res) => {
      if (res) {
        this.post = res;
        console.log('Post created successfully!');
        this.created = true;
        //this.router.navigateByUrl('post/index');
      } else {
        this.created = false;
      }
    });
  }
}
