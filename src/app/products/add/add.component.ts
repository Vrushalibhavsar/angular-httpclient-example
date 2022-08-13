import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public myForm: FormGroup;
  constructor(private dataService: DataService, 
    private route: ActivatedRoute,
    private router: Router,private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      quantity: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });
  }
  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
  public onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      let newProduct = this.myForm.value;
      this.dataService.addProduct(newProduct).subscribe(data => {
        console.log(data);
        if(data.id) {
          //add toster message -> product added succesfully
          
            this._snackBar.open('product added succesfully','undo',{
              duration:3000
            });
          
          this.router.navigate(['/products']);
        }
      });
    }
  }
}