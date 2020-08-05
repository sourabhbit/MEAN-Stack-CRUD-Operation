import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
export interface Item {
  name: string;
}

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})

export class EditItemComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetItemForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemForm: FormGroup;

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private studentApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.studentApi.GetItem(id).subscribe(data => {
      console.log(data.subjects)
      this.itemForm = this.fb.group({
        item_name: [data.item_name, [Validators.required]],
        item_description: [data.item_description, [Validators.required]],
        item_price: [data.item_price, [Validators.required]],
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.itemForm = this.fb.group({
      item_name: ['', [Validators.required]],
      item_description: ['', [Validators.required]],
      item_price: ['', [Validators.required]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.itemForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateItemForm() {
    console.log(this.itemForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.studentApi.UpdateItem(id, this.itemForm.value).subscribe( res => {
        Swal.fire('Item Edited');
        this.ngZone.run(() => this.router.navigateByUrl('/items-list'))
      });
    }
  }
  
}
