import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { auart, ilart, plantype } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment';
import { Base64ToBlob, SaveBlob } from '../common.report';
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants';

@Component({
  selector: 'app-pm003-a',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm003-a.component.html',
  styleUrl: './pm003-a.component.scss'
})
export class PM003AComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Kế hoạch BTBD/KĐHC tổng hợp',
        path: 'report/PM003A',
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
    year: null, //Năm
    arbpl: null, //Work center
    eqart: null, //Nhóm thiết bị
    eqtyp: null, //Loại thiết bị
    equnr: null, //Thiết bị
    ingpr: null, //Planner group
    werks: this.werk, //Planning plant
    mptyp: null, //Loại kế hoạch
    tplnr: null, //Khu vực chức năng
    warpl: null, //Mã kế hoạch
    wapos: null, // Mã kế hoạch con
    ilart: null, // Activity type
    auart: null
  }
  lstSelectIndicator = plantype
  lstSelectWorkCenter: any;
  lstSelectAuart = auart
  lstSelectIlart = ilart
  lstSelectPlaner: any;
  lstSelectObjectType: any;
  lstSelectFunclocList: any;
  ngOnInit() {
    this.getWorkCenter();
    this.getPlaner();
    this.getObjectType();
    this.getFunclocList();
  }

  exportData() {
    ShowLoading()
    var param = this.getParam();
    this.http.post(environment.baseApiUrl + `/export_report/ZPG_MPLAN/PM003A`, param)
      .subscribe({
        next: (response: any) => {
          HideLoading()
          var contentType = "application/vnd.ms-excel";
          var theBlob = Base64ToBlob(
            response.erawData,
            contentType
          );
          SaveBlob(theBlob, "PM003A.xlsx");
        },
        error: (error) => {
          HideLoading()
          console.error('Fail load:', error)
        },
      })
  }
  getParam() {
    const param : any = {
      item: [],
    };
    //#region "Khởi tạo parameter"
    //Năm
    if (this.model.year && this.model.year !== "") {
      param.item.push({
        selname: "P_GJAHR",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.year,
        high: "",
      });
    }
    //Work center
    if (this.model.arbpl && this.model.arbpl !== "") {
      param.item.push({
        selname: "S_ARBPL",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.arbpl,
        high: "",
      });
    }
    //activity type
    if (this.model.ilart && this.model.ilart !== "") {
      param.item.push({
        selname: "S_ILART",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.ilart,
        high: "",
      });
    }
    //maintainance item
    if (this.model.wapos && this.model.wapos !== "") {
      param.item.push({
        selname: "S_WAPOS",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.wapos,
        high: "",
      });
    }
    //Nhóm thiết bị
    if (this.model.eqart && this.model.eqart !== "") {
      param.item.push({
        selname: "S_EQART",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.eqart,
        high: "",
      });
    }
    //Loại thiết bị
    if (this.model.eqtyp && this.model.eqtyp !== "") {
      param.item.push({
        selname: "S_EQTYP",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.eqtyp,
        high: "",
      });
    }
    //Thiết bị
    if (this.model.equnr && this.model.equnr !== "") {
      param.item.push({
        selname: "S_EQUNR",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.equnr,
        high: "",
      });
    }
    //Planner group
    if (this.model.ingpr && this.model.ingpr !== "") {
      param.item.push({
        selname: "S_WPGRP",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.ingpr,
        high: "",
      });
    }
    //Planning plant
    if (this.model.werks && this.model.werks !== "") {
      param.item.push({
        selname: "S_IWERK",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.werks,
        high: "",
      });
    }
    //Loại kế hoạch
    if (this.model.mptyp && this.model.mptyp !== "") {
      param.item.push({
        selname: "S_MPTYP",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.mptyp,
        high: "",
      });
    }
    //Khu vực chức năng
    if (this.model.tplnr && this.model.tplnr != "") {
      param.item.push({
        selname: "S_TPLNR",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.tplnr,
        high: "",
      });
    }
    //Mã kế hoạch
    if (this.model.warpl && this.model.warpl != "") {
      param.item.push({
        selname: "S_WARPL",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.warpl,
        high: "",
      });
    }

     param.item.push({
      selname: "S_BUKRS",
      kind: "S",
      sign: "I",
      option: "EQ",
      low: this.role,
      high: "",
    });
    //#endregion
    return param;
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