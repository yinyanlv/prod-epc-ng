import {NgModule} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PortalModule} from '@angular/cdk/portal';

import {SModalSubject} from '../components/dialog/dialog-subject-service';
import {SModalService} from '../components/dialog/dialog.service';
import {DialogComponent} from '../components/dialog/dialog.component';
import {ButtonComponent} from '../components/button/button.component';
import {PaginationComponent} from '../components/pagination/pagination.component';
import {ComboxComponent} from '../components/combox/combox.component';
import {ComboxOptionComponent} from '../components/combox/combox.option.component';

import {IconComponent} from '../components/icon/icon.component';
import {TreeComponent} from '../components/tree/tree.component';
import {MenuComponent} from '../components/menu/menu.component';
import {CrumbComponent} from '../components/crumb/crumb.component';
import {CheckboxComponent} from '../components/checkbox/checkbox.component';
import {GridComponent} from '../components/grid/grid.component';
import {GridColumnComponent} from '../components/grid/grid-column.component';
import {LoadingComponent} from '../components/loading/loading.component';
import {LoadingDirective} from '../directives/loading.directive';
import {TabItemComponent} from '../components/tabs/tab-item/tab-item.component';
import {TabsComponent} from '../components/tabs/tabs.component';
import {SearchComponent} from '../components/search/search.component';
import {InputNumberComponent} from '../components/input-number/input-number.component';
import {PoppickerComponent} from '../components/poppicker/poppicker.component';
import {SurveyInputDirective} from '../directives/surveyInput.directive';
import {ImagesComponent} from '../components/images/images.component';
import {SvgHotpointComponent} from '../components/svg-hotpoint/svg-hotpoint.component';
import {SvgDragZoomComponent} from '../components/svg-drag-zoom/svg-drag-zoom.component';

const components = [
  IconComponent,
  TreeComponent,
  MenuComponent,
  ButtonComponent,
  DialogComponent,
  CrumbComponent,
  CheckboxComponent,
  GridComponent,
  GridColumnComponent,
  LoadingComponent,
  PaginationComponent,
  ComboxComponent,
  ComboxOptionComponent,
  TabItemComponent,
  TabsComponent,
  SearchComponent,
  InputNumberComponent,
  ImagesComponent,
  PoppickerComponent,
  SvgHotpointComponent,
  SvgDragZoomComponent
];

const directives = [
  LoadingDirective,
  SurveyInputDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OverlayModule
  ],

  declarations: [
    ...components,
    ...directives
  ],

  providers: [SModalSubject, SModalService],

  entryComponents: [DialogComponent, LoadingComponent],

  exports: [
    ...components,
    ...directives,
    FormsModule,
    RouterModule,
    OverlayModule,
    PortalModule
  ]
})

export class ComponentModule {
}
