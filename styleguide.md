# Conventions used throughout the project

**Table of content:**

- [Conventions used throughout the project](#conventions-used-throughout-the-project)
  - [Style Guide](#style-guide)
    - [Naming Conventions:](#naming-conventions)
      - [Folder](#folder)
      - [Files](#files)
      - [Classes and Interfaces](#classes-and-interfaces)
      - [Variables](#variables)
      - [Functions \& Methods](#functions--methods)
      - [HTML \& CSS](#html--css)
    - [Good Code Practices:](#good-code-practices)
    - [TypeScript Type Practices:](#typescript-type-practices)
    - [Comment Practices:](#comment-practices)
      - [Comment writing guidelines:](#comment-writing-guidelines)
    - [Folder Structure:](#folder-structure)
    - [Test writing guidelines:](#tests-writing-guidelines)
  - [Using the CSS Schemes Loader](#using-the-css-schemes-loader)
    - [General JSON Structure](#general-json-structure)
    - [Supporting New CSS Media Features](#supporting-new-css-media-features)
    - [Adding CSS Variables](#adding-css-variables)
      - [Example Of Adding A New CSS Variable](#example-of-adding-a-new-css-variable)
      - [Specifying A CSS Color Attribute](#specifying-a-css-color-attribute)
    - [Using CSS Variables](#using-css-variables)

---

## Style Guide

**Introduction**
This style guide contains information about file, class and variable naming conventions, code practices, file structure and rules about the usage of TS types.

---

### Naming Conventions:

The following naming conventions were agreed upon in the set-up phase of the project and should always be followed.

#### Folder

Folder names should be in _camelCase_.

#### Files

**_.ts_** files that

- Exports a single class should be in _PascalCase_
- Exports a single interface should be in _PascalCase_ and begin with an uppercase "I".
  - Ex. interface called _IPoint_ should be in a file called _IPoint.ts_ to indicate that it exports an interface.
- Does not export a single class or interface should be in _camelCase_

**_.svelte_** files that

- Is a component should be in _PascalCase_
- Is a route should be in _camelCase_

**_.json_** files should be in _PascalCase_

#### Classes and Interfaces

Class names should be in _PascalCase_
Interface names should be in _PascalCase_ and begin with an uppercase "I" to indicate that it is an interface.

#### Variables

- Variable names should be in _camelCase_.
- Private properties should begin with \_ (underscore) or #:
  - **_\_ (underscore)_** represents a variable using the native TypeScript access modifier _private_, which is a compile-time construct that prevents private properties from being accessed outside of the class. After compilation the _private_ property is simply removed.
  - **_#_** represents a JavaScript private field and is a runtime feature that enforces privacy, making the field inaccessible outside the class even during runtime.
- Variable names should be written in full.
  - ~~siteCtx~~ should be siteContext
  - ~~testBtn~~ should be testButton

#### Functions & Methods

Functions and members should be in _camelCase_.

#### HTML & CSS

- CSS classes and id's should be in _kebab-case_
- CSS variables loaded using the _GlobalCssSchemesLoader_ should be in _kebab-case_ with an initial _--_
  - Example: _--test-css-variable-name_

---

### Good Code Practices:

- Use _const_ instead of _let_ whenever possible.
- Use _async/await_ instead of _Promises_ whenever possible.
- Use explicit types as it makes the code more readable and makes it easier to identify type related errors.
- Use private properties to encapsulate implementation details that are not relevant to other components.
- If a function cant be described based on its name it is too big and should be split.

**_File structure specifics:_**

- Group related files in the same directory.

---

### TypeScript Type Practices:

- Mark function parameters and object properties as optional (_?_) if they can be omitted.
- Mark properties as _readonly_ if it should not be changed after being created.
- Always explicitely specify types as TypeScript might not always be able to infer it.
- Use _null_ and _undefined_ carefully.
- **DO NOT** use the _any_ type as it omits all type checking. In extreme cases one can use the _unknown_ type if necessary.
- **DO NOT** use _@ts-ignore_ or _@ts-expect-error_ as they disable TypeScript checks

For a more in-depth and complete style one can visit the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).

---

### Comment Practices:

Use JSDoc comments for classes, methods and functions. JSDoc comments are useful as they can provide a lot of information.
An example of a JSDoc comment can be seen in the following code block:

```typescript
/**
 * Function for concatenating two strings.
 *
 * @param a - The first input string
 * @param b - The second input string
 * @returns The concatenation of `a` and `b`
 */
function concat(a: string, b: string): string {
  return a + b;
}
```

For more information on JSDoc comments, visit [@use JSDoc](https://jsdoc.app)

#### Comment writing guidelines:

1. Avoid obvious comments i.e. code that is self-explanatory.
2. Write comments for complex code that explains what it does.

---

### Folder Structure:

The following folder structure is meant to be a guideline of where one should put specific files and folders.

```
.
├── examples
│   └── <-- Working examples of projects -->
├── presentation
│   └── <-- Example pictures of the application -->
├── src
│   ├── lib
│   │   ├── interfaces
│   │   │   └── <-- Folders and typescript files for interfaces -->
│   │   ├── classes
│   │   │   └── <-- Folders and typescript files for object classes -->
│   │   ├── globalState
│   │   │   └── <-- Folders and files related to the global state of the application -->
│   │   └── components
│   │       ├── <-- Folders and files for Svelte components -->
│   │       └── samplesImplementations
│   │           └── <-- An example of how one would implement and use a specific component -->
│   │
│   ├── routes
│   │   └── <-- Files for routing and global layout -->
│   └── tests
│       └── <-- Unit test files here.
                Folder structure should copy the project structure starting from src,
                and put tests in their corresponing folders ->
├── static
└── tests
    └── <-- End-to-end test files here.
            Folder structure should copy the project structure starting from src,
            and put tests in their corresponing folders -->
```

### Tests writing guidelines:

- There should be a one to one relation between files testet and test files.
- When writing end-to-end tests the test names should explain the test.
- When writing unit tests, the describe and it functions should be used in a way such that they form a sentence.

An example of a unit test:

```
describe('Circle class', => {
  describe('area is calculated when', => {
    it('sets the radius', => { ... });
    it('sets the diameter', => { ... });
    it('sets the circumference', => { ... });
  });
});
```

## Using the CSS Schemes Loader

The CSS loader was created to support dynamic loading of color schemes and userdefined colorschemes.

### General JSON Structure

The different media schemes are stored using a JSON file. The root of this file contains a default mediascheme and a list of mediaschemes:

```ts
const MediaSchemes = z
  .object({
    default: RequiredMediaScheme.required(),
    schemes: z.array(MediaScheme),
  })
  .strict();
```

1. _Default scheme:_ Requires all defined CSS variables to have a default fallback value to prevent the situation where an elements does not have styling.
   This scheme automatically also functions as the "light mode" styling.
2. _List of mediaschemes_: Contains specifications of some CSS variables that overwrites the standard values in case the mediafeature matches the browser.
   Example: A mediascheme has mediafeature "prefers-color-scheme: dark". This feature is matched when the browser is set to dark mode.

### Supporting New CSS Media Features

To add support for additional mediafeatures one has to add a new mediafeature object to the _schemes_ array located in the root of the JSON file.

The _MediaScheme_ definition looks like the following:

```ts
const MediaScheme = z
  .object({
    mediaFeature: z.string(),
    color: ColorVariables.partial().optional(),
    fontSize: FontSizeVariables.partial().optional(),
    border: BorderVariables.partial().optional(),
  })
  .strict();
```

As seen in the above definition of _MediaScheme_ one is not required to specify any color, fontSize or border, meaning that one only has to specify the variables specifically needed for that scheme.

An example of a new media scheme can be seen below:

```json
{
  "mediaFeature": "prefers-reduced-motion",
  "color": {},
  "fontSize": {},
  "border": {}
}
```

A list of media features can be seen on the [MDN Web Docs: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries).

### Adding CSS Variables

The allowed CSS variables are listed in the _CSSVariables.ts_ file. To add support for new CSS variables these have to be added to the corresponding list.

#### Example Of Adding A New CSS Variable

The process of adding new CSS variables are the following:

1. Add the name and type of the variable to the correct scheme in the _CSSVariables.ts_ file.
   _Example:_ Adding a color called _--css-color-name_ of the type _ColorAttribute_.

```ts
export const ColorVariables = z.object({
  ...
	"--css-color-name": ColorAttribute,
}).strict();
```

2. Add a default value in the _default_ scheme in the JSON file.

```ts
"color": {
  ...
	"--navigationbar-text-color": ["display-p3", 1, 1, 1],
}
```

3. (Optional) Further specify the CSS variable in other media schemes e.g. add a darkmode version.

#### Specifying A CSS Color Attribute

The color attribute is based on the CSS _color()_ function. The color function takes four parameters and a fifth optional parameter. The syntax is defined as following:

```CSS
color(colorspace value-one value-two value-three / optional-alpha-value);
```

The _colorspace_ value should be one of the colorspaces listed in the _SupportedGamuts_ enum in the _ColorAttribute.ts_ file and the four numerical values should be within the range 0-1.

Now that the implementation specifics have been discussed we can take a look at how one would define a color in the JSON file. An example of _ColorAttribute_ is seen in the following:

```json
"--console-scrollbar-thumb-color": [
  "display-p3",
  0.22745098039,
  0.27450980392,
  0.30588235294
],
```

For more information on the _color()_ function see [MDN Web Docs: color()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color)

### Using CSS Variables

The specified CSS variables are extremely easy to apply in the GUI as they are simply added as CSS properties in the root file.

Examples of applying the CSS variable _--background-color_ are:

```CSS
.side-panel {
  ...
  background-color: var(--background-color);
}
```

```html
<div style="background-color: var(--background-color);">...</div>
```

A more advanced implementation switching between two CSS variables:

```html
<script>
  let buttonActive: string = "var(--button-active)";
  let buttonInActive: string = "var(--button-inactive)";
</script>
<button
  style="background-color: { currentTab == thisTab
  ? buttonActive
  : buttonInActive}"
></button>
```
