import { Component, Input, OnInit, EventEmitter, Output,ViewChild, ElementRef } from '@angular/core';
import { HttpRequestService } from '../../http-request.service';
import {User} from '../../user.model'
import Role from '../../enum'
// enum Role{SUPERADMIN=1,ADMIN,SUBSCRIBER};
@Component({
  selector: 'tr[app-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  eRole=Role;
  editSelectedRole!:number
  @Input() rowNumber = -1;
  //need to initialize here because of strict mode
  @Input() user!: User;
  editable: boolean = false;
  @Output() mode = new EventEmitter<{ editable: boolean }>();
  
 
  constructor(private httpService: HttpRequestService) { 
    
  }

  ngOnInit(): void {
    this.mode.subscribe(modeObject => {
    
      if (modeObject.editable) {
        this.editable = true;
      }
      else {
        this.editable = false;
      }
    });
  }



  deleteRow() {
    this.httpService.delete(this.user.id).subscribe(response => {
      alert(response.message)

    }, error => {
      alert(error.error.message)
    })
  }

  editRow() {
    this.editSelectedRole=this.user.role
    this.mode.emit({ editable: true })
  }
  cancelRow(){
    
    this.mode.emit({ editable: false })
  }
  saveRow(){
    
    let id =(<HTMLTableElement>document.getElementById(`row${this.rowNumber}Id`)).innerHTML;
    let firstName =(<HTMLTableElement>document.getElementById(`row${this.rowNumber}FirstName`)).innerHTML;
    let middleName =(<HTMLTableElement>document.getElementById(`row${this.rowNumber}MiddleName`)).innerHTML;
    let lastName =(<HTMLTableElement>document.getElementById(`row${this.rowNumber}LastName`)).innerHTML;
    let email =(<HTMLTableElement>document.getElementById(`row${this.rowNumber}Email`)).innerHTML;
    let phoneNumber =(<HTMLTableElement>document.getElementById(`row${this.rowNumber}PhoneNumber`)).innerHTML;
    let roleId =this.editSelectedRole;
    let address =(<HTMLTableElement>document.getElementById(`row${this.rowNumber}Address`)).innerHTML;
    let customerName =(<HTMLTableElement>document.getElementById(`row${this.rowNumber}CustomerName`)).innerHTML;
    
    let updatedData:User={id:+id,firstName:firstName,middleName:middleName, lastName:lastName, email:email, phoneNumber:phoneNumber, role:roleId,address:address,customerName:customerName}
 
    this.httpService.edit(this.user.id,updatedData).subscribe(response=>{
      alert(response.message + "\nRefresh to see Changes !")
    }, error => {
    
      alert(error.error.message)
      
    })
    this.mode.emit({ editable: false})
    
  }

}
