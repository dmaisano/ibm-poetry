import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Poem } from '../home/home.component';

@Component({
  selector: 'app-poem-dialog',
  templateUrl: './poem-dialog.component.html',
  styleUrls: ['./poem-dialog.component.scss'],
})
export class PoemDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PoemDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      poem: Poem;
    }
  ) {}

  ngOnInit() {}

  close(): void {
    this.dialogRef.close();
  }
}
