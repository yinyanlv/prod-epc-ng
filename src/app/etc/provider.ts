import {StateService} from '../services/state.service';
let stateService = new StateService();

export let globalConfig = window['globalConfig'];

export let trans = window['trans'][stateService.getLanguage()];

export let eventMap: any = {
    showDialog: 'dialog:show'
};


