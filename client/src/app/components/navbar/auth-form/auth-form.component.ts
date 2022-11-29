import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AuthFormComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape" || event.key === "Enter") {
          this.onCancel();
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
