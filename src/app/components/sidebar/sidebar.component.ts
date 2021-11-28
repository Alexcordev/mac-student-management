import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { Student } from 'src/app/interfaces/student';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input()courses: Course[] = [];
  @Input()students: Student[] = [];
  constructor(private coursesService: CoursesService, private studentsService: StudentsService) { }

  ngOnInit(): void {
    let subscription1 = this.studentsService.getStudents().subscribe(data => {
      console.log(data);
      this.students = data;
      subscription1.unsubscribe();
    });
    let subscription2 = this.coursesService.getCourses().subscribe(data => {
      console.log(data);
      this.courses = data;
      subscription2.unsubscribe();
    });
  }

}
