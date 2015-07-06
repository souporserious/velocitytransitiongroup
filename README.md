##VelocityTransitionGroup 0.2.7

**Docs Coming Soon**

###Run Example
    npm install
    npm run dev

open your browser and visit: http://localhost:8080/

###Example Usage
    <VelocityTransitionGroup
        component="ul"
        
        /* transition upon entering DOM */
        enter="transition.fadeIn"
        
        /* if not set, no transition out should happen on leave
        leave="transition.fadeOut"
        
        /* either pass true or another string for a seperate transition on load */
        appear="transition.bounceIn"
        
        /* pass true to transition height and make room to animate element in 
        ***only works for single elements as of right now*** */
        wrapper={false}
    
        /* set a default duration for all transitions */
        duration={300}
    
        /* optionally pass in any options to velocity */
        /* will override transitionEnter, transitionLeave, etc.. */
        enterOptions={{
            delay: 100,
            etc...
        }}
        leaveOptions=""
        appearOptions=""
    >
        {items}
    </VelocityTransitionGroup>

###Known Bugs
If changing state before completing any animation it will lose any references between both and return nothing. Need to handle canceling a transition if this happens and return the requested state.

Get total height method called multiple times. Fixing this should fix wrapper element problem.

###TODOS
Use wrapper on more than one element. Gathers incorrect height for more than one element right now.

Check if jQuery is loaded or not since Velocity changes behaivor if it is