import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { auart, eqtyp, ilart, plantype } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment';
import { EBase64ToBlob, SaveBlob } from '../common.report';
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants';

@Component({
  selector: 'app-pm004-b',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm004-b.component.html',
  styleUrl: './pm004-b.component.scss'
})
export class PM004BComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Phiếu đề nghị sửa chữa (Kết quả)',
        path: 'report/PM004B',
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
    fqmnum: null,
    tqmnum: null,
  }

  ngOnInit() {
   
  }

  exportData() {
    ShowLoading()
    var param : any = this.getParam();
    this.http.post(environment.baseApiUrl + `/export_report/ZPG_PM_QM_INFO/PM004B`, param)
      .subscribe({
        next: (response: any) => {
          HideLoading()
          var contentType = "application/vnd.ms-excel";
          var theBlob = EBase64ToBlob(response.erawData, contentType);
          SaveBlob(theBlob, "PM004B-PhieuDeNghiSuaChua.xlsx");
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
    //Notification Number
    if (
      this.model.fqmnum &&
      this.model.fqmnum !== "" &&
      this.model.tqmnum &&
      this.model.tqmnum !== ""
    ) {
      param.item.push({
        selname: "S_QMNUM",
        kind: "S",
        sign: "I",
        option: "BT",
        low: this.model.fqmnum,
        high: this.model.tqmnum,
      });
    } else if (
      this.model.fqmnum &&
      this.model.fqmnum !== "" &&
      (this.model.tqmnum == null || this.model.tqmnum == "")
    ) {
      param.item.push({
        selname: "S_QMNUM",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.fqmnum,
        high: "",
      });
    }
    {
      param.item.push({
        selname: "S_BUKRS",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.role,
        high: "",
      });
    }
    {
      param.item.push({
        selname: "S_QMART",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: 'N2',
        high: "",
      });
    }
    {
      param.item.push({
        selname: "S_QMDAT",
        kind: "S",
        sign: "I",
        option: "BT",
        low: '20220101',
        high: "99991201",
      });
    }
    //#endregion
    return param;
  }
}