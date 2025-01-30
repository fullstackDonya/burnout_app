const webSocketMiddleware = (url) => {
    let socket;

    return store => next => action => {
        switch (action.type) {
            case 'WS_CONNECT':
                if (socket !== undefined) {
                    socket.close();
                }
                socket = new WebSocket(url);

                socket.onopen = () => {
                    store.dispatch({ type: 'WS_CONNECTED' });
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    store.dispatch({ type: 'WS_MESSAGE_RECEIVED', payload: data });
                };

                socket.onclose = () => {
                    store.dispatch({ type: 'WS_DISCONNECTED' });
                };

                break;

            case 'WS_DISCONNECT':
                if (socket !== undefined) {
                    socket.close();
                }
                socket = undefined;
                store.dispatch({ type: 'WS_DISCONNECTED' });
                break;

            case 'WS_SEND_MESSAGE':
                if (socket !== undefined) {
                    socket.send(JSON.stringify(action.payload));
                }
                break;

            default:
                return next(action);
        }
    };
};

export default webSocketMiddleware;