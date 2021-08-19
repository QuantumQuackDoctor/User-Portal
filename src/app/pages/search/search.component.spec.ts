import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockNavigate = {
    navigate: jasmine.createSpy('navigate'),
  };
  let mockSearchService = jasmine.createSpyObj('SearchService', ['search']);
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SearchComponent],
      providers: [
        { provide: SearchService, useValue: mockSearchService },
        { provide: HttpClient, useValue: httpClient },
        { provide: HttpTestingController, useValue: httpTestingController },
        { provide: Router, useValue: mockNavigate },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
