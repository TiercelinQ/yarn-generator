# sobject Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_sobject.html

## `sf sobject describe`

Display the metadata for a standard or custom object or a Tooling API object.

### Description

The metadata is displayed in JSON format. See this topic for a description of each property: https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_describesobjects_describesobjectresult.htm.

This command displays metadata for Salesforce objects by default. Use the --use-tooling-api flag to view metadata for a Tooling API object.

### Aliases

- `sf force schema sobject describe`

### Usage

```bash
sf sobject describe [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --sobject <value> [--use-tooling-api]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-s | --sobject=<value>`

API name of the object to describe.

- Type: option
- Required: yes
- Aliases: `--sobjecttype`

#### `-t | --use-tooling-api`

Use Tooling API to display metadata for Tooling API objects.

- Type: boolean
- Required: no
- Aliases: `--usetoolingapi`

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

Display the metadata of the "Account" standard object in your default org:

```bash
sf sobject describe --sobject Account
```

Display the metadata of the "MyObject__c" custom object in the org with alias "my-scratch-org":

```bash
sf sobject describe --sobject MyObject__c --target-org my-scratch-org
```

Display the metadata of the ApexCodeCoverage Tooling API object in your default org:

```bash
sf sobject describe --sobject ApexCodeCoverage --use-tooling-api
```

---

## `sf sobject list`

List all Salesforce objects of a specified category.

### Description

You can list the standard objects, custom objects, or all. The lists include only Salesforce objects, not Tooling API objects.

### Aliases

- `sf force schema sobject list`

### Usage

```bash
sf sobject list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--sobject <value>]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-s | --sobject=<value>`

Category of objects to list.

- Type: option
- Required: no
- Default: `ALL`
- Aliases: `--sobjecttypecategory`, `--c`

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

List all objects in your default org:

```bash
sf sobject list --sobject all
```

List only custom objects in the org with alias "my-scratch-org":

```bash
sf sobject list --sobject custom --target-org my-scratch-org
```
