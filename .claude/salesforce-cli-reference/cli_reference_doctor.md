# doctor Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_doctor.html

## `sf doctor`

Gather CLI configuration data and run diagnostic tests to discover and report potential problems in your environment.

### Description

When you run the doctor command without parameters, it first displays a diagnostic overview of your environment. It then writes a detailed diagnosis to a JSON file in the current directory. Use the --outputdir to specify a different directory. To run diagnostic tests on a specific plugin, use the --plugin parameter. If the plugin isn't listening to the doctor, then you get a warning.

Use the --command parameter to run a specific command in debug mode; the doctor writes both stdout and stderr to \*.log files that you can provide to Salesforce Customer Support or attach to a GitHub issue.

Plugin providers can also implement their own doctor diagnostic tests by listening to the "sf-doctor" event and running plugin specific tests that are then included in the doctor diagnostics log.

### Usage

```bash
sf doctor [--json] [--flags-dir <value>] [--command <value>] [--plugin <value>] [--output-dir <value>] [--create-issue]
```

### Flags

#### `-c | --command=<value>`

Command to run in debug mode; results are written to a log file.

- Type: option
- Required: no

#### `-p | --plugin=<value>`

Specific plugin on which to run diagnostics.

- Type: option
- Required: no

#### `-d | --output-dir=<value>`

Directory to save all created files rather than the current working directory.

- Type: option
- Required: no
- Aliases: `--outputdir`, `--o`

#### `-i | --create-issue`

Create a new issue on our GitHub repo and attach all diagnostic results.

- Type: boolean
- Required: no
- Aliases: `--createissue`

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

Run CLI doctor diagnostics:

```bash
sf doctor
```

Run CLI doctor diagnostics and the specified command, and write the debug output to a file:

```bash
sf doctor --command "force:org:list --all"
```

Run CLI doctor diagnostics for a specific plugin:

```bash
sf doctor --plugin @salesforce/plugin-source
```
