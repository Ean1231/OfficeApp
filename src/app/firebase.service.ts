import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
collection = 'Offices';
  constructor(private firestore: AngularFirestore) { }

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
