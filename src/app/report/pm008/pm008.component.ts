import { Component } from '@angular/core'
import { ShareModule } from '../../shared/share-module'
import { GlobalService } from '../../services/global.service'
import { HttpClient } from '@angular/common/http'
import {
  auart,
  ilart,
  plantype,
  qmart,
  status,
  statusHoatDong,
  statusThietBi,
} from '../../shared/constants/select.constants'
import { environment } from '../../../environments/environment'
import {
  HideLoading,
  ShowLoading,
} from '../../shared/constants/loading.constants'

@Component({
  selector: 'app-pm008',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm008.component.html',
  styleUrl: './pm008.component.scss',
})
export class PM008Component {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách thiết bị/ tài sản CSVCKT',
        path: 'report/PM008',
      },
    ])
  }
  __iwerk: any = localStorage.getItem('__iwerk')
  werk = JSON.parse(this.__iwerk)
  __tplnr: any = localStorage.getItem('__tplnr')
  tplnr = JSON.parse(this.__tplnr)
  __activeRole: any = localStorage.getItem('__activeRole')
  role = JSON.parse(this.__activeRole)
  __roles: any = localStorage.getItem('__roles')
  lstRole = JSON.parse(this.__roles)
  model = {
    funcloc: null,
    object_type: null,
    ingpr: null,
    arbpl: null,
    equnr: null,
    ipage: 1,
  }
  lstSelectIndicator = plantype
  lstSelectWorkCenter: any
  lstSelectAuart = auart
  lstSelectIlart = ilart
  lstSelectPlaner: any
  lstSelectObjectType: any
  lstSelectFunclocList: any
  lstSelectQmart = qmart
  lstSelectStatus = status
  lstSelectNhanVien: any
  lstSelectPhongBan: any
  lstSelectStatusTb = statusThietBi
  lstSelectStatusHd = statusHoatDong

  dataTable: any[] = []
  dataDetail = {
    light: null,
    eqktx: null,
    txt50: null,
    kostl: null,
    kltxtmain: null,
    klasse: null,
    kltxt: null,
    gltrp: null,
    budatbd: null,
    stadt: null,
    zykl1: null,
    ingrp: null,
    arbpl: null,
    beber: null,
    ppsid: null,
    anlkl: null,
    timbi: null,
    eqlfn: null,
    iloanfl: null,
    kokrs: null,
    vbund: null,
    aibn1: null,
    aibn2: null,
    mandt: null,
    equnr: null,
    datab: null,
    datbi: null,
    bukrs: null,
    tplnr: null,
    iwerk: null,
    eqart: null,
    loan: null,
    objnr: null,
    hequi: null,
    gewrk: null,
    anlnr: null,
    anlun: null,
    klart: null,
    clint: null,
    eqtyp: null,
    swerk: null,
    totalline: null,
    estuc: null,
    estuctxt: null,
    class: null,
    butxt: null,
    pltxt: null,
    typtx: null,
    statacttxt: null,
    stattxt: null,
    wergw: null,
    werkstxt: null,
    ktext: null,
    ktext2: null,
    eartx: null,
    equnr2: null,
    ktgrtx: null,
  }
  datatt: any[] = []
  datadc: any[] = []
  datakdhc: any[] = []
  dataasset: any[] = []
  databtbd: any[] = []
  datadd: any[] = []
  datafile: any[] = []
  datahequi: any[] = []
  datanangcap: any[] = []
  datansd: any[] = []
  datapbsd: any[] = []
  datattk: any[] = []
  datavtcp: any[] = []

  lstFile: any
  equimentDetail: any
  visibleDetail: boolean = false

  ngOnInit() {
    this.getWorkCenter()
    this.getPlaner()
    this.getObjectType()
    this.getFunclocList()
    this.getNhanVien()
    this.getPhongBan()
  }

  exportData() {
    console.log('export')
  }
  getDetail(data: any) {
    ShowLoading()
    this.http
      .get(environment.baseApiUrl + `/rest/getEqFiles/${data.equnr}`)
      .subscribe({
        next: (response: any) => {
          this.lstFile = response
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
    this.http
      .get(environment.baseApiUrl + `/equiment_list/${data.equnr}`)
      .subscribe({
        next: (response: any) => {
          console.log(response.itequipment.item[0])
          this.http
            .post(
              environment.baseApiUrl + `/equiment_detail`,
              response.itequipment.item[0],
            )
            .subscribe({
              next: (response: any) => {
                this.equimentDetail = response
                this.dataDetail = response.zstheader
                this.datatt = response.datatt.item
                this.datadc = response.datadc.item
                this.datakdhc = response.datakdhc.item
                this.dataasset = response.dataasset.item
                this.databtbd = response.databtbd.item
                this.datadd = response.datadd.item
                this.datafile = response.datafile.item
                this.datahequi = response.datahequi.item
                this.datanangcap = response.datanangcap.item
                this.datansd = response.datansd.item
                this.datapbsd = response.datapbsd.item
                this.datattk = response.datattk.item
                this.datavtcp = response.datavtcp.item
                console.log(this.equimentDetail)
                this.visibleDetail = true
                HideLoading()
              },
              error: (error) => {
                console.error('Fail load:', error)
                HideLoading()
              },
            })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  closeDetail() {
    this.visibleDetail = false
  }
  searchData() {
    ShowLoading()
    this.http
      .post(
        environment.baseApiUrl + `/equi_list/${this.model.funcloc}/0`,
        this.model,
      )
      .subscribe({
        next: (response: any) => {
          this.dataTable = response.gtequis.item
          this.dataTable.forEach((item, index) => {
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
  getWorkCenter() {
    this.http
      .post(
        environment.baseApiUrl +
          `/entity?table_name=work_center&&wc=&&adrnr=&&werks=${this.werk}`,
        {},
      )
      .subscribe({
        next: (response: any) => {
          this.lstSelectWorkCenter = response.gtWorkcenter.item
          this.lstSelectWorkCenter.forEach(
            (item: { ktext: string; arbpl: any }) => {
              item.ktext = `${item.arbpl} - ${item.ktext}`
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
  getFunclocList() {
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
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getNhanVien() {
    this.http
      .get(environment.baseApiUrl + `/get_nhanvien/${this.role}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectNhanVien = response.gtNv.item
          this.lstSelectNhanVien.forEach(
            (item: { staffTxt: string; staff: any }) => {
              item.staffTxt = `${item.staff} - ${item.staffTxt}`
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
