import {type ReactNode, createContext, useContext, useReducer } from "react";
import Timer from "../components/Timer";

export type Timer = {
    name: string;
    duration: number;
    originalDuration: number;
};

type TimersState = {
    isRunning: boolean;
    timers: Timer[]
};

const initialState: TimersState = {
    isRunning: true,
    timers: [],
}
type TimerContextValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimer: () => void;
    stopTimer: () => void;
    removeTimer: (name: string) => void;
    tozeroTimer: (name: string) => void;
    resetTimer: (name: string, originalDuration: number) => void;
};

export const TimersContext = createContext<TimerContextValue | null>(null);

export function userTimersContext(){
    const timersCtx = useContext(TimersContext)

    if(timersCtx == null){
        throw new Error ('Something went wrong - that should not be the case!');
    }

    return timersCtx;
}

type TimersContextProviderProps = {
    children: ReactNode;
};

type StartTimeAction = {
    type: 'START_TIMER'
}

type StopTimeAction = {
    type: 'STOP_TIMER'
}
type AddTimeAction = {
    type: 'ADD_TIMER'
    payload: Timer
}

type RemoveTimeAction = {
    type: 'REMOVE_TIMER'
    payload: string | null
}
type ToZeroTimeAction = {
    type: 'TOZERO_TIMER'
    payload: string | null
}

type ResetTimeAction = {
    type: 'RESET_TIMER'
    payload: {
        name: string,
        duration: number;
    };
};




type Action = AddTimeAction | StopTimeAction | StartTimeAction | RemoveTimeAction | ToZeroTimeAction | ResetTimeAction;

function timersReducer (state: TimersState, action: Action ): TimersState {

    switch (action.type) {
        case 'START_TIMER':
            return {
                ...state,
                isRunning: true
            };
        case 'REMOVE_TIMER':
            return {
                ...state,
                timers: state.timers.filter((timer) => timer.name !== action.payload)
            };
        case 'TOZERO_TIMER':
            return {
                ...state,
                timers: state.timers.map((timer)=> 
                    timer.name === action.payload
                    ? { ...timer, duration: 0 }  
                    : timer
                )
            };
        case 'STOP_TIMER':
            return {
                ...state,
                isRunning: false
            }
        case 'ADD_TIMER':
            return {
                ...state,
                timers:[
                    ...state.timers,
                    {
                        name: action.payload.name,
                        duration: action.payload.duration,
                        originalDuration: action.payload.duration,
                    },
                ],
                isRunning: true
            };
       
        case 'RESET_TIMER':
            return {
                ...state,
                timers: state.timers.map((timer) =>
                    timer.name === action.payload.name
                        ? { ...timer, duration: action.payload.duration }
                        : timer
                ),
                isRunning: true,
            };
        // ... outros casos
        default:
            break;
    }

    return state;
}

export default function TimersContextProvider({children} : TimersContextProviderProps){
    const [timersState, dispatch] = useReducer(timersReducer, initialState);

    const ctx: TimerContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        
        addTimer(timerData){
            dispatch( {type: 'ADD_TIMER', payload: timerData});
        },
        startTimer(){
            dispatch( {type: 'START_TIMER'});
        },
        stopTimer(){
            dispatch( {type: 'STOP_TIMER'});
        },
        removeTimer(name) {
            dispatch({ type: 'REMOVE_TIMER', payload: name });
        },
        tozeroTimer(name) {
            dispatch({ type: 'TOZERO_TIMER', payload: name });
        },
        resetTimer(name, duration) {
            dispatch({ type: 'RESET_TIMER', payload: { name, duration } });
        },
        
    }
    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}