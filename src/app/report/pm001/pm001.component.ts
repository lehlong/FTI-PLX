import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { ABCIndicator } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment.prod';
import { Base64ToBlob, EBase64ToBlob, SaveBlob } from '../common.report';
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants';

@Component({
  selector: 'app-pm001',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm001.component.html',
  styleUrl: './pm001.component.scss'
})
export class PM001Component {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Bảng liệt kê khu vực chức năng',
        path: 'report/PM001',
      },
    ])
  }
  __iwerk: any = localStorage.getItem('__iwerk')
  werk = JSON.parse(this.__iwerk)
  __tplnr: any = localStorage.getItem('__tplnr')
  tplnr = JSON.parse(this.__tplnr)

  model: any = {
    werks: this.werk,
    beber: null,
    abckz: null,
    class: null,
    tplnr: null,
    fdate: null
  }

  lstSelectIndicator = ABCIndicator
  lstSelectPlantSection = ABCIndicator
  lstSelectFunclocList: any;
  ngOnInit() {
    this.getFunclocList();
  }

  exportData(type: string) {
    ShowLoading();
    var param: any = this.getParam();
    if (type == '1') { //PDF
      param.item.push({
        selname: "R2",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: "X",
        high: "",
      });
      this.http.post(environment.baseApiUrl + `/print_pdf/ZPG_PM023`, param)
        .subscribe({
          next: (response: any) => {
            HideLoading();
            var contentType = "application/pdf";
            var theBlob = EBase64ToBlob(response.ebase64, contentType);
            SaveBlob(theBlob, "PM001.pdf");
          },
          error: (error) => {
            HideLoading();
            console.error('Fail load:', error)
          },
        })

    } else { //EXCEL
      param.item.push({
        selname: "R1",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: "X",
        high: "",
      });
      this.http.post(environment.baseApiUrl + `/print_exel/ZPG_PM023`, param)
        .subscribe({
          next: (response: any) => {
            HideLoading();
            var contentType = "application/vnd.ms-excel";
            var theBlob = Base64ToBlob(response.exrawdata, contentType);
            SaveBlob(theBlob, "PM001.xls");
          },
          error: (error) => {
            HideLoading();
            console.error('Fail load:', error)
          },
        })

    }
  }

  getParam() {
    const param: any = {
      item: [],
    };
    //#region "Khởi tạo parameter"
    if (this.model.fdate && this.model.fdate != null) {
      var f_date = new Date(this.model.fdate)
      param.item.push({
        selname: "S_DATE",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: `${f_date.getFullYear()}${("0" + (f_date.getMonth() + 1)).slice(-2)}${("0" + f_date.getDate()).slice(-2)}`,
        high: "",
      });
    }
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
        selname: "S_FEVOR",
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
        selname: "S_WERKS",
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
        selname: "S_BEBER",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.beber,
        high: "",
      });
    }
    //Khu vực chức năng
    if (this.model.tplnr && this.model.tplnr != "") {
      param.item.push({
        selname: "S_TPLNR",
        kind: "S",
        sign: "I",
        option: "CP",
        low: this.model.tplnr + "*",
        high: "",
      });
    }
    //Mã kế hoạch
    if (this.model.warpl && this.model.warpl != "") {
      param.item.push({
        selname: "S_ABCKZ",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.abckz,
        high: "",
      });
    }
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
}
