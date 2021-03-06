import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';

export const validateNewUser = (user) => {
    const email = user.emails[0].address;

    try {
        new SimpleSchema({
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email
            }
        }).validate({email});
    } catch (err) {
        throw new Meteor.Error(400, err.message);
    }

    return true;
};

if(Meteor.isServer){
    Accounts.validateNewUser(validateNewUser);
}