import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLivraisonComponent } from './update-livraison.component';

describe('UpdateLivraisonComponent', () => {
  let component: UpdateLivraisonComponent;
  let fixture: ComponentFixture<UpdateLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
