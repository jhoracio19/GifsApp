import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from '../../components/side-menu/side-menu';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SideMenu ],
  templateUrl: './dashboard-page.html',
})
export default class DashboardPage {
    toggleMenu() {
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');

    if (menu) {
      const isHidden = menu.classList.toggle('-translate-x-full');
      if (overlay) overlay.classList.toggle('hidden', isHidden);
    }
  }
}
