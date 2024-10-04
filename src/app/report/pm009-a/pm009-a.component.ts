import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { auart, ilart, plantype, qmart, status } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment';
import { Base64ToBlob, SaveBlob } from '../common.report';
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants';

@Component({
  selector: 'app-pm009-a',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm009-a.component.html',
  styleUrl: './pm009-a.component.scss'
})
export class PM009AComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo tổng hợp phiếu sửa chữa',
        path: 'report/PM009A',
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
    werks: this.werk, //Planning plant
    arbpl: null, //Work center
    auart: null, //Loại lệnh
    aufnr: null, //Mã lệnh
    eqart: null, //Nhóm thiết bị
    fgstrp: null, //Ngày kế hoạch
    tgstrp: null, //Ngày kế hoạch
    ilart: null, //PMActType
    ingpr: null, //Planner group
    tplnr: null, //Khu vực chức năng
    warpl: null, //Mã kế hoạch
    qmnum: null, // Số thông báo sự cố
    cautructb: null, // Cấu trúc thiết bị
    abcindicator: null, // ABC indicator
    nhanvienth: null,
    phongban: null,
    status: null,
    statusThietBi: null, // trạng thái sử dụng thiết bị
    statusHoatDong: null, // Trạng thái hoạt động
    fqmdat: null,
    tqmdat: null,
    qmart: null
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

  exportData() {
    ShowLoading()
    var param = this.getParam();
    this.http.post(environment.baseApiUrl + `/export_report/ZPG_PM_QM_INFO/PM009A`, param)
      .subscribe({
        next: (response: any) => {
          HideLoading()
          var contentType = "application/vnd.ms-excel";
          var theBlob = Base64ToBlob(response.erawData, contentType);
          SaveBlob(theBlob, "PM009A.xls");
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
    };
    //#region "Khởi tạo parameter"
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
    //Loại lệnh
    if (this.model.auart && this.model.auart !== "") {
      param.item.push({
        selname: "S_AUART",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.auart,
        high: "",
      });
    }
    //Mã lệnh
    if (this.model.aufnr && this.model.aufnr !== "") {
      param.item.push({
        selname: "S_AUFNR",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.aufnr,
        high: "",
      });
    }
    //Mã lệnh
    if (this.model.qmnum && this.model.qmnum !== "") {
      param.item.push({
        selname: "S_QMNUM",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.qmnum,
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
    //Ngày kế hoạch
    if (
      this.model.fqmdat &&
      this.model.fqmdat !== "" &&
      this.model.tqmdat &&
      this.model.tqmdat !== ""
    ) {
      var f_date = new Date(this.model.fqmdat)
      var t_date = new Date(this.model.tqmdat)
      param.item.push({
        selname: "S_QMDAT",
        kind: "S",
        sign: "I",
        option: "BT",
        low: `${f_date.getFullYear()}${("0" + (f_date.getMonth() + 1)).slice(-2)}${("0" + f_date.getDate()).slice(-2)}`,
        high: `${t_date.getFullYear()}${("0" + (t_date.getMonth() + 1)).slice(-2)}${("0" + t_date.getDate()).slice(-2)}`,
      });
    }
    //PMActType
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
    //Planner group
    if (this.model.ingpr && this.model.ingpr !== "") {
      param.item.push({
        selname: "S_INGPR",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.ingpr,
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
    // Nhân viên sử dụng/ thực hiện
    if (this.model.nhanvienth && this.model.nhanvienth != "") {
      param.item.push({
        selname: "S_STAFF",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.nhanvienth,
        high: "",
      });
    }
    // Phòng ban sử dụng
    if (this.model.phongban && this.model.phongban != "") {
      param.item.push({
        selname: "S_DEPID",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.phongban,
        high: "",
      });
    }
    // Trạng thái sử dụng
    if (this.model.status && this.model.status != "") {
      param.item.push({
        selname: "S_STAT",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.status,
        high: "",
      });
    }
    //  Trạng thái hoạt động
    if (this.model.statusHoatDong && this.model.statusHoatDong != "") {
      param.item.push({
        selname: "S_STAT_A",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.statusHoatDong,
        high: "",
      });
    }

    param.item.push({
      selname: "S_QMART",
      kind: "S",
      sign: "I",
      option: "EQ",
      low: "N2",
      high: "",
    });

    param.item.push({
      selname: "S_BUKRS",
      kind: "S",
      sign: "I",
      option: "EQ",
      low: this.role,
      high: "",
    });
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