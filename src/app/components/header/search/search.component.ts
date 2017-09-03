import {Component, ViewEncapsulation, HostListener, ElementRef, OnInit, OnDestroy} from "@angular/core";
import {Observable, Subscription, Subject} from 'rxjs';

import {SubjectService} from '../../../services/subject.service';
import {eventMap} from '../../../etc/provider';
import {SearchService} from './search.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'header-search',
    templateUrl: './search.html',
    styleUrls: ['./search.scss'],
    providers: [SearchService]
})
export class SearchComponent implements OnInit, OnDestroy {

    mode: 'history' | 'suggest' = 'history';  // suggest模式时，只显示关闭按钮
    keyword: string = '';
    isShowSearchTips: boolean = false;
    tips: Array<any> = [{"input":"车轮平衡块 25克","output":"车轮平衡块 25克"},{"input":"MINI保险丝-25A","output":"MINI保险丝-25A"},{"input":"轮胎255/60R18","output":"轮胎255/60R18"},{"input":"轮胎245/65R17","output":"轮胎245/65R17"},{"input":"环箍-23","output":"环箍-23"}];
    curTipIndex: number = -1;
    private subject: Subject<string>;
    private subject$: Observable<string>;
    private subscription: Subscription;

    constructor(
        private searchService: SearchService,
        private subjectService: SubjectService
    ) {
    }

    ngOnInit() {

        this.subject = new Subject<string>();
        this.subject$ = this.subject.asObservable();
        this.subscription = this.subject$
            .debounceTime(300)  // 连续输入时，忽略300ms间隔内的输入
            .distinctUntilChanged()  // 输入值未改变时，忽略输入
            .subscribe(() => {
                console.log(1);
            });
    }

    ngOnDestroy() {

        this.subscription.unsubscribe();  // 取消订阅subject$，防止内存泄露
    }

    getSearchHistory() {

        this.mode = 'history';
        this.showSearchTips();
    }

    getSearchSuggest(e) {

        this.mode = 'suggest';
        this.showSearchTips();

        let value: string = e.target.value;

        this.subject.next(value);
    }

    doSearch() {

        this.hideSearchTips();
    }

    showSearchTips(): void {

        this.isShowSearchTips = true;
    }

    hideSearchTips(): void {

        this.curTipIndex = -1;
        this.isShowSearchTips = false;
    }

    clearSearchTips(): void {

        this.subjectService.publish(eventMap.showDialog, {
            content: '您确认要清空全部的搜索历史？',
            onConfirm: () => {

                console.log('confirm');
            },
            onCancel: () => {

                console.log('cancel');
            }
        });
    }

    deleteTip(tip: string) {

    }

    @HostListener('document:click', ['$event'])
    onClickDocument(e) {

        let tipsWrapper: ElementRef = e.target.closest('.search-input-wrapper');

        if (!tipsWrapper) {
            this.hideSearchTips();
        }
    }

    @HostListener('document:keyup', ['$event'])
    onKeyUp(e) {

        if (!this.isShowSearchTips) return;  // 当提示框为隐藏状态时，直接返回

        let keyCode = e.keyCode;

        if (keyCode === 38) {  // up

            if (this.curTipIndex > 0) {

                this.curTipIndex--;
            } else {  // 当前选中为第一条时

                this.curTipIndex = this.tips.length - 1;
            }

        } else if (keyCode === 40) {  // down

            if (this.curTipIndex >= this.tips.length - 1) {  // 当前选中为最后一条时

                this.curTipIndex = 0;
            } else {

                this.curTipIndex++;
            }
        }

        this.keyword = this.tips[this.curTipIndex].input;  // 更新input框内容
    }
}
