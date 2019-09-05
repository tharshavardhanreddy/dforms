import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeformComponent } from './employeeform/employeeform.component';
import { CompanyformComponent } from './companyform/companyform.component';
import { JobseekerloginComponent } from './jobseekerlogin/jobseekerlogin.component';
import { ResjobseekerComponent } from './resjobseeker/resjobseeker.component';
import { QuickselectComponent } from './quickselect/quickselect.component';


const routes: Routes = [
  {path : '', component: QuickselectComponent},
  {path : 'employeeform', component: EmployeeformComponent},
  {path : 'companyform', component: CompanyformComponent},
  {path : 'jobseeker', component: JobseekerloginComponent},
  {path : 'resjobseeker', component: ResjobseekerComponent},
  {path : 'quickselect', component: QuickselectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
