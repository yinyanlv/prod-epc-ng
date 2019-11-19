import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

// service
import {UsageService} from '../usage.service';
import {SubjectService} from '../../../services/subject.service';
import {EVENTS_MAP, GlobalConfigService} from '../../../services/global-config.service';

export interface LegendModel {
  id: string;
  code: string;
  level: string;
  src: string;
  original: string;
  description: string
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-legendlist',
  templateUrl: './legend-list.html',
  styleUrls: ['./legend-list.scss']
})
export class LegendListComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usageService: UsageService,
    private subjectService: SubjectService,
    public gcService: GlobalConfigService
  ) {
  }

  // 组件绑定的数据源
  public items: Array<LegendModel>;

  ngOnInit() {
    let user = this.gcService.getUser();

    this.route.queryParams.subscribe(params => this.loadLegendList(params));
  }

  // 加载缩略图列表
  loadLegendList(params) {
    this.usageService.getLegends(params, data => this.items = data);
  }

  // 点击缩略图
  linkLegend(item: LegendModel) {
    this.subjectService.publish(EVENTS_MAP.USAGE.LEGEND_LIST_LINK, item);
  }
}
