import { configureStore } from "@reduxjs/toolkit";
import ThreadCount from "../pages/Thread/components/ThreadCount";

const store = configureStore({
  // our reducer that keeps track of our changes
    reducer: {

        counter: ThreadCount

    }

})


export default store;