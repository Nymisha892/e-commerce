import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from '../../product-model';
import { ApiService } from 'src/app/services/api.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy{
  items: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];
  searchTerm: string = '';
  productList: Product[]=[]
  @Output() searchEvent = new EventEmitter<string>();
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  apiServiceService: any;
  

  constructor(private apiService:ApiService){}
  
  // get filteredItems(): Product[] {
  //   this.apiService.currentData.subscribe((data: Product[]) => {
  //     this.productList = data;
  //   });
  //   return this.productList.filter((item) =>
  //     item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait for 300ms of inactivity
        distinctUntilChanged(), // Emit only if the value changes
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm) => {
        this.searchEvent.emit(searchTerm); // Emit search term to parent
      });
  }

  onInputChange(event: Event) {
    this.searchSubject.next((event.target as HTMLInputElement).value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
