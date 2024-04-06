#!/bin/bash

# Function to run a Node.js file for 10 seconds
run_for_10_seconds() {
    # Run checkAndCreateRoom.js
    node check.js &
    NODE_PID_1=$!

    # Run acceptDuel.js
    node accept.js &
    NODE_PID_2=$!

    # Run checkAndCreateRoom.js
    node check2.js &
    NODE_PID_3=$!

    # Run acceptDuel.js
    node accept2.js &
    NODE_PID_4=$!
    # Sleep for 10 seconds
    sleep 3000

    # Stop both Node.js processes
    kill $NODE_PID_1
    kill $NODE_PID_2
    kill $NODE_PID_3
    kill $NODE_PID_4
}

# Function to sleep for 5 seconds
sleep_for_5_seconds() {
    sleep 1
}

# Main loop to repeat the process indefinitely
while true
do
    run_for_10_seconds
    sleep_for_5_seconds
done


