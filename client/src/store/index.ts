import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/auth.reducer";
import blogReducer from "./reducers/blog.reducer";
import taskReducer from "./reducers/task.reducer";

const store = configureStore({
	reducer: {
		auth: authReducer,
		blog: blogReducer,
		task: taskReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({ serializableCheck: false });
	},
	devTools: true,
});
const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { dispatch };
export default store;
