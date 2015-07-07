'use strict';

import React from 'react';

var TransitionChildMapping = {

    getChildMapping: function(children) {

        if(!children) return children;

        // if only child make sure we return an array still
        if(!Array.isArray(children)) {
            children = [children];
        }

        let mappedChildren = {};

        children.forEach(child => {
            mappedChildren[child.key] = child;
        });

        return mappedChildren;
    },

    mergeChildMappings: function(prev = {}, next = {}) {

        function getValueForKey(key) {
            if(next.hasOwnProperty(key)) {
                return next[key];
            } else {
                return prev[key];
            }
        }

        // For each key of `next`, the list of keys to insert before that key in
        // the combined list
        let nextKeysPending = {};
        let pendingKeys = [];
        
        for(let prevKey in prev) {
            if(next.hasOwnProperty(prevKey)) {
                if(pendingKeys.length) {
                    nextKeysPending[prevKey] = pendingKeys;
                    pendingKeys = [];
                }
            } else {
                pendingKeys.push(prevKey);
            }
        }

        let childMapping = {};

        for(let nextKey in next) {

            if(nextKeysPending.hasOwnProperty(nextKey)) {

                for(let i = 0; i < nextKeysPending[nextKey].length; i++) {

                    let pendingNextKey = nextKeysPending[nextKey][i];
                    
                    childMapping[nextKeysPending[nextKey][i]] = getValueForKey(
                        pendingNextKey
                    );
                }
            }
            childMapping[nextKey] = getValueForKey(nextKey);
        }

        // Finally, add the keys which didn't appear before any key in `next`
        for(let i = 0; i < pendingKeys.length; i++) {
            childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
        }

        return childMapping;
    },
};

module.exports = TransitionChildMapping;