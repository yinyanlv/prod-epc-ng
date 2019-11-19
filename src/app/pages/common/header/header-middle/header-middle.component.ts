import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SModalService } from '../../../../components/dialog/dialog.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-header-middle',
    templateUrl: './header-middle.html',
    providers: [SModalService],
    styleUrls: ['./header-middle.scss']
})
export class HeaderMiddleComponent implements OnInit {
    isvisible: boolean = false;
    constructor(private smodalservice: SModalService) {

    }

    handleCancel(): void {
        this.isvisible = false;
    }

    handleOk(): void {
        this.isvisible = false;
    }

    public searchOptions :Array<{}>=[];

    public getSearchData(searchKeyword){
        // 有搜索值就获取查询结果，没有就获取历史结果
        if(searchKeyword){
            this.searchOptions = [{code:1,value:'aaa'},{code:2,value:'bbb'},{code:3,value:'ccc'}]
            return;
        }

        this.searchOptions = [{code:1,value:'aaa'},{code:2,value:'bbb'},{code:3,value:'ddd'}]
    }

    // 删除对应的某条历史
    public deleteSearchOption(val){
        console.log(val);
    }

    // 清空历史记录
    public clearSearchHistory(){
        const subject = this.smodalservice.open({
            title: "提示",
            width: 400,
            content:'您确定要清空全部的搜索历史',// ModalCustomizeComponent,
            onOk: () => {
                this.searchOptions = [];
            }
        })
    }

    // 查找
    public doSearch(val){
        alert(val);
    }

    ngOnInit() {
    }

}
