import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class WeatherService {

  private token = "PXyWExwyMscIGJgzqBAcumyYfrZTDqte";
  public routes = {
    data: "http://www.ncdc.noaa.gov/cdo-web/api/v2/data"
  };

  private datasets = {
    GSOM: {
      id: "GSOM",
      "mindate": "1763-01-01",
      "maxdate": "2016-11-01",
      "name": "Global Summary of the Month",
    }
  };

  private citiesUrl = "app/cities.json";

  constructor(private http: Http) {
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

  public getDataForCity(dataSet, locationId, startDate, endDate) {
    console.log(this.routes);
    var url = this.routes.data
      + "?datasetid=" + this.datasets[dataSet].id
      + "&locationid=" + locationId
      + "&startdate=" + startDate
      + "&enddate=" + endDate
      + "&units=metrics";

    let headers = new Headers({'token': this.token});

    headers.append("Content-Type", "text/plain");
    //   "Content-Type": "text/plain",
    //   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    //   "Accept-Encoding": "gzip, deflate, sdch, br",
    //   "Accept-Language": "en-US,en;q=0.8,fr;q=0.6",
    //   "Cache-Control": "max-age=0",
    //   "Connection": "keep-alive"
    // });

    console.log(url);
    console.log(headers);
    return this.http.get(url, {headers: headers})
  }
}
