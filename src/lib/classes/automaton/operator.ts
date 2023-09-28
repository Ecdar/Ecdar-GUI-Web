import { Point } from '$lib/classes/draw';

import { OperatorType } from './operator_type';

/**
 * Defines an operator for a System
 * */
export class Operator {
	/**
	 * The id of the operator
	 * must be unique and matches the id of a ComponentInstance
	 * */
	id: number = 0;

	/**
	 * The type of operator
	 * */
	type: OperatorType = OperatorType.COMPOSITION;

	/**
	 * The position of the operator
	 * */
	position: Point = new Point(0, 0);

	constructor(
		id: number = 0,
		type: OperatorType = OperatorType.COMPOSITION,
		position: Point = new Point(0, 0)
	) {
		this.id = id;
		this.type = type;
		this.position = position;
	}
}
