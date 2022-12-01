import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./components/menu/menu.component";
import {GameComponent} from "./components/game/game.component";

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'game', component: GameComponent },
  { path: '**', redirectTo: '/menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
