import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';

@Component({
  selector: 'app-ztcpm001',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './ztcpm001.component.html',
  styleUrl: './ztcpm001.component.scss'
})
export class Ztcpm001Component {
  selectedValue = null;
}
