import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { DataService } from '../data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  quantity: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantity','actionsColumn'];
  dataSource: any;
  // dataSource = new MatTableDataSource<Product>();


  // dataSource = ELEMENT_DATA;
  constructor(private dataService: DataService, private route: ActivatedRoute,
    private router: Router,) { }
  ngOnInit(): void {
    this.dataService.getProducts().subscribe((data: any) => {
      console.log(data);
      // this.dataSource = data;
      // this.dataSource = new MatTableDataSource<Product>(data);

    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  deleteProduct(id) {
    this.dataService.deleteProduct(id)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/products']);
      })      
  }
}
