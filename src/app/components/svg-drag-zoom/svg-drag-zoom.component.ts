import {Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2, Input, ViewChild} from '@angular/core';
import {LoadingDirective} from '../../directives/loading.directive';

const d3 = window['d3'];

@Component({
  selector: 's-svg-drag-zoom',
  templateUrl: './svg-drag-zoom.html',
  styleUrls: ['./svg-drag-zoom.scss']
})
export class SvgDragZoomComponent {
  // 旋转角度
  public degree: number = 0;

  // snap
  protected Snap = window['Snap'];

  // 默认图片路径
  @Input()
  private nopicPath: string;

  // 请求svg ajax XHR 对象
  private xhr: any;

  // svg 主对象
  public svg: any;

  // 图例视图对象
  public viewport: any;

  // 放大比例对象
  public zoomScale: any;

  // 图放大与缩小的比例步长
  private step: number = 0.2;

  // 工具栏容器
  @ViewChild('legendToolbar', {static: false})
  public legendToolbar: ElementRef;

  // svg图例容器
  @ViewChild('legendBody', {static: false})
  public legendBody: ElementRef;

  // loading 对象
  @ViewChild('loading', {read: LoadingDirective, static: false})
  protected loading: LoadingDirective;

  /**
   * 提供url加载svg图
   *
   * @param {string} url
   *
   * @returns {null}
   */
  public loadSVG(url) {
    let self = this;

    self.beforeLoad();

    self.xhr = d3.text(url, function(error, xmlStr) {
      if (error === null && self.isSVG(xmlStr)) {
        self.finishLoaded(xmlStr);
      } else { // 加载svg图失败，显示默认图
        self.loadDefaultImg();
      }

      // 加载完成后
      self.completeLoad();
    });
  }

  /**
   * 加载svg之前
   *
   * @param {string} xmlStr
   *
   * @returns {null}
   */
  protected beforeLoad() {
    this.showLoading();
    this.removeDefaultImg();
    this.removeSvgTag();
  }

  /**
   * 完成加载，加载后成功或失败都调用此方法
   *
   * @returns {null}
   */
  protected completeLoad() {
    this.xhr = null;
    this.hideLoading();
  }

  /**
   * 成功加载svg (构建svg、添加工具栏事件、添加svg图事件)。
   *
   * @param {string} xmlStr
   *
   * @returns {null}
   */
  public finishLoaded(xmlStr) {
    this.buildSVG(xmlStr);
    this.addToolsEvents();
    this.addSvgEvents();
    this.resetTSR(this.viewport);
  }

  /**
   * 拿到svg xml, 构建svg
   *
   * @param {string} xmlStr
   *
   * @returns {null}
   */
  private buildSVG(xmlStr) {
    let svgTagStr = xmlStr.match(/<svg[^>]*>/i),
      svgTagInnerContent = xmlStr.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i),
      newXmlStr = svgTagStr + '<g>' + svgTagInnerContent[1] + ' </g> </svg>';

    d3.select(this.legendBody.nativeElement).html(newXmlStr);
    this.svg = d3.select('svg');
    this.svg.attr('width', '100%');
    this.svg.attr('height', '100%');
    this.viewport = this.svg.select('g');
    this.disableLegendToolbar(false);
  }

  /**
   * 工具栏添加事件(放大、缩小、还原、左旋转、右旋转)
   *
   * @returns {null}
   */
  private addToolsEvents() {
    let self = this,
      buttons = d3.select(this.legendToolbar.nativeElement).selectAll('[data-action]');

    buttons.on('click', function(a, idx, els) {
      var el = self.viewport,
        action = buttons[0][idx].getAttribute('data-action');

      switch (action) {
        case 'zoomin':
          self.zoomIn(el, self.step);
          break;
        case 'zoomout':
          self.zoomOut(el, self.step);
          break;
        case 'reset':
          self.resetTSR(el);
          break;
        case 'leftrotate':
          self.rotate(el, 0);
          break;
        case 'rightrotate':
          self.rotate(el, 1);
          break;
        default:
          break;
      }
    });
  }

  /**
   * 添加svg事件, 包括滚轮放大缩小与图平移事件
   *
   * @returns {null}
   */
  private addSvgEvents() {
    let self = this;

    self.zoomScale = d3.behavior.zoom().scaleExtent([0.5, 10]);
    self.svg.call(self.zoomScale);
    self.zoomScale.on('zoom', function() {
      self.zoom(self.viewport);
    });
  }

  /**
   * svg 图平移放大缩小的实现.
   *
   * @returns {null}
   */
  private zoom(el) {
    let rotate = this.degree,
      scale = this.zoomScale.scale(),
      translate = this.zoomScale.translate();

    this.setTSR(el, translate, scale, rotate);
  }

  /**
   * svg 图放大.
   *
   * @returns {null}
   */
  private zoomIn(el, step) {
    if (this.zoomScale.scale() + step > 10) {
      return;
    }

    let degree = this.degree,
      scale = this.zoomScale.scale() + step,
      localMatrix = this.getLocalMatrix(el, scale, degree);

    this.zoomScale.scale(scale);
    this.zoomScale.translate([localMatrix.e, localMatrix.f]);
    this.zoom(el);
  }

  /**
   * svg 图缩小.
   *
   * @returns {null}
   */
  private zoomOut(el, step) {
    if (this.zoomScale.scale() - step < 0.5) {
      return;
    }

    let degree = this.degree,
      scale = this.zoomScale.scale() - step,
      localMatrix = this.getLocalMatrix(el, scale, degree);

    this.zoomScale.scale(scale);
    this.zoomScale.translate([localMatrix.e, localMatrix.f]);
    this.zoom(el);
  }

  /**
   * svg 获取本地矩阵.
   *
   * @returns { Object }
   */
  private getLocalMatrix(el, scale, degree) {
    let bbox = el.node().getBBox(),
      translate = {
        cx: bbox.width / 2,
        cy: bbox.height / 2,
        dx: (bbox.width - bbox.width * scale) / 2,
        dy: (bbox.height - bbox.height * scale) / 2
      },
      matrix = new this.Snap.Matrix(scale, 0, 0, scale, translate.dx, translate.dy),
      localMatrix = matrix.rotate(degree, translate.cx, translate.cy);

    return localMatrix;
  }

  /**
   * svg 图旋转.
   *
   * @returns {localMatrix}
   */
  public rotate(el, delta) {
    var degree = this.degree,
      scale = this.zoomScale.scale(),
      degree = (delta === 1 ? degree + 30 : degree - 30),
      localMatrix = this.getLocalMatrix(el, scale, degree);

    this.setTSR(el, [localMatrix.e, localMatrix.f], scale, degree);
    this.zoomScale.translate([localMatrix.e, localMatrix.f]);
    this.degree = degree;
  }

  /**
   * svg 图的 transform 设置
   *
   * @returns {null}
   */
  private setTSR(el, translate, scale, rotate) {
    el.transition().duration(0).attr('transform', 'translate(' + translate + ')scale(' + scale + ')rotate(' + rotate + ')');
  }

  /**
   * 重置图并还原初始状态。
   *
   * @returns {null}
   */
  public resetTSR(el) {
    this.setTSR(el, [0, 0], 1, 0);
    this.zoomScale.scale(1);
    this.zoomScale.translate([0, 0]);
    this.degree = 0;
  }

  /**
   * 检测xml文件是否是标准svg 。
   *
   * @returns {Boolean}
   */
  private isSVG(xmlStr) {
    return xmlStr.match(/<svg[^>]*>/i) ? true : false;
  }

  /**
   *  终止ajax 请求。
   *
   * @returns {null}
   */
  private abordXhr() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  /**
   *  将图内元素移到图幅中间。
   *
   * @returns {null}
   */
  public setElToCenter(target) {
    let el = this.viewport,
      svgNode = this.svg.node(),
      portMargin = this.getPortMargin(svgNode),
      portCTM = el.node().getCTM(),
      targetCTM = target.getCTM(),
      scale = this.zoomScale.scale(),
      degree = this.degree,
      mLeft = targetCTM.e - portCTM.e,
      mTop = targetCTM.f - portCTM.f,
      clientSize = svgNode.getBoundingClientRect(),
      translate = [
        ((clientSize.width / 2 - portMargin.left - mLeft) / portCTM.a) * scale, ((clientSize.height / 2 - portMargin.top - mTop) / portCTM.a) * scale
      ];

    this.setTSR(el, translate, scale, degree);
    this.zoomScale.translate(translate);
  }

  /**
   *  获取图元素的标距。
   *
   * @returns {null}
   */
  private getPortMargin(node) {
    let screenCTM,
      $ = window['$'];

    if (node.getCTM()) {
      return {
        left: node.getCTM().e,
        top: node.getCTM().f
      };
    } else {
      screenCTM = node.getScreenCTM();
      return {
        left: screenCTM.e - $(node).offset().left,
        top: screenCTM.f - $(node).offset().top
      };
    }
  }

  /**
   *  移出svg标签。
   *
   * @returns {null}
   */
  private removeSvgTag() {
    d3.select(this.legendBody.nativeElement).select('svg').remove();
  }

  /**
   *  获取当前图例放大比例。
   *
   * @returns {number}
   */
  public getScale() {
    return this.zoomScale.scale();
  }

  /**
   *  获取当前图例放转角度。
   *
   * @returns {number}
   */
  public getRotate() {
    return this.degree;
  }

  /**
   *  加载默认图
   *
   * @returns {null}
   */
  loadDefaultImg() {
    this.legendBody.nativeElement.style.background = 'url(' + this.nopicPath + ') no-repeat center center';
    this.disableLegendToolbar(true);
  }

  /**
   *  移出默认加载图
   *
   * @returns {null}
   */
  removeDefaultImg() {
    this.legendBody.nativeElement.style.background = 'none';
    this.disableLegendToolbar(true);
  }

  /**
   *  禁用或启用工具栏
   *
   * @returns {null}
   */
  public disableLegendToolbar(disabled) {
    let buttons = d3.selection(this.legendToolbar).selectAll('[data-action]');

    if (disabled) {
      buttons.classed('disabled', true);
    } else {
      buttons.classed('disabled', false);
    }
  }

  /**
   * 显示loading
   *
   * @returns {null}
   */
  public showLoading() {
    this.loading.show();
  }

  /**
   * 隐藏loading
   *
   * @returns {null}
   */
  public hideLoading() {
    this.loading.hide();
  }
}
