function createMachine(stateMachineDefinition) {

    const machine = {


}

    return machine

}

const machine = createMachine({


})

let state = machine.value

console.log(`current state: ${state}`)

state = machine.transition(state, 'switch')

console.log(`current state: ${state}`)

state = machine.transition(state, 'switch')

console.log(`current state: ${state}`)