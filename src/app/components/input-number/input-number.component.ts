import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 's-input-number',
  templateUrl: './input-number.html',
  styleUrls: ['./input-number.scss']
})
export class InputNumberComponent {

  @Input() size: string = 'small';

  @Input() isDisabled: boolean = false;

  @Input() min: number = 1;

  @Input() max: number = Number.MAX_SAFE_INTEGER;

  @Input() step: number = 1;

  @Input() inputVal: any = '';

  @Output() inputValChange: EventEmitter<number> = new EventEmitter<number>();

  minDisabled: boolean = false;
  maxDisabled: boolean = false;
  debounce: number = 300;

  dispatchinputVal(limit: number): void {
    const timer = setTimeout(() => {
      this.inputVal = limit;
      this.inputValChange.emit(limit);
      clearTimeout(timer);
    }, this.debounce);
  }

  decreaseHandle(calcType: boolean = true): void {

    if (this.isDisabled) {
      return;
    }

    const step: number = calcType ? this.step : 0 - this.step;
    const val: number = Number(this.inputVal) + step;

    if (Number.isNaN(val)) {
      return;
    }

    this.maxDisabled = val > this.max;
    this.minDisabled = val < this.min;

    if (this.maxDisabled) {
      return this.dispatchinputVal(this.max);
    }
    if (this.minDisabled) {
      return this.dispatchinputVal(this.min);
    }

    if (!this.maxDisabled && !this.minDisabled) {
      this.inputVal = val;
      this.inputValChange.emit(this.inputVal);
    }
  }
}
