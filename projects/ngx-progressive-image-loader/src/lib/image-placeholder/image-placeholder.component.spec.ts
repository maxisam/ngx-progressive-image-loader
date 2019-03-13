/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImagePlaceholderComponent } from './image-placeholder.component';

describe('ImagePlaceholderComponent', () => {
  let component: ImagePlaceholderComponent;
  let fixture: ComponentFixture<ImagePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePlaceholderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
