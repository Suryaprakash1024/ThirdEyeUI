import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionComponent } from './components/position/position.component';
import { ObjectHomeComponent } from './object-home/object-home.component';

const routes: Routes = [
  {
    path: 'position',
    component:PositionComponent
  },
  {
    path: 'objects',
    component:ObjectHomeComponent
  },
  {
    path: '**',
    component:PositionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
