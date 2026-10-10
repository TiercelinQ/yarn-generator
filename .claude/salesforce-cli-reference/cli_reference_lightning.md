# lightning Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_lightning.html

## `sf lightning dev app`

Preview a Lightning Experience app locally and in real-time, without deploying it.

### Description

Use Local Dev to see local changes to your app in a real-time preview that you don't have to deploy or manually refresh. To let you quickly iterate on your Lightning web components (LWCs) and pages, your app preview automatically refreshes when Local Dev detects source code changes.

When you edit these local files with Local Dev enabled, your org automatically reflects these changes.

- Basic HTML and CSS edits to LWCs
- JavaScript changes to LWCs that don't affect the component's public API
- Importing new custom LWCs
- Importing another instance of an existing LWC

To apply any other local changes not listed above, you must deploy them to your org using the `sf project deploy start` command.

When you make changes directly in your org (like saving new component properties), they're automatically deployed to your live app. To update your local version of the app with those changes, you must retrieve them from your org using the `sf project retrieve start` command.

If you run the command without flags, it displays a list of devices for you to choose from. Then it lists the apps that it found in your local DX project for you to choose. Use the --device or --name flags to bypass the questions. The command also asks if you want to enable Local Dev in your org if it isn't already.

To learn more about Local Dev enablement, considerations, and limitations, see the Lightning Web Components Developer Guide (https://developer.salesforce.com/docs/platform/lwc/guide/get-started-test-components.html).

### Usage

```bash
sf lightning dev app [--flags-dir <value>] [--name <value>] --target-org <value> [--device-type <value>] [--device-id <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the Lightning Experience app to preview.

- Type: option
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-t | --device-type=<value>`

Type of device to display the app preview.

- Type: option
- Required: no
- Permitted values: `desktop`, `ios`, `android`

#### `-i | --device-id=<value>`

ID of the mobile device to display the preview if device type is set to `ios` or `android`. The default value is the ID of the first available mobile device.

- Type: option
- Required: no

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

### Global flags

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Preview the default app for the target org "myOrg" in a desktop environment:

```bash
sf lightning dev app --target-org myOrg
```

Preview the app "myApp" for the target org "myOrg" in a desktop environment:

```bash
sf lightning dev app --name MyApp --target-org myOrg --device-type desktop
```

Preview the default app for target org "myOrg" on an iOS device:

```bash
sf lightning dev app --target-org myOrg --device-type ios --device-id "iPhone 15 Pro Max"
```

---

## `sf lightning dev component`

Preview LWC components in isolation.

### Description

Component preview launches an isolated development environment for Lightning Web Components, enabling rapid iteration without needing to deploy changes. The server provides real-time previews of your components through hot module replacement (HMR), automatically refreshing the view when source files are modified.

When running the development server, these changes are immediately reflected:

- Component template (HTML) modifications
- Styling updates in component CSS files
- JavaScript logic changes that don't modify the component's API
- Adding or updating internal component dependencies
- Modifying static resources used by the component

If you run the command without flags, it displays a list of components that it found in your local DX project for you to choose to preview. Use the --name flag to bypass the question. The command also asks if you want to enable Local Dev in your org if it isn't already.

See the LWC Developer Guide for more information about component development best practices and limitations (https://developer.salesforce.com/docs/platform/lwc/guide/get-started-best-practices.html).

### Usage

```bash
sf lightning dev component [--json] [--flags-dir <value>] [--name <value>] [--api-version <value>] [--client-select] --target-org <value>
```

### Flags

#### `-n | --name=<value>`

Name of a component to preview.

- Type: option
- Required: no

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `-c | --client-select`

Launch component preview without selecting a component.

- Type: boolean
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

### Global flags

#### `--json`

Format output as json.

- Type: boolean
- Required: no

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Select a component interactively and launch the component preview; use your default org:

```bash
sf lightning dev component
```

Launch component preview for "myComponent"; use the org with alias "myscratch":

```bash
sf lightning dev component --name myComponent --target-org myscratch
```

---

## `sf lightning dev site`

Preview an Experience Builder site locally and in real-time, without deploying it.

### Description

Enable Local Dev to see local changes to your site in a real-time preview that you don't have to deploy or manually refresh. To let you quickly iterate on your Lightning web components (LWCs) and pages, your site preview automatically refreshes when Local Dev detects source code changes.

When you edit these local files with Local Dev enabled, your org automatically reflects these changes.

- Basic HTML and CSS edits to LWCs
- JavaScript changes to LWCs that don't affect the component's public API
- Importing new custom LWCs
- Importing another instance of an existing LWC

To apply any other local changes not listed above, you must deploy them to your org using the `sf project deploy start` command. Then republish your site and restart the server for the Local Dev experience.

If you run the command without flags, it displays a list of Experience Builder sites that it found in your local DX project for you to choose from. Use the --name flag to bypass the question. The command also asks if you want to enable Local Dev in your org if it isn't already.

For more considerations and limitations, see the Lightning Web Components Developer Guide.

### Usage

```bash
sf lightning dev site [--flags-dir <value>] [--name <value>] --target-org <value> [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the Experience Builder site to preview. It must match a site name from the current org.

- Type: option
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

### Global flags

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Select a site to preview from the org with alias "myOrg":

```bash
sf lightning dev site --target-org myOrg
```

Preview the site "Partner Central" from your default org:

```bash
sf lightning dev site --name "Partner Central"
```
