import {Component} from '@angular/core';
import {WeatherService} from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]

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
  public cities;

  constructor(private weatherService: WeatherService) {
    this.getCities();
    console.log(this.cities);
  }

  public getCities() {
    this.weatherService.getCities().subscribe(
      cities => this.cities = cities
    )
  };

  public printCities(){
    console.log(this.cities);
  }
}
