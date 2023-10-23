import { EcdarBackendClient } from "$lib/proto/services.client";
import { Communication } from "../Communication";
import type { Features } from "../Features";
import * as Protobuff from "@protobuf-ts/grpcweb-transport";

export class CommunicationReveaal extends Communication {
	override features: Features = {
		getUserToken: async () => {
			const transport = new Protobuff.GrpcWebFetchTransport({
				baseUrl: "Not implemented",
			});
			const client = new EcdarBackendClient(transport);
			await client.getUserToken({});
		},
	};
}
