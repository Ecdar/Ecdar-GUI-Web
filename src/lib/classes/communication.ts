import type { IEcdarBackendClient } from "$lib/proto/services.client";
import { inTauri } from "$lib/tauri";
import { communicationWeb } from "./communication/ecdar-web";
import { communicationTauri } from "./communication/tauri";

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

type WithIp<T> = {
	ip: string;
	body: T;
};

/**
 * ONLY FOR REFERENCE, SHOULD NOT BE CREATED
 * add the protoc-ts clients to this type, given name and type
 * */
export type Service = {
	ecdarBackend: IEcdarBackendClient;
};

/**
 * Extracts the keys of endpoints i Services
 * */
export type Endpoint<S extends keyof Service> = Service[S];

/**
 * Gets the input type for an endpoint
 * */
export type Input<
	S extends keyof Service,
	E extends keyof Endpoint<S>,
> = WithIp<Writeable<Awaited<ReturnType<Service[S][E]>["request"]>>>;

/**
 * Gets the return type for an endpoint
 * */
export type Output<
	S extends keyof Service,
	E extends keyof Endpoint<S>,
> = Awaited<ReturnType<Service[S][E]>["response"]>;

/**
 * Calls a gRPC backend
 * */
export const callEndpoint = inTauri ? communicationTauri : communicationWeb;

/**
 * Converts PascalCase and camelCase to snake_case
 * */
export function toSnakeCase(input: string): string {
	input = input[0].toLowerCase() + input.substring(1);
	return input.replace(/[A-Z]/g, (x) => {
		return "_" + x.toLowerCase();
	});
}
