import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiNavigation} from '@taiga-ui/layout';
import { ThemeToggle } from '../../components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-page-with-header-template',
  imports: [RouterOutlet, TuiNavigation, TuiDataList, TuiButton, TuiDropdown, TuiIcon, ThemeToggle],
  templateUrl: './page-with-header-template.html',
  styleUrl: './page-with-header-template.css',
})
export class PageWithHeaderTemplate {}
