import {Component} from '@angular/core';
import {HomePage} from "../home/home";
import {AboutPage} from "../about/about";
import {InstructionsPage} from "../instructions/instructions";
import {TranslateService} from "ng2-translate";


@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  ctgPage = HomePage;
  aboutPage = AboutPage;
  instructionPage = InstructionsPage;
  isEnglish = true;


  constructor(private translateService: TranslateService) {
  }

  ionViewWillEnter() {
    this.updateFlagFromChild();
  }

  updateFlagFromChild() {
    this.isEnglish = this.translateService.currentLang == 'en';
  }


  onLanguageChange() {
    // Toggles between true or false when pressed;
    this.isEnglish = !this.isEnglish;

    if (this.isEnglish) {
      this.translateService.use('en');
    } else {
      this.translateService.use('sv');
    }
  }

}
