import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HeaderDialogComponent} from "./components/header-dialog/header-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Told you man that I got the tête au nord';
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(HeaderDialogComponent, {
      width: '400px',
    });

/*    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });*/
  }
}
