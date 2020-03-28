import BaseModel from './BaseModel';

export class Schedule extends BaseModel{

    constructor(obj){
        super(obj, Schedule.schema)
    }

    static schema = {
        _id: {type:'string'},
        date: {type: 'object'},
        vendorId: {type: 'string'}
    }

    resolveData(){
        return super.resolveData(this);
    }
}