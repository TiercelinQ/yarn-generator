# force Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_force.html

## `sf force data bulk delete`

Bulk delete records from an org using a CSV file. Uses Bulk API 1.0.

### Description

The CSV file must have only one column ("Id") and then the list of record IDs you want to delete, one ID per line.

When you execute this command, it starts a job and one or more batches, displays their IDs, and then immediately returns control of the terminal to you by default. If you prefer to wait, set the --wait flag to the number of minutes; if it times out, the command outputs the IDs. Use the job and batch IDs to check the status of the job with the "sf force data bulk status" command. A single job can contain many batches, depending on the length of the CSV file.

### Usage

```bash
sf force data bulk delete [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --file <value> --sobject <value> [--wait <value>]
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

#### `-f | --file=<value>`

CSV file that contains the IDs of the records to delete.

- Type: option
- Required: yes
- Aliases: `--csvfile`

#### `-s | --sobject=<value>`

API name of the Salesforce object, either standard or custom, that you want to delete records from.

- Type: option
- Required: yes
- Aliases: `--sobjecttype`

#### `-w | --wait=<value>`

Number of minutes to wait for the command to complete before displaying the results.

- Type: option
- Required: no
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

Bulk delete Account records from your default org using the list of IDs in the "files/delete.csv" file:

```bash
sf force data bulk delete --sobject Account --file files/delete.csv
```

Bulk delete records from a custom object in an org with alias my-scratch and wait 5 minutes for the command to complete:

```bash
sf force data bulk delete --sobject MyObject__c --file files/delete.csv --wait 5 --target-org my-scratch
```

---

## `sf force data bulk status`

View the status of a bulk data load job or batch. Uses Bulk API 1.0.

### Description

Run this command using the job ID or batch ID returned from the "sf force data bulk delete" or "sf force data bulk upsert" commands.

### Usage

```bash
sf force data bulk status [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--batch-id <value>] --job-id <value>
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

#### `-b | --batch-id=<value>`

ID of the batch whose status you want to view; you must also specify the job ID.

- Type: option
- Required: no
- Aliases: `--batchid`

#### `-i | --job-id=<value>`

ID of the job whose status you want to view.

- Type: option
- Required: yes
- Aliases: `--jobid`

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

View the status of a bulk load job in your default org:

```bash
sf force data bulk status --job-id 750xx000000005sAAA
```

View the status of a bulk load job and a specific batches in an org with alias my-scratch:

```bash
sf force data bulk status --job-id 750xx000000005sAAA --batch-id 751xx000000005nAAA --target-org my-scratch
```

---

## `sf force data bulk upsert`

Bulk upsert records to an org from a CSV file. Uses Bulk API 1.0.

### Description

An upsert refers to inserting a record into a Salesforce object if the record doesn't already exist, or updating it if it does exist.

When you execute this command, it starts a job and one or more batches, displays their IDs, and then immediately returns control of the terminal to you by default. If you prefer to wait, set the --wait flag to the number of minutes; if it times out, the command outputs the IDs. Use the job and batch IDs to check the status of the job with the "sf force data bulk status" command. A single job can contain many batches, depending on the length of the CSV file.

See "Prepare CSV Files" in the Bulk API Developer Guide for details on formatting your CSV file. (https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/datafiles_csv_preparing.htm)

By default, the job runs the batches in parallel, which we recommend. You can run jobs serially by specifying the --serial flag. But don't process data in serial mode unless you know this would otherwise result in lock timeouts and you can't reorganize your batches to avoid the locks.

### Usage

```bash
sf force data bulk upsert [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --external-id <value> --file <value> --sobject <value> [--wait <value>] [--serial]
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

#### `-i | --external-id=<value>`

Name of the external ID field, or the Id field.

- Type: option
- Required: yes
- Aliases: `--externalid`

#### `-f | --file=<value>`

CSV file that contains the records to upsert.

- Type: option
- Required: yes
- Aliases: `--csvfile`

#### `-s | --sobject=<value>`

API name of the Salesforce object, either standard or custom, that you want to upsert records to.

- Type: option
- Required: yes
- Aliases: `--sobjecttype`

#### `-w | --wait=<value>`

Number of minutes to wait for the command to complete before displaying the results.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-r | --serial`

Run batches in serial mode.

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

Bulk upsert records to the Contact object in your default org:

```bash
sf --sobject Contact --file files/contacts.csv --external-id Id
```

Bulk upsert records to a custom object in an org with alias my-scratch and wait 5 minutes for the command to complete:

```bash
sf force data bulk upsert --sobject MyObject__c --file files/file.csv --external-id MyField__c --wait 5 --target-org my-scratch
```

---

## `sf force lightning lwc test create`

### Description

creates a Lightning web component test file with boilerplate code inside a __tests__ directory.

### Usage

```bash
sf force lightning lwc test create [--json] [--loglevel (trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)] --filepath <value>
```

### Flags

#### `--json`

format output as json

- Type: boolean
- Required: no

#### `--loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)`

logging level for this command invocation

- Type: option
- Required: no
- Permitted values: `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`
- Default: `warn`

#### `-f | --filepath=<value>`

path to Lightning web component .js file to create a test for

- Type: option
- Required: yes

### Examples

```bash
$ sfdx force:lightning:lwc:test:create -f force-app/main/default/lwc/myButton/myButton.js
```

---

## `sf force lightning lwc test run`

### Description

invokes Lightning Web Components Jest unit tests.

### Usage

```bash
sf force lightning lwc test run [passthrough] [--json] [--loglevel (trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)] [--debug] [--watch]
```

### Arguments

- `passthrough`: 

### Flags

#### `--json`

format output as json

- Type: boolean
- Required: no

#### `--loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)`

logging level for this command invocation

- Type: option
- Required: no
- Permitted values: `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`
- Default: `warn`

#### `-d | --debug`

run tests in debug mode

- Type: boolean
- Required: no
- Exclusive with: `--watch`

#### `--watch`

run tests in watch mode

- Type: boolean
- Required: no
- Exclusive with: `--debug`

### Examples

```bash
$ sfdx force:lightning:lwc:test:run
```

```bash
$ sfdx force:lightning:lwc:test:run -w
```

---

## `sf force lightning lwc test setup`

### Description

install Jest unit testing tools for Lightning Web Components.

### Usage

```bash
sf force lightning lwc test setup [--json] [--loglevel (trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)]
```

### Flags

#### `--json`

format output as json

- Type: boolean
- Required: no

#### `--loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)`

logging level for this command invocation

- Type: option
- Required: no
- Permitted values: `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`
- Default: `warn`

### Examples

```bash
$ sfdx force:lightning:lwc:test:setup
```

---

## `sf force package push-upgrade list`

Lists the status of push upgrade requests for a given package.

### Description

Shows the details of each request to create a push upgrade in the Dev Hub org.

All filter parameters are applied using the AND logical operator (not OR).

To get information about a specific request, run "sf package pushupgrade report" and supply the request ID.

### Aliases

- `sf force package push-upgrade list`

### Usage

```bash
sf force package push-upgrade list [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--scheduled-last-days <value>] [--status <value>] [--show-push-migrations-only]
```

### Flags

#### `-v | --target-dev-hub=<value>`

Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetdevhubusername`, `--target-hub-org`

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-p | --package=<value>`

Package ID (starts with 033) of the package that you want push upgrade information for.

- Type: option
- Required: yes

#### `-l | --scheduled-last-days=<value>`

Number of days in the past for which to display the list of push upgrade requests that were scheduled. Used to filter the list output to only recently scheduled push upgrades.

- Type: option
- Required: no
- Aliases: `--scheduledlastdays`

#### `-s | --status=<value>`

Status used to filter the list output Valid values are: Created, Canceled, Pending, In Progress, Failed, or Succeeded

- Type: option
- Required: no
- Permitted values: `Created`, `Cancelled`, `Pending`, `In Progress`, `Failed`, `Succeeded`

#### `--show-push-migrations-only`

Display only push upgrade requests for package migrations.

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

List all package push upgrade requests in the specified Dev Hub org:

```bash
sf force package push-upgrade list --package 033xyz --target-dev-hub myHub
```

List all package push upgrade requests in the specified Dev Hub org scheduled in the last 30 days:

```bash
sf force package push-upgrade list --package 033xyz --scheduled-last-days 30 --target-dev-hub myHub
```

List all package push upgrade with a status Succeeded:

```bash
sf force package push-upgrade list --package 033xyz –-status Succeeded
```

List all package push upgrade with a status Failed:

```bash
sf force package push-upgrade list --package 033xyz –-status Failed
```
