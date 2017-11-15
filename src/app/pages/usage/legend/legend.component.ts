import { Component, OnInit, HostListener, Input } from '@angular/core';

let JsGraphics: any = window['jsGraphics'];

class LegendOptions {
    maxZoom: number = 3;
    minZoom: number = 0.5;
    radius: number = 15;
    seekColor: string = "#FFDD00";
    checkedColor: string = "#FF1020";
    dock: string = "TC";
    imgError: boolean = false;
    assistiveTool: string = "1";
    nopic: string = "";
    legendExist: boolean= false;
    isShowAssistiveTool: boolean= true;
    loading: boolean = true;
    swfLegendWidth: number= 0;
    swfLegendHeight: number= 0;
    percent: number=1;
    dictList: Object;
    isDone: boolean =true;
    curCoords: Array<string>;
    curCallouts: Array<string>;
    dragLegendPosition: Object;
    data: Array<string>;
    dragAssisactiveToolPosition: Object;
    buildData: Array<string>;
    legendRawSize: Object
}

class LegendCallbacks {
    onPrint: Function;
    onToolClick: Function;
    onBindPartList: Function;
    onLegendDbClick: Function;
    onLegendBeforeLoad: Function;
    onLegendAfterLoad: Function;
    onSelectionPartError: Function;
}

@Component({
    selector: 'app-legend',
    templateUrl: 'legend.html',
    styleUrls: ['./legend.scss']
})
export class LegendComponent implements OnInit {
    private jsGraphics: {};

    private _options = new LegendOptions();

    private _callbacks = new LegendCallbacks();

    @Input('options')
    private options: LegendOptions;

    @Input('callbacks')
    private callbacks: LegendCallbacks;

    ngOnInit() {
        Object.assign(this._options, this.options);
        Object.assign(this._callbacks, this.callbacks);

        // this.initJsGraphics();
    }

    initJsGraphics() {

        //this.jsGraphics = new JsGraphics();
    }

    @HostListener('window:resize')
    onResize(event) {
        // this.resizeToAdjust();
    }

    // @HostListener('#legend:click')
    // legendClick($event) {

    // }

    // @HostListener('#legend:dblclick')
    // legendDbClick($event) {

    // }

    // @HostListener('#legend:mousemove')
    // legendMouseMove($event) {
    //     // TODO
    // }

    // @HostListener('#legend:mousedown')
    // legendMouseDown($event) {
    // }

    bindLegend(options, fnImgLoaded) {

        this.destroyLegend();

        this.options.data = options.data;
        this.options.swfLegendWidth = options.swfLegendWidth;
        this.options.swfLegendHeight = options.swfLegendHeight;
        this.setLegendSrc(options.src, fnImgLoaded);
    }

    destroyLegend() {

        this.options.data = [];
        this.options.dictList = [];
        this.options.buildData = [];
        this.options.curCoords = [];
        this.options.legendExist = false;
        // this.resetLegend();
        // this.clearHotpoint();
        // this.$legend.html('');
    }

    setLegendSrc(src = '', fnImgLoaded) {
        var self = this,
            img = new Image(),
            onLegendBeforeLoad = this.callbacks.onLegendBeforeLoad,
            onLegendAfterLoad = self.callbacks.onLegendAfterLoad;

        if (typeof onLegendBeforeLoad === "function") {
            onLegendBeforeLoad.apply(self, []);
        }

        img.onload = function() {
            if (typeof onLegendAfterLoad === "function") {
                onLegendAfterLoad.apply(self, [img]);
            }
            self.finishImgLoad(img, fnImgLoaded);
        };
        img.onerror = function() {
            if (typeof onLegendAfterLoad === "function") {
                onLegendAfterLoad.apply(self, [img]);
            }
            // self.loadErrorImg();
        };
        img.src = src;
    }

    finishImgLoad(img, fnImgLoaded) {
        var self = this;

        self.options.legendExist = true;
        self.options.legendRawSize = {
            width: img.width,
            height: img.height
        };
        // self.settingSize();
        // self.$legend.html(img);
        // self.buildCoord(self.options.data);

        if (typeof fnImgLoaded === "function") {
            fnImgLoaded.apply(self, []);
        }
        // self.disabledAccistiveTool();
    }

    loadErrorImg() {
        // var self = this

        // nopic = self.opts.nopic;
        // self.opts.legendExist = false;

        // self.legendRawSize = {
        //     width: 0,
        //     height: 0
        // };

        // self.$legend.empty().css("background", "url(" + nopic + ") no-repeat center center");
        // self.disabledAccistiveTool();

        // if(self.opts.loading) {
        //     self.loadingHide();
        // }
    }

    settingSize() {
        // var self = this,
        //     width = self.$legendWrap.parent().width(),
        //     height = self.$legendWrap.parent().height(),
        //     legendNewSize = self.opts.legendExist ? self.scalingDownCalc(self.legendRawSize.width, self.legendRawSize.height, width, height) : {
        //         top: 0,
        //         left: 0,
        //         width: width,
        //         height: height
        //     };
        // // setting legend new size and new position
        // self.$legend.css({
        //     "top": legendNewSize.top + "px",
        //     "left": legendNewSize.left + "px",
        //     "width": legendNewSize.width,
        //     "height": legendNewSize.height
        // });

        // // setting legend wrap new size and new position
        // self.$legendWrap.css({
        //     "width": width,
        //     "height": height
        // });

        // // save current legend size and position
        // self.legendWidth = self.$legend.width();
        // self.legendHeight = self.$legend.height();
        // self.legendOffsetTop = self.$legend.offset().top;
        // self.legendOffsetLeft = self.$legend.offset().left;

        // // Legend visible area position
        // self.x1 = self.$legendWrap.offset().left;
        // self.y1 = self.$legendWrap.offset().top;
        // self.x2 = self.$legendWrap.offset().left + self.$legendWrap.width();
        // self.y2 = self.$legendWrap.offset().top + self.$legendWrap.height();
    }

    buildCoord(data) {
        // var self = this,
        //     radius = self.radius,
        //     callout, i = 0,
        //     j = 0,
        //     k = 0,
        //     el,
        //     x = 0,
        //     y = 0,
        //     minX = 0,
        //     maxX = 0,
        //     minY = 0,
        //     maxY = 0,
        //     key,
        //     ratioW = self.swfLegendWidth / self.legendWidth,
        //     ratioH = self.swfLegendHeight / self.legendHeight;

        // self.dictList = {};
        // self.buildData = [];
        // for (; el = data[i]; i++) {
        //     if (!el.x || !el.y) continue;
        //     callout = el.callout;
        //     x = parseInt(el.x / ratioW);
        //     y = parseInt(el.y / ratioH);
        //     self.buildData.push({
        //         'x': x,
        //         'y': y,
        //         'callout': callout
        //     });
        //     minX = x - radius, maxX = x + radius;
        //     minY = y - radius, maxY = y + radius;
        //     for (j = minX; j < maxX; j++) {
        //         for (k = minY; k < maxY; k++) {
        //             key = j + '-' + k;
        //             self.dictList[key] = {
        //                 "x": x,
        //                 "y": y
        //             };
        //         }
        //     }
        // }
    }

    resizeToAdjust() {
        // var self = this;

        // self.resetLegend();
        // self.settingSize();
        // self.buildCoord(self.data || []);
        // self.redraw();
        // self.assistiveToolDock();
        // self.linkHotpoint(self.curCallouts);
    }

    addToolbar() {
        // var self = this,
        //     template = self.getAssistiveToolTemplate();

        // self.$assistiveTool = $(template);
        // self.$legendWrap.append(self.$assistiveTool);
        // self.bindAssistiveToolEvent();
        // self.assistiveToolDock();
        // self.$assistiveTool.show();
        // self.existAssistiveTool = true;
    }

    bindToolbarEvents() {
        var self = this;

        // self.$assistiveTool.on("mousedown", function(e) {
        //     self.startDragAssistiveTool(e, this);
        // });

        // self.$assistiveTool.on("click", "a:not([class*='disabled'])", function(e) {
        //     var action = $(this).attr("data-action");

        //     switch (action) {
        //         case "zoomin":
        //             self.zoomIn();
        //             break;
        //         case "zoomout":
        //             self.zoomOut();
        //             break;
        //         case "up":
        //             self.moveUp();
        //             break;
        //         case "right":
        //             self.moveRight();
        //             break;
        //         case "down":
        //             self.moveDown();
        //             break;
        //         case "left":
        //             self.moveLeft();
        //             break;
        //         case "reset":
        //             self.resetLegend();
        //             self.redraw();
        //             break;
        //         case "print":
        //             if (self.opts.callbacks.onPrint)
        //                 self.opts.callbacks.onPrint.apply(null, []);
        //             break;
        //         default:
        //             if (self.opts.callbacks.onToolClick)
        //                 self.opts.callbacks.onToolClick.apply(null, [action]);
        //             break;
        //     }
        // });
    }

    disableToolbar() {

        // TODO
    }

    dockToolbar() {
        // if (!this.opts.legendExist) return;

        // var self = this,
        //     dock = self.opts.dock,
        //     maxTop = self.$legendWrap.height() - self.$assistiveTool.height() - 5,
        //     maxLeft = self.$legendWrap.width() - self.$assistiveTool.width() - 5,
        //     content = (maxLeft / 2);

        // switch (dock) {
        //     case "TL":
        //         self.$assistiveTool.css({
        //             "left": "5px",
        //             "top": "5px"
        //         });
        //         break;
        //     case "TC":
        //         self.$assistiveTool.css({
        //             "left": content + "px",
        //             "top": "5px"
        //         });
        //         break;
        //     case "TR":
        //         self.$assistiveTool.css({
        //             "left": maxLeft + "px",
        //             "top": "5px"
        //         });
        //         break;
        //     case "BL":
        //         self.$assistiveTool.css({
        //             "left": "5px",
        //             "top": maxTop + "px"
        //         });
        //         break;
        //     case "BC":
        //         self.$assistiveTool.css({
        //             "left": content + "px",
        //             "top": maxTop + "px"
        //         });
        //         break;
        //     case "BR":
        //         self.$assistiveTool.css({
        //             "left": maxLeft + "px",
        //             "bottom": "0px"
        //         });
        //         break;
        //     default:
        //         break;
        // }
    }

    moveToolbar() {
        // var self = this,
        //     movePosition = {},
        //     legendWrap = self.getSizeAndPosition(self.$legendWrap),
        //     assistiveTool = self.getSizeAndPosition(self.$assistiveTool);

        // // save click legend position
        // self.dragAssisactiveToolPosition.top = e.pageY - legendWrap.offsetTop - assistiveTool.top;
        // self.dragAssisactiveToolPosition.left = e.pageX - legendWrap.offsetLeft - assistiveTool.left;

        // // bind document object 'mousemove' and 'mouseup' event
        // $(document).bind({
        //     "mousemove.hotpoint": function(e) {
        //         movePosition = self.movingRange(e, sender, self.dragAssisactiveToolPosition);
        //         self.dragMove(sender, movePosition);
        //         e.preventDefault();
        //     },
        //     "mouseup.hotpoint": function() {
        //         $(this).unbind("mousemove.hotpoint mouseup.hotpoint");
        //         e.preventDefault();
        //     }
        // });
    }

    seekHotpoint(e, sender) {
        // var self = this,
        //     drawPointId = "",
        //     position = self.getPosition(e, sender),
        //     seekColor = self.opts.circleLineColor.seekColor,
        //     coord = self.getCoord(position.left, position.top),
        //     curDrawPointId = self.$legend.find("div[id^='t-']").attr("id");

        // self.$legend.css("cursor", "default");
        // if (typeof coord !== "undefined") {
        //     self.$legend.css("cursor", "pointer");
        //     drawPointId = "t-" + coord.x + '-' + coord.y;
        //     if (curDrawPointId === drawPointId) {
        //         return
        //     }
        //     if (typeof curDrawPointId !== "undefined") {
        //         self.clearHotpoint(curDrawPointId);
        //     }
        //     if (self.checkCoordExist(coord)) {
        //         self.drawHotpoint(drawPointId, coord, seekColor);
        //     }
        // } else if (typeof curDrawPointId !== "undefined") {
        //     self.clearHotpoint(curDrawPointId);
        // }
    }

    checkCoordExist(coord) {
        // var self = this,
        //     i = 0,
        //     el;

        // for (; el = self.curCoords[i]; i++) {
        //     if (el.x == coord.x && el.y == coord.y) {
        //         return false;
        //     }
        // }

        // return true;
    }

    activeLegend(e, sender) {
        // var self = this,
        //     callout, callouts = [],
        //     curCoords,
        //     position = self.getPosition(e, sender),
        //     coord = self.getCoord(position.left, position.top),
        //     onSelectionCallout = self.opts.callbacks.onSelectionCallout;

        // if (typeof coord !== "undefined") {
        //     callout = self.getCallout(coord.x, coord.y);

        //     if (typeof callout !== "undefined") {
        //         callouts.push(callout.toString());
        //         curCoords = self.getCalloutCoord(callouts);

        //         if (curCoords.length > 0) {
        //             self.clearHotpoint();
        //             self.activateHotpoint(curCoords, callouts);
        //             // selection callout callback
        //             if (typeof onSelectionCallout === "function") {
        //                 onSelectionCallout.apply(self, [callouts]);
        //             }
        //         }
        //         self.curCoords = curCoords;
        //     }

        //     self.curCallouts = callouts;
        // }
    }

    dragLegend(e, sender) {
        // var self = this,
        //     movePosition = {},
        //     legend = self.getSizeAndPosition(self.$legend),
        //     legendWrap = self.getSizeAndPosition(self.$legendWrap);

        // // save click legend position
        // self.dragLegendPosition.top = e.pageY - legendWrap.offsetTop - legend.top;
        // self.dragLegendPosition.left = e.pageX - legendWrap.offsetLeft - legend.left;

        // // bind document object 'mousemove' and 'mouseup' event
        // $(document).bind({
        //     "mousemove.hotpoint": function(e) {
        //         movePosition = self.getMovePosition(e, self.dragLegendPosition);
        //         self.dragMove(sender, movePosition);
        //         e.preventDefault();
        //     },
        //     "mouseup.hotpoint": function() {
        //         $(this).unbind("mousemove.hotpoint mouseup.hotpoint");
        //         e.preventDefault();
        //     }
        // });
    }

    setLegendPosition(sender, position) {
        // var self = this;

        // $(sender).css({
        //     "left": position.left + "px",
        //     "top": position.top + "px"
        // });
    }

    getMovePosition(e, position) {
        // var self = this,
        //     legendWrap = self.getSizeAndPosition(self.$legendWrap),
        //     top = (e.pageY - legendWrap.offsetTop - position.top),
        //     left = (e.pageX - legendWrap.offsetLeft - position.left);

        // return {
        //     top: top,
        //     left: left
        // };
    }

    zoomLegend(delta, e) {
        // var self = this,
        //     percent = 1,
        //     position,
        //     zoom = 1.2,
        //     newH = 0,
        //     newW = 0,
        //     x = 0,
        //     y = 0,
        //     top = 0,
        //     left = 0,
        //     legend = self.getSizeAndPosition(self.$legend),
        //     legendWrap = self.getSizeAndPosition(self.$legendWrap);

        // if (delta > 0)
        //     newW = legend.width * zoom, newH = legend.height * zoom;
        // else
        //     newW = legend.width / zoom, newH = legend.height / zoom;

        // // calculating zoom percentage
        // percent = (newW / self.legendWidth);

        // // zoom in range
        // if (percent >= self.opts.maxZoom || percent <= self.opts.minZoom)
        //     return;

        // // setting zoom in percent
        // self.percent = percent;

        // // setting the new width and height
        // self.$legend.width(newW).height(newH);

        // // get zoom position
        // if (typeof e === "undefined") {
        //     position = {
        //         top: (legendWrap.height - newH) / 2,
        //         left: (legendWrap.width - newW) / 2
        //     }
        // } else {
        //     position = self.getZoomPosition(e, legend.width, legend.height, newW, newH);
        // }

        // self.$legend.css({
        //     "left": position.left + "px",
        //     "top": position.top + "px"
        // });

        // // zoom in after redraw hotpoint
        // self.redraw();
    }

    getZoomPosition(e, oldWidth, oldHeight, newWidth, newHeight) {
        // var self = this,
        //     position = self.getCursorPosition(e),
        //     legendWrap = self.getSizeAndPosition(self.$legendWrap),
        //     wLeft = e.pageX - legendWrap.offsetLeft,
        //     wTop = e.pageY - legendWrap.offsetTop,
        //     topPercent = (position.top / oldHeight).toFixed(2),
        //     leftPercent = (position.left / oldWidth).toFixed(2);

        // return {
        //     top: wTop - (newHeight * topPercent),
        //     left: wLeft - (newWidth * leftPercent)
        // };
    }

    getPosition(e) {
        // var self = this,
        //     legend = self.getSizeAndPosition(self.$legend),
        //     legendWrap = self.getSizeAndPosition(self.$legendWrap),
        //     legendMarge = self.getLegendMarge(),
        //     t = parseInt((e.pageY - self.legendOffsetTop - legend.top + legendMarge.margeTop) / self.percent),
        //     l = parseInt((e.pageX - self.legendOffsetLeft - legend.left + legendMarge.margeLeft) / self.percent);

        // return {
        //     top: t,
        //     left: l
        // };
    }

    getLegendMarge() {
        // var self = this,
        //     left = (self.$legendWrap.width() - self.legendWidth) / 2,
        //     top = (self.$legendWrap.height() - self.legendHeight) / 2;

        // return {
        //     margeLeft: left,
        //     margeTop: top
        // };
    }

    legendToCenter(x, y) {
        // var self = this,
        //     p = self.percent,
        //     legend = self.getSizeAndPosition(self.$legend),
        //     legendWrap = self.getSizeAndPosition(self.$legendWrap),
        //     x1 = self.x1,
        //     y1 = self.y1,
        //     x2 = self.x2,
        //     y2 = self.y2,
        //     topRange = legendWrap.offsetTop + (y * p) + legend.top - 15,
        //     leftRange = legendWrap.offsetLeft + (x * p) + legend.left - 15,
        //     moveTop = (legendWrap.height / 2) - (y * p) - 15,
        //     moveLeft = (legendWrap.width / 2) - (x * p) - 15;

        // if ((leftRange > x1 && topRange > y1) && (leftRange < x2 && topRange < y2)) {
        //     return;
        // }
        // if ((legend.cssTop === 0 && legend.cssLeft === 0) && (legend.width === self.legendWidth && legend.height === self.legendHeight)) {
        //     return;
        // }
        // self.$legend.css({
        //     "left": moveLeft + "px",
        //     "top": moveTop + "px"
        // });
    }

    getSizeAndPosition($domEl) {

        // return {
        //     width: $domEl.width(),
        //     height: $domEl.height(),
        //     top: $domEl.position().top,
        //     left: $domEl.position().left,
        //     offsetTop: $domEl.offset().top,
        //     offsetLeft: $domEl.offset().left
        // };
    }

    zoomIn(e) {
        var self = this;

        self.zoomLegend(1, e);
    }

    zoomOut(e) {
        var self = this;

        self.zoomLegend(0, e);
    }

    resetLegend() {
        // var self = this,
        //     top = (self.$legendWrap.height() - self.legendHeight) / 2,
        //     left = (self.$legendWrap.width() - self.legendWidth) / 2;

        // self.percent = 1;
        // self.$legend.css({
        //     top: top + "px",
        //     left: left + "px",
        //     width: self.legendWidth,
        //     height: self.legendHeight
        // });
    }

    getCalloutCoord(callouts) {
        // var self = this,
        //     callout, coords = [],
        //     i = 0,
        //     buildData = self.buildData;

        // for (; i < buildData.length; i++) {
        //     callout = buildData[i].callout.toString();
        //     if ($.inArray(callout, callouts) > -1) {
        //         coords.push({
        //             x: buildData[i].x,
        //             y: buildData[i].y
        //         });
        //     }
        // }

        // return coords;
    }

    getCallout(x, y) {
        // var self = this,
        //     i = 0,
        //     item = {},
        //     callout;

        // for (; i < self.buildData.length; i++) {
        //     item = self.buildData[i];
        //     if (item.x === x && item.y === y) {
        //         callout = item.callout;
        //         break;
        //     }
        // }

        // return callout;
    }

    getCoord(x, y) {
        // var self = this,
        //     key = x + "-" + y,
        //     coord = self.dictList[key];

        // return coord;
    }

    drawHotpoint(drawPointId, coord, colorHxe) {
        // if (!this.opts.legendExist) return;

        // var self = this,
        //     p = self.percent,
        //     x = coord.x * p,
        //     y = coord.y * p,
        //     radius = self.radius * p,
        //     color = new jsColor(colorHxe),
        //     pen = new jsPen(color, 3),
        //     point = new jsPoint(x, y),
        //     drawObj = self.graphics.drawCircle(pen, point, radius);

        // $(drawObj).attr({
        //     "id": drawPointId,
        //     "data-type": "hotpoint"
        // });
    }

    activateHotpoint(coords, callouts) {
        // var self = this,
        //     i = 0,
        //     drawPointId,
        //     checkedColor = self.opts.circleLineColor.checkedColor;

        // for (; i < coords.length; i++) {
        //     drawPointId = coords[i].x + "-" + coords[i].y;
        //     self.drawHotpoint(drawPointId, coords[i], checkedColor);
        // }

        // if (callouts.length > 0) {
        //     self.settingsRowBg(callouts[0]);
        //     self.movingRowScrollTop(callouts[0]);
        // }
    }

    linkHotpoint(callouts) {
        var self = this;

        // self.clearHotpoint();
        // self.curCallouts = callouts;
        // self.curCoords = self.getCalloutCoord(callouts);
        // if (self.curCoords.length === 1) {
        //     self.legendToCenter(self.curCoords[0].x, self.curCoords[0].y);
        //     self.activateHotpoint(self.curCoords, callouts);
        // } else {
        //     self.resetLegend();
        //     self.redraw();
        // }
    }

    clearHotpoint(drawPointId) {
        // var self = this;

        // if (drawPointId) {
        //     self.$legend.find("#" + drawPointId).remove();
        // } else {
        //     self.$legend.find("div[data-type='hotpoint']").remove();
        // }
    }

    movingRange(e, sender, position) {
        // var self = this,
        //     minleft = 5,
        //     minTop = 5,
        //     movePosition = self.getMovePosition(e, position),
        //     maxLeft = self.$legendWrap.width() - $(sender).width() - 5,
        //     maxTop = self.$legendWrap.height() - $(sender).height() - 5;

        // if (movePosition.left < minleft) {
        //     movePosition.left = minleft;
        // }
        // if (movePosition.top < minTop) {
        //     movePosition.top = minTop;
        // }
        // if (movePosition.left > maxLeft) {
        //     movePosition.left = maxLeft;
        // }
        // if (movePosition.top > maxTop) {
        //     movePosition.top = maxTop;
        // }

        //return movePosition;
    }

    redraw() {
        // var self = this;

        // if (self.curCoords.length > 0) {
        //     self.clearHotpoint();
        //     self.activateHotpoint(self.curCoords, self.curCallouts);
        // }
    }

    scalingDownCalc(iW, iH, mW, mH) {
        var newW, newH, top, left;

        if (iH / iW >= mH / mW) {
            if (iH > mH) {
                newH = mH;
                newW = (iW * mH) / iH;
            } else {
                newW = iW;
                newH = iH;
            }
        } else {
            if (iW > mW) {
                newW = mW;
                newH = (iH * mW) / iW;
            } else {
                newW = iW;
                newH = iH;
            }
        }

        top = (mH - newH) / 2;
        left = (mW - newW) / 2;

        return {
            width: newW,
            height: newH,
            top: top,
            left: left
        };
    }
}
