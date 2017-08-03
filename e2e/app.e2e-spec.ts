import { LmsPage } from './app.po';

describe('lms App', () => {
  let page: LmsPage;

  beforeEach(() => {
    page = new LmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
