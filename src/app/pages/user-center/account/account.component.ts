import {Component, ViewEncapsulation, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 服务
import {AccountService} from './account.service';
import {SubjectService} from '../../../services/subject.service';
import {GlobalConfigService, EVENTS_MAP, URL_PARAMS_KEYS} from '../../../services/global-config.service';

export class User {
  username: string;
  dealerCode: string;
  mobile: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrls: ['./account.scss'],
  providers: [AccountService]
})
export class AccountComponent {
  public user: User = {
    username: 'Ser_yanlei.zhu',
    dealerCode: 'SERVISION',
    mobile: '18958008526'
  };

  constructor(
    private accountService: AccountService,
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
