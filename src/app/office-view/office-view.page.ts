import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-office-view',
  templateUrl: './office-view.page.html',
  styleUrls: ['./office-view.page.scss'],
})
export class OfficeViewPage implements OnInit {
 data;
 firstcolor :any;
load: boolean;

  isEdit: boolean;
  officeName: string;
  physicalAddress: any;
  emailAddress: any;
  phoneNumber: number;
  capacity: number;
  green: '#00FF00';
  id: any;
  type: string;
  loading: boolean;
  Offices: any;
  private visible = []; 

  
  constructor(private router: Router, private service: FirebaseService, private route: ActivatedRoute) { 
    this.service.getOffices().subscribe((res) => {
      this.Offices = res.map(e => {
       return{
         id: e.payload.doc.id,
         officeName: e.payload.doc.data()['officeName'],
         physicalAddress: e.payload.doc.data()['physicalAddress'],
         emailAddress: e.payload.doc.data()['emailAddress'],
         phoneNumber: e.payload.doc.data()['phoneNumber'],
         capacity: e.payload.doc.data()['capacity'],
         firstcolor: e.payload.doc.data()['firstcolor']
       }
      })
     //  console.log(this.Offices);
   },(error:any) => {
     console.log(error)
   }
   )
  }

  
  toggle(key) {
    var index = this.visible.indexOf(key);
    if (index > -1) {
      this.visible.splice(index, 1);
    } else {
      this.visible.push(key);
    }
  } 

  ngOnInit() {
    this.route.params.subscribe((data:any) => {
      this.id = data.type;
      if(data.type == 'add'){
        this.isEdit = false;
      }else{
        this.isEdit = true;
        this.service.get_single_office(data.type).subscribe((data: any) => {
          console.log(data);
          this.officeName = data.officeName,
          this.physicalAddress = data.physicalAddress,
          this.emailAddress = data.emailAddress,
          this.phoneNumber = data.phoneNumber,
          this.capacity = data.capacity,
          this.firstcolor = data.firstcolor
        })
      }

      
      console.log(data.type);
     

    })

    
    //  this.data = this.router.getCurrentNavigation().extras.state;
    // console.log(this.data)
  }

}
