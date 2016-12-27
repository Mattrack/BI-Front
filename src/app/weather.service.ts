import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class WeatherService {

  private token = "PXyWExwyMscIGJgzqBAcumyYfrZTDqte";
  public routes = {
    data: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data"
  };

  private serveUrl = "http://localhost:8081";

  private datasets = {
    GSOM: {
      id: "GSOM",
      "mindate": "1763-01-01",
      "maxdate": "2016-11-01",
      "name": "Global Summary of the Month",
    }
  };

  private citiesUrl = "app/cities.json";
  private datatypesUrl = "app/datatypes.json";

  constructor(private http: Http) {
    this.getDatatypes().subscribe(
      (cities) => {
        return;
      }
    );
    this.getDataForCity("GSOM", "CITY:AE000001", "2010-01-01", "2011-01-01").subscribe(
      cities => console.log(cities)
    );
  }


  private extractData(res: Response) {
    console.log("extracting data");
    console.log("res");
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {
    console.log("there is an error !");
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public getCities(): Observable<any> {
    return this.http.get(this.citiesUrl)
      .map((res) => {
        return res.json();
      })
      .catch(this.handleError);
  };

  public getDatatypes(): Observable<any> {
    return this.http.get(this.datatypesUrl)
      .map((res) => {
        return res.json();

      })
      .catch(this.handleError);
  }

  public getDataForCity(dataSet, locationId, startDate, endDate) {
    console.log(this.routes);
    var url = this.serveUrl + "/getHistoric"
      + "?datasetid=" + this.datasets[dataSet].id
      + "&locationid=" + locationId
      + "&startdate=" + startDate
      + "&enddate=" + endDate
      + "&offset=" + "0"
      + "&units=metrics";

    return this.http.get(url);
  }
}
