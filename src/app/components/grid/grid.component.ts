import {
  Component,
  Input,
  ViewChild,
  ContentChildren,
  QueryList,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnInit,
  AfterContentInit
} from '@angular/core';

import {LoadingDirective} from '../../directives/loading.directive';
import {GridColumnComponent} from './grid-column.component';

@Component({
  selector: 's-grid',
  templateUrl: 'grid.html',
  styleUrls: ['grid.scss']
})
export class GridComponent implements OnInit, AfterContentInit {

  rowNumberTitle: string = '序号';

  @ViewChild('loading', {read: LoadingDirective, static: false})
  loading;

  @Input()
  private isDynamic: boolean = false;

  @Input()
  private withCheckbox: boolean = false;

  @Input()
  private withRowNumber: boolean = false;

  @Input()
  private checkboxModel: string = 'multiple';  // single | multiple

  @Input()
  store: Array<any>;

  @ContentChildren(GridColumnComponent)
  private columnList: QueryList<GridColumnComponent>;

  columns: Array<GridColumnComponent>;

  isSelectAll: boolean = false;

  constructor(
    private vcRef: ViewContainerRef,
    private cmpFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {

  }

  ngAfterContentInit() {

    this.initColumns();
  }

  private initColumns() {

    const cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(GridColumnComponent);
    this.columns = this.columnList.toArray();

    if (this.withRowNumber && this.withCheckbox) {

      const rowNumberCmpRef = this.vcRef.createComponent(cmpFactory);
      const checkboxCmpRef = this.vcRef.createComponent(cmpFactory);

      rowNumberCmpRef.instance.isRowNumber = true;
      checkboxCmpRef.instance.isCheckbox = true;

      this.columns.unshift(rowNumberCmpRef.instance);
      this.columns.unshift(checkboxCmpRef.instance);

    } else if (this.withRowNumber) {

      const cmpRef = this.vcRef.createComponent(cmpFactory);

      cmpRef.instance.isRowNumber = true;

      this.columns.unshift(cmpRef.instance);
    } else if (this.withCheckbox) {

      const cmpRef = this.vcRef.createComponent(cmpFactory);

      cmpRef.instance.isCheckbox = true;

      this.columns.unshift(cmpRef.instance);
    }
  }

  getColumnModel(column: GridColumnComponent): string {

    if (column.isCheckbox) {
      return 'checkbox';
    }

    if (column.isRowNumber) {
      return 'row-number';
    }

    if (column.tplRef) {
      return 'template';
    }

    return 'text';
  }

  handleClickHeadCheckbox(isChecked: boolean) {

    if (isChecked) {
      this.store.forEach((item) => {
        item.checked = true;
      });
    } else {
      this.store.forEach((item) => {
        item.checked = false;
      });
    }
  }

  handleClickRowCheckbox(isChecked: boolean, record: any) {

    record.checked = isChecked;

    this.checkIsSelectAll();
  }

  private checkIsSelectAll() {
    let count = 0;

    this.store.forEach((item) => {
      if (item.checked) {
        count++;
      }
    });

    this.isSelectAll = this.store.length === count;
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }
}
