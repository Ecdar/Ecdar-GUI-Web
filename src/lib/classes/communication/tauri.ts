import axios from "axios";
import type { Services, WithIp, Writeable } from "../communication";


export async function communicationTauri<
	S extends keyof Services,
	E extends keyof Services[S],
>(
	service: S,
	endpoint: E,
	input: WithIp<Writeable<Awaited<ReturnType<Services[S][E]>["request"]>>>,
): Awaited<ReturnType<Services[S][E]>["response"]> {
  const { invoke } = await import("@tauri-apps/api");
  const serviceSnake = toSnakeCase(service);
  const endpointSnake = toSnakeCase(endpoint);

  return await invoke(`${serviceSnake}_${endpointSnake}`, { payload : input});
}

function toSnakeCase(input : string) : string{
  input = input[0].toLowerCase() + input.substring(1);
  return input.replace(/[A-Z]/g, (x) => {
	  return "_" + x.toLowerCase();
  });
}

