export const createHttpResponceOK = (row: unknown) => {
    const res: HttpRes = {
        body: JSON.stringify(row),
        state: 'OK',
        error: null
    };

    return {
        statusCode: 200,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(res)
    };
};

export const createHttpResponceKO = (error: Error) => {
    const res: HttpRes = {
        body: null,
        state: 'KO',
        error: {
            statusCode: 500,
            message: error.message,
            stackTrace: error.stack
        }
    };
    return {
        statusCode: 500,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(res)
    };
};




interface HttpRes {
    body: unknown,
    state: number | string,
    error: HttpError | null
};

interface HttpError{
    statusCode: number,
    message: string,
    stackTrace: unknown
}