import { HttpRequestService } from '../http-request.service'
import { Component, OnInit } from "@angular/core";

//type of data returned by server
type User = {

    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: number;
    address: string;
    customerName: string;
}

@Component(
    {
        selector: 'app-table',
        templateUrl: './table.component.html',
        providers: [HttpRequestService],
        styleUrls: ['./table.component.css']
    }
)
export class TableComponent implements OnInit{

   

    usersDisplay = false;
    editableRowId=-1;
    editable=false;
    users: User[]=[];
    constructor(private httpRequestService: HttpRequestService) {
    }
    ngOnInit(): void{

        this.getUsers();
       
    }
    getUsers() {

        this.httpRequestService.get().subscribe(response => {
         
            this.users=response;
       
            this.usersDisplay = true;
        }, error => {
            console.log(error);
        })



        
    }
    
    changeDisplay(eventobj:{disabled:boolean,id:number})
    {
        //makes selected row noneditable/editable
        if(eventobj.disabled==true)
        this.editableRowId=eventobj.id=-1;
        else
        this.editableRowId=eventobj.id;
    }
    
    changeHeader(obj:any){   
        this.editable=obj.editable;
    }





}