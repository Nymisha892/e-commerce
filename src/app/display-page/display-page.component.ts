import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../product-model';
//import * as EventEmitter from 'events';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.scss']
})
export class DisplayPageComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  products: Product[]=[];
  filteredProducts: any[]=[];

  

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data) => {
      if(data){
        this.products=data
        this.filteredProducts=data
        this.apiService.sendProductsData(this.products);
        console.log(data.message,"message")
      }
      console.log(data,"data",data.value);
    });
    
  }

  onSearch(searchTerm: string) {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
