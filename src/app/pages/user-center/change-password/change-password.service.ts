import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {SubjectService} from '../../../services/subject.service';
import {GlobalConfigService, EVENTS_MAP} from '../../../services/global-config.service';
import {BaseHttp} from '../../../services/base-http.service';

@Injectable()
export class ChangePasswordService extends BaseHttp {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public httpClient: HttpClient,
    private gcService: GlobalConfigService,
    private subjectService: SubjectService
  ) {
    super(httpClient);
  }
}
