import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  QueryList,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-modal',
  imports: [],
  templateUrl: './Modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements AfterViewChecked {
  @ViewChild('modal') modal!: QueryList<HTMLDialogElement> | HTMLDialogElement;

  public id = input.required();


  private focusElement = () => {
    if (this.modal instanceof QueryList) {
      this.modal = this.modal.find((el) => el.id === this.id())!;
      return;
    }
  };

  public openModal = () => {
    (this.modal as HTMLDialogElement).showModal();
    
  }

  

  ngAfterViewChecked(): void {
    this.focusElement();
  }
}
