export class BiFrontPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('bi-front-app h1')).getText();
  }
}
