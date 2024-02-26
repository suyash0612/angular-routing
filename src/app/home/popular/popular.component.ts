import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {
  courseService = inject(CourseService)
  popularCourses: Course[] = [];
  router : Router = inject(Router);
  activeRoute : ActivatedRoute = inject(ActivatedRoute);   // to get currebt active route

  ngOnInit(){
    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);
  }

  onNavigateToCourses(){
    this.router.navigate(['courses'] , {relativeTo : this.activeRoute});    //M1
    // this.router.navigateByUrl('courses');    // M2
  }
}
