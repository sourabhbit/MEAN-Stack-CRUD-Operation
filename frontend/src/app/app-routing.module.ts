import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { ItemsListComponent } from './components/items-list/items-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-item' },
  { path: 'add-item', component: AddItemComponent },
  { path: 'edit-item/:id', component: EditItemComponent },
  { path: 'items-list', component: ItemsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }