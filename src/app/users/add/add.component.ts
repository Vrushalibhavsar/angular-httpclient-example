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
  public isEdit: boolean = false;
  id: number;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      last_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      department: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if(this.id) { //edit
      this.isEdit = true;

      this.dataService.getUsersById(this.id).subscribe((data: any) => {
        this.myForm.patchValue({
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          city: data.city,
          department: data.department
        });
      });
    }

  }


  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
  public onSubmit() {
    if (this.myForm.valid) {

      let newUser = this.myForm.value;

      if(this.isEdit) {
        // edit service code goes here
        newUser.id = this.id;
        this.dataService.updateUser(newUser).subscribe(data => {
          if(data.id) {
              this._snackBar.open('User updated succesfully','undo',{
                duration:3000
              });

            this.router.navigate(['/users']);
          }
        });
      } else {
        // add code goes here
        this.dataService.addUser(newUser).subscribe(data => {
          if(data.id) {
              this._snackBar.open('User added succesfully','undo',{
                duration:3000
              });

            this.router.navigate(['/users']);
          }
        });
      }
    }
  }
}
