import { Component, OnInit } from '@angular/core';
import { CuisineService } from 'src/app/services/cuisine.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.css']
})
export class CuisineComponent implements OnInit {

  message;
  messageClass;
  cuisineList;
  imageUrl = environment.imgUrl

  constructor(
    private cuisineService: CuisineService
  ) { }

  ngOnInit(): void {
    this.cuisineService.getAll().subscribe( result => {
      this.cuisineList = result
      console.log(this.cuisineList)
    })
  }

  deleteCuisine(id:string, i) {
    let confrimRemove = confirm('Are you sure to delete?');
    if (!confrimRemove) {
      return;
    }
    this.cuisineService.remove(id).subscribe(
      data => {
        this.messageClass = "alert alert-success"
        this.message = "Cuisine Deleted."
        this.cuisineList.splice(i, 1);
      }, error => {
        this.messageClass = "alert alert-danger"
        this.message = "Error in deleting."
      }
    )

  }

}
