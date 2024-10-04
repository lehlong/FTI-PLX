import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-index-performance',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './index-performance.component.html',
  styleUrl: './index-performance.component.scss'
})
export class IndexPerformanceComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách chứng từ đo chỉ số hoạt động',
        path: 'performance/IndexPerformance',
      },
    ])
  }
  __iwerk: any = localStorage.getItem('__iwerk')
  werk = JSON.parse(this.__iwerk)
  __tplnr: any = localStorage.getItem('__tplnr')
  tplnr = JSON.parse(this.__tplnr)
  __activeRole: any = localStorage.getItem('__activeRole')
  role = JSON.parse(this.__activeRole)

  model = {
    funcloc: null,
    object_type: null,
    ingpr: null,
    arbpl: null,
    equnr: null,
    ipage: 1,
    index: null,
    start_date: '',
    end_date: '',
    iwerk: this.werk
  }
  lstSelectFunclocList : any[] = []
  lstSelectObjectType: any[] = []
  lstSelectPlaner: any[] = []
  lstSelectPhongBan : any[] = []
  dtable: any[] = []

  ngOnInit(){
    this.getFunclocList();
    this.getObjectType();
    this.getPlaner();
    this.getPhongBan();
  }
  searchData(){
    ShowLoading();
    var f_date = new Date(this.model.start_date)
    var t_date = new Date(this.model.end_date)
    this.model.start_date = `${f_date.getFullYear()}-${("0" + (f_date.getMonth() + 1)).slice(-2)}-${("0" + f_date.getDate()).slice(-2)}`;
    this.model.end_date = `${t_date.getFullYear()}-${("0" + (t_date.getMonth() + 1)).slice(-2)}-${("0" + t_date.getDate()).slice(-2)}`;
    this.http.post(environment.baseApiUrl + `/measurement_list/${this.model.funcloc}`, this.model)
      .subscribe({
        next: (response: any) => {
          this.dtable = response.itmeasurement.item;
          console.log(response)
          HideLoading()
        },
        error: (error) => {
          HideLoading();
          console.error('Fail load:', error)
        },
      })
  }
  exportData(){

  }
  getFunclocList() {
    ShowLoading()
    this.http
      .get(environment.baseApiUrl + `/funcloc_list/${this.tplnr}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectFunclocList = response.funcloclist.item
          this.lstSelectFunclocList.forEach(
            (item: { descript: string; funcloc: any }) => {
              item.descript = `${item.funcloc} - ${item.descript}`
            },
          )
          HideLoading()
        },
        error: (error) => {
          HideLoading()
          console.error('Fail load:', error)
        },
      })
  }
  getObjectType() {
    this.http.get(environment.baseApiUrl + `/get_object_type`).subscribe({
      next: (response: any) => {
        this.lstSelectObjectType = response.gtT370KT.item
        this.lstSelectObjectType.forEach(
          (item: { eartx: string; eqart: any }) => {
            item.eartx = `${item.eqart} - ${item.eartx}`
          },
        )
      },
      error: (error) => {
        console.error('Fail load:', error)
      },
    })
  }
  getPlaner() {
    this.http
      .get(environment.baseApiUrl + `/get_planner/${this.werk}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectPlaner = response.gtPlanner.item
          this.lstSelectPlaner.forEach(
            (item: { innam: string; ingrp: any }) => {
              item.innam = `${item.ingrp} - ${item.innam}`
            },
          )
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getPhongBan() {
    this.http
      .get(environment.baseApiUrl + `/get_phongban/${this.role}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectPhongBan = response.gtPb.item
          this.lstSelectPhongBan.forEach(
            (item: { depidTxt: string; depid: any }) => {
              item.depidTxt = `${item.depid} - ${item.depidTxt}`
            },
          )
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  onCurrentPageDataChange($event: any): void {}
}
