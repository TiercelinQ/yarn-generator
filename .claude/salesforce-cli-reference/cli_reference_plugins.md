# plugins Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_plugins.html

## `sf plugins`

### Description

List installed plugins.

### Usage

```bash
sf plugins [--json] [--core]
```

### Flags

#### `--core`

Show core plugins.

- Type: boolean
- Required: no

### Global flags

#### `--json`

Format output as json.

- Type: boolean
- Required: no

### Examples

```bash
sf plugins
```

---

## `sf plugins add`

Installs a plugin into sf.

### Description

Uses npm to install plugins.

Installation of a user-installed plugin will override a core plugin.

Use the SF_NPM_LOG_LEVEL environment variable to set the npm loglevel.
Use the SF_NPM_REGISTRY environment variable to set the npm registry.

### Aliases

- `sf plugins add`

### Usage

```bash
sf plugins add <plugin> [--json] [--force] [--help] [--silent] [--verbose]
```

### Arguments

- `plugin` (required): Plugin to install.

### Flags

#### `-f | --force`

Force npm to fetch remote resources even if a local copy exists on disk.

- Type: boolean
- Required: no

#### `-h | --help`

Show CLI help.

- Type: boolean
- Required: no

#### `-s | --silent`

Silences npm output.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

#### `-v | --verbose`

Show verbose npm output.

- Type: boolean
- Required: no
- Exclusive with: `--silent`

### Global flags

#### `--json`

Format output as json.

- Type: boolean
- Required: no

### Examples

```bash
[object Object]
```

```bash
[object Object]
```

```bash
[object Object]
```

---

## `sf plugins discover`

See a list of 3rd-party sf plugins you can install.

### Usage

```bash
sf plugins discover [--json] [--flags-dir <value>]
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
sf plugins discover
```

---

## `sf plugins inspect`

### Description

Displays installation properties of a plugin.

### Usage

```bash
sf plugins inspect <plugin> [--json] [--help] [--verbose]
```

### Arguments

- `plugin` (required): Plugin to inspect.

### Flags

#### `-h | --help`

Show CLI help.

- Type: boolean
- Required: no

#### `-v | --verbose`

- Type: boolean
- Required: no

### Global flags

#### `--json`

Format output as json.

- Type: boolean
- Required: no

### Examples

```bash
sf plugins inspect <%- config.pjson.oclif.examplePlugin || "myplugin" %>
```

---

## `sf plugins install`

Installs a plugin into sf.

### Description

Uses npm to install plugins.

Installation of a user-installed plugin will override a core plugin.

Use the SF_NPM_LOG_LEVEL environment variable to set the npm loglevel.
Use the SF_NPM_REGISTRY environment variable to set the npm registry.

### Aliases

- `sf plugins add`

### Usage

```bash
sf plugins install <plugin> [--json] [--force] [--help] [--silent] [--verbose]
```

### Arguments

- `plugin` (required): Plugin to install.

### Flags

#### `-f | --force`

Force npm to fetch remote resources even if a local copy exists on disk.

- Type: boolean
- Required: no

#### `-h | --help`

Show CLI help.

- Type: boolean
- Required: no

#### `-s | --silent`

Silences npm output.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

#### `-v | --verbose`

Show verbose npm output.

- Type: boolean
- Required: no
- Exclusive with: `--silent`

### Global flags

#### `--json`

Format output as json.

- Type: boolean
- Required: no

### Examples

```bash
[object Object]
```

```bash
[object Object]
```

```bash
[object Object]
```

---

## `sf plugins link`

Links a plugin into the CLI for development.

### Description

Installation of a linked plugin will override a user-installed or core plugin.

e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' command will override the user-installed or core plugin implementation. This is useful for development work.


### Usage

```bash
sf plugins link <path> [--help] [--[no-]install] [--verbose]
```

### Arguments

- `path` (required): path to plugin

### Flags

#### `-h | --help`

Show CLI help.

- Type: boolean
- Required: no

#### `--[no-]install`

Install dependencies after linking the plugin.

- Type: boolean
- Required: no

#### `-v | --verbose`

- Type: boolean
- Required: no

### Examples

```bash
sf plugins link <%- config.pjson.oclif.examplePlugin || "myplugin" %>
```

---

## `sf plugins remove`

### Description

Removes a plugin from the CLI.

### Aliases

- `sf plugins unlink`
- `sf plugins remove`

### Usage

```bash
sf plugins remove [plugin] [--help] [--verbose]
```

### Arguments

- `plugin`: plugin to uninstall

### Flags

#### `-h | --help`

Show CLI help.

- Type: boolean
- Required: no

#### `-v | --verbose`

- Type: boolean
- Required: no

### Examples

```bash
sf plugins remove <%- config.pjson.oclif.examplePlugin || "myplugin" %>
```

---

## `sf plugins reset`

Remove all user-installed and linked plugins.

### Usage

```bash
sf plugins reset [--hard] [--reinstall]
```

### Flags

#### `--hard`

Delete node_modules and package manager related files in addition to uninstalling plugins.

- Type: boolean
- Required: no

#### `--reinstall`

Reinstall all plugins after uninstalling.

- Type: boolean
- Required: no

---

## `sf plugins trust allowlist add`

Add plugins to the plugin allowlist.

### Description

The plugin allowlist lets users automatically install a plugin without being prompted, even when the plugin is unsigned.

This command adds one or more plugins to the `unsignedPluginAllowList.json` file, creating the file if it doesn't exist. Plugins already present in the allowlist are skipped.

### Usage

```bash
sf plugins trust allowlist add [--json] [--flags-dir <value>] --name <value>
```

### Flags

#### `-n | --name=<value>`

The npm name of the plugin to add to the allowlist. Add multiple plugins by specifying the `--name` flag multiple times.

- Type: option
- Required: yes
- Multiple values: yes

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

Add a single plugin to the allowlist:

```bash
sf plugins trust allowlist add --name @scope/my-plugin
```

Add multiple plugins to the allowlist:

```bash
sf plugins trust allowlist add --name @scope/my-plugin --name another-plugin
```

---

## `sf plugins trust allowlist list`

List the plugins on the plugin allowlist.

### Description

The plugin allowlist lets users automatically install a plugin without being prompted, even when the plugin is unsigned.

This command prints the contents of the `unsignedPluginAllowList.json` file as a table.

### Usage

```bash
sf plugins trust allowlist list [--json] [--flags-dir <value>]
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

List all plugins on the allowlist:

```bash
sf plugins trust allowlist list
```

---

## `sf plugins trust allowlist remove`

Remove plugins from the plugin allowlist.

### Description

The plugin allowlist lets users automatically install a plugin without being prompted, even when the plugin is unsigned.

This command removes one or more plugins from the `unsignedPluginAllowList.json` file. Plugins not present in the allowlist are skipped.

### Usage

```bash
sf plugins trust allowlist remove [--json] [--flags-dir <value>] --name <value>
```

### Flags

#### `-n | --name=<value>`

The npm name of the plugin to remove from the allowlist. Remove multiple plugins by specifying the `--name` flag multiple times.

- Type: option
- Required: yes
- Multiple values: yes

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

Remove a single plugin from the allowlist:

```bash
sf plugins trust allowlist remove --name @scope/my-plugin
```

Remove multiple plugins from the allowlist:

```bash
sf plugins trust allowlist remove --name @scope/my-plugin --name another-plugin
```

---

## `sf plugins trust verify`

Validate a digital signature.

### Description

Verifies the digital signature on an npm package matches the signature and key stored at the expected URLs.

### Usage

```bash
sf plugins trust verify [--json] [--flags-dir <value>] --npm <value> [--registry <value>]
```

### Flags

#### `-n | --npm=<value>`

Specify the npm name. This can include a tag/version.

- Type: option
- Required: yes

#### `-r | --registry=<value>`

The registry name. The behavior is the same as npm.

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

```bash
sf plugins trust verify --npm @scope/npmName --registry https://npm.pkg.github.com
```

```bash
sf plugins trust verify --npm @scope/npmName
```

---

## `sf plugins uninstall`

### Description

Removes a plugin from the CLI.

### Aliases

- `sf plugins unlink`
- `sf plugins remove`

### Usage

```bash
sf plugins uninstall [plugin] [--help] [--verbose]
```

### Arguments

- `plugin`: plugin to uninstall

### Flags

#### `-h | --help`

Show CLI help.

- Type: boolean
- Required: no

#### `-v | --verbose`

- Type: boolean
- Required: no

### Examples

```bash
sf plugins uninstall <%- config.pjson.oclif.examplePlugin || "myplugin" %>
```

---

## `sf plugins unlink`

### Description

Removes a plugin from the CLI.

### Aliases

- `sf plugins unlink`
- `sf plugins remove`

### Usage

```bash
sf plugins unlink [plugin] [--help] [--verbose]
```

### Arguments

- `plugin`: plugin to uninstall

### Flags

#### `-h | --help`

Show CLI help.

- Type: boolean
- Required: no

#### `-v | --verbose`

- Type: boolean
- Required: no

### Examples

```bash
sf plugins unlink <%- config.pjson.oclif.examplePlugin || "myplugin" %>
```

---

## `sf plugins update`

### Description

Update installed plugins.

### Usage

```bash
sf plugins update [--help] [--verbose]
```

### Flags

#### `-h | --help`

Show CLI help.

- Type: boolean
- Required: no

#### `-v | --verbose`

- Type: boolean
- Required: no
