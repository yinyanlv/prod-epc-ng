import {Component, ViewEncapsulation, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 服务
import {ChangePasswordService} from './change-password.service';
import {SubjectService} from '../../../services/subject.service';
import {GlobalConfigService, EVENTS_MAP, URL_PARAMS_KEYS} from '../../../services/global-config.service';

export class Password {
  oldPassword: string;
  newPassword: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-change-password',
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss'],
  providers: [ChangePasswordService]
})
export class ChangePasswordComponent {

  // 旧密码是否可见
  public isVisibleOldPwd: boolean = false;

  // 新密码是否可见
  public isVisibleNewPwd: boolean = false;

  constructor(
    private changePasswordService: ChangePasswordService,
    private gcService: GlobalConfigService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public switchOldPwdStatus() {
    if (this.isVisibleOldPwd) {
      this.isVisibleOldPwd = false;
    } else {
      this.isVisibleOldPwd = true;
    }
  }

  public switchNewPwdStatus() {
    if (this.isVisibleNewPwd) {
      this.isVisibleNewPwd = false;
    } else {
      this.isVisibleNewPwd = true;
    }
  }

  // 组件初始化
  private ngOnInit() {
  }
}
