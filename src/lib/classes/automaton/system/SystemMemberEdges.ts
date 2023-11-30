import { AutomatonArray } from "../AutomatonArray";
import { SystemMemberEdge, systemOrigin } from "./SystemMemberEdge";
import type { RawSystemMemberEdge } from "./raw/RawSystemMemberEdge";
import type { FromRaw } from "../AutomatonClass";
import type { SystemMemberIds } from "./SystemMemberIds";

export class SystemMemberEdges extends AutomatonArray<
	SystemMemberEdge,
	RawSystemMemberEdge
> {
	/**
	 * Converts an array of RawSystemMemberEdge to an array of SystemMemberEdge.
	 */
	static readonly fromRaw: FromRaw<
		RawSystemMemberEdge[] | undefined,
		{ systemMemberIds: SystemMemberIds },
		SystemMemberEdges
	> = (raw, { systemMemberIds }) => {
		const edges = new SystemMemberEdges();
		if (raw) {
			for (const rawEdge of raw) {
				const parent =
					rawEdge.parent === 0
						? systemOrigin
						: systemMemberIds.get(rawEdge.parent);
				if (!parent) {
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot generate an edge where the parent doesn't exist: ${rawEdge.parent}`,
					);
				}
				const child = systemMemberIds.get(rawEdge.child);
				if (!child) {
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot generate an edge where the child doesn't exist: ${rawEdge.child}`,
					);
				}
				edges.push(
					SystemMemberEdge.fromRaw(rawEdge, {
						parent,
						child,
					}),
				);
			}
		}
		return edges;
	};
}
