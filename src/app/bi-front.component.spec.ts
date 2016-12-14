import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { BiFrontAppComponent } from '../app/bi-front.component';

beforeEachProviders(() => [BiFrontAppComponent]);

describe('App: BiFront', () => {
  it('should create the app',
      inject([BiFrontAppComponent], (app: BiFrontAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'bi-front works!\'',
      inject([BiFrontAppComponent], (app: BiFrontAppComponent) => {
    expect(app.title).toEqual('bi-front works!');
  }));
});
