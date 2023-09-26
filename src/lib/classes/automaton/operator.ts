import { 
  Point 
} from '$lib/classes/draw';

import { OperatorType } from './operator_type';



export class Operator {
	id: number = 0;
	type: OperatorType = OperatorType.COMPOSITION;
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
