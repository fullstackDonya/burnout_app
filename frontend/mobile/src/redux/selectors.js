import { createSelector } from 'reselect';

const selectAuthState = (state) => state.auth;
export const selectUsers = (state) => state.users.list; 

export const selectUserId = createSelector(
  [selectAuthState],
  (authState) => authState.userId
);

const selectConversationsState = (state) => state.conversations;

export const selectConversations = createSelector(
  [selectConversationsState],
  (conversationsState) => conversationsState.conversations
);