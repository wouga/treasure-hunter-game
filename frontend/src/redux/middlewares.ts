import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Middleware } from 'redux';

const middlewares: Middleware[] = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
}

export default middlewares;
