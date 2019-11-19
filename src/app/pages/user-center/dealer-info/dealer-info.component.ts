import {Component, ViewEncapsulation, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 服务
import {DealerInfoService} from './dealer-info.service';
import {SubjectService} from '../../../services/subject.service';
import {GlobalConfigService, EVENTS_MAP, URL_PARAMS_KEYS} from '../../../services/global-config.service';

export class User {
  id: string;
  name: string;
  address: string;
  provinceName: string;
  contactName: string;
  contactPhone: string;
  formattedExpireDate: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dealer-info',
  templateUrl: './dealer-info.html',
  styleUrls: ['./dealer-info.scss'],
  providers: [DealerInfoService]
})
export class DealerInfoComponent {
  public user: User = {
    id: 'SERVISION',
    name: '上海事成软件股份有限公司',
    address: '上海市浦东新区碧波路912弄18号楼',
    provinceName: '上海',
    contactName: '朱焱磊',
    contactPhone: '13524587788',
    formattedExpireDate: '2020-08-01'
  };

  public isEdit: boolean = false;

  constructor(
    private dealerInfoService: DealerInfoService,
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
