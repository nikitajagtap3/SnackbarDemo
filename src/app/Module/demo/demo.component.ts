import { Component, OnInit } from '@angular/core';
import { Router,Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  variableFromSnackbar;
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.variableFromSnackbar = params['name'] || 0;
      console.log(this.variableFromSnackbar);
    });
  }

}
