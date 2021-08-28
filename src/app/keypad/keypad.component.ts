import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.styl']
})
export class KeypadComponent implements OnInit {
  buttonHistory = 'BUTTONHISTORY'
  historyClickedText = '';
  sessionHistory = [];
  constructor() { }
  keypad = [
    [
      {"numericKey":"1", "alphabetKey":"&nbsp;"},
      {"numericKey":"2", "alphabetKey":"ABC"},
      {"numericKey":"3", "alphabetKey":"DEF"}
    ],
    [
      {"numericKey":"4", "alphabetKey":"GHI"},
      {"numericKey":"5", "alphabetKey":"JKL"},
      {"numericKey":"6", "alphabetKey":"MNO"}
    ],
    [
      {"numericKey":"7", "alphabetKey":"PQRS"},
      {"numericKey":"8", "alphabetKey":"TUV"},
      {"numericKey":"9", "alphabetKey":"WXYZ"}
    ],
    [
      {"numericKey":"*", "alphabetKey":"&nbsp;"},
      {"numericKey":"0", "alphabetKey":"&nbsp;"},
      {"numericKey":"#", "alphabetKey":"&nbsp;"}
    ],
  ]
  ngOnInit(): void {
    const val = JSON.parse(this.getItem());
    if(val != null){
      this.sessionHistory = val;
    }
  }
  buttonClicked(row, col){
    const time = this.getTime();
    const keyClickedOn = this.keypad[row][col].numericKey 
    this.historyClickedText = 'User Clicked on: ' + keyClickedOn + ', the cordinated are: [' + row +','+col+']' + ',<br>Time Stamp: ' + time;
    this.saveToStorage();
  }
  saveToStorage(){
    const val = JSON.parse(this.getItem());
    if(val != null){
      this.sessionHistory = val;
      this.sessionHistory.push(this.historyClickedText)
      this.setItem(this.sessionHistory)
    } else {
      this.sessionHistory.push(this.historyClickedText)
      this.setItem(this.sessionHistory)
    }

  }
  getTime(){
    return new Date();
  }
  getItem(){
    return localStorage.getItem(this.buttonHistory);
  }
  setItem(sessionHistory){
    localStorage.setItem(this.buttonHistory, JSON.stringify(sessionHistory))
  }
}
