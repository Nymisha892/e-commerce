import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../product-model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private apiService : ApiService) { }
  productList:Product[]=[];

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((response) => {
      if(response){
        this.productList=response;
      }
    })
  }

}
