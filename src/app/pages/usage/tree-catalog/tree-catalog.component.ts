import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Route, Router, ActivatedRoute, Params} from '@angular/router';

// service
import {EVENTS_MAP} from '../../../services/global-config.service';
import {SubjectService} from '../../../services/subject.service';
import {UsageService} from '../usage.service';

// component
import {TreeComponent, TreeModel} from '../../../components/tree/tree.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-tree-catalog',
  templateUrl: './tree-catalog.html',
  styleUrls: ['./tree-catalog.scss']
})
export class TreeCatalogComponent {

  @ViewChild('tree', {static: false})
  tree: TreeComponent;

  public data: Array<TreeModel> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usageService: UsageService,
    private subjectService: SubjectService) {
  }

  // 组件初始化钩子
  ngOnInit() {

    // 监听选择图改变
    this.subjectService.subscribe(EVENTS_MAP.USAGE.LEGEND_LIST_LINK, data => {
      let node = this.tree.getNodeById(data.id);

      if (node) {
        this.tree.expandNode(data.id, true);
        this.usageService.redirectLegend(node);
      }
    });

    this.route.queryParams.subscribe(params => {
      if (this.data.length === 0) {
        this.loadTreeData(params);
      }
    });
  }

  // 加载树数据
  loadTreeData(params) {

    this.tree.showLoading();

    this.usageService.getTree(params, data => {
      this.data = data;

      // 根据参数展开节点
      setTimeout(p => {
        this.tree.expandNode(params['s_2'], true);
      }, 50);

      this.tree.hideLoading();
    });
  }

  // 选择树节点跳转
  selectTreeNode(node) {
    this.usageService.redirectLegend(node);
  }
}
