import {Component} from '@angular/core';
import {WeatherService} from './weather.service';

var fs = require('fs');
var parse = require('csv-parse');

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

  public userData = [];

  public onFile(event) {
    console.log("onFile");
    var file = event.srcElement.files[0];
    console.log(file);

    // var parsed = parser({delimiter: ','}, function(err, data) {
    //   console.log(data);
    // });

    // fs.createReadStream(__dirname+'/fs_read.csv').pipe(parser);

    var files = event.srcElement.files;

    for (var i = 0, f; f = files[i]; i++) {

      var reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          var input = e.target.result;

          parse(input, {delimiter: ';', auto_parse: true, auto_parse_date: true}, function(err, output){
            output.splice(0, 1);
            console.log(output);
          });
        };
      })(f);
      reader.readAsText(f);
    }
  }
}
