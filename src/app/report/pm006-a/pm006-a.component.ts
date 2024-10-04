import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { auart, eqtyp, ilart, plantype } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment';
import { Base64ToBlob, EBase64ToBlob, SaveBlob } from '../common.report';
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants';

@Component({
  selector: 'app-pm006-a',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm006-a.component.html',
  styleUrl: './pm006-a.component.scss'
})
export class PM006AComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Lệnh bảo dưỡng sửa chữa',
        path: 'report/PM006A',
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
    faufnr: null, //Notification Number
    taufnr: null,
  }

  ngOnInit() {

  }

  exportData() {
    ShowLoading();
    var param = this.getParam();
    this.http.post(environment.baseApiUrl + `/export_report/ZPG_PM_ORDER_PROCESS/PM006A`, param)
      .subscribe({
        next: (response: any) => {
          if (response != null) {
            HideLoading()
            var contentType = "application/vnd.ms-excel";
            var theBlob = EBase64ToBlob(response.erawData, contentType);
            SaveBlob(theBlob, "PM006A.xlsx");
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
    };
    if (
      this.model.faufnr &&
      this.model.faufnr !== "" &&
      this.model.taufnr &&
      this.model.taufnr !== ""
    ) {
      param.item.push({
        selname: "S_AUFNR",
        kind: "S",
        sign: "I",
        option: "BT",
        low: this.model.faufnr,
        high: this.model.taufnr,
      });
    } else if (
      this.model.faufnr &&
      this.model.faufnr !== "" &&
      (this.model.taufnr == null || this.model.taufnr == "")
    ) {
      param.item.push({
        selname: "S_AUFNR",
        kind: "S",
        sign: "I",
        option: "EQ",
        low: this.model.faufnr,
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
    return param;
  }
}