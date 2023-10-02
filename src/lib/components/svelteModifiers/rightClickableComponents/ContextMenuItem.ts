import type { ComponentType } from "svelte";

/**
 * Class used for storing information about context menu items (The menu appearing when rightclicking)
 */
export class ContextMenuItem {
	/**
	 * Used to determine whether the item should represent a splitter line or a clickable button.
	 */
	public isHorizontalRule: boolean;
	/**
	 * The text displayed on the clickable button.
	 */
	public displayText: string;
	/**
	 * The function that should be run whenever the button is clicked. Has reference to the right clicked element.
	 */
	public onClick: (originalRightClickable: HTMLElement) => void;
	/**
	 * The icon to be displayed before the displayText.
	 */
	public icon: ComponentType | undefined;
	/**
	 * Specify special style for different types of buttons.
	 */
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
