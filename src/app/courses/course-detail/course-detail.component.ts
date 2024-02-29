import { AfterViewInit, Component, OnChanges, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit{
  selectedCourse : Course;
  courseId : number;
  paramMapObs;

  courseService: CourseService = inject(CourseService);
  activateRoute : ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    // this.courseId = this.activateRoute.snapshot.params['id']; deprecated
    // this.courseId = +this.activateRoute.snapshot.paramMap.get('id');

    //snapshot prop is not aware of current value 

    this.paramMapObs = this.activateRoute.paramMap.subscribe((data)=>{
      this.courseId = +data.get('id');
      this.courseService.courses.find(course =>{
        if(course.id === this.courseId)  this.selectedCourse = course;
      });
    })

    // this.courseService.courses.find(course =>{
    //   if(course.id === this.courseId)  this.selectedCourse = course;
    // });

    // console.log(this.selectedCourse);
  }

  ngOnDestroy(){
    this.paramMapObs.unsubscribe();
  }
}
