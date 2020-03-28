import BaseModel from './BaseModel.js';

export class Schedule extends BaseModel{

    constructor(obj){
        super(obj, Schedule.schema)
    }

    static schema = {
        _id: {type: 'string'},
        name: {type: 'string'},
        vendorId: {type: 'string'},
        price:{type:"number"} ,
        description:{type:'string'}
    }

    resolveData(){
        return super.resolveData(this);
    }
}