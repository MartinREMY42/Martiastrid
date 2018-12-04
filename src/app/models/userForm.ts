
export class UserForm {

  constructor(public username = '',
              public password = '',
              public confirmPassword = '',
              public birthdate: Date
              ) { }
}
