import {Component, ViewEncapsulation, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 服务
import {SubAccountService} from './sub-account.service';
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
  selector: 'app-sub-account',
  templateUrl: './sub-account.html',
  styleUrls: ['./sub-account.scss'],
  providers: [SubAccountService]
})
export class SubAccountComponent {
  public users: Array<User> = [{
    number: '1',
    userName: 'Ser_yanlei.zhu',
    nickName: 'yanlei.zhu',
    mobile: '18958008526',
    isEdit: false
  }, {
    number: '2',
    userName: 'Ser_wenxia.han',
    nickName: '韩文霞',
    mobile: '13472498035',
    isEdit: false
  }, {
    number: '3',
    userName: 'Ser_fengying.wang',
    nickName: '王凤英',
    mobile: '18621512418',
    isEdit: false
  }, {
    number: '4',
    userName: 'Ser_zhongmei.meng',
    nickName: '孟中梅',
    mobile: '15601885645',
    isEdit: false
  }, {
    number: '5',
    userName: 'Ser_xiaoyan.pan',
    nickName: '潘晓燕',
    mobile: '15901940673',
    isEdit: false
  }];

  public isEdit: boolean = false;

  constructor(
    private subAccountService: SubAccountService,
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
