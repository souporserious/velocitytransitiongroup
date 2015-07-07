export default {
    // https://github.com/facebook/react/blob/38acadf6f493926383aec0362617b8507ddee0d8/src/shared/stubs/Object.assign.js
    assign(target, sources) {
        
        if(target == null) {
            throw new TypeError('Object.assign target cannot be null or undefined');
        }

        let to = Object(target);
        let hasOwnProperty = Object.prototype.hasOwnProperty;

        for(let nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
            
            let nextSource = arguments[nextIndex];
            
            if(nextSource == null) continue;

            let from = Object(nextSource);

            // We don't currently support accessors nor proxies. Therefore this
            // copy cannot throw. If we ever supported this then we must handle
            // exceptions and side-effects. We don't support symbols so they won't
            // be transferred.

            for(let key in from) {
                if(hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
        }

        return to;
    },
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
}