import * as GuestActionCreators from "./guest.ts";
import * as RegistrationActionCreators from "./logIn-Registration/registraion.ts";
import * as LogInActionCreators from "./logIn-Registration/logIn.ts";
import * as AuthFormActions from "./authForm.ts";

export default {
    ...GuestActionCreators,
    ...RegistrationActionCreators,
    ...LogInActionCreators,
    ...AuthFormActions
}
