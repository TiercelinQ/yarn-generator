# config Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_config.html

## `sf config get`

Get the value of a configuration variable.

### Description

Run "sf config list" to see the configuration variables you've already set and their level (local or global).

Run "sf config set" to set a configuration variable. For the full list of available configuration variables, see https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_config_values.htm.

### Aliases

- `sf force config get`

### Usage

```bash
sf config get [--json] [--flags-dir <value>] [--verbose]
```

### Flags

#### `--verbose`

Display whether the configuration variables are set locally or globally.

- Type: boolean
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

Get the value of the "target-org" configuration variable.

```bash
sf config get target-org
```

Get multiple configuration variables and display whether they're set locally or globally:

```bash
sf config get target-org api-version --verbose
```

---

## `sf config list`

List the configuration variables that you've previously set.

### Description

A config variable can be global or local, depending on whether you used the --global flag when you set it. Local config variables apply only to the current project and override global config variables, which apply to all projects.  You can set all config variables as environment variables. Environment variables override their equivalent local and global config variables.

The output of this command takes into account your current context. For example, let's say you run this command from a Salesforce DX project in which you've locally set the "target-org" config variable. The command displays the local value, even if you've also set "target-org" globally. If you haven't set the config variable locally, then the global value is displayed, if set. If you set the SF_TARGET_ORG environment variable, it's displayed as such and overrides any locally or globally set "target-org" config variable. 

For the full list of available configuration variables, see https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_config_values.htm.

### Aliases

- `sf force config list`

### Usage

```bash
sf config list [--json] [--flags-dir <value>]
```

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

```bash
List the global and local configuration variables that apply to your current context:
$ sf config list
```

---

## `sf config set`

Set one or more configuration variables, such as your default org.

### Description

Use configuration variables to set CLI defaults, such as your default org or the API version you want the CLI to use. For example, if you set the "target-org" configuration variable, you don't need to specify it as a "sf deploy metadata" flag if you're deploying to your default org.

Local configuration variables apply only to your current project. Global variables, specified with the --global flag, apply in any Salesforce DX project.

The resolution order if you've set a flag value in multiple ways is as follows:

    1. Flag value specified at the command line.
    2. Local (project-level) configuration variable.
    3. Global configuration variable.

Run "sf config list" to see the configuration variables you've already set and their level (local or global).

If you're setting a single config variable, you don't need to use an equal sign between the variable and value. But you must use the equal sign if setting multiple config variables.

For the full list of available configuration variables, see https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_config_values.htm.

### Aliases

- `sf force config set`

### Usage

```bash
sf config set [--json] [--flags-dir <value>] [--global]
```

### Flags

#### `-g | --global`

Set the configuration variables globally, so they can be used from any Salesforce DX project.

- Type: boolean
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

Set the local target-org configuration variable to an org username:

```bash
sf config set target-org me@my.org
```

Set the local target-org configuration variable to an alias:

```bash
sf config set target-org my-scratch-org
```

Set the global target-org and target-dev-hub configuration variables using aliases:

```bash
sf config set --global target-org=my-scratch-org target-dev-hub=my-dev-hub
```

---

## `sf config unset`

Unset local or global configuration variables.

### Description

Local configuration variables apply only to your current project. Global configuration variables apply in any Salesforce DX project.

For the full list of available configuration variables, see https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_config_values.htm.

### Aliases

- `sf force config unset`

### Usage

```bash
sf config unset [--json] [--flags-dir <value>] [--global]
```

### Flags

#### `-g | --global`

Unset the configuration variables globally.

- Type: boolean
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

Unset the local "target-org" configuration variable:

```bash
sf config unset target-org
```

Unset multiple configuration variables globally:

```bash
sf config unset target-org api-version --global
```
