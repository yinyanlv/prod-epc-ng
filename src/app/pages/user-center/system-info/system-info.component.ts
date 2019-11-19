import {Component, ViewEncapsulation, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 服务
import {SystemInfoService} from './system-info.service';
import {SubjectService} from '../../../services/subject.service';
import {GlobalConfigService, EVENTS_MAP, URL_PARAMS_KEYS} from '../../../services/global-config.service';

export class User {
  number: string;
  userName: string;
  nickName: string;
  mobile: string;
  isEdit: boolean;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-system-info',
  templateUrl: './system-info.html',
  styleUrls: ['./system-info.scss'],
  providers: [SystemInfoService]
})
export class SystemInfoComponent {

  constructor(
    private systemInfoService: SystemInfoService,
    private gcService: GlobalConfigService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  // 组件初始化
  private ngOnInit() {

  }
}
