import { Component, ChangeDetectorRef } from '@angular/core'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { RouterOutlet } from '@angular/router'
import { CommonModule } from '@angular/common'
import { GlobalService } from '../../services/global.service'
import { AuthService } from '../../services/auth.service'
import { SidebarMenuService } from '../../services/sidebar-menu.service'
import { Router } from '@angular/router'
import { RouterModule } from '@angular/router'
import { ShareModule } from '../../shared/share-module'
import { environment } from '../../../environments/environment.prod'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzSpinModule,
    RouterOutlet,
    CommonModule,
    NzDropDownModule,
    NzAvatarModule,
    NzBreadCrumbModule,
    RouterModule,
    ShareModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  currentUserString: any = localStorage.getItem('__the_token');
  currentUser = JSON.parse(this.currentUserString);
  isCollapsed = false
  userName: string = this.currentUser.name
  dataSidebarMenu: any[] = []
  openIndex: number | null = null
  currentUrl: string = ''
  breadcrumbs: any = this.globalService.breadcrumb || []
  loading: boolean = false
  screenWidth: number = window.innerWidth
  rolesString: any = localStorage.getItem('__roles');
  roles = JSON.parse(this.rolesString);
  plants: any[] = [];

  selectedRoleString: any = localStorage.getItem('__activeRole');
  selectedRole = JSON.parse(this.selectedRoleString);
  selectedPlantString: any = localStorage.getItem('__activeIngpr');
  selectedPlant = JSON.parse(this.selectedPlantString);


  menuType1: any = this.currentUser.menuModels.filter((x: { type: string }) => x.type == "1")
  menuType2: any = this.currentUser.menuModels.filter((x: { type: string }) => x.type == "2")
  menuType3: any = this.currentUser.menuModels.filter((x: { type: string }) => x.type == "3")
  menuType4: any = this.currentUser.menuModels.filter((x: { type: string }) => x.type == "4")
  menuType5: any = this.currentUser.menuModels.filter((x: { type: string }) => x.type == "5")
  menuType6: any = this.currentUser.menuModels.filter((x: { type: string }) => x.type == "6")
  menuType7: any = this.currentUser.menuModels.filter((x: { type: string }) => x.type == "7")
  menuType8: any = this.currentUser.menuModels.filter((x: { type: string }) => x.type == "8")

  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
    private router: Router,
    private sidebarMenuService: SidebarMenuService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {
    //this.userName = this.globalService.getUserInfo().userName
    this.globalService.rightSubject.subscribe((item) => {
      this.getSidebarMenu()
    })
    this.globalService.breadcrumbSubject.subscribe((value) => {
      this.breadcrumbs = value
    })
    this.globalService.getLoading().subscribe((value) => {
      this.loading = value
    })
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url?.split('?')[0] || ''
      this.dataSidebarMenu = this.transformMenuList(this.dataSidebarMenu)
      this.cdr.detectChanges()
    })
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
  onResize = () => {
    this.screenWidth = window.innerWidth
    this.cdr.detectChanges()
  }

  transformMenuList(data: any[], level = 1): any[] {
    return data.map((menu) => this.transformMenu(menu, level))
  }

  transformMenu(data: any, level = 0): any {
    const hasMatchingChild = (menu: any, url: string): boolean => {
      if (menu.url && `/${menu.url}` === url) {
        return true
      }
      if (menu.children) {
        return menu.children.some((child: any) => hasMatchingChild(child, url))
      }
      return false
    }

    return {
      level: level,
      title: data.name || data.title || '',
      icon: data.icon || '',
      open: hasMatchingChild(data, this.currentUrl),
      url: data.url,
      selected: `/${data.url}` === this.currentUrl,
      disabled: false,
      children: data.children
        ? this.transformMenuList(data.children, level + 1)
        : undefined,
    }
  }

  roleChange(value: string): void {
    localStorage.setItem('__activeRole', JSON.stringify(value));
    this.http.get(environment.baseApiUrl + `/get_roles/${this.currentUser.username}/${value}`)
      .subscribe({
        next: (response: any) => {
          this.plants = response.prole.item;
          var checkPlant = response.prole.item.filter((x: { ingpr: any }) => x.ingpr == this.selectedPlant)
          if (checkPlant.length == 0) {
            this.selectedPlant = response.prole.item[0].ingpr
            localStorage.setItem('__activeIngpr', JSON.stringify(response.prole.item[0].ingpr));
          }
          localStorage.setItem('__iwerk', JSON.stringify(response.prole.item[0].iwerk));
          localStorage.setItem('__tplnr', JSON.stringify(response.prole.item[0].tplnr));
          window.location.reload();
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      });
  }
  plantChange(value: string): void {
    localStorage.setItem('__activeIngpr', JSON.stringify(value));
    setTimeout(function () {
      window.location.reload()
    }, 200)
  }

  ngAfterViewInit(): void {
    this.isCollapsed = localStorage.getItem('openSidebar')
      ? localStorage.getItem('openSidebar') === 'true'
      : false
  }

  ngOnInit(): void {
    window.addEventListener('resize', this.onResize)
    //this.getSidebarMenu()
    this.currentUrl = this.router.url;
    this.menuType1.forEach((item: any) => {
      item.key = 'master-data/' + item.key
    })
    this.menuType6.forEach((item: any) => {
      item.key = 'system-manager/' + item.key
    })
    this.getPlanner(this.selectedRole);
  }
  getPlanner(value: string) {
    this.http.get(environment.baseApiUrl + `/get_roles/${this.currentUser.username}/${value}`)
      .subscribe({
        next: (response: any) => {
          this.plants = response.prole.item;
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      });
  }
  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
  changePass(): void {
    this.router.navigate(['/system-manager/profile'])
  }

  getSidebarMenu(): void {
    this.sidebarMenuService
      .getMenuOfUser({
        userName: this.userName,
      })
      .subscribe((res) => {
        this.dataSidebarMenu = this.transformMenuList(res?.children || [])
      })
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed
    localStorage.setItem('openSidebar', this.isCollapsed ? 'true' : 'false')
  }

  toggleOpen(index: number): void {
    this.openIndex = this.openIndex === index ? null : index
  }

  navigateTo(url: string): void {
    if (url && !this.loading) {
      this.router.navigate([url])
    }
  }
}
