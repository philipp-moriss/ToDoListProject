type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = bolvanka1ACType | bolvanka2ACType | bolvanka3ACType

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case '1':{
            return {...state}
        }

        case '2':{
            return {...state};
        }
        case '3':{
            return {...state}
        }
        default:
            throw new Error("I don't understand this type")
    }
}

type bolvanka1ACType = ReturnType<typeof bolvanka1AC>
export const bolvanka1AC = ()=>{
    return{
        type:'1'
    }as const
}

type bolvanka2ACType = ReturnType<typeof bolvanka2AC>
export const bolvanka2AC = ()=>{
    return{
        type:'2'
    }as const
}

type bolvanka3ACType = ReturnType<typeof bolvanka3AC>
export const bolvanka3AC = ()=>{
    return{
        type:'3'
    }as const
}