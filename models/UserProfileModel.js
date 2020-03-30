import BaseModel from './BaseModel';

export class UserProfile extends BaseModel {

	constructor(obj) {
		super(obj, Vendor.schema);
    }
    
	static schema = {
        _id: {type: 'string'},
        firstName: {type: 'string'},
        lastName: {type: 'string'},
        dateOfBirth: { type : 'object'},
        mobile: {type: 'number'},
        email: {type: 'string'},
        customerId: {type: 'string'},
	};

    resolveData(){
        return super.resolveData(this);
    }
}