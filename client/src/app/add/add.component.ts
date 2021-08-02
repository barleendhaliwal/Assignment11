import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from '../http-request.service';
import Role from '../enum'
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  eRole = Role

  constructor(private fb: FormBuilder, private httpService: HttpRequestService) {
  
  }

  ngOnInit(): void {
  }
  addUserForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    middleName: [''],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
    role: ['', [Validators.required]],
    address: ['', [Validators.required]],
    customerName: ['', [Validators.required]]
  })
  onSubmit() {
    if ((this.addUserForm.value.role).toUpperCase === 'SUPERADMIN') {
      this.addUserForm.value.role = Role.SUPERADMIN;
    }
    else if ((this.addUserForm.value.role).toUpperCase === 'ADMIN') {
      this.addUserForm.value.role = Role.ADMIN;
    }
    else {
      this.addUserForm.value.role = Role.SUBSCRIBER;
    }
    this.httpService.post(this.addUserForm.value).subscribe(response => {
      alert(response.message + "\nSee Show Users to see Changes !")
    }, error => {
      console.log(error)
      alert(error.error.message)

    })
    console.log(this.addUserForm)
  }
  display(item: any) {
    console.log(item)
    if (Number.isInteger(item.value))
      return true;
    else
      return false;
  }
}
