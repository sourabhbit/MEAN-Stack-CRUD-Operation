import { Item } from '../../shared/item';
import { ApiService } from '../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {
  ItemData: any = [];
  dataSource: MatTableDataSource<Item>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'item_name', 'item_description', 'item_price', 'image', 'action'];

  constructor(private itemApi: ApiService) {
    this.itemApi.GetItems().subscribe(data => {
      console.log(data);
      this.ItemData = data;
      this.dataSource = new MatTableDataSource<Item>(this.ItemData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteItem(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.itemApi.DeleteItem(e._id).subscribe()
      Swal.fire('Item Deleted');
    }
  }

}