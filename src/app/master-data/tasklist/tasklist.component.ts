import { Component } from '@angular/core'
import { GlobalService } from '../../services/global.service'
import { HttpClient } from '@angular/common/http'
import {
  HideLoading,
  ShowLoading,
} from '../../shared/constants/loading.constants'
import { environment } from '../../../environments/environment.prod'
import { ShareModule } from '../../shared/share-module'

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss',
})
export class TasklistComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách tác vụ',
        path: 'master-data/Tasklist',
      },
    ])
  }
  iwerkString: any = localStorage.getItem('__iwerk')
  iwerk = JSON.parse(this.iwerkString)
  keyWord: any = null
  data: any[] = []
  dataSearch: any[] = []
  ngOnDestroy() {
    this.globalService.setBreadcrumb([])
  }

  ngOnInit(): void {
    this.search()
  }
  search() {
    ShowLoading()
    this.keyWord = this.keyWord == '' ? null : this.keyWord
    this.http
      .get(
        environment.baseApiUrl + `/get_tasklist/${this.keyWord}/${this.iwerk}`,
      )
      .subscribe({
        next: (response: any) => {
          this.dataSearch = response.tbData.item;
          HideLoading()
        },
        error: (error) => {
          console.error('Fail load:', error)
          HideLoading()
        },
      })
  }
  reset() {
    this.dataSearch = this.data
    this.keyWord = ''
  }
  onCurrentPageDataChange($event: any): void {}
}
