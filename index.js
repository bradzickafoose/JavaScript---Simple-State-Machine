function createMachine(stateMachineDefinition) {

    const machine = {

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
        transitions: {
            // The off state should be able to transition to the on state and so I will call that event "switch"
            switch: {},
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
            switch: {},
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