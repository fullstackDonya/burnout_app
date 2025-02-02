import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';


export const fetchQuestions = createAsyncThunk(
    'diagnostic/fetchQuestions',
    async () => {
        const response = await axios.get('/questions');
        return response.data; // Retourne les questions
    }
);


export const submitDiagnostic = createAsyncThunk(
    'diagnostic/submitDiagnostic',
    async (responses) => {
        const response = await axios.post('/submit', responses);
        return response.data; // Retourne la réponse du backend après soumission
    }
);


const diagnosticSlice = createSlice({
    name: 'diagnostic',
    initialState: {
        questions: [],
        responses: [],
        loading: false,
        error: null,
        submissionStatus: null
    },
    reducers: {
        // Ajout ou modification de la réponse à une question
        setAnswer: (state, action) => {
            const { questionId, answer } = action.payload;
            const existingResponse = state.responses.find((resp) => resp.questionId === questionId);
            if (existingResponse) {
                existingResponse.answer = answer;
            } else {
                state.responses.push({ questionId, answer });
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(submitDiagnostic.pending, (state) => {
                state.loading = true;
                state.submissionStatus = null;
            })
            .addCase(submitDiagnostic.fulfilled, (state, action) => {
                state.loading = false;
                state.submissionStatus = 'success';
            })
            .addCase(submitDiagnostic.rejected, (state, action) => {
                state.loading = false;
                state.submissionStatus = 'failed';
                state.error = action.error.message;
            });
    }
});


export const { setAnswer } = diagnosticSlice.actions;


export default diagnosticSlice.reducer;