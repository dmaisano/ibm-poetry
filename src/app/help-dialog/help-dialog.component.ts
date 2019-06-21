import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PoemDialogComponent } from '../poem-dialog/poem-dialog.component';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
})
export class HelpDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PoemDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit() {}

  close(): void {
    this.dialogRef.close();
  }
}
