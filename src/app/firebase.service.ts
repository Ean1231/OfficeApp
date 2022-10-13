import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

    export interface Employees {
      id?: string;
      firstname: string;
      lastname: string;
    }

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
collection = 'Offices';
collectionData = 'employees'
  constructor(private firestore: AngularFirestore, private fire: Firestore) { }

  getEmployees(): Observable<Employees[]> {
    const notesRef = collection(this.fire, 'employees');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Employees[]>;
  }

  getEmployeeById(id): Observable<Employees> {
    const employeeDocRef = doc(this.fire, `employees/${id}`);
    return docData(employeeDocRef, { idField: 'id' }) as Observable<Employees>;
  }

  // addEmployee(employees: Employees) {
  //   const employeessRef = collection(this.fire, 'employees');
  //   return addDoc(employeessRef, employees);
  // }

  deleteEmployess(employees: Employees) {
    const employeesDocRef = doc(this.fire, `employees/${employees.id}`);
    return deleteDoc(employeesDocRef);
  }

  updateEmployee(employees: Employees) {
    const employeesDocRef = doc(this.fire, `employees/${employees.id}`);
    return updateDoc(employeesDocRef, { firstname: employees.firstname, lastname: employees.lastname });
  }

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

  get_single_employee(id){
    return this.firestore.collection(this.collectionData).doc(id).valueChanges();
  }

  update_office(id,data){
    return this.firestore.doc(this.collection + '/' + id).update(data);
  }
}
