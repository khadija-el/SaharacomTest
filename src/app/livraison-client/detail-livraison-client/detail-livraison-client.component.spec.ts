import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLivraisonClientComponent } from './detail-livraison-client.component';

describe('DetailLivraisonClientComponent', () => {
  let component: DetailLivraisonClientComponent;
  let fixture: ComponentFixture<DetailLivraisonClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailLivraisonClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLivraisonClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
