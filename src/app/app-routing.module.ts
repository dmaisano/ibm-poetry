import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PoemComponent } from './poem/poem.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'poem', component: PoemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
