import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EmployeesPage } from '../employees/employees.page';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-office-view',
  templateUrl: './office-view.page.html',
  styleUrls: ['./office-view.page.scss'],
})
export class OfficeViewPage implements OnInit {
 data: any;
 firstcolor :any;
 load: boolean;

//  employees: Employees = null;
  avatar: any;
  search: string;
  employees = [];
  @Input() identity: string;
  isEdit: boolean;
  officeName: string;
  physicalAddress: any;
  firstname: string;
  lastname: string;
  emailAddress: any;
  phoneNumber: number;
  capacity: number;
  green: '#00FF00';
  id: any;
  type: string;
  loading: boolean;
  Offices: any;
  private visible = []; 


  constructor(public modalCtrl: ModalController,private changeDefect: ChangeDetectorRef,private router: Router, private service: FirebaseService, private route: ActivatedRoute, private alertCtrl: AlertController) 
  { 
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


   this.service.getemployees().subscribe((res) => {
    this.employees = res.map(e => {
     return{
       id: e.payload.doc.id,
       firstname: e.payload.doc.data()['firstname'],
       lastname: e.payload.doc.data()['lastname'],
       avatar: e.payload.doc.data()['avatar']
   
     }
    })
    console.log(this.employees);
 },(error:any) => {
   console.log(error)
 })
   
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

    this.route.params.subscribe((data:any) => {
      this.id = data.type;
      if(data.type == 'add'){
        this.isEdit = false;
      }else{
        this.isEdit = true;
        this.service.get_single_employee(data.type).subscribe((data: any) => {
          console.log(data);
          this.firstname = data.firstname,
          this.lastname = data.lastname,
          this.avatar = data.avatar
         
        })
      }

      
      console.log(data.type);
     

    })

    // this.service.getEmployees().subscribe((res) => {
    //   console.log(res);
    //   this.employees = res
  
    // })
    //  this.data = this.router.getCurrentNavigation().extras.state;
    // console.log(this.data)
  }

  addEmployees(){
    // if(this.isEdit){
    //   this.updateEmployee();
    //   return;
    // }
    let data = {
      firstname: this.firstname,
      lastname: this.lastname,
      avatar: this.avatar
    }
    this.service.addEmployee(data).then((res: any) => {
      console.log(res);
      this.firstname = "";
      this.lastname = ""
      // this.loading = false;
      // this.router.navigateByUrl('/home');
    
    },(error:any) => {
      console.log(error, "error")
    })
  }


  updateEmployee(){
    let data = {
      firsstname: this.firstname,
      lastname: this.lastname,
      avatar: this.avatar,
    }
    this.service.update_employee(this.id,data).then((res) => {
      console.log(res);
      this.router.navigateByUrl('/office-view');
    })
  }

  
  async openmodal() {
    const alert = await this.alertCtrl.create({
      buttons: [
         {
          text: 'Edit Staff Member',
          handler: res => {
            // this.service.addEmployee({ firstname: res.firstname, lastname: res.lastname});
          }
        },
        {
          text: "Delete Staff Member",
          handler: res => {
        this.delete_employee(this.id);
          }
        }
      ]
    });

    await alert.present();
  }

  delete_employee(employeeID){
    this.service.delete_employee(employeeID).then((result: any) => {
      console.log(result)
    })
  }

  // delete_office(officeId){
  //   this.service.delete_office(officeId).then((r: any) => {
  //     console.log(r)
  //     this.router.navigateByUrl('/home');
  //   })
  // }


  async openMyModal() {
    const myModal = await this.modalCtrl.create({
      component: EmployeesPage,
      cssClass: 'employees-modal',
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      // componentProps: {
      //   data: data
      // }

    });


    return await myModal.present();

  }

  firstAvatar(){
    console.log();
    let avatar1 = this.avatar = "../../assets/avatar-1295404__340.webp"   
    console.log(avatar1);
  }

  secondAvatar(){
    let avatar2 = this.avatar = " ../../assets/avatar2.png"
    console.log(avatar2);
  }
  thirdAvatar(){
    let avatar3 = this.avatar = "../../assets/png-clipart-metro-redux-playstation-4-gnome-computer-icons-xbox-360-gnome-hat-playstation-4.png"
    console.log(avatar3);
  }

  fouthAvatar(){
    let avatar4 = this.avatar = "../../assets/png-clipart-leafyishere-youtuber-drawing-portrait-miscellaneous-face.png"
    console.log(avatar4);
  }

  fifthAvatar(){
    let avatar5 = this.avatar = "../../assets/png-clipart-fortnite-battle-royale-playstation-4-playerunknown-s-battlegrounds-xbox-one-ninja-hat-video-game.png"
    console.log(avatar5);
  }

  sixthAvatar(){
    let avatar6 = this.avatar = "../../assets/iceman.png"
    console.log(avatar6);
  }

  seventhAvatar(){
    let avatar7 = this.avatar = "../../assets/spid.png"
    console.log(avatar7);
  }
}
