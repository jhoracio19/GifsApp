import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environments/environment.development';
// import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeader {

  envs = environment;

}
