function createMachine(stateMachineDefinition) {

    const machine = {
        // machine object
        // add the value and transition properties
        // currentState would be something like 'off' or 'on' in this case and event would be 'switch' for the toggle
        value: stateMachineDefinition.initialState,
        transition(currentState, event) {
            // The event is checked against the current state's transitions
            const currentStateDefinition = stateMachineDefinition[currentState]
            const destinationTransition = currentStateDefinition.transitions[event]
            // If a transition matches the event, that transition "happens"
            // If the user defined a transition from the current state with this event, then it'll continue, otherwise, it'll exit early
            if (!destinationTransition) {
                return
            }
            const destinationState = destinationTransition.target
            const destinationStateDefinition = stateMachineDefinition[destinationState]

            // By virtur of a transition "happening", states are exited, and entered and the relevant actions are performed
            // Call the action for the transition, the onExit for the current state and the onEnter for the next state.
            destinationTransition.action()
            currentStateDefinition.actions.onExit()
            destinationStateDefinition.actions.onEnter()

            // The machine immediately is in the new state, ready to process the next event.
            machine.value = destinationState

            return machine.value
        },
}
    return machine
}

// create the state machine
const machine = createMachine({
    // Once state is defined as the initial state. When a machine starts to execute, it automatically enters this state.
    // Have the use provide us with what that initalState value should be
    initialState: 'off',
    // Set definitions for our states
    // Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
    // Allow user to provide a function that will be called when on enter and on exit for a given state.
    // Add console.logs to check work later.
    off: {
        actions: {
            onEnter() {
                console.log('off: onEnter')
            },
            onExit() {
                console.log('off: onExit')
            },
        },
        // Each state can define events that trigger a transition.
        // A transition defines how a machine would react to the event, by exiting one state and entering another state.
        transitions: {
            // The off state should be able to transition to the on state and so I will call that event "switch"
            switch: {
                target: 'on',
                // A transition can define actions that occur when the transition happens. Actions will typically have side effects.
                action() {
                    console.log('transition action for "switch" in "off" state')
                }
            },
        },
    },
    on: {
        actions: {
            onEnter() {
                console.log('on: onEnter')
            },
            onExit() {
                console.log('on: onExit')
            },
        },
        transitions: {
            switch: {
                target: 'off',
                action() {
                    console.log('transition action for "switch" in "on" state')
                }
            },
        },
    },
})


// use the state machine
let state = machine.value

console.log(`current state: ${state}`) // current state: off

state = machine.transition(state, 'switch')

console.log(`current state: ${state}`) // current state: on

state = machine.transition(state, 'switch')

console.log(`current state: ${state}`) // current state: off