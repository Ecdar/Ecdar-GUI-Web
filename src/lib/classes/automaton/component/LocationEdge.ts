import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawLocationEdge } from "./raw/RawLocationEdge";
import type { LocationEdgeId } from "./LocationEdgeId";
import type { LocationId } from "./LocationId";
import { LocationEdgeStatus } from "./LocationEdgeStatus";
import { LocationEdgeNail } from "./LocationEdgeNail";

/**
 * An Ecdar Edge
 * Used to define edges between Locations in an Ecdar Component
 */
export class LocationEdge extends AutomatonClass<RawLocationEdge> {
	constructor(
		/**
		 * The id of the edge
		 */
		public id: LocationEdgeId,

		/**
		 * Unused
		 */
		public group: string = "",

		/**
		 * The id of the source location
		 */
		public source: LocationId,

		/**
		 * The id of the target location
		 */
		public target: LocationId,

		/**
		 * The status of the edge
		 *  - Input or
		 *  - Output
		 */
		public status: LocationEdgeStatus = LocationEdgeStatus.INPUT,

		/**
		 * Unused
		 */
		public select: string = "",

		/**
		 * The guard of the edge
		 * ex "c <= 7"
		 */
		public guard: string = "",

		/**
		 * The update of the edge
		 * ex "c := 7"
		 */
		public update: string = "",

		/**
		 * The input OR output variable of the edge
		 */
		public sync: string = "",

		/**
		 * Unused
		 */
		public isLocked: boolean = true,

		/**
		 * The nails of the edge
		 * Modifies the path that the edge takes
		 * Defines properties on the edge
		 */
		public nails: LocationEdgeNail[] = [],
	) {
		super();
	}

	/**
	 * Converts a LocationEdge to a RawLoctionEdge
	 */
	toRaw() {
		return {
			id: this.id.toRaw(),
			group: this.group,
			sourceLocation: this.source.toRaw(),
			targetLocation: this.target.toRaw(),
			status: this.status,
			select: this.select,
			guard: this.guard,
			update: this.update,
			sync: this.sync,
			isLocked: this.isLocked,
			nails: this.nails.map((nail) => nail.toRaw()),
		};
	}

	/**
	 * Converts a RawLocationEdge to a LocationEdge
	 */
	static readonly fromRaw: FromRaw<
		RawLocationEdge,
		{ id: LocationEdgeId; source: LocationId; target: LocationId },
		LocationEdge
	> = (raw, { id, source, target }) => {
		return new LocationEdge(
			id,
			raw.group,
			source,
			target,
			raw.status,
			raw.select,
			raw.guard,
			raw.update,
			raw.sync,
			raw.isLocked,
			raw.nails?.map((rawNail) => LocationEdgeNail.fromRaw(rawNail)),
		);
	};
}
