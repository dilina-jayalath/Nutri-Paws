import { Component } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  taskTitle: string = '';
  taskDescription: string = '';
  alltasks: any = [];
  limitedTasks: any = [];

  constructor(private api: DashboardService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllTask();
  }

  // GET - FUNCTION OF LOAD ALL TASK LIST
  getAllTask() {
    this.api.getAllTask().subscribe({
      next: (response: any) => {
        this.alltasks = response;
        this.limitedTasks = this.alltasks.slice(0, 5);
      },
      error: (error: any) => {
        console.log('Error- faild fetch data!');
      },
    });
  }

  // ADD - FUNCTION OF ADD TASK
  addtask() {
    if (this.taskTitle.trim() && this.taskDescription.trim()) {
      const task = {
        title: this.taskTitle,
        description: this.taskDescription,
      };

      this.api.saveTask(task).subscribe({
        next: (response: any) => {
          this.showAlert('Success', 'Task Added successfully!');
          this.getAllTask();
          this.taskTitle = '';
          this.taskDescription = '';
        },
        error: (error: any) => {
          this.showAlert('Error', 'Failed to save task.!');
        },
      });
    } else {
      this.showAlert('Error', 'Please fill in both title and description!');
    }
  }

  // UPDATE - FUNCTION OF UPDATE STATUS
  updatetask(task: any) {
    const tempTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: 'YES',
    };
    this.api.updateTask(task.id, tempTask).subscribe({
      next: (response: any) => {
        this.showAlert('Success', 'Task Done...!');
        this.getAllTask();
      },
      error: (error: any) => {
        this.showAlert('Error', 'Failed to update task.');
      },
    });
  }

  // Function to show alert
  showAlert(title: string, message: string) {
    this.dialog.open(AlertComponent, {
      data: { title, message },
      width: '300px',
      disableClose: true,
    });
  }
}
