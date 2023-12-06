import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawComponent } from "./raw/RawComponent";
import type { HasId } from "../HasId";
import type { ComponentId } from "./ComponentId";
import { Locations } from "./Locations";
import type { LocationId } from "../LocationId";
import { LocationEdges } from "./LocationEdges";
import { Position } from "../Position";
import { Dimensions } from "../Dimensions";
import { LocationType } from "./LocationType";
import { Location } from "./Location";
import type { LocationIds } from "../LocationIds";
import type { LocationEdgeIds } from "../LocationEdgeIds";
import type { RawLocationId } from "../raw/RawLocationId";
import type { RawLocations } from "./raw/RawLocations";

const defaultX = 0;
const defaultY = 0;

const defaultWidth = 100;
const defaultHeight = 100;

/**
 * An Ecdar component
 * It stores the edges and locations of a single automaton
 */
export class Component
	extends AutomatonClass<RawComponent>
	implements HasId<ComponentId>
{
	constructor(
		/**
		 * The name of the component
		 */
		readonly id: ComponentId,

		/**
		 * A list of Locations in the Component
		 */
		readonly locations: Locations,

		/**
		 * The component's initial location
		 */
		initialLocation: LocationId,

		/**
		 * A list of Edges in the Component
		 */
		public edges: LocationEdges,

		/**
		 * The declarations of the component ex "clock t;"
		 */
		public declarations: string = "",

		/**
		 * A description of the Component
		 */
		public description: string = "",

		/**
		 * The position of the Component
		 */
		public position: Position = new Position(defaultX, defaultY),

		/**
		 * The dimensions of the Component
		 */
		public dimensions: Dimensions = new Dimensions(
			defaultWidth,
			defaultHeight,
		),

		/**
		 * The color of the Component
		 */
		public color: string = "0",

		/**
		 * Include in periodic checks
		 * ! Some more information might be needed !
		 */
		public includeInPeriodicCheck: boolean = false,
	) {
		super();
		this.initialLocation = initialLocation;
	}

	/**
	 * The initial Location in the Component
	 */
	get initialLocation() {
		return this.#initialLocation;
	}
	set initialLocation(id: LocationId) {
		this.#initialLocation = id;
		if (!this.locations.has(id))
			throw new TypeError(
				"Cannot set an initial location that is not part of the list of locations",
			);
		return;
	}
	#initialLocation!: LocationId;

	/**
	 * Converts the Component to a RawComponent
	 */
	toRaw() {
		const rawLocations = this.locations.toRaw();
		return {
			name: this.id.toRaw(),
			declarations: this.declarations,
			locations: setInitialLocation(
				this.initialLocation.toRaw(),
				rawLocations,
			),
			edges: this.edges.toRaw(),
			description: this.description,
			x: this.position.x,
			y: this.position.y,
			width: this.dimensions.width,
			height: this.dimensions.height,
			color: this.color,
			includeInPeriodicCheck: this.includeInPeriodicCheck,
		};
	}

	/**
	 * Converts a RawComponent to a Component
	 */
	static readonly fromRaw: FromRaw<
		RawComponent,
		{
			id: ComponentId;
			locationIds: LocationIds;
			locationEdgeIds: LocationEdgeIds;
		},
		Component
	> = (raw, { id, locationIds, locationEdgeIds }) => {
		const locations = Locations.fromRaw(raw.locations, {
			locationIds,
		});
		return new Component(
			id,
			locations,
			findInitialLocation(locations, raw.locations),
			LocationEdges.fromRaw(raw.edges, {
				locationIds,
				locationEdgeIds,
			}),
			raw.declarations,
			raw.description,
			Position.fromRaw({ x: raw.x ?? defaultX, y: raw.y ?? defaultY }),
			Dimensions.fromRaw({
				width: raw.width ?? defaultWidth,
				height: raw.height ?? defaultHeight,
			}),
			raw.color,
			raw.includeInPeriodicCheck,
		);
	};
}

function setInitialLocation(
	rawInitialLocation: RawLocationId,
	rawLocations: RawLocations,
) {
	if (!rawLocations)
		throw new TypeError("There should always be at least one raw location");
	for (const rawLocation of rawLocations) {
		if (rawLocation.id === rawInitialLocation) {
			rawLocation.type = "INITIAL";
			return rawLocations;
		}
	}
}

function findInitialLocation(
	locations: Locations,
	rawLocations: RawComponent["locations"],
): LocationId {
	const initialLocationsRaw = [];
	for (const location of rawLocations ?? []) {
		if (location.type === "INITIAL") initialLocationsRaw.push(location.id);
	}
	if (initialLocationsRaw.length === 0) {
		const newId = locations.ids.getNewOrderedId(LocationType.NORMAL);
		locations.add(new Location(newId));
		initialLocationsRaw.push(newId.toRaw());
	} else if (initialLocationsRaw.length < 1) {
		//TODO: Make this a user-friendly message with different options for recovering
		throw new TypeError(
			"Cannot load a Component that has more than one initial Locations",
		);
	}

	const initialLocation = locations.ids.get(initialLocationsRaw[0]);
	if (!initialLocation)
		throw new TypeError(
			"This should never happen, the initial location should have been loaded into the Locations store",
		);

	return initialLocation;
}
