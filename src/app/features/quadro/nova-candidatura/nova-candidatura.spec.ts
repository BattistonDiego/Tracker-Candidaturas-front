import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaCandidatura } from './nova-candidatura';

describe('NovaCandidatura', () => {
  let component: NovaCandidatura;
  let fixture: ComponentFixture<NovaCandidatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaCandidatura],
    }).compileComponents();

    fixture = TestBed.createComponent(NovaCandidatura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
