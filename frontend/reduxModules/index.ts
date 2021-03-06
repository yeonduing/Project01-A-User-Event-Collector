import { combineReducers } from "redux";
import checkedTrackReducer from "./checkedTrack";
import playQueueReducer from "./playQueue";

export const rootReducer = combineReducers({
  checkedTracks: checkedTrackReducer,
  playQueue: playQueueReducer,
});

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof rootReducer>;
