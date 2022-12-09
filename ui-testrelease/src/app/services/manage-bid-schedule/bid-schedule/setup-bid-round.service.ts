import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import straightlines_io_java_apis from 'src/app/json/apis.json';
import { SetUpBidRound } from 'src/app/model/setUpBidRound';
@Injectable({
  providedIn: 'root'
})
export class SetupBidRoundService {

  private _url:string=straightlines_io_java_apis.java_apis.url
  private url=location.origin+':2020'
  constructor(private http: HttpClient) {
    if(location.hostname=='localhost'|| location.hostname=='127.0.0.1'){
        this.url='https://dev.straightlines.io/java'
    }else if(location.hostname=='dev.straightlines.io' || location.hostname=='3.13.254.87'){
        this.url='https://dev.straightlines.io/java'
    }else if(location.hostname=='test.straightlines.io' || location.hostname=='52.14.8.217'){
      this.url='https://test.straightlines.io/java'
    }else if(location.hostname=='staging.straightlines.io' || location.hostname=='3.140.109.198'){
      this.url='http://staging.straightlines.io/java'
    }else if(location.hostname=='straightlines.io' || location.hostname=='18.119.62.157'){
      this.url='https://straightlines.io/java'
    }
  }
  getAllBidRound(): Observable<SetUpBidRound[]>{
    return this.http.get<SetUpBidRound[]>(this.url+'/bidroundget')
  }
  addNewBidRound(newBidRoundData): Observable<SetUpBidRound[]>{
    return this.http.post<SetUpBidRound[]>(this.url+'/bidroundsave',newBidRoundData)
  }
  getAllBidRoundBasedOnBidScheduleName(bidScheduleName): Observable<SetUpBidRound[]>{
    return this.http.get<SetUpBidRound[]>(this.url+'/bidroundbasedonschedulename/'+bidScheduleName)
  }
  updateBidRound(id,bidScheduleData): Observable<SetUpBidRound[]>{
    return this.http.put<SetUpBidRound[]>(this.url+'/bidroundbyid/'+id,bidScheduleData)
  }
  deleteBidRound(bidScheduleName){
    return this.http.delete(this.url+'/bidrounddeletebyshname/'+bidScheduleName);
  }
  deleteBidRoundBasedOnId(id){
    return this.http.delete(this.url+'/bidrounddeletebyroundid/'+id);
  }
}
