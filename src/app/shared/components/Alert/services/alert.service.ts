import { computed, Injectable, signal } from '@angular/core';
import { AlertType } from '../interfaces/alertType.interfaces';

@Injectable({providedIn: 'root'})
export class AlertService {
    
    private _alertType = signal<AlertType | null>(null)
    private _alertMessage = signal<string>('')

    public alertType = computed(() => this._alertType())
    public alertMessage = computed(() => this._alertMessage())

    public useAlert({type, message, timeout}: {type: AlertType, message: string, timeout: number}){

        this._alertType.set(type)
        this._alertMessage.set(message)

        setTimeout(() => {
            this._alertMessage.set('')
            this._alertType.set(null)
        }, timeout)

    }

}