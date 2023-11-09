# Style guide {#introduction}

**Introduction**
This style guide contains information about file, class and variable naming conventions, code practices, file structure and rules about the usage of TS types.

**Table of content:**

- [Naming Conventions](#namingConventions)
  - [Folder](#folderNamingConvention)
  - [Files](#filesNamingConvention)
  - [Classes](#classNamingConvention)
  - [Variables](#variableNamingConvention)
  - [Functions and Methods](#functionNamingConvention)
- [Code Practices](#codePractices)
- [TypeScript Type Practices](#types)
- [Folder Structure](#folderStructure)

---

### Naming Conventions: {#namingConventions}

The following naming conventions were agreed upon in the set-up phase of the project and should always be followed.

#### Folder {#folderNamingConvention}

Folder names should be in _camelCase_.

#### Files {#filesNamingConvention}

**_.ts_** files that

- Exports a single class should be in _PascalCase_
- Does not export a single class should be in _camelCase_

**_.svelte_** files that

- Is a component should be in _PascalCase_
- Is a route should be in _camelCase_

**_.json_** files should be in _PascalCase_

#### Classes {#classNamingConvention}

Class names should be in _PascalCase_

#### Variables {#variableNamingConvention}

- Variable names should be in _camelCase_.
- Private properties should begin with \_ (underscore)
- Variable names should be written in full.
  - ~~siteCtx~~ should be siteContext
  - ~~testBtn~~ should be testButton

#### Functions and Methods {#functionNamingConvention}

Functions and members should be in _camelCase_.

---

### Good Code Practices: {#codePractices}

- Use _const_ instead of _let_ whenever possible.
- Use _async/await_ instead of _Promises_ whenever possible.
- Use explicit types as it makes the code more readable and makes it easier to identify type related errors.
- Use private properties to encapsulate implementation details that are not relevant to other components.
- If a function cant be described based on its name it is too big and should be split.

**_File structure specificfics:_**

- Group related files in the same directory.

---

### TypeScript Type Practices: {#types}

- Mark function parameters and object properties as optional (_?_) if they can be omitted.
- Mark properties as _readonly_ if it should not be changed after being created.
- Always explicitely specify types as TypeScript might not always be able to infer it.
- Use _null_ and _undefined_ carefully.
- **DO NOT** use the _any_ type as it omits all type checking. In extreme cases one can use the _unknown_ type if necessary.
- **DO NOT** use _@ts-ignore_ or _@ts-expect-error_ as they disable TypeScript checks

For a more in-depth and complete style one can visit the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).

---

### Folder Structure: {#folderStructure}

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
│   └── routes
│       └── <-- Files for routing and global layout -->
├── static
└── tests
    └── <-- Test files here.
            Folder structure should copy the project structure,
            and put tests in their corresponding folders -->
```
