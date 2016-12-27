import {Component} from '@angular/core';
import {WeatherService} from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]

})
export class AppComponent {
  public title = 'app works!';

  public startDate;
  public endDate;
  public city;
  public cities;

  constructor(private weatherService: WeatherService) {
    this.getCities();
    console.log(this.cities);
  }

  public getCities() {
    this.weatherService.getCities().subscribe(
      cities => {
        this.cities = cities;
        console.log(cities);
      }
    )
  };

  public onConfirm() {
    console.log("onConfirm");
    var location = this.city;

    this.weatherService.getDataForCity("GSOM", location, this.startDate, this.endDate).subscribe((ans) => {
        console.log(ans);
    });
  }
}
