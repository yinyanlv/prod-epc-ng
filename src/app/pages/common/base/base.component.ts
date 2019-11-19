import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

// service
import {EVENTS_MAP} from '../../../services/global-config.service';
import {SubjectService} from '../../../services/subject.service';

export class BaseComponent implements OnInit {
  subjectService: SubjectService;

  constructor() {
    this.subjectService = new SubjectService();
  }

  ngOnInit() {
  }

}
