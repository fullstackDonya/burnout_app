import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collaborations: [],
    loading: false,
    error: null,
};

const collaborationSlice = createSlice({
    name: 'collaboration',
    initialState,
    reducers: {
        fetchCollaborationsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCollaborationsSuccess(state, action) {
            state.loading = false;
            state.collaborations = action.payload;
        },
        fetchCollaborationsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addCollaboration(state, action) {
            state.collaborations.push(action.payload);
        },
        removeCollaboration(state, action) {
            state.collaborations = state.collaborations.filter(
                (collaboration) => collaboration.id !== action.payload
            );
        },
    },
});

export const {
    fetchCollaborationsStart,
    fetchCollaborationsSuccess,
    fetchCollaborationsFailure,
    addCollaboration,
    removeCollaboration,
} = collaborationSlice.actions;

export default collaborationSlice.reducer;