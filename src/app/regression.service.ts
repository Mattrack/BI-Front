import {Injectable} from '@angular/core';

@Injectable()
export class RegressionService {

  private valuesTab = [];
  private sumX = 0;
  private sumY = 0;
  private sumSqareX = 0;
  private sumSqareY = 0;
  private sumXY = 0;
  public r;
  public m;
  public b;

  public setValues(values) {
    this.valuesTab = values;
  }

  public setAndCalc(values) {
    this.setValues(values);
    this.calc();
    this.calcR();
    this.calcM();
    this.calcB();
  }

  private calc(): void {
    let tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += this.valuesTab[i].x;
    }
    this.sumX = tmp;
    tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += this.valuesTab[i].y;
    }
    this.sumY = tmp;
    tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += Math.pow(this.valuesTab[i].x, 2);
    }
    this.sumSqareX = tmp;
    tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += Math.pow(this.valuesTab[i].y, 2);
    }
    this.sumSqareY = tmp;
    tmp = 0;
    for (let i = 0; i < this.valuesTab.length; i++) {
      tmp += this.valuesTab[i].x * this.valuesTab[i].y;
    }
    this.sumXY = tmp;
    return;
  };

  private calcR() {
    this.r = ((this.valuesTab.length * this.sumXY) - (this.sumX * this.sumY)) /
      (Math.sqrt(((this.valuesTab.length * this.sumSqareX) - Math.pow(this.sumX, 2))) *
      Math.sqrt(((this.valuesTab.length * this.sumSqareY) - Math.pow(this.sumY, 2))));
  };

  private calcM() {
    this.m = ((this.valuesTab.length * this.sumXY) - (this.sumX * this.sumY)) /
      ((this.valuesTab.length * this.sumSqareX) - Math.pow(this.sumX, 2));
  };

  private calcB() {
    this.b = (this.sumY - (this.m * this.sumX)) / this.valuesTab.length;
  };
}
