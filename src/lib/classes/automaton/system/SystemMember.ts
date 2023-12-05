import { AutomatonClass } from "../AutomatonClass";
import type { HasId } from "../HasId";
import type { SystemMemberId } from "./SystemMemberId";

export abstract class SystemMember<R>
	extends AutomatonClass<R>
	implements HasId<SystemMemberId>
{
	abstract id: SystemMemberId;
}
