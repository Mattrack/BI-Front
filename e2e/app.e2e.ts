import { BiFrontPage } from './app.po';

describe('bi-front App', function() {
  let page: BiFrontPage;

  beforeEach(() => {
    page = new BiFrontPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('bi-front works!');
  });
});
