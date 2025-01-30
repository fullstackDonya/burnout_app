import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    publications: [],
    loading: false,
    error: null,
};

const publicationSlice = createSlice({
    name: 'publications',
    initialState,
    reducers: {
        fetchPublicationsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPublicationsSuccess(state, action) {
            state.loading = false;
            state.publications = action.payload;
        },
        fetchPublicationsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addPublication(state, action) {
            state.publications.push(action.payload);
        },
        removePublication(state, action) {
            state.publications = state.publications.filter(
                (publication) => publication.id !== action.payload
            );
        },
    },
});

export const {
    fetchPublicationsStart,
    fetchPublicationsSuccess,
    fetchPublicationsFailure,
    addPublication,
    removePublication,
} = publicationSlice.actions;

export default publicationSlice.reducer;