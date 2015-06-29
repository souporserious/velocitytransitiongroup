'use strict';

module.exports = {
    extend: (...objs) => {

        let out = {},
            objsLength = objs.length;

        for(let i = 0; i < objsLength; i++) {
            if(!objs[i])
                continue;

            for(let key in objs[i]) {
                if(objs[i].hasOwnProperty(key)) {
                    out[key] = objs[i][key];
                }
            }
        }

        return out;
    }
};