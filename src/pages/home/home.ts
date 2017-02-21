import {Component} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {COLOR, MEASURE, TODO, DECISION} from "../../shared/consts/globals";
import * as _ from 'lodash';
import {InformationModalPage} from "../information-modal/information-modal";
import {MeasureModalPage} from "../measure-modal/measure-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(private modalCtrl: ModalController) {
  }

  modalCounter: number = 0;
  baseline: string;
  variability: string;
  decelerationsFrequency: string;
  decelerationsForm: string;
  accelerations: string;
  measures: string;
  color: string = COLOR.SECONDARY;
  canModalOpen: boolean = false;

  whatTodoText: string = TODO.CHOOSE_CONDITIONS;
  clickHere: string = "";


  openModal() {
    if (this.baseline != null
      && this.variability != null
      && this.decelerationsFrequency != null
      && this.accelerations != null
      && this.decelerationsForm != null
      && this.measures != MEASURE.NORMAL) {
      let modal = this.modalCtrl.create(MeasureModalPage, {color: this.color, measure: this.measures});
      modal.present();
    }
  }

  openInfoModal() {
    let modal = this.modalCtrl.create(InformationModalPage, {color: this.color, measure: this.measures});
    modal.present();
  }


  arrayToCheckAgainst = [DECISION.VARIABILITY_1, DECISION.VARIABILITY_2, DECISION.VARIABILITY_4];

  whatToDo() {
    // Test using lodash
    _.includes(this.arrayToCheckAgainst, "variability1"); // true
    _.includes(this.arrayToCheckAgainst, "variability00"); // false


    if (this.baseline != null
      && this.variability != null
      && this.decelerationsFrequency != null
      && this.accelerations != null
      && this.decelerationsForm != null) {

      // Case 1, if results are patological
      if (

        this.baseline == DECISION.BASELINE_1 ||

        this.variability == DECISION.VARIABILITY_1 ||
        this.variability == DECISION.VARIABILITY_2 ||
        this.variability == DECISION.VARIABILITY_4 ||

        this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_2 ||

        this.decelerationsForm == DECISION.DECELERATIONS_FORM_1 ||
        this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 ||
        this.decelerationsForm == DECISION.DECELERATIONS_FORM_5) {

        this.color = COLOR.DANGER;
        this.measures = MEASURE.FATAL;
        this.whatTodoText = TODO.RISK_HYPOXIA_PATHOLOGICAL;
        this.clickHere = "Click here for measures";
      }

      // Case 2, if results are not that bad but bad
      else if (this.baseline == DECISION.BASELINE_2 ||
        this.baseline == DECISION.BASELINE_4 ||
        this.baseline == DECISION.BASELINE_5 ||
        this.variability == DECISION.VARIABILITY_5 ||
        this.accelerations == DECISION.ACCELERATIONS_2 ||
        this.decelerationsForm == DECISION.DECELERATIONS_FORM_6 ||
        this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3) {

        this.color = COLOR.WARNING;
        this.measures = MEASURE.ABNORMAL;
        this.whatTodoText = TODO.LOW_RISK_HYPOXIA_ABNORMAL;
        this.clickHere = "Click here for measures";
      }

      // Case 3, if restults are normal
      else {
        this.color = COLOR.SECONDARY;
        this.measures = MEASURE.NORMAL;
        this.whatTodoText = TODO.NO_HYPOXIA;
        this.clickHere = "No measures needed";
      }
    }
  }
}
