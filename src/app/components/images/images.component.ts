import {
  Component,
  Renderer2,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 's-images',
  templateUrl: './images.html',
  styleUrls: ['./images.scss']
})
export class ImagesComponent {
  @ViewChild('img', {static: false}) public img: any;

  // 无图片路径
  @Input() public noImgSrc: string;

  // 图片路径
  @Input()
  public set imgSrc(value) {
    this.setImgSrc(value);
  }

  // 设置图的src
  public setImgSrc(src) {
    const self = this;
    const img = new Image();

    // 图加载成功回调
    img.onload = () => {
      self.setImgAttribute(img, src);
    };

    // 图加载错误回调
    img.onerror = () => {
      img.onerror = null;

      img.onload = () => {
        self.setImgAttribute(img, self.noImgSrc);
      };
      img.src = self.noImgSrc;
    };

    // 赋图加载路径
    img.src = src;
  }

  // 设置图属性
  private setImgAttribute(img, src) {
    const self = this;
    const imgSize = self.getImgSize(img);

    self.img.nativeElement.src = src;
    self.img.nativeElement.style.width = imgSize.width + 'px';
    self.img.nativeElement.style.height = imgSize.height + 'px';
    self.img.nativeElement.style.marginTop = imgSize.marginTop + 'px';
  }

  // 获取图父容器
  private getParentEl() {
    return this.img.nativeElement.parentElement.parentElement;
  }

  // 获取图片的大小与边距
  private getImgSize(img) {
    const self = this;
    const parentEl = self.getParentEl();
    const iW = img.width;
    const iH = img.height;
    const mW = parentEl.clientWidth;
    const mH = parentEl.clientHeight;
    const imgSize = self.getAutoSize(iW, iH, mW, mH);
    const marginTop = (mH - imgSize.height) / 2;

    return {
      width: imgSize.width,
      height: imgSize.height,
      marginTop: marginTop
    };
  }

  // 获取同比例缩放的尺寸
  private getAutoSize(iW, iH, mW, mH) {
    let newW = 0;
    let newH = 0;

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

    return {
      width: newW,
      height: newH
    };
  }
}
