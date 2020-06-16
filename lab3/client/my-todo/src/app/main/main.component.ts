import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  tasks: any = []
  title: string
  isEdit: any
  currentld: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllTask()
  }

   getAllTask() {
    this.http.get(`http://localhost:3000/tasks`).subscribe((res) => {
    this.tasks = res
  })
}
createTask(title) {

  if (this.isEdit) {
    this.http.patch(`http://localhost:3000/tasks/${this.currentld}`, { title }).subscribe((res) => {
      console.log(res)
      this.getAllTask()
      this.isEdit = false

    })
  } else {
    this.http.post('http://localhost:3000/tasks', { title }).subscribe((res) => {
      console.log(res)
      this.getAllTask
    })
  }
}
  delite(id) {
    this.http.delete(`http://localhost:3000/tasks/${id}`).subscribe((res) => {
      console.log (res)
      this.getAllTask()
  })
  }

  edit(id, title) {
    this.isEdit = true;
    this.currentld = id;
    (<HTMLInputElement>document.getElementById("taskInput")).value = title;
  }
}

