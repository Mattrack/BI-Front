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

  public data;

  public cities;
  public datatypes;

  constructor(private weatherService: WeatherService) {
    this.getCities();
    this.getDatatypes();
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

  public getDatatypes() {
    this.weatherService.getDatatypes().subscribe(
      datatypes => {
        this.datatypes = datatypes;
        console.log(datatypes);
      }
    )
  }

  public getFirst(data) {
    return data[Object.keys(this.data)[0]]
  }

  public onConfirm() {
    console.log("onConfirm");
    var location = this.city;

    location = "CITY:AE000001";
    this.startDate = "2010-01-01";
    this.endDate = "2012-01-01";

    this.weatherService.getDataForCity("GSOM", location, this.startDate, this.endDate).subscribe((ans) => {
      this.data = ans;
      console.log(this.data);
      console.log(Object.keys(this.data)[0]);
    });
  }
}
