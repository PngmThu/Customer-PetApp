import BaseModel from './BaseModel';

export default class Vendor extends BaseModel {

	constructor(obj) {
		super(obj, Vendor.schema);
    }
    
	static schema = {
        _id: {type:'string'},
        email: {type: 'string'},
        createdAt: {type: 'string'},
        updatedAt: {type: 'string'},
        name: {type: 'string'},
        address: {type: 'string'},
		$key: {type: 'string'},
	};

    resolveData(){
        return super.resolveData(this);
    }
}
