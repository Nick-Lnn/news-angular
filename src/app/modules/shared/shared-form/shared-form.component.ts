import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedFormComponent),
      multi: true
    }
  ]
})
export class SharedFormComponent implements ControlValueAccessor {
  @Input() public id: string = '';
  @Input() public type: string = 'text';
  @Input() public placeholder: string = '';
  @Input() public required: boolean = false;

  public control: FormControl = new FormControl();

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  public writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  public registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  public onInputChange(): void {
    this._onChange(this.control.value);
  }

  public onBlur(): void {
    this._onTouched();
  }
}
