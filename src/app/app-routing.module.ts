import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './about/about.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: '',
    title: 'Clips',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'about',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
