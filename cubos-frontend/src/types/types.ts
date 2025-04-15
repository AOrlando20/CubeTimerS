interface RegisteredTime {
    id: number,
    time: number,
    ao5: number,
    ao12: number,
    scramble?: string,
    puzzle?: string
}

export interface TimerSession {    
    times: RegisteredTime[]
}