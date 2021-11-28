import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'create-student', component: StudentCreateComponent },
  { path: 'create-course', component: CourseCreateComponent },
  { path: 'students/:user', component: StudentListComponent },
  { path: 'edit-student/:id', component: StudentEditComponent },
  { path: 'edit-course/:id', component: CourseEditComponent },

  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
