import {Component, ElementRef, ViewChild, Renderer, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {LoadingDirective} from '../../directives/loading.directive';

// 树的模型
export class TreeModel {
  id: string;
  text: string;
  level: number;
  url: string;
  leaf: boolean;
  params: string;
  expanded: boolean;
  selected: boolean;
  nodePath: string = '';
  parentId: string = '';
  children: Array<TreeModel>;
}

@Component({
  selector: 's-tree',
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss']
})
export class TreeComponent {

  // 绑定在树上数据源
  items: Array<TreeModel>;

  // 去设置items数据属性
  @Input()
  public set data(data: Array<TreeModel>) {
    if (!data) {
      return;
    }

    this.setNodePath(data, new TreeModel());
    this.items = data;
  }

  // 注册选择节点事件
  @Output()
  public onClickNode = new EventEmitter();

  // loading 对象
  @ViewChild('loading', {read: LoadingDirective, static: false})
  protected loading: LoadingDirective;

  /**
   * 单击节点事件， 同时把事件发送出去
   *
   * @param {TreeModel} node 当前节点对象
   *
   * @returns {null}
   */
  private clickNode(node) {

    // 当节点有url， 打开一个新浏览器的tab页
    if (node.url) {
      window.open(node.url, '_blank');
    }

    // 清除其他节点选中
    this.clearAllNodeSelected();

    // 选中节点
    node.selected = true;

    // 发送事件
    this.onClickNode.emit(node);
  }

  /**
   * 双击节点, 展开或收起节点
   *
   * @param {TreeModel} node 当前节点对象
   *
   * @returns {null}
   */
  private dblclickNode(node) {
    if (node.expanded) {
      node.expanded = false;
    } else {
      node.expanded = true;
    }
  }

  /**
   * 展开节点，当前控件点击事件触发
   *
   * @param {TreeModel} node 当前节点对象
   *
   * @returns {null}
   */
  private expand(node) {
    node.expanded = true;
  }

  /**
   * 收起节点，当前控件点击事件触发
   *
   * @param {TreeModel} node 当前节点对象
   *
   * @returns {null}
   */
  private collapse(node) {
    node.expanded = false;
  }

  /**
   * 展开单个节点
   *
   * @param {string} id 树节点的id
   * @param {Boolean} selected 展开后是否选中当前节点
   *
   * @returns {null}
   */
  public expandNode(id: string, selected: Boolean = false) {
    let ids: Array<string>,
      node = this.getNodeById(id);

    if (node !== null) {
      ids = node.nodePath.split('>');
      this.setNodeExpanded(ids, this.items);

      if (selected) {
        // 重置所有被选中的节点
        this.clearAllNodeSelected();
        node.selected = selected;
      }
    }
  }

  /**
   * 展开多个节点
   *
   * @param {Array<string>} ids 树id是一个集合
   * @param {Boolean} selected 展开节点后是否选中当前节点
   *
   * @returns {null}
   */
  public expandNodes(ids: Array<string>, selected: Boolean = false) {

    ids.forEach(id => {
      this.expandNode(id, selected);
    });
  }

  /**
   * 选中指定节点一个或多个
   *
   * @param {Array<string>} ids 树id集合
   *
   * @returns {null}
   */
  public selectNodes(ids: Array<string>) {

    ids.forEach(id => {
      let node = this.getNodeById(id);

      if (node !== null) {
        node.selected = true;
      }
    });
  }

  /**
   * 展开树全部节点
   *
   * @returns {null}
   */
  public expandAll() {
    this.setNodesAttribute(this.items, 'expanded', true);
  }

  /**
   * 收起树全部节点
   *
   * @returns {null}
   */
  public collapseAll() {
    this.setNodesAttribute(this.items, 'expanded', false);
  }

  /**
   * 设置节点展开属性
   *
   * @param {Array<string>} ids 树id集合
   * @param {Array<TreeModel>} nodes 节点集合
   *
   * @returns {null}
   */
  private setNodeExpanded(ids: Array<string>, nodes: Array<TreeModel>) {
    for (let node of nodes) {
      if (ids.indexOf(node.id) > -1) {
        node.expanded = true;
      }
      this.setNodeExpanded(ids, node.children);
    }
  }

  /**
   * 根据id找到指定的节点
   *
   * @param {string} id 树节点的id
   *
   * @returns {null}
   */
  public getNodeById(id: string) {
    return this.getNode(id, this.items);
  }

  /**
   * 递归找到指定的节点
   *
   * @param {string} id 树节点的id
   * @param {Array<TreeModel>} nodes 子节点集合
   *
   * @returns {null}
   */
  private getNode(id: string, nodes: Array<TreeModel>) {
    for (let node of nodes) {
      if (node.id == id) {
        return node;
      } else {
        let result = this.getNode(id, node.children);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }

  /**
   * 设置节点属性的通用方法
   *
   * @param {Array<TreeModel>} nodes 节点集后
   * @param {any} key 节点键属性
   * @param {any} value 节点键值
   *
   * @returns {null}
   */
  private setNodesAttribute(nodes: Array<TreeModel>, key: any, value: any) {
    for (let node of nodes) {
      node[key] = value;
      this.setNodesAttribute(node.children, key, value);
    }
  }

  /**
   * 构建节点路径
   * 节点路径格式：'parentId>subid'
   *
   * @param {Array<TreeModel>} nodes 节点集后
   * @param {TreeModel} parentNode 父节点
   *
   * @returns {null}
   */
  private setNodePath(nodes: Array<TreeModel>, parentNode: TreeModel) {
    for (let node of nodes) {
      node.nodePath = parentNode.nodePath.length == 0 ? node.id : parentNode.nodePath + '>' + node.id;
      node.parentId = parentNode.id;
      this.setNodePath(node.children, node);
    }
  }

  /**
   * 清除被选中的节点
   *
   * @returns {null}
   */
  private clearAllNodeSelected() {
    this.setNodesAttribute(this.items, 'selected', false);
  }

  /**
   * 显示loading层
   *
   * @returns {null}
   */
  public showLoading() {
    this.loading.show();
  }

  /**
   * 隐藏loading层
   *
   * @returns {null}
   */
  public hideLoading() {
    this.loading.hide();
  }
}
