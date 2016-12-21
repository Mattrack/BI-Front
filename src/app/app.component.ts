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
