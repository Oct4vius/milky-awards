import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'shared-alert',
  imports: [],
  templateUrl: './Alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  
  private alert = inject(AlertService)

  public alertType = computed(() => this.alert.alertType())
  public alertMessage = computed(() => this.alert.alertMessage())
  

}
