import { Component } from '@angular/core';
import { ShareModule } from '../../../shared/share-module';
import { DropdownService } from '../../../services/dropdown/dropdown.service';
import { environment } from '../../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReportService } from '../../../services/report/report.service';
import { PaginationResult } from '../../../models/base.model';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-template-report',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './template-report.component.html',
  styleUrl: './template-report.component.scss'
})
export class TemplateReportComponent {
  // validateForm: FormGroup = this.fb.group({
  //   code: ['', [Validators.required]],
  //   name: ['', [Validators.required]],
  //   isActive: [true, [Validators.required]],
  // })
  listTimeYear: any[] = [];
  listAudit: any[] = [];
  yearValue: string = ''
  auditValue: string = ''
  listElement: any[] =  [];
  public baseUrl = environment.baseApiUrl
  referenceId = '';
  paginationResult: any[] = []
  constructor(
    private dropDownService: DropdownService,
    private http: HttpClient,
    private _service: ReportService,
    private fb: NonNullableFormBuilder,

  ) { }

  ngOnInit(): void {
    this.getTimeYear();
    this.getAuditPeriod();
    this.generateNewReferenceId();
    //this.getListTemplate(this.yearValue, this.auditValue)
  }
  customRequest = (item: NzUploadXHRArgs): Subscription => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    formData.append('referenceId', this.referenceId || '');
    formData.append('yearValue', this.yearValue || '');
    formData.append('auditValue', this.auditValue || '');
    let params = new HttpParams();
    if (this.referenceId && this.yearValue && this.auditValue) {
      params = params.set('referenceId', this.referenceId);
      params = params.set('yearValue', this.yearValue);
      params = params.set('auditValue', this.auditValue);
    }
    return this.http.post(this.baseUrl + '/Report/UploadTemplate', formData, {
      params: params,
    }).subscribe({
      next: (res: any) => {
        this.getListTemplate(this.yearValue, this.auditValue)
      },
    });
  }

  getTimeYear() {
    this.dropDownService.getAllPeriodTime().subscribe({
      next: (data) => {
        this.listTimeYear = data
      },
      error: (response) => {
        console.log(response)
      },
    })
  }
  getAuditPeriod() {
    this.dropDownService.getAllAudit().subscribe({
      next: (data) => {
        this.listAudit = data
      },
      error: (response) => {
        console.log(response)
      }
    })
  }
  generateNewReferenceId(): void {
    this.referenceId = uuidv4();
  }

  getListTemplate(yearValue: string, auditValue: string) {
    this._service.getListTemplate(yearValue, auditValue).subscribe({
      next: (data) => {
        this.paginationResult = data
        this.listElement = []
      },
      error: (response) => {
        console.log(response)
      }
    })
  }
  openDetail(id: string) {
    this._service.getListElement(id).subscribe({
      next: (data) => {
        this.listElement = data
        console.log(data)
      },
      error: (response) => {
        console.log(response)
      }
    })
  }
}


