# alias Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_alias.html

## `sf alias list`

List all aliases currently set on your local computer.

### Description

Aliases are global, which means that you can use all the listed aliases in any Salesforce DX project on your computer.

### Aliases

- `sf force alias list`

### Usage

```bash
sf alias list [--json] [--flags-dir <value>]
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

List all the aliases you've set:

```bash
sf alias list
```

---

## `sf alias set`

Set one or more aliases on your local computer.

### Description

Aliases are user-defined short names that make it easier to use the CLI. For example, users often set an alias for a scratch org usernames because they're long and unintuitive. Check the --help of a CLI command to determine where you can use an alias.

You can associate an alias with only one value at a time. If you set an alias multiple times, the alias points to the most recent value. Aliases are global; after you set an alias, you can use it in any Salesforce DX project on your computer.

Use quotes to specify an alias value that contains spaces. You typically use an equal sign to set your alias, although you don't need it if you're setting a single alias in a command.

### Aliases

- `sf force alias set`

### Usage

```bash
sf alias set [--json] [--flags-dir <value>]
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

Set an alias for a scratch org username:

```bash
sf alias set my-scratch-org=test-sadbiytjsupn@example.com
```

Set multiple aliases with a single command:

```bash
sf alias set my-scratch-org=test-sadbiytjsupn@example.com my-other-scratch-org=test-ss0xut7txzxf@example.com
```

Set an alias that contains spaces:

```bash
sf alias set my-alias='alias with spaces'
```

Set a single alias without using an equal sign:

```bash
sf alias set my-scratch-org test-ss0xut7txzxf@example.com
```

---

## `sf alias unset`

Unset one or more aliases that are currently set on your local computer.

### Description

Aliases are global, so when you unset one it's no longer available in any Salesforce DX project.

### Aliases

- `sf force alias unset`

### Usage

```bash
sf alias unset [--json] [--flags-dir <value>] [--all] [--no-prompt]
```

### Flags

#### `-a | --all`

Unset all currently set aliases.

- Type: boolean
- Required: no

#### `-p | --no-prompt`

Don't prompt the user for confirmation when unsetting all aliases.

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

Unset an alias:

```bash
sf alias unset my-alias
```

Unset multiple aliases with a single command:

```bash
sf alias unset my-alias my-other-alias
```

Unset all aliases:

```bash
sf alias unset --all [--no-prompt]
```
