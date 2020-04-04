import BaseModel from './BaseModel';

export class VendorLocation extends BaseModel {

	constructor(obj) {
		super(obj, VendorLocation.schema);
    }
    
	static schema = {
        _id: {type:'string'},
        email: {type: 'string'},
        password: {type: 'string'},
        mobile: {type: 'number'},
        name: {type: 'string'},
        address: {type: 'string'},
	};

    resolveData(){
        return super.resolveData(this);
    }
}