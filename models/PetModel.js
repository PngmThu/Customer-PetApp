import BaseModel from './BaseModel';

export class Booking extends BaseModel {

	constructor(obj) {
		super(obj, Vendor.schema);
    }
    
	static schema = {
        name: {type: 'string'},
        dateOfBirth: { type : 'object'},
        weight: {type: 'number'},
        height: {type: 'number'},
        type: {type: 'string'},
        customerId: {type: 'string'},
        deletedAt: {type: 'object'},
	};

    resolveData(){
        return super.resolveData(this);
    }
}