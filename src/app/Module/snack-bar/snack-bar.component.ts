import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// Meter Data
import { meterData } from 'src/meterData';
import { SnackbarService } from 'src/app/Service/snackbar.service';
import { ExcelService } from 'src/app/Service/excel.service';
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
/**
 * Component contain Form and buttons to incorporate all the snackbar actions
 */
export class SnackBarComponent implements OnInit {

  // FormGroup name of form
  meterForm;
  // Stores current i.e updated static data
  meterStaticData;
  // Stores previous data  i.e data before updating
  meterStaticPreviousData;
  // variable to pass to the new Page
  demoVariable = "Zeus";

  // Dummy data used to perform Export Functionality
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  constructor(private snackbarService: SnackbarService) { }

  ngOnInit(): void {

    // Initialize form 
    this.meterForm = new FormGroup({
      meterName: new FormControl(''),
      voltage: new FormControl(''),
      current: new FormControl('')
    });

    // Used local storage to store updated meter data
    // If localStorage is empty then set meterData i.e default value to the meterStaticData else take value from localStorage
    if (localStorage.getItem('staticMeterData') === null) {
      this.meterStaticData = meterData;
      this.meterStaticPreviousData = meterData;
    }
    else {
      this.meterStaticData = JSON.parse(localStorage.getItem('staticMeterData'));
      // Setting value of form before updating to meterStaticPreviousData
      this.meterStaticPreviousData = JSON.parse(localStorage.getItem('staticMeterData'));
    }

    // Setting values to the form
    this.meterForm.controls['meterName'].setValue(this.meterStaticData['name']);
    this.meterForm.controls['voltage'].setValue(this.meterStaticData['voltage']);
    this.meterForm.controls['current'].setValue(this.meterStaticData['current']);

    // Disable form
    this.meterForm.disable();

  }

  /**
   * Enables form after clicking Edit button
   */
  EditForm() {
    // Enable form after clicking edit button
    this.meterForm.enable();
  }

  /**
   * Saves the values changed by the user into the meterStaticData object 
   * set meterStaticData object to the local storage
   * Opens Snackbar showing Saving Changes notification and Undo operation
   * @param values Form field values
   */
  saveForm(values) {
    //setting updated values to the meterStaticData
    this.meterStaticData.name = values.meterName;
    this.meterStaticData.voltage = values.voltage;
    this.meterStaticData.current = values.current;
    //storing object of updated data values to the localStorage
    localStorage.setItem('staticMeterData', JSON.stringify(this.meterStaticData));
    // Opening snackbar for showing Saving Changes notification
    // Method has arguments : 
    // Argument 1 = Message to display , Argument 2 : Action to perform , Argument 3 : Reference of component,
    // Argument 4 = Verical Position , Argument 5 = Horizontal Position , Argument 6 : Timeout
    this.snackbarService.openSnackBar("Saving Chnages", "Undo", this,"bottom","center",10000);
  }

  /**
   * Opens Snackbar to display only message
   */
  displayMessageSnackbar() {
    this.snackbarService.openSnackBar("Displayed Only Message");
  }

  /*
   * Opens snackbar having input box for taking input from user 
   */
  openInputInSnackbar() {
    // calling method which opens snackbar
    this.snackbarService.openSnackBarFromComponent();
  }

  /**
   * Opens snackbar which rediects to another page if User clicks Redirect
   */
  redirectToAnotherPage() {
    this.snackbarService.openSnackBar("Do you want to redirect to another Page ? ", "Redirect", this,"bottom","center",10000);
  }

  /**
   * Download data in XML File
   */
  exportAsXLSX(): void {
    this.snackbarService.openSnackBar("Do you want to export file ? ", "Export", this,"bottom","center",10000)
  }


}
