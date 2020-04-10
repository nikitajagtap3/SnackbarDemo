import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path:'',component:AppComponent},
  { path: 'snackbar', loadChildren: () => import('./Module/snack-bar/snack-bar.module').then(m => m.SnackBarModule) },
  { path: 'demo', loadChildren: () => import('./Module/demo/demo.module').then(m => m.DemoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
