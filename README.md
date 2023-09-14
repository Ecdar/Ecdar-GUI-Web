# Ecdar

Ecdar is an abbreviation of Environment for Compositional Design and Analysis of Real Time Systems.
This repo contains the source code for the graphical user interface. In order to run queries you will need this interface and revaal executables.

> :information_source: If the goal is to use ECDAR, please goto the [main ECDAR repository](https://github.com/Ecdar/ECDAR), which contains releases for all supported platforms. These releases contain all dependencies, including the engines.

## Screenshots

| <img src="presentation/Retailer.png" width="400"> <img src="presentation/Administration.png" width="400"> | <img src="presentation/UniversityExample.png" width="400"> |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |

<a id="dependencies"></a>

## Dependencies

This section covers what dependencies are currently needed by the GUI.

### JavaScript runtime

As with all JavaScript applications, a runtime is required to build the project.

This project is primarily a [NodeJS](https://nodejs.org) project, but alternative engines such as [Deno](https://deno.com/) or [Bun](https://bun.sh/) should also work with minor adjustments.

All packages are managed with [npm](https://www.npmjs.com/), which is bundled with node.

### Engines (needed for model-checking)

In order to use the model-checking capabilities of the system, it is necessary to bundle or connect to at least one engine for the used operating system.

> :information_source: The latest version of each engine can be downloaded from:
>
> - https://github.com/Ecdar/j-Ecdar
> - https://github.com/Ecdar/Reveaal

The engines can then be configured in the GUI as described in [Engine Configuration](#engine_configuration).

## How to Run

After having retrieved the code and acquired all the dependencies mentioned in [Dependencies](#dependencies), the GUI can be started using the following command:

```shell
npm run dev -- --open
```

`--open` automatically opens the site in your default browser.

A production-ready version of the GUI can be build with the following command:

```shell
npm run build
```

<a id="engine_configuration"></a>

## Engine Configuration

In order to utilize the model-checking capabilities of the system, at least one engine must be configured.
The distributions available at [ECDAR](https://github.com/Ecdar/ECDAR) will automatically load the default engines on startup.
For the same reason, the `Reset Engines` button will clear the engines but will not be able to load the packaged once.

An engine can be added through the configurator found under `Options > Engines Options` in the menubar, which opens the pop-up shown below.

<img src="presentation/EngineConfiguration.png" alt="Engine Configuration Pop-up">

> :information_source: If you accidentally removed or changed an engine, these changes can be reverted be pressing `Cancel` or by clicking outside the pop-up. Consequently, if any changes should be saved, **MAKE SURE TO PRESS `Save`**

### Address

The _Address_ is either the address of a server running the engine (for remote execution) or a path to a local engine binary (for this, the _Local_ checkbox must be checked).

### Port range

The GUI uses gRPC for the communication with the engines and will therefore need at least one free port. This range directly limits the number of instances of the engine that will be started.

> :warning: Make sure AT LEAST one port is free within the specified range. For instance, the default port range for Reveaal is _5032_ - _5040_.

### Default

If an engine is marked with _Default_, all added queries will be assigned that engine.

## Exemplary Projects

To get started and get an idea of what the system can be used for, multiple examples can be found in the `examples` directory.
These projects include preconfigured models and queries to execute against them.

For the theoretical background and what the tool can be used for, please check out the latest research links at [here](https://ulrik.blog.aau.dk/ecdar/).

# Contributing

If you are interested in contributing to the project, please read the [contributing](.github/CONTRIBUTING.md) file. Here you will find guides on how to create issues and commit changes to the repository.
