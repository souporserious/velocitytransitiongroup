##VelocityTransitionGroup 0.3.1

**Getting close to version 1 as well as actual documentation and live samples. Check example for now.**

###Run Example
    npm install
    npm run dev

open your browser and visit: http://localhost:8080/

###Example Usage
```js
    <VelocityTransitionGroup
        /* pass desired html tag */
        component="ul"
        
        /* either pass true or another string for a seperate transition on load */
        appear="transition.bounceIn"
        
        /* transition upon entering DOM, notice we can pass properties as well as forecfeed the values instead of a predefined animation */
        enter={{opacity: [0, 1]}}
        
        /* if not set, no transition out should happen on leave */
        leave="transition.fadeOut"
        
        /* pass true to animate parent height before transitioning children in */
        wrapper={false}
    
        /* set default options for all transitions */
        defaults={{
            duration: 300
        }}
    
        /* or optionally pass in different options per transition */
        appearOptions={{
            stagger: 100,
            etc...
        }}
        enterOptions={{}}
        leaveOptions={{}}
        wrapperOptions={{}}
    >
        {items}
    </VelocityTransitionGroup>
```

###Known Bugs
Switching between two states callbacks are off and show all elements at one time, need to handle firing at proper times.

If changing state before completing any animation it will lose any references between both and return nothing or get stuck. Need to handle canceling a transition if this happens and return the requested state.

###TODOS
Add support to animate parent height or a dummy div that gets placed in or both. Could be useful for a list when animating out in between two other items.

Add support for sorting arrays.

Check if jQuery is loaded or not since Velocity changes behaivor if it is.