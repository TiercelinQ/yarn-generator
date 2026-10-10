# info Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_info.html

## `sf info releasenotes display`

Display Salesforce CLI release notes on the command line.

### Description

By default, this command displays release notes for the currently installed CLI version on your computer. Use the --version flag to view release notes for a different release.

### Aliases

- `sf whatsnew`

### Usage

```bash
sf info releasenotes display [--json] [--flags-dir <value>] [--version <value>]
```

### Flags

#### `-v | --version=<value>`

CLI version or tag for which to display release notes.

- Type: option
- Required: no

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

Display release notes for the currently installed CLI version:

```bash
sf info releasenotes display
```

Display release notes for CLI version 7.120.0:

```bash
sf info releasenotes display --version 7.120.0
```

Display release notes for the CLI version that corresponds to a tag (stable, stable-rc, latest, latest-rc, rc):

```bash
sf info releasenotes display --version latest
```
