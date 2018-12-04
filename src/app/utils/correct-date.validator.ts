import {FormGroup} from '@angular/forms';

// custom validator to check that two fields match
export function CorrectDate(birthday: string) {
  return (formGroup: FormGroup) => {
    const _birthday = formGroup.controls[birthday];

    if (_birthday.errors && !_birthday.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    const datestamp: number = Date.parse(_birthday.value);
    const nowstamp: number = Date.now();
    /* const today: number = Date.now();
    const splitdate = date.split('-');
    const newDate=splitdate[1] + '/' + splitdate[0]+"/"+splitdate[2];
    alert(new Date(newDate).getTime());
    */
    const twelveYear: number  =  12 * 365  * 24 * 3600 * 1000;
    const hundredYear: number = 100 *  365 * 24 * 3600 * 1000;

    if (nowstamp < datestamp) {
      _birthday.setErrors({inTheFuture: true});
    } else if ( (datestamp + twelveYear) > nowstamp ) {
      _birthday.setErrors({lessThanTwelveYearAgo: true});
    } else if ( (datestamp + hundredYear) < nowstamp) {
      _birthday.setErrors({moreThanHundredYear: true});
    } else {
      _birthday.setErrors( null);
    }
  };
}
