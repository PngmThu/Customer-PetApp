export default class BaseModel {
	constructor(obj, schema) {
		this._setData(obj, schema);
	}

	_setData(obj, schema) {

		if (obj) {
			Object.keys(schema)
				.forEach(k => {
                    this[k] = obj[k]
                });
            this['$key'] = '';
		}
    }
    
    resolveData(obj){
        Object.keys(obj)
            .forEach(k => {
                if(typeof(obj[k]) == 'object'){
                    obj[k] = obj[k].$key
                }
            })
        return obj;
    }
}
