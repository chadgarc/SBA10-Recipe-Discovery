/**
 * Custom error class for API fetch failures.
 * Use this when a fetch operation fails due to network issues or server errors.
 */
export class FetchError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FetchError';
    }
}

/**
 * Custom error class for resource not found scenarios.
 * Use this when a requested resource does not exist.
 */
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

/**
 * Custom error class for network connectivity issues.
 * Use this when the application cannot reach the server.
 */
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}
