import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { LoadingComponent } from "../../../../../shared/components/Loading/Loading.component";
import { ObligatoryService } from '../../services/obligatory.service';
import { ObligatoryCategories } from '../../interfaces/vote-category.interfaces';

@Component({
  selector: 'app-obligatory-page',
  imports: [LoadingComponent],
  templateUrl: './obligatory-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObligatoryPageComponent implements OnInit {
  
  public obligatoryService = inject(ObligatoryService)
  
  public isLoading = signal<boolean>(false)
  public obligatoryItems = signal<ObligatoryCategories[]>([])  
  
  ngOnInit() { 
    this.obligatoryService.getAll().subscribe({
      next: (response) => response,
      error(err) {
        console.error(err)
      },
    })

  } 

}
