import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarOptions } from './toolbar-options';
import { ToolbarService } from './toolbar-service';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {


  @Output() MenuClick: EventEmitter<any>;
  options: ToolbarOptions = {} as ToolbarOptions;

  constructor(private toolbar: ToolbarService, private location: Location) {
    this.MenuClick = new EventEmitter<any>();
  }

  ngOnInit() {

    this.toolbar.getToolbarOptions().subscribe((options: ToolbarOptions) => {
      this.options = options;
    });
  }

  onMenuClick() {
    this.MenuClick.emit();

  }

  onNavigateBack() {
    {
      this.location.back();
    }
  }
}

