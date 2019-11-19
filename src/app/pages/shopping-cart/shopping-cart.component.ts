import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';
import {GlobalConfigService} from '../../services/global-config.service';
import {SModalService} from '../../components/dialog/dialog.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.html',
  styleUrls: ['./shopping-cart.scss']
})
export class ShoppingCartComponent implements OnInit {

  // 购物车动态列属性
  public columns: Array<any>;

  // 购物车数据属性
  public list: Array<any>;

  // 是否全部选中
  public isCheckAll: boolean = false;

  // 选中的记录数
  public checkCount: number = 0;

  public constructor(
    private shoppingCartService: ShoppingCartService,
    private gcService: GlobalConfigService,
    private dialog: SModalService
  ) {
  }

  ngOnInit() {
    this.loadShoppingCartColumns();
  }

  // 选择全部
  public selectAll(e) {
    if (this.isCheckAll) {
      this.isCheckAll = false;
    } else {
      this.isCheckAll = true;
    }
    this.list.forEach(item => {
      item.checked = this.isCheckAll;
    });
    let checkeds = this.list.filter(item => {
      return item.checked;
    });
    this.checkCount = checkeds.length;
  }

  // 选择单个选中
  public selectSingle(item) {

    if (item.checked) {
      item.checked = false;
    } else {
      item.checked = true;
    }

    let checkeds = this.list.filter(item => {
      return item.checked;
    });

    this.isCheckAll = checkeds.length == this.list.length;
    this.checkCount = checkeds.length;
  }

  // 删除单个
  public deleteSingle(item) {
    let partCode = item.partCode;

    this.dialog.open({
      title: '提示',
      width: 400,
      content: '您确认将当前配件从购物车中移除吗?',
      onOk: () => {
        this.doDelete(partCode);
      },
      footer: true
    });
  }

  // 删除提交
  public doDelete(partCode) {
    this.list.forEach((item, idx) => {
      if (item.partCode === partCode) {
        this.list.splice(idx, 1);
      }
    });
  }

  // 批量删除
  public doBatchDelete() {
    let params = this.getDeleteParams();

    if (!params.length) {
      this.dialog.open({
        title: '提示',
        width: 400,
        content: '您没有选中任何配件',
        footer: true
      });
      return;
    }
    this.dialog.open({
      title: '提示',
      width: 400,
      content: '您确认将选中的配件从购物车中移除吗？',
      onOk: () => {
        // TODO
      },
      footer: true
    });
  }

  // 获取批量删除的参数
  private getDeleteParams() {
    let params = [];

    this.list.forEach(item => {
      if (item.checked) {
        params.push(item.code);
      }
    });

    return params;
  }

  // 订购数量改变
  public doQtyChange(item, code) {
    // TODO
  }

  // 加载购物车列配置
  public loadShoppingCartColumns() {
    this.shoppingCartService.getShoppingCartColumns({}, data => {
      this.columns = data;
      this.loadShoppingCartList();
    });
  }

  // 加载购物车列表
  public loadShoppingCartList() {
    this.shoppingCartService.getShoppingCartList({}, data => {
      this.list = data;
    });
  }
}
