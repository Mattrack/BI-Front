import {Component} from '@angular/core';
import {WeatherService} from './weather.service';
import {DatePipe} from "@angular/common";

var parse = require('csv-parse');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService, DatePipe]

})
export class AppComponent {
  public title = 'app works!';

  public startDate;
  public endDate;
  public city;

  public data;
  public userData = [];

  public cities;
  public datatypes;

  constructor(private weatherService: WeatherService, private datePipe: DatePipe) {
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
    this.startDate = "2011-01-01";
    this.endDate = "2012-12-01";

    this.weatherService.getDataForCity("GSOM", location, this.startDate, this.endDate).subscribe((ans) => {
      this.data = ans;
      console.log(this.data);
      console.log(Object.keys(this.data)[0]);
    });
  }

  public formatValues(datatype) {
    var cleanArray = [];
    this.userData.forEach((elem)=> {
      var formatted = this.datePipe.transform(elem[0], 'yyyy-MM-ddTHH:mm:ss');
      if (this.data[formatted])
        this.data[formatted].forEach((element) => {
          if (element.datatype == datatype)
            cleanArray.push({x: element.value, y: elem[1]});
        });
    });
    console.log(cleanArray);
  }

  public onFile(event) {
    var file = event.srcElement.files[0];

    var files = event.srcElement.files;

    for (var i = 0, f; f = files[i]; i++) {

      var reader = new FileReader();

      reader.onload = (function (theFile, callback) {

        return function (e) {
          var input = e.target.result;
          parse(input, {delimiter: ';', auto_parse: true, auto_parse_date: true}, function (err, output) {
            callback(output);
          });
        };
      })(f, this.setUserData);
      reader.readAsText(f);
    }
  }

  public setUserData = (val) => {
    this.userData = val;
  };
}
