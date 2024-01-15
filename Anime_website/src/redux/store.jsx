import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './slice/homeSlice';


const store = configureStore({
	reducer: {
	 homePage : homeSlice
	},
});

export default store;
