import { describe, it, expect } from "vitest";
import { deserializeRaw } from "$lib/classes/projectHandler/zodSerializers";
import { ZodRawLocation } from "$lib/classes/automaton/component/raw/RawLocation";
import { Location } from "$lib/classes/automaton/component/Location";
import { LocationId } from "$lib/classes/automaton/LocationId";
import { ZodRawLocationEdge } from "$lib/classes/automaton/component/raw/RawLocationEdge";
import { LocationEdge } from "$lib/classes/automaton/component/LocationEdge";
import { LocationEdgeId } from "$lib/classes/automaton/LocationEdgeId";
import { ZodRawComponent } from "$lib/classes/automaton/component/raw/RawComponent";
import { Component } from "$lib/classes/automaton/component/Component";
import { LocationIds } from "$lib/classes/automaton/LocationIds";
import { LocationEdgeIds } from "$lib/classes/automaton/LocationEdgeIds";
import { ZodRawSystem } from "$lib/classes/automaton/system/raw/RawSystem";
import { System } from "$lib/classes/automaton/system/System";
import { Query } from "$lib/classes/automaton/Query";
import { SystemId } from "$lib/classes/automaton/system/SystemId";
import { ComponentId } from "$lib/classes/automaton/component/ComponentId";
import { ComponentIds } from "$lib/classes/automaton/component/ComponentIds";
import { ZodRawQuery } from "$lib/classes/automaton/raw/RawQuery";
import { ZodRawGlobalDeclarations } from "$lib/classes/automaton/raw/RawGlobalDeclarations";
import { GlobalDeclarations } from "$lib/classes/automaton/GlobalDeclarations";
import { ZodRawSystemDeclarations } from "$lib/classes/automaton/raw/RawSystemDeclarations";
import { SystemDeclarations } from "$lib/classes/automaton/SystemDeclarations";
import { ZodRawProject } from "$lib/classes/automaton/raw/RawProject";
import { Project } from "$lib/classes/automaton";
import { ProjectId } from "$lib/classes/automaton/ProjectId";
import type { SystemMemberId } from "$lib/classes/automaton/system/SystemMemberId";

describe("Location", () => {
	it("serializes into location", () => {
		const raw = deserializeRaw(ZodRawLocation, locationData);
		const location = Location.fromRaw(raw, { id: new LocationId(raw.id) });
		expect(location.id.toRaw()).toBe(raw.id);
		expect(location.urgency).toBe(raw.urgency);
		expect(location.color).toBe(raw.color);
		expect(location.position.x).toBe(raw.x);
		expect(location.position.y).toBe(raw.y);
		expect(location.type).toBe(raw.type);
		expect(location.nickname?.name).toBe(raw.nickname);
		expect(location.nickname?.position.relativeX).toBe(raw.nicknameX);
		expect(location.nickname?.position.relativeY).toBe(raw.nicknameY);
		expect(location.invariant?.fn).toBe(raw.invariant);
		expect(location.invariant?.position.relativeX).toBe(raw.invariantX);
		expect(location.invariant?.position.relativeY).toBe(raw.invariantY);
	});

	it("serializes and deserializes to the same object", () => {
		const rawOriginal = deserializeRaw(ZodRawLocation, locationData);
		const location = Location.fromRaw(rawOriginal, {
			id: new LocationId(rawOriginal.id),
		});
		const rawSerialized = location.toRaw();
		expect(rawSerialized).toStrictEqual(rawOriginal);
	});
});

describe("Edge", () => {
	it("serializes into an Edge", () => {
		const raw = deserializeRaw(ZodRawLocationEdge, edgeData);
		const edge = LocationEdge.fromRaw(raw, {
			id: new LocationEdgeId(raw.id),
			source: new LocationId(raw.sourceLocation),
			target: new LocationId(raw.targetLocation),
		});
		expect(edge.id.toRaw()).toBe(raw.id);
		expect(edge.sync).toBe(raw.sync);
		expect(edge.group).toBe(raw.group);
		expect(edge.guard).toBe(raw.guard);
		expect(edge.select).toBe(raw.select);
		expect(edge.status).toBe(raw.status);
		expect(edge.update).toBe(raw.update);
		expect(edge.isLocked).toBe(raw.isLocked);
		expect(edge.source.toRaw()).toBe(raw.sourceLocation);
		expect(edge.target.toRaw()).toBe(raw.targetLocation);
		expect(edge.nails.length).toBe(raw.nails?.length);
		expect(edge.nails[0].position.x).toBe(raw.nails?.[0].x);
		expect(edge.nails[0].position.y).toBe(raw.nails?.[0].y);
		expect(edge.nails[0].property.type).toBe(raw.nails?.[0].propertyType);
		expect(edge.nails[0].property.position.relativeX).toBe(
			raw.nails?.[0].propertyX,
		);
		expect(edge.nails[0].property.position.relativeY).toBe(
			raw.nails?.[0].propertyY,
		);
	});

	it("serializes and deserializes to the same object", () => {
		const rawOriginal = deserializeRaw(ZodRawLocationEdge, edgeData);
		const edge = LocationEdge.fromRaw(rawOriginal, {
			id: new LocationEdgeId(rawOriginal.id),
			source: new LocationId(rawOriginal.sourceLocation),
			target: new LocationId(rawOriginal.targetLocation),
		});
		const rawSerialized = edge.toRaw();
		expect(rawSerialized).toStrictEqual(rawOriginal);
	});
});

describe("Component", () => {
	it("serializes into a Component", () => {
		const raw = deserializeRaw(ZodRawComponent, componentData);
		const component = Component.fromRaw(raw, {
			id: new ComponentId(raw.name),
			locationIds: new LocationIds(),
			locationEdgeIds: new LocationEdgeIds(),
		});
		expect(component.id.toRaw()).toBe(raw.name);
		expect(component.declarations).toBe(raw.declarations);
		expect(component.locations.size).toBe(raw.locations?.length ?? 0);
		expect(component.edges.size).toBe(raw.edges?.length ?? 0);
		expect(component.description).toBe(raw.description);
		expect(component.position.x).toBe(raw.x);
		expect(component.position.y).toBe(raw.y);
		expect(component.dimensions.width).toBe(raw.width);
		expect(component.dimensions.height).toBe(raw.height);
		expect(component.color).toBe(raw.color);
		expect(component.includeInPeriodicCheck).toBe(
			raw.includeInPeriodicCheck,
		);
	});

	it("serializes and deserializes to the same object", () => {
		const rawOriginal = deserializeRaw(ZodRawComponent, componentData);
		const component = Component.fromRaw(rawOriginal, {
			id: new ComponentId(rawOriginal.name),
			locationIds: new LocationIds(),
			locationEdgeIds: new LocationEdgeIds(),
		});
		const rawSerialized = component.toRaw();
		expect(rawSerialized).toStrictEqual(rawOriginal);
	});
});

describe("System", () => {
	it("serializes into a system", () => {
		const raw = deserializeRaw(ZodRawSystem, systemData);
		const componentIds = new ComponentIds();
		componentIds.getNewIdFromRaw("Machine");
		componentIds.getNewIdFromRaw("Researcher");
		componentIds.getNewIdFromRaw("HalfAdm1");
		componentIds.getNewIdFromRaw("HalfAdm2");
		const system = System.fromRaw(raw, {
			id: new SystemId(raw.name),
			componentIds,
		});
		expect(system.id.toRaw()).toBe(raw.name);
		expect(system.description).toBe(raw.description);
		expect(system.position.x).toBe(raw.x);
		expect(system.position.y).toBe(raw.y);
		expect(system.color).toBe(raw.color);
		expect(system.systemRootX).toBe(raw.systemRootX);
		expect(system.componentInstances.size).toBe(
			raw.componentInstances?.length,
		);
		const componentInstanceId = system.componentInstances.ids.get(1);
		expect(componentInstanceId).toBeDefined();
		if (!componentInstanceId)
			throw new Error("This should have been caught by a test");
		const componentInstance =
			system.componentInstances.get(componentInstanceId);
		expect(componentInstance).toBeDefined();
		if (!componentInstance)
			throw new Error("This should have been caught by a test");
		expect(componentInstance.component.toRaw()).toBe(
			raw.componentInstances?.[0].componentName,
		);
		expect(componentInstance.id.toRaw()).toBe(
			raw.componentInstances?.[0].id,
		);
		expect(componentInstance.position.x).toBe(
			raw.componentInstances?.[0].x,
		);
		expect(componentInstance.position.y).toBe(
			raw.componentInstances?.[0].y,
		);
		expect(system.operators.size).toBe(raw.operators?.length);
		const operatorId = system.operators.ids.get(2);
		expect(operatorId).toBeDefined();
		if (!operatorId) throw new Error("Make typescript happy");
		const operator = system.operators.get(operatorId);
		expect(operator).toBeDefined();
		expect(operator?.id.toRaw()).toBe(raw.operators?.[0].id);
		expect(operator?.position.x).toBe(raw.operators?.[0].x);
		expect(operator?.position.y).toBe(raw.operators?.[0].y);
		expect(operator?.type.toLowerCase()).toBe(raw.operators?.[0].type);
		expect(system.edges.length).toBe(raw.edges?.length);
		expect((system.edges[1].parent as SystemMemberId).toRaw()).toBe(
			raw.edges?.[1].parent,
		);
		expect(system.edges[1].child.toRaw()).toBe(raw.edges?.[1].child);
	});

	it("serializes and deserializes to the same object", () => {
		const rawOriginal = deserializeRaw(ZodRawSystem, systemData);
		const componentIds = new ComponentIds();
		componentIds.getNewIdFromRaw("Machine");
		componentIds.getNewIdFromRaw("Researcher");
		componentIds.getNewIdFromRaw("HalfAdm1");
		componentIds.getNewIdFromRaw("HalfAdm2");
		const system = System.fromRaw(rawOriginal, {
			id: new SystemId(rawOriginal.name),
			componentIds,
		});
		const rawSerialized = system.toRaw();
		expect(rawSerialized).toStrictEqual(rawOriginal);
	});
});

describe("Query", () => {
	it("serializes into a query", () => {
		for (const queryData of queriesData) {
			const raw = deserializeRaw(ZodRawQuery, queryData);
			const query = Query.fromRaw(raw);

			expect(query.query).toBe(raw.query);
			expect(query.comment).toBe(raw.comment);
			expect(query.isPeriodic).toBe(raw.isPeriodic);
		}
	});

	it("serializes and deserializes to the same object", () => {
		for (const queryData of queriesData) {
			const rawOriginal = deserializeRaw(ZodRawQuery, queryData);
			const query = Query.fromRaw(rawOriginal);
			const rawSerialized = query.toRaw();
			expect(rawSerialized).toStrictEqual(rawOriginal);
		}
	});
});

describe("GlobalDeclarations", () => {
	it("serializes into declarations", () => {
		const raw = deserializeRaw(
			ZodRawGlobalDeclarations,
			globalDeclarationsData,
		);
		const globalDeclarations = GlobalDeclarations.fromRaw(raw);

		expect(globalDeclarations.declarations).toBe(raw?.declarations);
	});

	it("serializes and deserializes to the same object", () => {
		const rawOriginal = deserializeRaw(
			ZodRawGlobalDeclarations,
			globalDeclarationsData,
		);
		const globalDeclarations = GlobalDeclarations.fromRaw(rawOriginal);
		const rawSerialized = globalDeclarations.toRaw();
		expect(rawSerialized).toStrictEqual(rawOriginal);
	});
});

describe("SystemDeclarations", () => {
	it("serializes into declarations", () => {
		const raw = deserializeRaw(
			ZodRawSystemDeclarations,
			systemDeclarationsData,
		);
		const systemDeclarations = SystemDeclarations.fromRaw(raw);

		expect(systemDeclarations.declarations).toBe(raw?.declarations);
	});

	it("serializes and deserializes to the same object", () => {
		const rawOriginal = deserializeRaw(
			ZodRawSystemDeclarations,
			systemDeclarationsData,
		);
		const systemDeclarations = SystemDeclarations.fromRaw(rawOriginal);
		const rawSerialized = systemDeclarations.toRaw();
		expect(rawSerialized).toStrictEqual(rawOriginal);
	});
});

describe("Project", () => {
	it("serializes into a Project", () => {
		const raw = deserializeRaw(ZodRawProject, projectData);
		const project = Project.fromRaw(raw, {
			id: new ProjectId(raw.name ?? 1),
		});
		expect(project.id.toRaw()).toBe(raw.name);
	});

	it("serializes and deserializes to the same object", () => {
		const rawOriginal = deserializeRaw(ZodRawProject, projectData);
		const project = Project.fromRaw(rawOriginal, {
			id: new ProjectId(rawOriginal.name ?? 1),
		});
		const rawSerialized = project.toRaw();
		expect(rawSerialized).toStrictEqual(rawOriginal);
	});
});

/*******************************\
 *           DATA              * 
\*******************************/

const locationData = JSON.stringify({
	id: "UL5",
	nickname: "nickname",
	invariant: "invariant",
	type: "UNIVERSAL",
	urgency: "NORMAL",
	x: 140.0,
	y: 100.0,
	color: "7",
	nicknameX: 30.0,
	nicknameY: -10.0,
	invariantX: 20.0,
	invariantY: 10.0,
});

const edgeData = JSON.stringify({
	id: "E20",
	group: "group",
	sourceLocation: "L19",
	targetLocation: "L8",
	status: "OUTPUT",
	select: "select",
	guard: "y \u003e\u003d 4",
	update: "update",
	sync: "cof",
	isLocked: false,
	nails: [
		{
			x: 150.0,
			y: 380.0,
			propertyType: "GUARD",
			propertyX: -60.0,
			propertyY: -10.0,
		},
		{
			x: 156.0,
			y: 350.0,
			propertyType: "SYNCHRONIZATION",
			propertyX: -50.0,
			propertyY: -20.0,
		},
	],
});

const componentData = JSON.stringify({
	name: "Machine",
	declarations: "clock y;",
	locations: [
		{
			id: "L4",
			nickname: "",
			invariant: "y\u003c\u003d6",
			type: "NORMAL",
			urgency: "NORMAL",
			x: 140.0,
			y: 300.0,
			color: "7",
			nicknameX: 30.0,
			nicknameY: -10.0,
			invariantX: 30.0,
			invariantY: -10.0,
		},
		{
			id: "L5",
			nickname: "",
			invariant: "",
			type: "INITIAL",
			urgency: "NORMAL",
			x: 140.0,
			y: 100.0,
			color: "7",
			nicknameX: 30.0,
			nicknameY: -10.0,
			invariantX: 30.0,
			invariantY: 10.0,
		},
	],
	edges: [
		{
			id: "E25",
			group: "",
			sourceLocation: "L4",
			targetLocation: "L5",
			status: "OUTPUT",
			select: "",
			guard: "y\u003e\u003d4",
			update: "",
			sync: "cof",
			isLocked: false,
			nails: [
				{
					x: 100.0,
					y: 230.0,
					propertyType: "GUARD",
					propertyX: -70.0,
					propertyY: -10.0,
				},
				{
					x: 100.0,
					y: 180.0,
					propertyType: "SYNCHRONIZATION",
					propertyX: -70.0,
					propertyY: -10.0,
				},
			],
		},
		{
			id: "E26",
			group: "",
			sourceLocation: "L4",
			targetLocation: "L5",
			status: "OUTPUT",
			select: "",
			guard: "",
			update: "",
			sync: "tea",
			isLocked: false,
			nails: [
				{
					x: 210.0,
					y: 200.0,
					propertyType: "SYNCHRONIZATION",
					propertyX: 20.0,
					propertyY: -10.0,
				},
			],
		},
		{
			id: "E27",
			group: "",
			sourceLocation: "L5",
			targetLocation: "L4",
			status: "INPUT",
			select: "",
			guard: "",
			update: "y\u003d0",
			sync: "coin",
			isLocked: false,
			nails: [
				{
					x: 140.0,
					y: 220.0,
					propertyType: "SYNCHRONIZATION",
					propertyX: 20.0,
					propertyY: -10.0,
				},
				{
					x: 140.0,
					y: 190.0,
					propertyType: "UPDATE",
					propertyX: 10.0,
					propertyY: -10.0,
				},
			],
		},
		{
			id: "E28",
			group: "",
			sourceLocation: "L4",
			targetLocation: "L4",
			status: "INPUT",
			select: "",
			guard: "",
			update: "",
			sync: "coin",
			isLocked: false,
			nails: [
				{
					x: 130.0,
					y: 350.0,
					propertyType: "SYNCHRONIZATION",
					propertyX: -60.0,
					propertyY: -10.0,
				},
				{
					x: 160.0,
					y: 350.0,
					propertyType: "NONE",
					propertyX: 0.0,
					propertyY: 0.0,
				},
			],
		},
		{
			id: "E29",
			group: "g",
			sourceLocation: "L5",
			targetLocation: "L5",
			status: "OUTPUT",
			select: "s",
			guard: "y\u003e\u003d2",
			update: "u",
			sync: "tea",
			isLocked: false,
			nails: [
				{
					x: 170.0,
					y: 60.0,
					propertyType: "GUARD",
					propertyX: 10.0,
					propertyY: -20.0,
				},
				{
					x: 140.0,
					y: 60.0,
					propertyType: "SYNCHRONIZATION",
					propertyX: -20.0,
					propertyY: -30.0,
				},
			],
		},
	],
	description: "",
	x: 6.0,
	y: 5.0,
	width: 300.0,
	height: 390.0,
	color: "7",
	includeInPeriodicCheck: false,
});

const systemData = JSON.stringify({
	name: "UniversityExample",
	description: "da",
	x: 4.0,
	y: 5.0,
	width: 540.0,
	height: 410.0,
	color: "5",
	systemRootX: 240.0,
	componentInstances: [
		{
			id: 1,
			componentName: "Machine",
			x: 10.0,
			y: 110.0,
		},
		{
			id: 3,
			componentName: "Researcher",
			x: 310.0,
			y: 110.0,
		},
		{
			id: 5,
			componentName: "HalfAdm1",
			x: 10.0,
			y: 280.0,
		},
		{
			id: 6,
			componentName: "HalfAdm2",
			x: 310.0,
			y: 280.0,
		},
	],
	operators: [
		{
			id: 2,
			type: "composition",
			x: 250.0,
			y: 60.0,
		},
		{
			id: 4,
			type: "conjunction",
			x: 224159.0,
			y: 21523.0,
		},
		{
			id: 10,
			type: "simple",
			x: 223123.0,
			y: 2.0,
		},
		{
			id: 12,
			type: "refinement",
			x: 21453.0,
			y: 2315.0,
		},
		{
			id: 13,
			type: "quotient",
			x: 2252.0,
			y: 241.0,
		},
	],
	edges: [
		{
			child: 2,
			parent: 0,
		},
		{
			child: 1,
			parent: 2,
		},
		{
			child: 3,
			parent: 2,
		},
		{
			child: 4,
			parent: 2,
		},
		{
			child: 5,
			parent: 4,
		},
		{
			child: 6,
			parent: 4,
		},
	],
});

const queriesData = [
	JSON.stringify({
		query: "specification: (Administration || Machine || Researcher)",
		comment: "",
		isPeriodic: false,
		backend: 1,
	}),
	JSON.stringify({
		query: "specification: Spec",
		comment: "",
		isPeriodic: false,
		backend: 1,
	}),
	JSON.stringify({
		query: "consistency: (Administration || Machine || Researcher)",
		comment: "",
		isPeriodic: false,
		backend: 1,
	}),
	JSON.stringify({
		query: "consistency: (Administration || Machine || Researcher)",
		comment: "",
		isPeriodic: false,
		backend: 1,
	}),
	JSON.stringify({
		query: "refinement: (Administration || Machine || Researcher) \u003c\u003d Spec",
		comment: "",
		isPeriodic: false,
		backend: 1,
	}),
	JSON.stringify({
		query: "refinement: Machine3 \u003c\u003d Machine3",
		comment: "",
		isPeriodic: false,
		backend: 1,
	}),
	JSON.stringify({
		query: "refinement: (HalfAdm1 \u0026\u0026 HalfAdm2) \u003c\u003d Adm2",
		comment: "",
		isPeriodic: false,
		backend: 1,
	}),
	JSON.stringify({
		query: "refinement: Adm2 \u003c\u003d (HalfAdm1 \u0026\u0026 HalfAdm2)",
		comment: "",
		isPeriodic: false,
		backend: 1,
	}),
];

const globalDeclarationsData = JSON.stringify({
	name: "Global Declarations",
	declarations: "broadcast chan pub, grant, patent, coin, tea, cof;",
});

const systemDeclarationsData = JSON.stringify({
	name: "System Declarations",
	declarations: "broadcast chan pub, grant, patent, coin, tea, cof;",
});

const projectData = JSON.stringify({
	name: "Example project",
	components: [
		{
			name: "Administration 1",
			declarations: "clock z;",
			locations: [
				{
					id: "L0",
					nickname: "",
					invariant: "",
					type: "INITIAL",
					urgency: "NORMAL",
					x: 130.0,
					y: 100.0,
					color: "5",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
				{
					id: "L1",
					nickname: "",
					invariant: "z \u003c\u003d 2",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 310.0,
					y: 100.0,
					color: "5",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 50.0,
					invariantY: -40.0,
				},
				{
					id: "L2",
					nickname: "",
					invariant: "",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 310.0,
					y: 300.0,
					color: "5",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
				{
					id: "L3",
					nickname: "",
					invariant: "z\u003c\u003d2",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 130.0,
					y: 300.0,
					color: "5",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 20.0,
					invariantY: 20.0,
				},
			],
			edges: [
				{
					id: "E44",
					group: "",
					sourceLocation: "L0",
					targetLocation: "L1",
					status: "INPUT",
					select: "",
					guard: "",
					update: "z\u003d0",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 180.0,
							y: 100.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -20.0,
							propertyY: -30.0,
						},
						{
							x: 230.0,
							y: 100.0,
							propertyType: "UPDATE",
							propertyX: -20.0,
							propertyY: -30.0,
						},
					],
				},
				{
					id: "E45",
					group: "",
					sourceLocation: "L1",
					targetLocation: "L2",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 310.0,
							y: 190.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -10.0,
						},
					],
				},
				{
					id: "E46",
					group: "",
					sourceLocation: "L2",
					targetLocation: "L3",
					status: "INPUT",
					select: "",
					guard: "",
					update: "z\u003d0",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 250.0,
							y: 300.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -20.0,
							propertyY: -40.0,
						},
						{
							x: 200.0,
							y: 300.0,
							propertyType: "UPDATE",
							propertyX: -20.0,
							propertyY: -40.0,
						},
					],
				},
				{
					id: "E47",
					group: "",
					sourceLocation: "L3",
					targetLocation: "L0",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "patent",
					isLocked: false,
					nails: [
						{
							x: 130.0,
							y: 200.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -10.0,
						},
					],
				},
				{
					id: "E48",
					group: "",
					sourceLocation: "L1",
					targetLocation: "L1",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 310.0,
							y: 60.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -20.0,
						},
						{
							x: 290.0,
							y: 60.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E49",
					group: "",
					sourceLocation: "L1",
					targetLocation: "L1",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 350.0,
							y: 100.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -10.0,
						},
						{
							x: 350.0,
							y: 120.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E50",
					group: "",
					sourceLocation: "L2",
					targetLocation: "L2",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 350.0,
							y: 300.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -20.0,
							propertyY: -40.0,
						},
						{
							x: 350.0,
							y: 320.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E51",
					group: "",
					sourceLocation: "L3",
					targetLocation: "L3",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 130.0,
							y: 340.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -20.0,
							propertyY: 10.0,
						},
						{
							x: 110.0,
							y: 340.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E52",
					group: "",
					sourceLocation: "L3",
					targetLocation: "L3",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 90.0,
							y: 280.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -50.0,
							propertyY: -20.0,
						},
						{
							x: 90.0,
							y: 300.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
			],
			description: "",
			x: 569.0,
			y: 407.0,
			width: 450.0,
			height: 400.0,
			color: "5",
			includeInPeriodicCheck: false,
		},
		{
			name: "Administration 2",
			declarations: "clock x, y;",
			locations: [
				{
					id: "L20",
					nickname: "",
					invariant: "",
					type: "INITIAL",
					urgency: "NORMAL",
					x: 91.0,
					y: 91.0,
					color: "0",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
				{
					id: "L21",
					nickname: "",
					invariant: "y \u003c\u003d 2",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 321.0,
					y: 91.0,
					color: "0",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: -17.0,
					invariantY: -39.0,
				},
				{
					id: "L22",
					nickname: "",
					invariant: "x \u003c\u003d 2",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 91.0,
					y: 281.0,
					color: "0",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: -15.0,
					invariantY: 19.0,
				},
				{
					id: "L23",
					nickname: "",
					invariant: "x \u003c\u003d 2 \u0026\u0026 y \u003c\u003d 2",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 331.0,
					y: 281.0,
					color: "0",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 23.0,
					invariantY: -7.0,
				},
			],
			edges: [
				{
					id: "E53",
					group: "",
					sourceLocation: "L20",
					targetLocation: "L21",
					status: "INPUT",
					select: "",
					guard: "",
					update: "y \u003d 0",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 172.0,
							y: 70.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -12.0,
							propertyY: -28.0,
						},
						{
							x: 241.0,
							y: 70.0,
							propertyType: "UPDATE",
							propertyX: -14.659394792399718,
							propertyY: -25.0,
						},
					],
				},
				{
					id: "E54",
					group: "",
					sourceLocation: "L21",
					targetLocation: "L20",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "patent",
					isLocked: false,
					nails: [
						{
							x: 209.0,
							y: 124.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -19.010907811400422,
							propertyY: 8.335151301900071,
						},
					],
				},
				{
					id: "E55",
					group: "",
					sourceLocation: "L21",
					targetLocation: "L21",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 363.0,
							y: 67.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -10.0,
						},
						{
							x: 370.0,
							y: 86.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E56",
					group: "",
					sourceLocation: "L21",
					targetLocation: "L23",
					status: "INPUT",
					select: "",
					guard: "",
					update: "x \u003d 0",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 367.0,
							y: 136.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -10.0,
						},
						{
							x: 367.0,
							y: 208.0,
							propertyType: "UPDATE",
							propertyX: 10.0,
							propertyY: -10.0,
						},
					],
				},
				{
					id: "E57",
					group: "",
					sourceLocation: "L23",
					targetLocation: "L21",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 272.0,
							y: 184.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -38.0,
							propertyY: -7.0,
						},
					],
				},
				{
					id: "E58",
					group: "",
					sourceLocation: "L23",
					targetLocation: "L23",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 370.0,
							y: 310.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -10.0,
						},
						{
							x: 354.0,
							y: 325.33515130190005,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E59",
					group: "",
					sourceLocation: "L23",
					targetLocation: "L23",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 316.692118226601,
							y: 324.98909218859956,
							propertyType: "SYNCHRONIZATION",
							propertyX: -15.0,
							propertyY: 10.0,
						},
						{
							x: 297.692118226601,
							y: 311.98909218859956,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E60",
					group: "",
					sourceLocation: "L23",
					targetLocation: "L22",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "patent",
					isLocked: false,
					nails: [
						{
							x: 213.0,
							y: 255.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -18.0,
							propertyY: -26.0,
						},
					],
				},
				{
					id: "E61",
					group: "",
					sourceLocation: "L22",
					targetLocation: "L23",
					status: "INPUT",
					select: "",
					guard: "",
					update: "y \u003d 0",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 173.0,
							y: 305.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -11.0,
							propertyY: 9.0,
						},
						{
							x: 240.0,
							y: 305.0,
							propertyType: "UPDATE",
							propertyX: -13.0,
							propertyY: 10.0,
						},
					],
				},
				{
					id: "E62",
					group: "",
					sourceLocation: "L22",
					targetLocation: "L22",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 47.0,
							y: 270.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -16.0,
							propertyY: -24.0,
						},
						{
							x: 47.0,
							y: 301.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E63",
					group: "",
					sourceLocation: "L22",
					targetLocation: "L20",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 158.0,
							y: 186.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -10.0,
						},
					],
				},
				{
					id: "E64",
					group: "",
					sourceLocation: "L20",
					targetLocation: "L22",
					status: "INPUT",
					select: "",
					guard: "",
					update: "x \u003d 0",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 44.0,
							y: 135.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 11.0,
							propertyY: -3.0,
						},
						{
							x: 44.0,
							y: 204.0,
							propertyType: "UPDATE",
							propertyX: 11.0,
							propertyY: -8.0,
						},
					],
				},
			],
			description: "",
			x: 635.0,
			y: 416.0,
			width: 450.0,
			height: 381.0,
			color: "0",
			includeInPeriodicCheck: true,
		},
		{
			name: "Coffee Machine 1",
			declarations: "",
			locations: [
				{
					id: "L10",
					nickname: "",
					invariant: "",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 110.0,
					y: 150.0,
					color: "3",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
				{
					id: "L11",
					nickname: "",
					invariant: "",
					type: "INITIAL",
					urgency: "NORMAL",
					x: 110.0,
					y: 100.0,
					color: "3",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
			],
			edges: [
				{
					id: "E21",
					group: "",
					sourceLocation: "L11",
					targetLocation: "L10",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 150.0,
							y: 100.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 20.0,
							propertyY: -7.5,
						},
					],
				},
				{
					id: "E22",
					group: "",
					sourceLocation: "L10",
					targetLocation: "L10",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 90.0,
							y: 205.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -45.0,
							propertyY: -7.5,
						},
						{
							x: 130.0,
							y: 205.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E23",
					group: "",
					sourceLocation: "L11",
					targetLocation: "L11",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "tea",
					isLocked: false,
					nails: [
						{
							x: 130.0,
							y: 55.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 20.0,
							propertyY: -7.5,
						},
						{
							x: 85.0,
							y: 55.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E24",
					group: "",
					sourceLocation: "L10",
					targetLocation: "L11",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "cof",
					isLocked: false,
					nails: [
						{
							x: 61.0,
							y: 101.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -45.0,
							propertyY: -7.5,
						},
					],
				},
			],
			description: "",
			x: 438.0,
			y: 487.0,
			width: 230.0,
			height: 240.0,
			color: "3",
			includeInPeriodicCheck: false,
		},
		{
			name: "Coffee Machine 2",
			declarations: "clock y;",
			locations: [
				{
					id: "L8",
					nickname: "",
					invariant: "",
					type: "INITIAL",
					urgency: "NORMAL",
					x: 125.0,
					y: 77.0,
					color: "4",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
				{
					id: "L19",
					nickname: "",
					invariant: "y \u003c\u003d 5",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 125.0,
					y: 220.0,
					color: "4",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 1.0,
					invariantY: 30.0,
				},
			],
			edges: [
				{
					id: "E17",
					group: "",
					sourceLocation: "L8",
					targetLocation: "L19",
					status: "INPUT",
					select: "",
					guard: "",
					update: "y \u003d 0",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 165.0,
							y: 127.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 18.0,
							propertyY: -7.5,
						},
						{
							x: 165.0,
							y: 178.0,
							propertyType: "UPDATE",
							propertyX: 20.0,
							propertyY: -9.0,
						},
					],
				},
				{
					id: "E18",
					group: "",
					sourceLocation: "L19",
					targetLocation: "L19",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 204.0,
							y: 220.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -10.0,
						},
						{
							x: 204.0,
							y: 255.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E19",
					group: "",
					sourceLocation: "L8",
					targetLocation: "L8",
					status: "OUTPUT",
					select: "",
					guard: "y \u003e\u003d 2",
					update: "",
					sync: "tea",
					isLocked: false,
					nails: [
						{
							x: 209.0,
							y: 77.0,
							propertyType: "GUARD",
							propertyX: 10.0,
							propertyY: -10.0,
						},
						{
							x: 209.0,
							y: 42.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: 10.0,
							propertyY: -10.0,
						},
						{
							x: 168.0,
							y: 42.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E20",
					group: "",
					sourceLocation: "L19",
					targetLocation: "L8",
					status: "OUTPUT",
					select: "",
					guard: "y \u003e\u003d 4",
					update: "",
					sync: "cof",
					isLocked: false,
					nails: [
						{
							x: 75.0,
							y: 176.0,
							propertyType: "GUARD",
							propertyX: -50.0,
							propertyY: -8.0,
						},
						{
							x: 75.0,
							y: 127.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -44.0,
							propertyY: -8.0,
						},
					],
				},
			],
			description: "",
			x: 407.0,
			y: 456.0,
			width: 292.0,
			height: 301.0,
			color: "4",
			includeInPeriodicCheck: false,
		},
		{
			name: "Coffee Machine 3",
			declarations: "clock y;",
			locations: [
				{
					id: "L4",
					nickname: "",
					invariant: "y\u003c\u003d6",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 111.5,
					y: 286.5,
					color: "7",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 29.5,
					invariantY: -7.5,
				},
				{
					id: "L5",
					nickname: "",
					invariant: "",
					type: "INITIAL",
					urgency: "NORMAL",
					x: 111.5,
					y: 86.5,
					color: "7",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
			],
			edges: [
				{
					id: "E1",
					group: "",
					sourceLocation: "L4",
					targetLocation: "L5",
					status: "OUTPUT",
					select: "",
					guard: "y\u003e\u003d4",
					update: "",
					sync: "cof",
					isLocked: false,
					nails: [
						{
							x: 67.5,
							y: 214.5,
							propertyType: "GUARD",
							propertyX: -50.0,
							propertyY: -7.5,
						},
						{
							x: 67.5,
							y: 164.5,
							propertyType: "SYNCHRONIZATION",
							propertyX: -44.0,
							propertyY: -7.5,
						},
					],
				},
				{
					id: "E2",
					group: "",
					sourceLocation: "L4",
					targetLocation: "L5",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "tea",
					isLocked: false,
					nails: [
						{
							x: 155.5,
							y: 241.5,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
						{
							x: 168.5,
							y: 190.5,
							propertyType: "SYNCHRONIZATION",
							propertyX: 14.5,
							propertyY: -7.5,
						},
						{
							x: 155.5,
							y: 137.5,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E3",
					group: "",
					sourceLocation: "L5",
					targetLocation: "L4",
					status: "INPUT",
					select: "",
					guard: "",
					update: "y\u003d0",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 111.5,
							y: 206.5,
							propertyType: "SYNCHRONIZATION",
							propertyX: 12.0,
							propertyY: -7.0,
						},
						{
							x: 111.5,
							y: 176.0,
							propertyType: "UPDATE",
							propertyX: 10.0,
							propertyY: -10.0,
						},
					],
				},
				{
					id: "E4",
					group: "",
					sourceLocation: "L4",
					targetLocation: "L4",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 96.5,
							y: 331.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -45.0,
							propertyY: -7.5,
						},
						{
							x: 127.0,
							y: 331.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E5",
					group: "",
					sourceLocation: "L5",
					targetLocation: "L5",
					status: "OUTPUT",
					select: "",
					guard: "y\u003c0",
					update: "",
					sync: "tea",
					isLocked: false,
					nails: [
						{
							x: 133.0,
							y: 43.5,
							propertyType: "GUARD",
							propertyX: 17.0,
							propertyY: -8.0,
						},
						{
							x: 93.0,
							y: 43.5,
							propertyType: "SYNCHRONIZATION",
							propertyX: -38.0,
							propertyY: -8.0,
						},
					],
				},
			],
			description: "",
			x: 443.0,
			y: 429.0,
			width: 220.0,
			height: 356.0,
			color: "7",
			includeInPeriodicCheck: false,
		},
		{
			name: "Half Administration 1",
			declarations: "clock x;",
			locations: [
				{
					id: "L12",
					nickname: "",
					invariant: "",
					type: "INITIAL",
					urgency: "NORMAL",
					x: 70.0,
					y: 118.0,
					color: "2",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
				{
					id: "L13",
					nickname: "",
					invariant: "x\u003c\u003d2",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 243.0,
					y: 119.0,
					color: "2",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: -37.0,
					invariantY: -33.0,
				},
			],
			edges: [
				{
					id: "E37",
					group: "",
					sourceLocation: "L12",
					targetLocation: "L13",
					status: "INPUT",
					select: "",
					guard: "",
					update: "x\u003d0",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 134.0,
							y: 141.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -14.0,
							propertyY: 9.0,
						},
						{
							x: 179.0,
							y: 141.0,
							propertyType: "UPDATE",
							propertyX: -12.0,
							propertyY: 9.0,
						},
					],
				},
				{
					id: "E38",
					group: "",
					sourceLocation: "L13",
					targetLocation: "L12",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 180.0,
							y: 100.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
						{
							x: 136.0,
							y: 98.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -14.0,
							propertyY: -24.0,
						},
					],
				},
				{
					id: "E39",
					group: "",
					sourceLocation: "L13",
					targetLocation: "L13",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "patent",
					isLocked: false,
					nails: [
						{
							x: 253.0,
							y: 56.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -18.0,
							propertyY: -24.0,
						},
						{
							x: 279.0,
							y: 71.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E40",
					group: "",
					sourceLocation: "L13",
					targetLocation: "L13",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 301.0,
							y: 105.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -11.0,
							propertyY: -25.0,
						},
						{
							x: 301.0,
							y: 135.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E41",
					group: "",
					sourceLocation: "L13",
					targetLocation: "L13",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 247.89868147120055,
							y: 176.73421235253295,
							propertyType: "SYNCHRONIZATION",
							propertyX: -13.0,
							propertyY: 9.0,
						},
						{
							x: 277.0,
							y: 160.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E42",
					group: "",
					sourceLocation: "L12",
					targetLocation: "L12",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 60.0,
							y: 58.0,
							propertyType: "SYNCHRONIZATION",
							propertyX: -10.0,
							propertyY: -27.0,
						},
						{
							x: 27.0,
							y: 78.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E43",
					group: "",
					sourceLocation: "L12",
					targetLocation: "L12",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "patent",
					isLocked: false,
					nails: [
						{
							x: 61.36710617626648,
							y: 177.06315058986814,
							propertyType: "SYNCHRONIZATION",
							propertyX: -17.0,
							propertyY: 9.0,
						},
						{
							x: 26.0,
							y: 155.0,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
			],
			description: "",
			x: 556.0,
			y: 497.0,
			width: 329.0,
			height: 220.0,
			color: "2",
			includeInPeriodicCheck: false,
		},
		{
			name: "Half Administration 2",
			declarations: "clock y;",
			locations: [
				{
					id: "L14",
					nickname: "",
					invariant: "",
					type: "INITIAL",
					urgency: "NORMAL",
					x: 76.89114489105513,
					y: 119.0376235539684,
					color: "1",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
				{
					id: "L15",
					nickname: "",
					invariant: "y\u003c\u003d2",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 261.8374549289125,
					y: 119.90830522533889,
					color: "1",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: -40.190012356271055,
					invariantY: -34.49605273874029,
				},
			],
			edges: [
				{
					id: "E30",
					group: "",
					sourceLocation: "L14",
					targetLocation: "L15",
					status: "INPUT",
					select: "",
					guard: "",
					update: "y\u003d0",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 142.66233599965273,
							y: 141.40845647420008,
							propertyType: "SYNCHRONIZATION",
							propertyX: -8.372039554055217,
							propertyY: 10.042224968060236,
						},
						{
							x: 189.4275275917933,
							y: 142.45857596477973,
							propertyType: "UPDATE",
							propertyX: -11.712410382065254,
							propertyY: 7.815311082720207,
						},
					],
				},
				{
					id: "E31",
					group: "",
					sourceLocation: "L15",
					targetLocation: "L14",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "patent",
					isLocked: false,
					nails: [
						{
							x: 190.9893984400012,
							y: 96.26909353541649,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
						{
							x: 144.97369982111329,
							y: 95.73560934069943,
							propertyType: "SYNCHRONIZATION",
							propertyX: -17.153020191234617,
							propertyY: -27.2585826113852,
						},
					],
				},
				{
					id: "E32",
					group: "",
					sourceLocation: "L15",
					targetLocation: "L15",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 274.74777218976817,
							y: 175.58115235883952,
							propertyType: "SYNCHRONIZATION",
							propertyX: -14.348265350529463,
							propertyY: 11.155681910730248,
						},
						{
							x: 298.1092555018084,
							y: 158.83707325072905,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E33",
					group: "",
					sourceLocation: "L15",
					targetLocation: "L15",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 318.1092555018084,
							y: 109.45270297499508,
							propertyType: "SYNCHRONIZATION",
							propertyX: -11.813536603056452,
							propertyY: -29.54883394881558,
						},
						{
							x: 318.4381828479714,
							y: 135.13388825093105,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E34",
					group: "",
					sourceLocation: "L15",
					targetLocation: "L15",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 274.48608423897133,
							y: 63.68706776293859,
							propertyType: "SYNCHRONIZATION",
							propertyX: -16.124013184685072,
							propertyY: -27.697180385037715,
						},
						{
							x: 299.98169335779573,
							y: 75.7917429432573,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E35",
					group: "",
					sourceLocation: "L14",
					targetLocation: "L14",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 66.4508256860921,
							y: 176.24719226370794,
							propertyType: "SYNCHRONIZATION",
							propertyX: -16.51439543828484,
							propertyY: 10.263631624674183,
						},
						{
							x: 34.507844945498945,
							y: 156.0804241865535,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E36",
					group: "",
					sourceLocation: "L14",
					targetLocation: "L14",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "coin",
					isLocked: false,
					nails: [
						{
							x: 70.9349255784252,
							y: 62.04308398261528,
							propertyType: "SYNCHRONIZATION",
							propertyX: -12.676625902434262,
							propertyY: -26.05200707028724,
						},
						{
							x: 35.32953248148583,
							y: 81.1907352204371,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
			],
			description: "",
			x: 682.0,
			y: 487.0,
			width: 355.0582859210015,
			height: 239.44828437149366,
			color: "1",
			includeInPeriodicCheck: false,
		},
		{
			name: "Researcher",
			declarations: "clock x;",
			locations: [
				{
					id: "L6",
					nickname: "",
					invariant: "",
					type: "INITIAL",
					urgency: "NORMAL",
					x: 296,
					y: 97,
					color: "8",
					nicknameX: 30,
					nicknameY: -10,
					invariantX: 30,
					invariantY: 10,
				},
				{
					id: "L7",
					nickname: "",
					invariant: "x <= 8",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 297,
					y: 233,
					color: "8",
					nicknameX: 30,
					nicknameY: -10,
					invariantX: -15,
					invariantY: 17,
				},
				{
					id: "L9",
					nickname: "",
					invariant: "x<=4",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 89,
					y: 96,
					color: "8",
					nicknameX: 30,
					nicknameY: -10,
					invariantX: 13,
					invariantY: 15,
				},
				{
					id: "U24",
					nickname: "",
					invariant: "",
					type: "UNIVERSAL",
					urgency: "NORMAL",
					x: 429,
					y: 97,
					color: "8",
					nicknameX: 30,
					nicknameY: -10,
					invariantX: 30,
					invariantY: 10,
				},
			],
			edges: [
				{
					id: "E6",
					group: "",
					sourceLocation: "L9",
					targetLocation: "L9",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "cof",
					isLocked: false,
					nails: [
						{
							x: 49,
							y: 76,
							propertyType: "SYNCHRONIZATION",
							propertyX: -35,
							propertyY: -9,
						},
						{
							x: 49,
							y: 96,
							propertyType: "NONE",
							propertyX: 0,
							propertyY: 0,
						},
					],
				},
				{
					id: "E7",
					group: "",
					sourceLocation: "L9",
					targetLocation: "L9",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "tea",
					isLocked: false,
					nails: [
						{
							x: 69,
							y: 136,
							propertyType: "SYNCHRONIZATION",
							propertyX: -12,
							propertyY: 10,
						},
						{
							x: 89,
							y: 136,
							propertyType: "NONE",
							propertyX: 0,
							propertyY: 0,
						},
					],
				},
				{
					id: "E8",
					group: "",
					sourceLocation: "L7",
					targetLocation: "L7",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "cof",
					isLocked: false,
					nails: [
						{
							x: 255,
							y: 255,
							propertyType: "SYNCHRONIZATION",
							propertyX: -33,
							propertyY: -8,
						},
						{
							x: 256,
							y: 233,
							propertyType: "NONE",
							propertyX: 0,
							propertyY: 0,
						},
					],
				},
				{
					id: "E9",
					group: "",
					sourceLocation: "L7",
					targetLocation: "L7",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "tea",
					isLocked: false,
					nails: [
						{
							x: 337,
							y: 253,
							propertyType: "SYNCHRONIZATION",
							propertyX: 12,
							propertyY: -7,
						},
						{
							x: 337,
							y: 233,
							propertyType: "NONE",
							propertyX: 0,
							propertyY: 0,
						},
					],
				},
				{
					id: "E10",
					group: "",
					sourceLocation: "L6",
					targetLocation: "L9",
					status: "INPUT",
					select: "",
					guard: "",
					update: "x=0",
					sync: "cof",
					isLocked: false,
					nails: [
						{
							x: 226,
							y: 108,
							propertyType: "SYNCHRONIZATION",
							propertyX: -21,
							propertyY: 10,
						},
						{
							x: 157,
							y: 108,
							propertyType: "UPDATE",
							propertyX: -0,
							propertyY: 9,
						},
					],
				},
				{
					id: "E11",
					group: "",
					sourceLocation: "L6",
					targetLocation: "L7",
					status: "INPUT",
					select: "",
					guard: "x<=15",
					update: "x=0",
					sync: "tea",
					isLocked: false,
					nails: [
						{
							x: 276,
							y: 147,
							propertyType: "GUARD",
							propertyX: -47,
							propertyY: -7,
						},
						{
							x: 276,
							y: 167,
							propertyType: "SYNCHRONIZATION",
							propertyX: -33,
							propertyY: -7,
						},
						{
							x: 276,
							y: 187,
							propertyType: "UPDATE",
							propertyX: -35,
							propertyY: -8,
						},
					],
				},
				{
					id: "E12",
					group: "",
					sourceLocation: "L9",
					targetLocation: "L6",
					status: "OUTPUT",
					select: "",
					guard: "x>=2",
					update: "x=0",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 156,
							y: 77,
							propertyType: "GUARD",
							propertyX: -15,
							propertyY: -26,
						},
						{
							x: 191,
							y: 77,
							propertyType: "SYNCHRONIZATION",
							propertyX: -11,
							propertyY: -25,
						},
						{
							x: 226,
							y: 77,
							propertyType: "UPDATE",
							propertyX: -12,
							propertyY: -25,
						},
					],
				},
				{
					id: "E13",
					group: "",
					sourceLocation: "L7",
					targetLocation: "L6",
					status: "OUTPUT",
					select: "",
					guard: "x>=4",
					update: "x=0",
					sync: "pub",
					isLocked: false,
					nails: [
						{
							x: 315,
							y: 188,
							propertyType: "GUARD",
							propertyX: 13,
							propertyY: -8,
						},
						{
							x: 316,
							y: 168,
							propertyType: "SYNCHRONIZATION",
							propertyX: 14,
							propertyY: -8,
						},
						{
							x: 316,
							y: 146,
							propertyType: "UPDATE",
							propertyX: 13,
							propertyY: -8,
						},
					],
				},
				{
					id: "E14",
					group: "",
					sourceLocation: "U24",
					targetLocation: "U24",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "*",
					isLocked: true,
					nails: [
						{
							x: 389,
							y: 87,
							propertyType: "NONE",
							propertyX: 0,
							propertyY: 0,
						},
						{
							x: 369,
							y: 97,
							propertyType: "SYNCHRONIZATION",
							propertyX: -32,
							propertyY: -7,
						},
						{
							x: 389,
							y: 107,
							propertyType: "NONE",
							propertyX: 0,
							propertyY: 0,
						},
					],
				},
				{
					id: "E15",
					group: "",
					sourceLocation: "U24",
					targetLocation: "U24",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "*",
					isLocked: true,
					nails: [
						{
							x: 469,
							y: 87,
							propertyType: "NONE",
							propertyX: 0,
							propertyY: 0,
						},
						{
							x: 489,
							y: 97,
							propertyType: "SYNCHRONIZATION",
							propertyX: 11,
							propertyY: -8,
						},
						{
							x: 469,
							y: 107,
							propertyType: "NONE",
							propertyX: 0,
							propertyY: 0,
						},
					],
				},
				{
					id: "E16",
					group: "",
					sourceLocation: "L6",
					targetLocation: "U24",
					status: "INPUT",
					select: "",
					guard: "x>15",
					update: "",
					sync: "tea",
					isLocked: false,
					nails: [
						{
							x: 329,
							y: 57,
							propertyType: "GUARD",
							propertyX: -16,
							propertyY: -25,
						},
						{
							x: 379,
							y: 57,
							propertyType: "SYNCHRONIZATION",
							propertyX: -11,
							propertyY: -27,
						},
					],
				},
			],
			description: "",
			x: 451,
			y: 467,
			width: 538,
			height: 278,
			color: "8",
			includeInPeriodicCheck: false,
		},
		{
			name: "Specification",
			declarations: "clock u;",
			locations: [
				{
					id: "L16",
					nickname: "",
					invariant: "",
					type: "INITIAL",
					urgency: "NORMAL",
					x: 203.91394864677306,
					y: 127.21721027064538,
					color: "6",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
				{
					id: "L17",
					nickname: "",
					invariant: "u\u003c\u003d20",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 333.91394864677306,
					y: 127.21721027064538,
					color: "6",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: -56.39139486467731,
					invariantY: -8.195697432338653,
				},
				{
					id: "L18",
					nickname: "",
					invariant: "",
					type: "NORMAL",
					urgency: "NORMAL",
					x: 53.91394864677307,
					y: 127.21721027064538,
					color: "6",
					nicknameX: 30.0,
					nicknameY: -10.0,
					invariantX: 30.0,
					invariantY: 10.0,
				},
			],
			edges: [
				{
					id: "E65",
					group: "",
					sourceLocation: "L17",
					targetLocation: "L17",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 373.3707002245025,
							y: 115.26574498069328,
							propertyType: "SYNCHRONIZATION",
							propertyX: -15.940319222761971,
							propertyY: -26.391394864677306,
						},
						{
							x: 373.3707002245025,
							y: 140.69822920339877,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E66",
					group: "",
					sourceLocation: "L17",
					targetLocation: "L16",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "u\u003d0",
					sync: "patent",
					isLocked: false,
					nails: [
						{
							x: 333.91394864677306,
							y: 197.21721027064538,
							propertyType: "SYNCHRONIZATION",
							propertyX: -18.195697432338655,
							propertyY: 8.64677307425399,
						},
						{
							x: 270.07633587786256,
							y: 198.11936155447606,
							propertyType: "UPDATE",
							propertyX: -10.97848716169327,
							propertyY: 10.527411519777932,
						},
						{
							x: 203.91394864677306,
							y: 197.21721027064538,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E67",
					group: "",
					sourceLocation: "L18",
					targetLocation: "L18",
					status: "OUTPUT",
					select: "",
					guard: "",
					update: "",
					sync: "patent",
					isLocked: false,
					nails: [
						{
							x: 53.91394864677307,
							y: 87.21721027064538,
							propertyType: "SYNCHRONIZATION",
							propertyX: -19.097848716169327,
							propertyY: -26.391394864677306,
						},
						{
							x: 33.91394864677307,
							y: 87.21721027064538,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E68",
					group: "",
					sourceLocation: "L18",
					targetLocation: "L18",
					status: "INPUT",
					select: "",
					guard: "",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 53.31020124913254,
							y: 167.66828591256072,
							propertyType: "SYNCHRONIZATION",
							propertyX: -15.489243580846631,
							propertyY: 12.706453851492022,
						},
						{
							x: 32.71339347675225,
							y: 167.21721027064538,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E69",
					group: "",
					sourceLocation: "L16",
					targetLocation: "L17",
					status: "INPUT",
					select: "",
					guard: "u\u003c\u003d2",
					update: "u\u003d0",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 203.91394864677306,
							y: 87.21721027064538,
							propertyType: "GUARD",
							propertyX: 13.157529493407356,
							propertyY: -8.195697432338653,
						},
						{
							x: 203.91394864677306,
							y: 57.21721027064538,
							propertyType: "SYNCHRONIZATION",
							propertyX: -14.809160305343514,
							propertyY: -25.66828591256072,
						},
						{
							x: 268.5773768216516,
							y: 57.21721027064538,
							propertyType: "UPDATE",
							propertyX: -13.23386537126995,
							propertyY: -25.66828591256072,
						},
						{
							x: 333.91394864677306,
							y: 57.21721027064538,
							propertyType: "NONE",
							propertyX: 0.0,
							propertyY: 0.0,
						},
					],
				},
				{
					id: "E70",
					group: "",
					sourceLocation: "L16",
					targetLocation: "L18",
					status: "INPUT",
					select: "",
					guard: "u\u003e2",
					update: "",
					sync: "grant",
					isLocked: false,
					nails: [
						{
							x: 163.91394864677306,
							y: 127.21721027064538,
							propertyType: "GUARD",
							propertyX: -12.782789729354615,
							propertyY: -26.391394864677306,
						},
						{
							x: 113.91394864677306,
							y: 127.21721027064538,
							propertyType: "SYNCHRONIZATION",
							propertyX: -15.940319222761971,
							propertyY: -25.489243580846633,
						},
					],
				},
			],
			description: "",
			x: 353.0,
			y: 487.0,
			width: 400.8327550312283,
			height: 238.88757807078417,
			color: "6",
			includeInPeriodicCheck: false,
		},
	],
	systems: [
		{
			name: "University Example",
			description: "",
			x: 590.0,
			y: 402.0,
			width: 540.0,
			height: 410.0,
			color: "5",
			systemRootX: 240.0,
			componentInstances: [
				{
					id: 1,
					componentName: "Coffee Machine 3",
					x: 10.0,
					y: 110.0,
				},
				{
					id: 3,
					componentName: "Researcher",
					x: 310.0,
					y: 110.0,
				},
				{
					id: 5,
					componentName: "Half Administration 1",
					x: 10.0,
					y: 280.0,
				},
				{
					id: 6,
					componentName: "Half Administration 2",
					x: 310.0,
					y: 280.0,
				},
			],
			operators: [
				{
					id: 2,
					type: "composition",
					x: 250.0,
					y: 60.0,
				},
				{
					id: 4,
					type: "conjunction",
					x: 250.0,
					y: 230.0,
				},
			],
			edges: [
				{
					child: 2,
					parent: 0,
				},
				{
					child: 1,
					parent: 2,
				},
				{
					child: 3,
					parent: 2,
				},
				{
					child: 4,
					parent: 2,
				},
				{
					child: 5,
					parent: 4,
				},
				{
					child: 6,
					parent: 4,
				},
			],
		},
	],
	queries: [
		{
			query: "specification: (Administration 1 || Coffee Machine 1 || Researcher)",
			comment: "",
			isPeriodic: false,
			engine: "Reveaal",
		},
		{
			query: "specification: Specification",
			comment: "",
			isPeriodic: false,
			engine: "Reveaal",
		},
		{
			query: "consistency: (Administration 1 || Coffee Machine 1 || Researcher)",
			comment: "",
			isPeriodic: false,
			engine: "Reveaal",
		},
		{
			query: "consistency: (Administration 1 || Coffee Machine 1 || Researcher)",
			comment: "",
			isPeriodic: false,
			engine: "Reveaal",
		},
		{
			query: "refinement: (Administration 1 || Coffee Machine 2 || Researcher) \u003c\u003d Specification",
			comment: "",
			isPeriodic: false,
			engine: "Reveaal",
		},
		{
			query: "refinement: Coffee Machine 3 \u003c\u003d Coffee Machine 3",
			comment: "",
			isPeriodic: false,
			engine: "Reveaal",
		},
		{
			query: "refinement: (Half Administration 1 \u0026\u0026 Half Administration 2) \u003c\u003d Administration 2",
			comment: "",
			isPeriodic: false,
			engine: "Reveaal",
		},
		{
			query: "refinement: Administration 2 \u003c\u003d (Half Administration 1 \u0026\u0026 Half Administration 2)",
			comment: "",
			isPeriodic: false,
			engine: "Reveaal",
		},
	],
	globalDeclarations: {
		name: "Global Declarations",
		declarations: "broadcast chan pub, grant, patent, coin, tea, cof;",
	},
});
