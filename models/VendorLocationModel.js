import BaseModel from './BaseModel';

export default class VendorLocation extends BaseModel {

	constructor(obj) {
		super(obj, Notification.schema);
    }
    
	static schema = {
        name : {type: 'string'},
        type: {type: 'string'},
        address: {type: 'string'},
        postal_code: {type: 'number'},
        tel_office_1: {type: 'number'},
        tel_office_2: {type: 'number'},
        fax_office: {type: 'string'},
        vendorId: {type: 'string'},
	};

    resolveData(){
        console.log(super.resolveData(this));
    }
}