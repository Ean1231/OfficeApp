import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

 

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 collection = 'Offices';
 collectionData = 'employees'

  constructor(private firestore: AngularFirestore, private fire: Firestore) { }

  //Employees services
  update_employee(id,data){
    return this.firestore.doc(this.collectionData + '/' + id).update(data);
  }

  getemployees(){
    return this.firestore.collection(this.collectionData).snapshotChanges();
  }

  addEmployee(data){
    return this.firestore.collection(this.collectionData).add(data);
  }

  delete_employee(id){
    return this.firestore.doc(this.collectionData + '/' + id).delete();
  }

  get_single_employee(id){
    return this.firestore.collection(this.collectionData).doc(id).valueChanges();
  }

  //Office Services
  getOffices(){
    return this.firestore.collection(this.collection).snapshotChanges();
  }

  addOffice(data){
    return this.firestore.collection(this.collection).add(data);
  }


  delete_office(id){
    return this.firestore.doc(this.collection + '/' + id).delete();
  }

  get_single_office(id){
    return this.firestore.collection(this.collection).doc(id).valueChanges();
  }

  update_office(id,data){
    return this.firestore.doc(this.collection + '/' + id).update(data);
  }
}
