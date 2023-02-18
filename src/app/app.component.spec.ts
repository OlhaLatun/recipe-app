import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';


describe('General tests', () => {
 let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });

    fixture = TestBed.createComponent(AppComponent)

  });

  it('should create an instance', () => {
    const app = fixture.componentInstance
    expect(app).toBeDefined();
  });

});
