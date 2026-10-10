# package1 Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_package1.html

## `sf package1 version create`

Create a first-generation package version in the release org.

### Description

The package version is based on the contents of the specified metadata package. Omit --managed-released if you want to create an unmanaged package version.

### Aliases

- `sf force package1 version create`

### Usage

```bash
sf package1 version create [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --package-id <value> --name <value> [--description <value>] [--version <value>] [--managed-released] [--release-notes-url <value>] [--post-install-url <value>] [--installation-key <value>] [--wait <value>]
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

#### `-i | --package-id=<value>`

ID of the metadata package (starts with 033) of which you’re creating a new version.

- Type: option
- Required: yes
- Aliases: `--packageid`

#### `-n | --name=<value>`

Package version name.

- Type: option
- Required: yes

#### `-d | --description=<value>`

Package version description.

- Type: option
- Required: no

#### `-v | --version=<value>`

Package version in major.minor format, for example, 3.2.

- Type: option
- Required: no

#### `-m | --managed-released`

Create a managed package version.

To create a beta version, don’t include this parameter.

- Type: boolean
- Required: no
- Aliases: `--managedrelease`

#### `-r | --release-notes-url=<value>`

Release notes URL.

This link is displayed in the package installation UI to provide release notes for this package version to subscribers.

- Type: option
- Required: no
- Aliases: `--releasenotesurl`

#### `-p | --post-install-url=<value>`

Post install URL.

The contents of the post-installation instructions URL are displayed in the UI after installation of the package version.

- Type: option
- Required: no
- Aliases: `--postinstallurl`

#### `-k | --installation-key=<value>`

Installation key for key-protected package (default: null).

- Type: option
- Required: no
- Aliases: `--installationkey`

#### `-w | --wait=<value>`

Minutes to wait for the package version to be created (default: 2 minutes).

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

Create a first-generation package version from the package with the specified ID and name the package version "example"; use your default org:

```bash
sf package1 version create --package-id 033... --name example
```

Same as previous example, but provide a description and wait for 30 minutes for the package version to be created; use the specified org:

```bash
sf package1 version create --package-id 033... --name example --description "example description" --wait 30 --target-org myorg@example.com
```

---

## `sf package1 version create get`

Retrieve the status of a package version creation request.

### Aliases

- `sf force package1 version create get`

### Usage

```bash
sf package1 version create get [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --request-id <value>
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

#### `-i | --request-id=<value>`

ID of the PackageUploadRequest (starts with 0HD).

- Type: option
- Required: yes
- Aliases: `--requestid`

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

Get the status of the creation request for the package version with the specified ID in your default org:

```bash
sf package1 version create get --request-id 0HD...
```

Same as previous example, but use the specified org:

```bash
sf package1 version create get --request-id 0HD... --target-org myorg@example.com
```

---

## `sf package1 version display`

Display details about a first-generation package version.

### Aliases

- `sf force package1 version display`

### Usage

```bash
sf package1 version display [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --package-version-id <value>
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

#### `-i | --package-version-id=<value>`

ID (starts with 04t) of the metadata package version whose details you want to display.

- Type: option
- Required: yes
- Aliases: `--packageversionid`

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

Display details about the first-generation package version with the specified ID in your default org:

```bash
sf package1 version display --package-version-id 04t...
```

Same as previous example, but use the specified org:

```bash
sf package1 version display --package-version-id 04t... --target-org myorg@example.com
```

---

## `sf package1 version list`

List package versions for the specified first-generation package or for the org.

### Aliases

- `sf force package1 version list`

### Usage

```bash
sf package1 version list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--package-id <value>]
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

#### `-i | --package-id=<value>`

Metadata package ID (starts with 033) whose package versions you want to list.

If not specified, shows all versions for all packages (managed and unmanaged) in the org.

- Type: option
- Required: no
- Aliases: `--packageid`

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

List all first-generation package versions in your default org:

```bash
sf package1 version list
```

List package versions for the specified first-generation package in the specifief org:

```bash
sf package1 version list --package-id 033... --target-org myorg@example.com
```
