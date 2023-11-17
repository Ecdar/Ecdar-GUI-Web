import { z } from "zod";
import NumberUnitAttribute from "./NumberUnitAttribute";

/**
 * Represents a transition in CSS.
 *
 * A transition has a transition property and duration. Additionally, it might have a transition function and a transition delay
 */

const TransitionAttributeNone = z.tuple([
	z.literal("none"), // Transition Property
]);

const TransitionAttributeBasic = z.tuple([
	z.string(), // Transition Property
	NumberUnitAttribute, // Transition Duration
]);

const TransitionAttributeWithTiming = z.tuple([
	z.string(), // Transition Property
	NumberUnitAttribute, // Transition Duration
	z.string(), // Transition Timing Function
]);

const TransitionAttributeWithDelay = z.tuple([
	z.string(), // Transition Property
	NumberUnitAttribute, // Transition Duration
	NumberUnitAttribute, // Transition Delay
]);

const TransitionAttributeWithTimingDelay = z.tuple([
	z.string(), // Transition Property
	NumberUnitAttribute, // Transition Duration
	z.string(), // Transition Timing Function
	NumberUnitAttribute, // Transition Delay
]);

const TransitionAttribute = z.union([
	TransitionAttributeNone,
	TransitionAttributeBasic,
	TransitionAttributeWithDelay,
	TransitionAttributeWithTiming,
	TransitionAttributeWithTimingDelay,
]);

export default TransitionAttribute;
