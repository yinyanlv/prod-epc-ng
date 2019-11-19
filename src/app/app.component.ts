import {Component, ViewEncapsulation} from '@angular/core';

// 引入 observable 静态方法与操作符方法
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
