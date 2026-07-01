import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWithHeaderTemplate } from './page-with-header-template';

describe('PageWithHeaderTemplate', () => {
  let component: PageWithHeaderTemplate;
  let fixture: ComponentFixture<PageWithHeaderTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageWithHeaderTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(PageWithHeaderTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
