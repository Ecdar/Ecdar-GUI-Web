import type { ComponentType } from "svelte";

/**
 * Class used for storing information about context menu items (The menu appearing when rightclicking)
 */
export class ContextMenuItem {
	/**	Property explanation:
	 * isHorizontalRule: Used to determine whether the item should represent a splitter line or a clickable button
	 * displayText: The text displayed on the clickable button
	 * cssClass: Specify special style for different types of buttons
	 * icon: The icon to be displayed before the displayText
	 * onClick: The function that should be run whenever the button is clicked. Has reference to the right clicked element
	 */
	public isHorizontalRule: boolean;
	public displayText: string;
	public onClick: (originalRightClickable: HTMLElement) => void;
	public icon: ComponentType | undefined;
	public cssClass: string | undefined;

	constructor(
		isHorizontalRule: boolean,
		displayText: string = "",
		onClick: (originalRightClickable: HTMLElement) => void = () => void 0,
		icon?: ComponentType,
		cssClass?: string,
	) {
		this.isHorizontalRule = isHorizontalRule;
		this.displayText = displayText;
		this.onClick = onClick;
		this.icon = icon;
		this.cssClass = cssClass;
	}
}
