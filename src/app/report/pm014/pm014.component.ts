import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { auart, ilart, plantype, qmart, status } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment';
import { Base64ToBlob, EBase64ToBlob, SaveBlob } from '../common.report';
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants';

@Component({
  selector: 'app-pm014',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm014.component.html',
  styleUrl: './pm014.component.scss'
})
export class PM014Component {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Thống kê dừng vận hành của MMTB',
        path: 'report/PM014',
      },
    ])
  }
  __iwerk: any = localStorage.getItem('__iwerk')
  werk = JSON.parse(this.__iwerk)
  __tplnr: any = localStorage.getItem('__tplnr')
  tplnr = JSON.parse(this.__tplnr)
  model = {
    class: null, //Object class
    eqart: null, //Nhóm thiết bị
    equnr: null, //Thiết bị
    ingpr: null, //Planner group
    werks: this.werk, //Planning plant
    fperio: null, //Thời gian
    tperio: null, //Thời gian
    tplnr: null, //Khu vực chức năng
  }
  lstSelectIndicator = plantype
  lstSelectWorkCenter: any;
  lstSelectAuart = auart
  lstSelectIlart = ilart
  lstSelectPlaner: any;
  lstSelectObjectType: any;
  lstSelectFunclocList: any;
  lstSelectQmart = qmart
  lstSelectStatus = status
  ngOnInit() {
    this.getWorkCenter();
    this.getPlaner();
    this.getObjectType();
    this.getFunclocList();
  }

  exportData(type: string) {
    ShowLoading()
    var param = this.getParam()
    if (type == '1') {
      //EXCEL
      param.item.push({
        selname: 'R1',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: 'X',
        high: '',
      })
      this.http
        .post(environment.baseApiUrl + `/print_exel/ZPG_PM027`, param)
        .subscribe({
          next: (response: any) => {
            HideLoading()
            var contentType = 'application/vnd.ms-excel'
            var theBlob = Base64ToBlob(response.erawData, contentType)
            SaveBlob(theBlob, 'PM014_ThongKeDungVanHanhMMTB.xls')
          },
          error: (error) => {
            HideLoading()
            console.error('Fail load:', error)
          },
        })
    } else {
      param.item.push({
        selname: 'R2',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: 'X',
        high: '',
      })
      this.http
        .post(environment.baseApiUrl + `/print_pdf/ZPG_PM027`, param)
        .subscribe({
          next: (response: any) => {
            HideLoading()
            var contentType = 'application/vnd.ms-excel'
            var theBlob = EBase64ToBlob(response.erawData, contentType)
            SaveBlob(theBlob, 'PM014_ThongKeDungVanHanhMMTB.pdf')
          },
          error: (error) => {
            HideLoading()
            console.error('Fail load:', error)
          },
        })
    }
  }
  getParam() {
    const param: any = {
      item: [],
    }
    //#region "Khởi tạo parameter"
    //Object Class
    if (this.model.class && this.model.class !== '') {
      param.item.push({
        selname: 'S_CLASS',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: this.model.class,
        high: '',
      })
    }
    //Nhóm thiết bị
    if (this.model.eqart && this.model.eqart !== '') {
      param.item.push({
        selname: 'S_EQART',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: this.model.eqart,
        high: '',
      })
    }
    //Thiết bị
    if (this.model.equnr && this.model.equnr !== '') {
      param.item.push({
        selname: 'S_EQUNR',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: this.model.equnr,
        high: '',
      })
    }
    //Planner group
    if (this.model.ingpr && this.model.ingpr !== '') {
      param.item.push({
        selname: 'S_WPGRP',
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
    //Ngày
    if (
      this.model.fperio &&
      this.model.fperio !== '' &&
      this.model.tperio &&
      this.model.tperio !== ''
    ) {
      var f_date = new Date(this.model.fperio)
      var t_date = new Date(this.model.tperio)
      param.item.push({
        selname: 'S_PERIO',
        kind: 'S',
        sign: 'I',
        option: 'BT',
        low: `${f_date.getFullYear()}${('0' + (f_date.getMonth() + 1)).slice(-2)}`,
        high: `${t_date.getFullYear()}${('0' + (t_date.getMonth() + 1)).slice(-2)}`,
      })
    }
    //Khu vực chức năng
    if (this.model.tplnr && this.model.tplnr != '') {
      param.item.push({
        selname: 'S_TPLNR',
        kind: 'S',
        sign: 'I',
        option: 'EQ',
        low: this.model.tplnr,
        high: '',
      })
    }
    //#endregion
    return param
  }
  getWorkCenter() {
    this.http.post(environment.baseApiUrl + `/entity?table_name=work_center&&wc=&&adrnr=&&werks=${this.werk}`, {})
      .subscribe({
        next: (response: any) => {
          this.lstSelectWorkCenter = response.gtWorkcenter.item
          this.lstSelectWorkCenter.forEach((item: { ktext: string; arbpl: any; }) => {
            item.ktext = `${item.arbpl} - ${item.ktext}`;
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getPlaner() {
    this.http.get(environment.baseApiUrl + `/get_planner/${this.werk}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectPlaner = response.gtPlanner.item
          this.lstSelectPlaner.forEach((item: { innam: string; ingrp: any; }) => {
            item.innam = `${item.ingrp} - ${item.innam}`;
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getObjectType() {
    this.http.get(environment.baseApiUrl + `/get_object_type`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectObjectType = response.gtT370KT.item
          this.lstSelectObjectType.forEach((item: { eartx: string; eqart: any; }) => {
            item.eartx = `${item.eqart} - ${item.eartx}`;
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getFunclocList() {
    this.http.get(environment.baseApiUrl + `/funcloc_list/${this.tplnr}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectFunclocList = response.funcloclist.item
          this.lstSelectFunclocList.forEach((item: { descript: string; funcloc: any; }) => {
            item.descript = `${item.funcloc} - ${item.descript}`;
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
}