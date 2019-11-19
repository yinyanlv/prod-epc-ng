import {Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2, ViewChild, Output, EventEmitter} from '@angular/core';
import {SvgDragZoomComponent} from '../svg-drag-zoom/svg-drag-zoom.component';

@Component({
  selector: 's-svg-hotpoint',
  templateUrl: './svg-hotpoint.html',
  styleUrls: ['./svg-hotpoint.scss']
})
export class SvgHotpointComponent extends SvgDragZoomComponent {

  // 图内序号类型, N:数字类型, S:字符类型
  private calloutType: string = 'N';

  // 提取数字类型callout正则表达式
  private calloutRegExpN: RegExp = /^\d{1,3}$/;

  // 提取字符类型callout正则表达式
  private calloutRegExpS: RegExp = /^\w{1,3}$/;

  // callout 文本对象集
  private texts: any;

  // 图片加载完成事件
  @Output()
  public onLegedLoaded = new EventEmitter();

  // 注册图内序号选中事件
  @Output()
  private onSelectionCallout = new EventEmitter();

  /**
   * 重写父方法， 预存所有的callout 文本对象，
   * 标记callout原始角度， 添加图例事件
   *
   * @param {string} xmlStr SVG XML 字符串
   *
   * @returns {null}
   */
  public finishLoaded(xmlStr) {
    super.finishLoaded(xmlStr);

    this.texts = this.getTexts();
    this.markCalloutOriginalPosition();
    this.addLegendEvents();
    this.hideLoading();
    this.onLegedLoaded.emit();
  }

  /**
   * 获取所有的callout 文本对象
   *
   * @returns {Array < object >}
   */
  private getTexts() {
    var self = this,
      texts = self.svg
        .selectAll('text')
        .filter(function() {
          var callout = self.calloutTrim(this.textContent);

          if (self.calloutType == 'N') {
            return self.calloutRegExpN.test(callout);
          } else {
            return self.calloutRegExpS.test(callout);
          }
        });

    return texts;
  }

  /**
   * 标记callout原始坐标位置
   *
   * @returns {null}
   */
  private markCalloutOriginalPosition() {
    var self = this;

    self.texts.each(function() {
      var item = self.Snap(this),
        matrix = item.transform().localMatrix.toString();

      item.node.style.cursor = 'pointer';
      item.data('data-matrix', matrix);
      item.data('data-bbox', item.getBBox());
    });
  }

  /**
   * 添加图例事件(点击、触摸、鼠标移入、鼠标移出)
   *
   * @returns {null}
   */
  private addLegendEvents() {
    var self = this;

    self.texts.on({
      'click': function() {
        self.selectionCallout(this);
      },
      'touchstart': function() {
        self.selectionCallout(this);
      },
      'mouseover': function(e) {
        self.calloutIn(this);
      },
      'mouseout': function(e) {
        self.calloutOut();
      }
    });
  }

  /**
   * 选中点击callout并高亮。
   *
   * @param {ElementRef} target 被选择目标对象
   *
   * @returns {null}
   */
  private selectionCallout(target) {
    var callout = this.calloutTrim(target.textContent),
      texts = this.getCalloutTexts([callout]);

    this.highlightCallout(texts);
    this.onSelectionCallout.emit(callout);
  }

  /**
   * 鼠标移入到callout并高亮。
   *
   * @param {ElementRef} target 目标对象
   *
   * @returns {null}
   */
  private calloutIn(target) {
    let flag = 'temp',
      stroke = '#FFDD02',
      callout = this.calloutTrim(target.textContent);

    this.appendCircle(target, stroke, flag);
  }

  /**
   * 鼠标移出callout并移除高亮。
   *
   * @returns {null}
   */
  private calloutOut() {
    var me = this,
      flag = 'temp';

    me.removeCircle(flag);
  }

  /**
   * 高亮显示callout。
   *
   * @param {Array<ElementRef>} texts
   *
   * @returns {null}
   */
  private highlightCallout(texts) {
    var me = this,
      stroke = '#E30A0A',
      flag = 'selected';

    me.removeCircle(flag);

    texts.each(function() {
      me.appendCircle(this, stroke, flag);
    });
  }

  /**
   * 根据callouts，获取所有callout文本对象。
   *
   * @param {Array<String>} callouts
   *
   * @returns {null}
   */
  private getCalloutTexts(callouts) {
    if (!this.texts) {
      return [];
    }

    var me = this,
      texts = me.texts.filter(function() {
        var callout = me.calloutTrim(this.textContent);

        return callouts.indexOf(callout) > -1;
      });

    return texts;
  }

  /**
   * callout 添加高亮圆圈
   *
   * @param {ElementRef} target 高亮目标对象
   * @param {String} stroke 圆边框颜色
   * @param {String} flag 选中callout标记
   *
   * @returns {null}
   */
  private appendCircle(target, stroke, flag) {
    let self = this,
      bbox = self.Snap(target).getBBox(),
      circle = self.createCircle(bbox.cx, bbox.cy, stroke, flag);

    self.viewport.node().appendChild(circle);
  }

  /**
   * 移除callout 高亮圆圈
   *
   * @param {String} flag 选中callout标记
   *
   * @returns {null}
   */
  private removeCircle(flag) {
    let self = this;

    self.viewport.selectAll('circle[flag="' + flag + '"]').remove();
  }

  /**
   * 原生创建高亮圆圈
   *
   * @param {Number} cx 圆x坐标
   * @param {Number} cy 圆y坐标
   * @param {String} stroke 圆边框颜色
   * @param {String} flag 选中callout标记
   *
   * @returns {circle}
   */
  private createCircle(cx, cy, stroke, flag) {
    let r = '18',
      circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    circle.setAttribute('flag', flag);
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('stroke', stroke);
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('fill', 'none');

    return circle;
  }

  /**
   * callout 除去左右空格
   *
   * @param {String} callout
   *
   * @returns {String} callout
   */
  private calloutTrim(callout) {
    var self = this;

    return callout.replace(/[ ]/g, '').replace(/[\r\n]/g, '');
  }

  /**
   * 激活批量高亮显示callout，并将callout移到可见区域
   *
   * @param {String} callout
   *
   * @returns {null}
   */
  public activeCallout(callouts) {
    var self = this,
      texts = self.getCalloutTexts(callouts);

    if (texts.length && texts.length > 0) {
      self.highlightCallout(texts);
      self.calloutIntoView(texts);
    }
  }

  /**
   * 激活单个高亮显示callout，并将callout移到可见区域
   *
   * @param {String} callout
   *
   * @returns {null}
   */
  public acitveSingleCallout(text) {
    var self = this,
      stroke = '#E30A0A',
      flag = 'selected',
      texts = self.getCalloutTexts([text]);

    if (texts.length && texts.length > 0) {
      self.highlightCallout(texts);
      self.calloutIntoView(texts);
    }
  }

  /**
   * 将callout移到可见区域
   *
   * @param {Array} texts
   *
   * @returns {null}
   */
  private calloutIntoView(texts) {
    var self = this,
      isVisible = self.getCalloutVisible(texts),
      scale = self.zoomScale.scale(),
      degree = self.degree;

    if (!isVisible) {
      if (texts.length > 1 || scale === 1 || degree !== 0) {
        self.resetTSR(self.viewport);
        self.resetCalloutDegree();
      } else {
        self.calloutMoveCenter(texts.node());
      }
    }
  }

  /**
   * 将callout移到中心区域
   *
   * @param {Array} texts
   *
   * @returns {null}
   */
  private calloutMoveCenter(item) {
    var self = this;

    self.setElToCenter(item);
  }

  /**
   * 获取callout是否在可见区域
   *
   * @param {Array} texts
   *
   * @returns {null}
   */
  private getCalloutVisible(texts) {
    var self = this,
      isVisible = true,
      clientSize = self.svg.node().getBoundingClientRect(),
      scale = self.zoomScale.scale(),
      minLeft = (scale * 10) / 2,
      minTop = (scale * 10) / 2,
      maxLeftRange = clientSize.width - (10 * scale) / 2,
      maxTopRange = clientSize.height - (10 * scale) / 2;

    texts.each(function() {
      var itemSize = self.getNodeSize(this);
      if ((itemSize.x < minLeft || itemSize.y < minTop) || (itemSize.x > maxLeftRange || itemSize.y > maxTopRange)) {
        isVisible = false;
        return false;
      }
    });

    return isVisible;
  }

  /**
   * 获取节点规则大小参数
   *
   * @param {ElementRef} node
   *
   * @returns {Object}
   */
  private getNodeSize(node) {
    var self = this,
      bbox = node.getBBox(),
      ctm = node.getCTM(),
      nodeClientRect = node.getBoundingClientRect(),
      svgClientRect = self.svg.node().getBoundingClientRect();

    return {
      x: nodeClientRect.left - svgClientRect.left,
      y: nodeClientRect.top - svgClientRect.top,
      width: bbox.width,
      height: bbox.height,
      scale: ctm.a
    };
  }

  /**
   * 重写父方法， 旋转保证callout正向显示
   *
   * @param {ElementRef} el
   * @param {number} delta 角度
   *
   * @returns {null}
   */
  public rotate(el, delta) {
    super.rotate(el, delta);

    this.setCalloutDegree(this.degree);
  }

  /**
   * 重置图例并重置callout 显示角度。
   *
   * @param {ElementRef} el
   *
   * @returns {null}
   */
  public resetTSR(el) {
    super.resetTSR(el);

    this.resetCalloutDegree();
  }

  /**
   * 重置callout角度。
   *
   * @returns {null}
   */
  private resetCalloutDegree() {
    var self = this;

    if (!self.texts) {
      return;
    }

    self.texts.each(function() {
      var item = self.Snap(this),
        matrix = item.data('data-matrix');

      item.animate({
        x: 0,
        y: 0
      }, 0);
      item.animate({
        transform: matrix
      }, 0);
    });
  }

  /**
   * 设置callout角度。
   *
   * @returns {number} degree : callout角度
   */
  private setCalloutDegree(degree) {
    var self = this;

    self.texts.each(function() {
      var item = self.Snap(this),
        bbox = item.data('data-bbox');

      item.animate({
        x: bbox.x,
        y: (bbox.y + 12)
      }, 0);
      item.animate({
        transform: 'r' + (degree > 0 ? -degree : Math.abs(degree)) + ', ' + bbox.cx + ', ' + bbox.cy
      }, 0);
    });
  }

  /**
   * 重写父类加载默认图，重置 texts
   *
   * @returns {null}
   */
  public loadDefaultImg() {
    var self = this;

    super.loadDefaultImg();

    self.texts = null;
  }
}
