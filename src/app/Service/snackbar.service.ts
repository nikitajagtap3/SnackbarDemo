import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputSnackbarComponent } from 'src/app/component/input-snackbar/input-snackbar.component';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/Service/excel.service';
@Injectable({
  providedIn: 'root'
})

/**
 * Service provides methods to implement snackbar with following features 
 *  1. To show only messages
    2. Snackbar with following actions :
           i . Undo
          ii . Redirect
          iii. Export
    3. Get input from User
 */
export class SnackbarService {
  // Reference of Snackbar
  snackBarRef: any;
  // Timeout for Snackbar
  timeOut = 15000;
  // Vertical Position for Snackbar
  verticalPosition = "bottom";
  // Horizontal Position for Snackbar
  horizontalPosition = "end";

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private excelService: ExcelService) { }

  /**
   * 
   * @param message Message to Display on snackbar
   * @param action (Optional) Action to be performed
   * @param that (Optional) Refenrece of Component which wants to open snackbar
   * @param position (Optional) Position of the snackbar
   * @param timeOut (Optional) Time out 
   * 
   */
  openSnackBar(message: string, action?: string, that?,verticalPosition?,horizontalPosition?,timeOut?) {
    // Opens snackbar with parameters provided
    this.snackBarRef = this.snackBar.open(message, action, {
      duration: timeOut || this.timeOut,
      verticalPosition: verticalPosition || this.verticalPosition ,// 'top' | 'bottom'
      horizontalPosition: horizontalPosition || this.horizontalPosition, //'start' | 'center' | 'end' | 'left' | 'right'
    });

    // Triggers When Action button on snackbar has triggered
    this.snackBarRef.onAction().subscribe(() => {
      // Action = 'Undo' | 'Export' | 'Redirect' 
      switch (action) {
        case 'Undo':
          // Setting previous data i.e data before updating to the form
          that.meterForm.controls['meterName'].setValue(that.meterStaticPreviousData['name']);
          that.meterForm.controls['voltage'].setValue(that.meterStaticPreviousData['voltage']);
          that.meterForm.controls['current'].setValue(that.meterStaticPreviousData['current']);
          // Set previous data i.e data before updating form to the localStorage
          // So whenever user visits again he will get the previous data
          localStorage.setItem('staticMeterData', JSON.stringify(that.meterStaticPreviousData));
          this.openSnackBar("Changes Undid");
          break;
        case 'Export':
          this.excelService.exportAsExcelFile(that.data, 'sample');
          break;
        case 'Redirect':
          // Navigate to 'demo' page passing name as a parameter
          this.router.navigate(['/demo'], { queryParams: { name: that.demoVariable } });
          break;
        default:
          console.log("Action performed");
      }
    });
  }

  /**
   * Opens Input box on snackbar
   * Opens the component in snackbar which contains input box 
   */
  openSnackBarFromComponent() {
    // Opens InputSnackbarComponent on snackbar
    this.snackBar.openFromComponent(InputSnackbarComponent, {
      duration: this.timeOut
    });
  }
}