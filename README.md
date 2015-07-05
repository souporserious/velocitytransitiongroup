##VelocityTransitionGroup 0.2.0

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
        
        /* pass true to transition height and make room to animate element in */
        transitionHeight={false}

        /* pass selector to use as child instead of element itself */
        transitionChild="*"

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

        /* determines if a group of elements needs to be animated */
        /* this will allow things like access to stagger animations */
        /* allows Velocity more perfomant DOM manipulation on groups */
        collection={}
    >
        {items}
    </VelocityTransitionGroup>

###TODOS
Check if jQuery is loaded or not since Velocity changes behaivor if it is