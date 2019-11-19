import {Injectable, TemplateRef, Type, ComponentRef, ApplicationRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import {SModalSubject} from './dialog-subject-service';
import {BaseOptions, ModalOptions, ConfirmOptions} from './dialog-options.provider';
import {DialogComponent} from './dialog.component';

export interface ConfigInterface {
  title?: string;
  content?: string | Type<any>;
  componentParams?: Object;
  width?: number | string;
  wrapClass?: string;
  style?: object;
  footer?: boolean | TemplateRef<void>;
  okText?: string;
  cancelText?: string;
  alignCenter?: boolean;
  isHideBodyScroll?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

@Injectable()
export class SModalService {

  modalComponentFactory: ComponentFactory<DialogComponent>;

  constructor(private appRef: ApplicationRef, private cfr: ComponentFactoryResolver) {
    this.modalComponentFactory = this.cfr.resolveComponentFactory(DialogComponent);
  }

  initConfig(initConfig: ConfigInterface, options: BaseOptions = {} as any): any {
    const props = {};
    const optionParams: string[] = [
      'componentParams',
      'visible',
      'wrapClass',
      'style',
      'title',
      'width',
      'content',
      'footer',
      'okText',
      'cancelText',
      'alignCenter',
      'isHideBodyScroll',
      'onOk',
      'onCancel'
    ];

    const config = {...options, ...initConfig};

    optionParams.forEach(key => {
      if (config[key] !== undefined) {
        props[key] = config[key];
      }
    });

    props['onOk'] = this.getConfirmCb(props['onOk']);
    props['onCancel'] = this.getConfirmCb(props['onCancel']);

    return props;
  }

  getConfirmCb(fn?: () => Promise<void> | void): any {
    return (_close, _instance) => {

      if (fn) {
        const ret = fn();
        if (!ret) {
          _close();
        } else if (ret.then) {
          ret.then(_close);
        }
      } else {
        _close();
      }
    };
  }

  ptopen(props: ConfigInterface, factory: ComponentFactory<DialogComponent>): SModalSubject {

    // 在body的内部最前插入一个<s-modal></s-modal>方便进行ApplicationRef.bootstrap
    document.body.insertBefore(document.createElement(factory.selector), document.body.firstChild);

    // ComponentFactory<DialogComponent>;
    let customCmpFactory;
    let compRef: ComponentRef<DialogComponent>;
    let instance: DialogComponent;
    let subject: SModalSubject;

    const p = props['content'];

    if (p instanceof Type) {

      customCmpFactory = this.cfr.resolveComponentFactory(p);

      // 将编译出来的ngmodule中的用户component的factory作为modal内容存入
      props['content'] = customCmpFactory;
    }

    compRef = this.appRef.bootstrap(factory);
    instance = compRef.instance;
    subject = instance.subject;

    ['onOk', 'onCancel'].forEach((eventType: string) => {
      // register events for 'ok' and 'cancel'
      subject.on(eventType, () => {

        const eventHandler = props[eventType];
        if (eventHandler) {
          eventHandler(() => {

            instance.visible = false;
            setTimeout(() => {
              compRef.destroy();
            }, 200);
          }, instance);
        }
      });
    });

    Object.assign(instance, props, {visible: true});
    return subject;
  }

  open(config: ConfigInterface): SModalSubject {
    const options: ModalOptions = new ModalOptions();
    const props = this.initConfig(config, options);

    return this.ptopen(props, this.modalComponentFactory);
  }
}
