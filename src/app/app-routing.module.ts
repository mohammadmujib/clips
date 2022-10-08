import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './about/about.component'
import { ClipComponent } from './clip/clip.component'
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
  {
    path: 'clip/:id',
    component: ClipComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
