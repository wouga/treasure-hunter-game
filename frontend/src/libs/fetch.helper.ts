import crossFetch from 'cross-fetch';

const ENDPOINT = 'http://localhost:3001/api/v1';

export const errorHedler = (resp: Response) => {
    const json = resp.json();

    if (resp.status >= 200 && resp.status < 300) {
        return json;
    } else {
        return json
            .catch(error => error)
            .then(({ error }) => Promise.reject(error || "Unknown Error"));
    }
}

interface IFetchProps extends RequestInit {
    path: string;
    data?: object;
}

export const fetch: <T>(props: IFetchProps) => Promise<Response> =
    ({ path, data = {}, headers, ...restProps }) => crossFetch(`${ENDPOINT}/${path}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
        ...(
            !['GET', 'HEAD'].includes(restProps.method || 'POST')
                ? ({ body: JSON.stringify(data) })
                : {}
        ),
        ...restProps,

    });
