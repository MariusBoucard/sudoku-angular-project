import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RouterModule} from "@angular/router";
import {InteractoModule, interactoTreeUndoProviders} from "interacto-angular";
import { GridComponent } from './components/grid/grid.component';
import { GridMatrixComponent } from './grid-matrix/grid-matrix.component';
import { ClassementComponent } from './components/classement/classement.component';
import { GameComponent } from './components/game/game.component';
import {HotkeyModule} from 'angular2-hotkeys';
import { GameService } from "./services/game.service";
import { Player } from "./classes/player";
import { MenuComponent } from './components/menu/menu.component';
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GridMatrixComponent,
    ClassementComponent,
    GameComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InteractoModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatCheckboxModule,
    RouterModule,
    HotkeyModule.forRoot(),
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
  ],
  providers: [
    interactoTreeUndoProviders(true),
    GameService,
    Player,
    {provide: 'gameServ', useClass: GameService},
    {provide: 'defaultName', useValue: 'Sly Bar'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
