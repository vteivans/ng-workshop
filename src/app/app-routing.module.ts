import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { AppService } from './app.service';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
  },
  {
    path: ':id',
    component: NotesComponent,
    canActivate: [AppService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
