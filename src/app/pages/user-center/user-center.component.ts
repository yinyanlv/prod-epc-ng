import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SubjectService} from '../../services/subject.service';

import {GlobalConfigService, URL_PARAMS_KEYS, EVENTS_MAP} from '../../services/global-config.service';
import {UserCenterService} from './user-center.service';

export interface menu {
  name: string;
  iconType: string;
  routerPath: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-user-center',
  templateUrl: './user-center.html',
  styleUrls: ['./user-center.scss'],
  providers: [UserCenterService]
})
export class UserCenterComponent {
  public activeRouterPath: string = 'dealer-info';

  public items: Array<menu> = [
    {name: '服务站信息', iconType: 'user', routerPath: 'dealer-info'},
    {name: '子账号管理', iconType: 'sub-account', routerPath: 'sub-account'},
    {name: '账号信息', iconType: 'cart', routerPath: 'account'},
    {name: '修改密码', iconType: 'pwd', routerPath: 'change-password'},
    {name: '系统信息', iconType: 'system', routerPath: 'system-info'}
  ];

  constructor(
    private userCenterService: UserCenterService,
    private gcService: GlobalConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {
  }

  ngOnInit() {
    this.activeRouterPath = this.route.snapshot.children[0].url[0].path;
  }

  // 选择目录项
  public selectItem(item) {
    this.activeRouterPath = item.routerPath;

    this.router.navigate([item.routerPath], {relativeTo: this.route});
  }
}

