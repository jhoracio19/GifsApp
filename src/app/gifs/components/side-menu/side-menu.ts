import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsSideMenuOptions } from './side-menu-options/side-menu-options';
import { GifsSideMenuHeader } from './side-menu-header/side-menu-header';

@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideMenuHeader,GifsSideMenuOptions],
  templateUrl: './side-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenu { }
