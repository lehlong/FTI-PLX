import { Component } from '@angular/core'
import { ShareModule } from '../../shared/share-module'
import { GlobalService } from '../../services/global.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
import {
  HideLoading,
  ShowLoading,
} from '../../shared/constants/loading.constants'

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss',
})
export class DeviceComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách thiết bị/ tài sản CSVCKT',
        path: 'master-data/Function',
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
  }
  equi = {
    iloan: '',
    equnr: '',
    objek: '',
    equtxt: '',
    tplnr: '',
    tplnrtxt: '',
    eqtyp: '',
    eqtyptxt: '',
    eqart: '',
    eqarttxt: '',
    anlnr: '',
    anlnrtxt: '',
    sttxt: '',
    fixeddate: '',
    objnr: '',
    klasse: '',
    klassedtxt: '',
    typbz: '',
    serge: '',
    model: '',
    inbdt: '',
    bukrs: '',
    bukrstxt: '',
    iwerk: '',
    iwerktxt: '',
    ingrp: '',
    ingrptxt: '',
    gewrk: '',
    gewrktxt: '',
    arbpl: '',
    ngaybd: '',
    ngayhc: '',
    statushd: '',
    statussd: '',
    nhanvien: '',
    phongban: '',
    nuocsx: '',
    namsx: '',
    namsd: '',
    todoi: '',
  }

  visibleDetail: boolean = false
  lstSelectFunclocList: any[] = []
  lstSelectObjectType: any[] = []
  lstSelectPlaner: any[] = []
  lstSelectPhongBan: any = []
  dtable: any[] = []
  dtskt: any[] =[]
  ngOnInit() {
    this.getFunclocList()
    this.getObjectType()
    this.getPlaner()
    this.getPhongBan()
  }
  exportData() {}
  searchData() {
    ShowLoading()
    this.http
      .post(
        environment.baseApiUrl + `/equi_list/${this.model.funcloc}/0`,
        this.model,
      )
      .subscribe({
        next: (response: any) => {
          this.dtable = response.gtequis.item
          this.dtable.forEach((item, index) => {
            item.index = index + 1
          })
          HideLoading()
        },
        error: (error) => {
          HideLoading()
          console.error('Fail load:', error)
        },
      })
  }
  getDetailDevice(code: any) {
    ShowLoading()
    this.http.get(environment.baseApiUrl + `/detail_equi/${code}`).subscribe({
      next: (response: any) => {
        this.equi = response.gsequis
        this.dtskt = response.tobjectdata.item
        this.visibleDetail = true
        HideLoading()
      },
      error: (error) => {
        HideLoading()
        console.error('Fail load:', error)
      },
    })
  }
  closeDetail(){
    this.visibleDetail = false
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
