import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Route, Router, ActivatedRoute, Params} from '@angular/router';

// service
import {EVENTS_MAP} from '../../services/global-config.service';
import {SubjectService} from '../../services/subject.service';
import {UsageService} from './usage.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-usage',
  templateUrl: './usage.html',
  styleUrls: ['./usage.scss'],
  providers: [UsageService]
})
export class UsageComponent {
  texts = {};

  crumbs: Array<object> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usageService: UsageService,
    private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.bindCrumbsData(params);
    });
  }

  // 构建导航数据
  bindCrumbsData(params) {
    let crumbs = [],
      trans = window['trans'];

    Object.keys(params).forEach((key, index) => {
      if (trans[key]) {
        crumbs.push({
          code: params[key],
          text: trans[key] + ': ' + params[key]
        });
      }
    });

    this.crumbs = crumbs;
  }
}
