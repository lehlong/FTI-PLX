import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { ABCIndicator, cautructb, eqtyp, statusHoatDong, statusThietBi } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment.prod';
import { Base64ToBlob, SaveBlob } from '../common.report';
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants';

@Component({
  selector: 'app-pm002-b',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm002-b.component.html',
  styleUrl: './pm002-b.component.scss'
})
export class PM002BComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh mục hệ thống CSVCKT (Chi tiết)',
        path: 'report/PM002B',
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
    bukrs: this.role, // Company code
    mptyp: null, //Loại kế hoạch
    tplnr: null, //Khu vực chức năng
    warpl: null, //Mã kế hoạch
    class: null, // Class
    cautructb: null, // Cấu trúc thiết bị
    abcindicator: null, // ABC indicator
    nhanvienth: null,
    phongban: null,
    statusThietBi: null, // trạng thái sử dụng thiết bị
    statusHoatDong: null, // Trạng thái hoạt động
    fdate: null,
    tdate: null,
    sfdate: null,
    stdate: null,
  }
  lstSelectIndicator = ABCIndicator
  lstSelectPlantSection = ABCIndicator
  lstSelectFunclocList: any;
  lstSelectWorkCenter: any;
  lstSelectObjectType: any;
  lstSelectPlaner: any;
  lstSelectEqtyp = eqtyp;
  lstSelectCauTrucTb = cautructb;
  lstSelectNhanVien: any;
  lstSelectPhongBan: any;
  lstSelectStatusTb = statusThietBi;
  lstSelectStatusHd = statusHoatDong;
  ngOnInit() {
    this.getFunclocList();
    this.getWorkCenter();
    this.getObjectType();
    this.getPlaner();
    this.getNhanVien();
    this.getPhongBan();
  }

  exportData() {
    ShowLoading();
    var param = this.getParam();
    this.http.post(environment.baseApiUrl + `/export_report/ZPG_EQUI_CORE/PM002B`, param)
      .subscribe({
        next: (response: any) => {
          HideLoading()
          var contentType = "application/vnd.ms-excel";
          var theBlob = Base64ToBlob(response.erawData, contentType);
          SaveBlob(theBlob, "PM002B.xls");
        },
        error: (error) => {
          HideLoading();
          console.error('Fail load:', error)
        },
      })
  }
  getParam() {
    const param: any = {
      item: [],
    };

    //#region "Khởi tạo parameter"
    //Năm
    if (this.model.year && this.model.year !== "") {
      param.item.push({
        selname: "P_YEAR",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.year,
        high: "",
      });
    }
    if (
      this.model.fdate &&
      this.model.fdate !== "" &&
      this.model.tdate &&
      this.model.tdate !== ""
    ) {
      var f_date = new Date(this.model.fdate)
      var t_date = new Date(this.model.tdate)
      param.item.push({
        selname: "S_DATAB",
        kind: "S",
        sign: "I",
        option: "BT",
        low: `${f_date.getFullYear()}${("0" + (f_date.getMonth() + 1)).slice(-2)}${("0" + f_date.getDate()).slice(-2)}`,
        high: `${t_date.getFullYear()}${("0" + (t_date.getMonth() + 1)).slice(-2)}${("0" + t_date.getDate()).slice(-2)}`,
      });
    }

    if (
      this.model.sfdate &&
      this.model.sfdate !== "" &&
      this.model.stdate &&
      this.model.stdate !== ""
    ) {
      var f_date = new Date(this.model.sfdate)
      var t_date = new Date(this.model.stdate)
      param.item.push({
        selname: "S_INBDT",
        kind: "S",
        sign: "I",
        option: "BT",
        low: `${f_date.getFullYear()}${("0" + (f_date.getMonth() + 1)).slice(-2)}${("0" + f_date.getDate()).slice(-2)}`,
        high: `${t_date.getFullYear()}${("0" + (t_date.getMonth() + 1)).slice(-2)}${("0" + t_date.getDate()).slice(-2)}`,
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
        selname: "S_INGRP",
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
    if (this.model.equnr && this.model.equnr != "") {
      param.item.push({
        selname: "S_EQUNR",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.equnr,
        high: "",
      });
    }
    // Cấu trúc thiết bị
    if (this.model.cautructb && this.model.cautructb != "") {
      param.item.push({
        selname: "S_ESTUC",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.cautructb,
        high: "",
      });
    }
    // ABC indicator
    if (this.model.abcindicator && this.model.abcindicator != "") {
      param.item.push({
        selname: "S_ABCKZ",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.abcindicator,
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
    if (this.model.statusThietBi && this.model.statusThietBi != "") {
      param.item.push({
        selname: "S_STAT",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.statusThietBi,
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
      selname: "S_BUKRS",
      kind: "S",
      sign: "I",
      option: "EQ",
      low: this.model.bukrs,
      high: "",
    });
    //#endregion
    return param;
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
  getNhanVien() {
    this.http.get(environment.baseApiUrl + `/get_nhanvien/${this.role}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectNhanVien = response.gtNv.item;
          this.lstSelectNhanVien.forEach((item: { staffTxt: string; staff: any; }) => {
            item.staffTxt = `${item.staff} - ${item.staffTxt}`
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }

  getPhongBan() {
    this.http.get(environment.baseApiUrl + `/get_phongban/${this.role}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectPhongBan = response.gtPb.item;
          this.lstSelectPhongBan.forEach((item: { depidTxt: string; depid: any; }) => {
            item.depidTxt = `${item.depid} - ${item.depidTxt}`
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
}
