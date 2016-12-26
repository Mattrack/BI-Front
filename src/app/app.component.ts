import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  months = [
    {code: '01', string: 'January'},
    {code: '02', string: 'February'},
    {code: '03', string: 'March'},
    {code: '04', string: 'April'},
    {code: '05', string: 'May'},
    {code: '06', string: 'June'},
    {code: '07', string: 'July'},
    {code: '08', string: 'August'},
    {code: '09', string: 'September'},
    {code: '10', string: 'October'},
    {code: '11', string: 'November'},
    {code: '12', string: 'December'},
  ];
  selectedMonth = "January";
}
