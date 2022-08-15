import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { DataService } from '../data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'quantity',
    'actionsColumn',
  ];
  dataSource: any;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getProducts().subscribe((data: any) => {

      this.dataSource = new MatTableDataSource<Product>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  deleteProduct(id) {

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Employee',
        message: 'Are you sure, you want to remove an employee: ' + id
      }

      // this.router.navigate(['/products']);
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.dataService.deleteProduct(id).subscribe((response) => {
          console.log(response);
          this.loadData();
        });

      }
    });
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
