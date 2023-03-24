import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    value: 0

}

// Reducer
const counterSlice = createSlice({

    name: 'counter',
    initialState,
    reducers:{
        
        // Action creators 
        comments: (state) => {

            
            state.value += 1;

        }


    }


})







// We export action creators to other components to update the state
export const { comments } = counterSlice.actions;
export default counterSlice.reducer;