import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonClientComponent } from './livraison-client.component';

describe('LivraisonClientComponent', () => {
  let component: LivraisonClientComponent;
  let fixture: ComponentFixture<LivraisonClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivraisonClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivraisonClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
