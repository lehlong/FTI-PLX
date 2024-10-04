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
import { Base64ToBlob, SaveBlob } from '../common.report'
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants'

@Component({
  selector: 'app-pm011',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm011.component.html',
  styleUrl: './pm011.component.scss',
})
export class PM011Component {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo công việc kỹ thuật',
        path: 'report/PM011',
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
    fdate: null, //Từ ngày
    tdate: null, //Từ ngày
    arbpl: null, //Work center
    ingpr: null, //Planner group
    werks: this.werk, //Planning plant
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
  ngOnInit() {
    this.getWorkCenter()
    this.getPlaner()
    this.getObjectType()
    this.getFunclocList()
    this.getNhanVien()
    this.getPhongBan()
  }

  exportData() {
    ShowLoading()
    var param = this.getParam()
    this.http
      .post(environment.baseApiUrl + `/print_exel/ZPG_PM003R`, param)
      .subscribe({
        next: (response: any) => {
          HideLoading()
          if (response != null) {
            var contentType = 'application/vnd.ms-excel'
            var theBlob = Base64ToBlob(response.erawData, contentType)
            SaveBlob(theBlob, 'PM011.xlsx')
          }
        },
        error: (error) => {
          HideLoading()
          console.error('Fail load:', error)
        },
      })
  }
  getParam() {
    const param: any = {
      item: [],
    }
    //#region "Khởi tạo parameter"
    //Từ ngày
    if (this.model.fdate && this.model.fdate !== '') {
      var f_date = new Date(this.model.fdate)
      param.item.push({
        selname: 'P_FDATE',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: `${f_date.getFullYear()}${('0' + (f_date.getMonth() + 1)).slice(-2)}${('0' + f_date.getDate()).slice(-2)}`,
        high: '',
      })
    }
    //Đến ngày
    if (this.model.tdate && this.model.tdate !== '') {
      var t_date = new Date(this.model.tdate)
      param.item.push({
        selname: 'P_TDATE',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: `${t_date.getFullYear()}${('0' + (t_date.getMonth() + 1)).slice(-2)}${('0' + t_date.getDate()).slice(-2)}`,
        high: '',
      })
    }
    //Work center
    if (this.model.arbpl && this.model.arbpl !== '') {
      param.item.push({
        selname: 'S_ARBPL',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: this.model.arbpl,
        high: '',
      })
    }
    //Planner group
    if (this.model.ingpr && this.model.ingpr !== '') {
      param.item.push({
        selname: 'S_INGRP',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: this.model.ingpr,
        high: '',
      })
    }
    //Planning plant
    if (this.model.werks && this.model.werks !== '') {
      param.item.push({
        selname: 'S_IWERK',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: this.model.werks,
        high: '',
      })
    }
    param.item.push({
      selname: 'R1',
      kind: 'S',
      sign: 'I',
      option: 'EQ',
      low: 'X',
      high: '',
    })
    //#endregion
    return param
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
}
