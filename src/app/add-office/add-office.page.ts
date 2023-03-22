import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.page.html',
  styleUrls: ['./add-office.page.scss'],
})
export class AddOfficePage implements OnInit {
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

  constructor(private router: Router,private route: ActivatedRoute, public service: FirebaseService) { 
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
      console.log(this.Offices);
   },(error:any) => {
     console.log(error)
   }
   )
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
  }

  firstColor(){
    console.log();
   let color1 = this.firstcolor = "#ffbe0b"
    console.log(color1);
  }

  secondColor(){
    let color2 = this.firstcolor = " #FF9B71"
    console.log(color2);
  }
  thirdColor(){
    let color3 = this.firstcolor = "#FB5607"
    console.log(color3);
  }

  fouthColor(){
    let color4 = this.firstcolor = "#97512C"
    console.log(color4);
  }

  fifthColor(){
    let color5 = this.firstcolor = "#DBBADD"
    console.log(color5);
  }

  sixthColor(){
    let color6 = this.firstcolor = "#FF006E"
    console.log(color6);
  }

  seventhColor(){
    let color7 = this.firstcolor = "#A9F0D1"
    console.log(color7);
  }
  eigthColor(){
    let color8 = this.firstcolor = "#00B402"
    console.log(color8);
  }
  ninethColor(){
    let color9 = this.firstcolor = "#489DDA"
    console.log(color9);
  }
  tenthColor(){
    let color10 = this.firstcolor = "#0072E8"
    console.log(color10);
  }
  elevethColor(){
    let color11 = this.firstcolor = "#8338EC"
    console.log(color11);
  }


  addOffice(){
    this.loading = true;
    if(this.isEdit){
      this.updateOffice();
      return;
    }
    let data = {
      officeName: this.officeName,
      physicalAddress: this.physicalAddress,
      emailAddress: this.emailAddress,
      phoneNumber: this.phoneNumber,
      capacity: this.capacity,
      firstcolor: this.firstcolor
    }
    this.service.addOffice(data).then((r: any) => {
      console.log(r);
      this.loading = false;
      this.router.navigateByUrl('/home');
    },(error:any) => {
      console.log(error)
    })
  }
  

  updateOffice() {
    let data = {
      officeName: this.officeName,
      physicalAddress: this.physicalAddress,
      emailAddress: this.emailAddress,
      phoneNumber: this.phoneNumber,
      capacity: this.capacity,
      firstcolor: this.firstcolor

    }
    this.service.update_office(this.id,data).then((res) => {
      console.log(res);
      this.router.navigateByUrl('/home');
    })
  }


  delete_office(officeId){
    this.load = true;
    this.service.delete_office(officeId).then((r: any) => {
      console.log(r)
      this.load = false;
      this.router.navigateByUrl('/home');
    })
  }
  
}
