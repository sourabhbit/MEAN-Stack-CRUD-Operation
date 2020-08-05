import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemForm: FormGroup;
  image;
  resData;
  msg;
  
  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private itemApi: ApiService,
  ) { }

  addImage(event)
  {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      console.log(file);
    }
  }
  
  submitBookForm() {
    this.itemForm = this.fb.group({
      item_name: ['', [Validators.required]],
      item_description: ['', [Validators.required]],
      item_price: ['', [Validators.required]],
      image:this.image
    })
  }

  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.itemForm.controls[controlName].hasError(errorName);
  }  

  submitItemForm() {
    if (this.itemForm.valid) {
      this.itemApi.AddItem(this.itemForm.value).subscribe(res => {
        Swal.fire('Item Added');
        this.ngZone.run(() => this.router.navigateByUrl('/items-list'))
      });
    }
  }
}