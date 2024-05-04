import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { EditorPageComponent } from './editor-page/editor-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'editor-page', component: EditorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
