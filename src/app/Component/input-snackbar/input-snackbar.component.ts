import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-snackbar',
  templateUrl: './input-snackbar.component.html',
  styleUrls: ['./input-snackbar.component.scss']
})
export class InputSnackbarComponent implements OnInit {

  meterForm;
  constructor(
    public snackBarRef: MatSnackBarRef<InputSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.meterForm = new FormGroup({
      meterName: new FormControl()
    });

  }

  saveInput() {
    console.log(this.meterForm.get('meterName').value);
    this.snackBarRef.dismiss();
  }

}
