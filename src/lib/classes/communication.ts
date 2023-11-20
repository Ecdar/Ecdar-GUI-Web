import type { IEcdarBackendClient } from "$lib/proto/services.client";
import { inTauri } from "$lib/tauri";
import { communicationWeb } from "./communication/ecdar-web";
import { communicationTauri } from "./communication/tauri";

export type Services = {
	ecdarBackend: IEcdarBackendClient;
};

export type WithIp<T> = {
	ip: string;
	body: T;
};

export type Writeable<T> = { -readonly [P in keyof T] : T[P] }

export const callEndpoint = inTauri ? communicationTauri : communicationWeb;

