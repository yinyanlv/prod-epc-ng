import {globalConfig, trans, eventMap} from '../etc/provider';
import {StateService} from '../services/state.service';

export class BaseComponent {

    globalConfig: any = globalConfig;
    trans: any = trans;
    eventMap: any = eventMap;
    stateService: any = new StateService();
}
