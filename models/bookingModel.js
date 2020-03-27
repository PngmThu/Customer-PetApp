import BaseModel from './BaseModel';

export class Booking extends BaseModel {

	constructor(obj) {
		super(obj, Vendor.schema);
    }
    
	static schema = {
        petId: {type: 'string'},
        time: {type: 'string'},
        createdAt: {type: 'string'},
        updatedAt: {type: 'string'},
        service: {type: 'object'},
        vendor: {type: 'object'},
        status: { type: 'string'},
        customer: {type: 'object'},
	};

    resolveData(){
        return super.resolveData(this);
    }
}