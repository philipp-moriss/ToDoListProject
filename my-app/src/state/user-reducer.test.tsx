import React from 'react';
import {userReducer} from './user-reducer';

test('must be work it is a bolvanka for develop', () => {
    // DATA
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    // ACTION
    const endState = userReducer(startState, { type: '1' })
    // EXPECT
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(2);
});


