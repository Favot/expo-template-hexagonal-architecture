import type { Session } from "~/domain/session/session";

export type RestClient = {
	httpRequest: (
		input: string | URL | globalThis.Request,
		session?: Session,
		init?: RequestInit,
	) => Promise<Response>;
};

export class AuthenticationError extends Error {
	constructor(message: string, cause?: Error) {
		super(message);
		this.cause = cause;
		this.name = "AuthenticationError";
	}
}

type ResponseDetail = {
	url: string;
	status: number;
	bodyError?: string;
	bodyMessage?: string;
};

export class NetworkError extends Error {
	responseDetail: ResponseDetail;
	constructor(message: string, responseDetail: ResponseDetail, cause?: Error) {
		super(message);
		this.cause = cause;
		this.name = "NetworkError";
		this.responseDetail = responseDetail;
	}
}
