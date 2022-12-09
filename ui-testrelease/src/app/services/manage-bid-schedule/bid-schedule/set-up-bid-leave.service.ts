import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import straightlines_io_java_apis from 'src/app/json/apis.json';
import { BidLeaveSetUP } from 'src/app/model/bidLeaveSetUp';

@Injectable({
  providedIn: 'root'
})
export class SetUpBidLeaveService {
  private _url:string=straightlines_io_java_apis.java_apis.url
  private url=location.origin+':2020'
  constructor(private http: HttpClient) {
    if(location.hostname=='localhost'|| location.hostname=='127.0.0.1'){
      this.url='http://3.13.254.87:2020'
    }else if(location.hostname=='dev.straightlines.io' || location.hostname=='3.13.254.87'){
        this.url='https://dev.straightlines.io/java'
    }else if(location.hostname=='test.straightlines.io' || location.hostname=='52.14.8.217'){
      this.url='https://test.straightlines.io/java'
    }else if(location.hostname=='staging.straightlines.io' || location.hostname=='3.140.109.198'){
      this.url='https://staging.straightlines.io/java'
    }else if(location.hostname=='straightlines.io' || location.hostname=='18.119.62.157'){
      this.url='https://straightlines.io/java'
    }
  }
  addNewLeave(newBidleave): Observable<BidLeaveSetUP[]>{
    return this.http.post<BidLeaveSetUP[]>(this.url+'/bidleavesave',newBidleave)
  }
  getAllLeaveBasedOnScheduleName(scheduleName):Observable<BidLeaveSetUP[]>{
    return this.http.get<BidLeaveSetUP[]>(this.url+'/bidleavebasedonschedulename/'+scheduleName)
  }
  deleteBidLeaveBasedOnId(id){
    return this.http.delete(this.url+'/bidleavedeletebyleaveid/'+id);

  }
  updateBidLeave(id,leaveData):Observable<BidLeaveSetUP[]>{

    return this.http.put<BidLeaveSetUP[]>(this.url+'/bidleavebyid/'+id,leaveData)
  }
}
