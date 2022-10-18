import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Offices: any;
  officeData: any;
  private visible = []; 

  constructor(public service: FirebaseService, private router: Router, private route: ActivatedRoute) {
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

  delete_office(officeId){
    this.service.delete_office(officeId).then((r: any) => {
      console.log(r)
      this.router.navigateByUrl('/home');
    })
  }

   details(){
    this.router.navigateByUrl('/office-view', {state:this.Offices});
    console.log(this.Offices)

    this.service.get_single_office(this.Offices).subscribe((officeData:any) => {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: this.officeData
        }
      };
      console.log(navigationExtras);
    })
   
  }



}
