import {Injectable} from '@angular/core';

@Injectable()
export class regressionService{

  private valuesTab = [];
  private sumX = 0;
  private sumY = 0;
  private sumSqareX = 0;
  private sumSqareY = 0;
  private sumXY = 0;

  private calc(): void {
    let tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += this.valuesTab.x[i];
    }
    this.sumX = tmp;
    tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += this.valuesTab.y[i];
    }
    this.sumY = tmp;
    tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += Math.pow(this.valuesTab.x[i], 2);
    }
    this.sumSqareX = tmp;
    tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += Math.pow(this.valuesTab.y[i], 2);
    }
    this.sumSqareY = tmp;
    tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += this.valuesTab.x[i] * this.valuesTab.y[i];
    }
    this.sumXY = tmp;
    return;
  };

  private r = ((this.valuesTab.length * this.sumXY) - (this.sumX * this.sumY)) /
    (Math.sqrt(((this.valuesTab.length * this.sumSqareX) - Math.pow(this.sumX, 2))) *
    Math.sqrt(((this.valuesTab.length * this.sumSqareY) - Math.pow(this.sumY, 2))));

  private m = ((this.valuesTab.length * this.sumXY) - (this.sumX * this.sumY)) /
    ((this.valuesTab.length * this.sumSqareX) - Math.pow(this.sumX, 2));

  private b = (this.sumY - (this.m * this.sumX)) / this.valuesTab.length;

}
