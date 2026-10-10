# Hidden Commands

Salesforce CLI version: `2.150.6`

Commands flagged `hidden` in the CLI manifest. Not verified against the official command reference site.

## `sf autocomplete create`

### Description

create autocomplete setup scripts and completion functions

### Usage

```bash
sf autocomplete create
```

---

## `sf autocomplete script`

### Description

outputs autocomplete config script for shells

### Usage

```bash
sf autocomplete script [shell]
```

### Arguments

- `shell`: Shell type

---

## `sf dev configure repo`

Configure a GitHub repo for the GitHub Actions pipeline.

### Description

Sets up labels and exempts the CLI bot for branch protection and PR rules.

### Usage

```bash
sf dev configure repo [--json] [--flags-dir <value>] --repository <value> [--dry-run] [--bot <value>]
```

### Flags

#### `-r | --repository=<value>`

GitHub owner/repo for which you want to configure GitHub Actions.

- Type: option
- Required: yes

#### `-d | --dry-run`

Make no changes.

- Type: boolean
- Required: no
- Aliases: `--dryrun`

#### `-b | --bot=<value>`

GitHub login/username for the bot.

- Type: option
- Required: no
- Default: `SF-CLI-BOT`

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

Configure the repo "testPackageRelease", with owner "salesforcecli", for GitHub Actions.

```bash
sf dev configure repo --repository salesforcecli/testPackageRelease
```

---

## `sf dev configure secrets`

Ensures a GitHub repo has correct access to secrets based on its workflows.

### Description

Inspects a repo's yaml files and verifies that secrets required are available for the repo (either set at the repo level or shared via organization-level secrets).

This command requires scope:admin permissions to inspect the org secrets and admin access to the repo to inspect the repo secrets.

### Usage

```bash
sf dev configure secrets [--json] [--flags-dir <value>] --repository <value> [--dry-run]
```

### Flags

#### `-r | --repository=<value>`

Github owner/repo.

- Type: option
- Required: yes

#### `-d | --dry-run`

Make no changes.

- Type: boolean
- Required: no
- Aliases: `--dryrun`

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
Ensure secrets access for the repo "testPackageRelease", with owner "salesforcecli":
```

```bash
sf dev configure secrets --repository salesforcecli/testPackageRelease
```

---

## `sf dev generate library`

Generate a new library.

### Description

This command is interactive. You're prompted for information to populate the new library, such as the npm scope (which must start with "@"), the name and description of the library, and its GitHub organization. The command clones the 'forcedotcom/library-template' GitHub repository, installs the library's npm package dependencies using yarn install, and updates the package properties.

When the command completes, your new library contains a few sample source and test files to get you started.

### Usage

```bash
sf dev generate library [--flags-dir <value>] [--dry-run]
```

### Flags

#### `--dry-run`

Display the changes that would be made without writing them to disk.

- Type: boolean
- Required: no

### Global flags

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

```bash
sf dev generate library
```

---

## `sf flow get log`

Status: preview

Display test results for a specific asynchronous test run.

### Description

Provide a flow test run ID to display test results for an enqueued or completed asynchronous test run. The test run ID is displayed after running the "sf flow run test" command.

To see code coverage results, use the --code-coverage flag with --result-format. The output displays a high-level summary of the test run and the code coverage values for flow tests in your org. If you specify human-readable result format, use the --detailed-coverage flag to see detailed coverage results for each test method run.

### Usage

```bash
sf flow get log [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--log-id <value>] [--number <value>] [--output-dir <value>]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `-i | --log-id=<value>`

ID of the specific log to display.

- Type: option
- Required: no

#### `-n | --number=<value>`

Number of the most recent logs to display.

- Type: option
- Required: no

#### `-d | --output-dir=<value>`

Directory in which to store test result files.

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

Display flow test results for your default org using a test run ID:

```bash
sf flow get log --test-run-id <test run id>
```

Similar to previous example, but output the result in JUnit format:

```bash
sf flow get log --test-run-id <test run id> --result-format junit
```

Also retrieve code coverage results and output in JSON format:

```bash
sf flow get log --test-run-id <test run id> --code-coverage --json
```

Specify a directory in which to save the test results from the org with the “me@my.org” username (rather than your default org):

```bash
sf flow get log --test-run-id <test run id> --code-coverage --output-dir <path to outputdir> --target-org me@my.org'
```

---

## `sf node info`

Returns the path to node and npx files bundled by the Salesforce CLI.

### Description

Command for internal use only.

### Usage

```bash
sf node info [--json] [--flags-dir <value>]
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

---

## `sf package bundle create`

Status: beta

Create a package bundle in the Dev Hub org.

### Description

A package bundle is an artifact composed of one or more 2GP managed packages. With a package bundle, you can develop, install, upgrade, and manage multiple packages as a single unit.

### Usage

```bash
sf package bundle create [--json] [--flags-dir <value>] --name <value> [--description <value>] --target-dev-hub <value> [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the package bundle.

- Type: option
- Required: yes

#### `-d | --description=<value>`

Description of the package bundle.

- Type: option
- Required: no

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

Create a package bundle in the Dev Hub org; uses the Dev Hub org with the username devhub@example.com:

```bash
sf package bundle create --name "Your bundle name" --description "Your bundle description" --target-dev-hub devhub@example.com
```

---

## `sf package bundle delete`

Status: beta

Delete a package bundle.

### Description

Specify the ID or alias of the package bundle you want to delete. Before you delete a package bundle, first delete all associated package bundle versions.

### Usage

```bash
sf package bundle delete [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--no-prompt] --bundle <value>
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

#### `-n | --no-prompt`

Don't prompt before deleting the package bundle.

- Type: boolean
- Required: no

#### `-b | --bundle=<value>`

ID (starts with 1Fl) or alias of the package bundle to delete.

- Type: option
- Required: yes

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

Delete a package bundle using its alias from your default Dev Hub org:

```bash
sf package bundle delete --bundle "Your Bundle Alias"
```

Delete a package bundle using its ID from the specified Dev Hub org:

```bash
sf package bundle delete --bundle 1Fl... --target-dev-hub devhub@example.com
```

---

## `sf package bundle install`

Status: beta

Install a specific version of a package bundle in the target org.

### Description

During developer preview, package bundles can be installed only in scratch orgs. To install a package bundle in a scratch org, add the PackageBundles feature to the scratch org definition file.

### Usage

```bash
sf package bundle install [--json] [--flags-dir <value>] --bundle <value> --target-org <value> [--api-version <value>] --dev-hub-org <value> [--wait <value>] [--verbose]
```

### Flags

#### `-b | --bundle=<value>`

Package bundle version to install. The valid format is BundleName@VersionNumber, such as "MyPkgBundle@0.1".

- Type: option
- Required: yes

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

#### `-d | --dev-hub-org=<value>`

Username, alias, or ID of the Dev Hub org where the bundle was created.

Enter the username, alias, or ID of the Dev Hub org, such as "admin@example.com", "myDevHub", or "00Dxx0000000000".

- Type: option
- Required: yes

#### `-w | --wait=<value>`

Number of minutes to wait for the installation to complete.

- Type: option
- Required: no
- Default: `0`

#### `--verbose`

Display extended details about the installation.

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

Install a package bundle version in a scratch org and wait 10 minutes for the installation to complete:

```bash
sf package bundle install --bundle MyPkgBundle1@0.1 --target-org my-scratch-org --dev-hub-org devhub@example.com --wait 10
```

---

## `sf package bundle install report`

Status: beta

Report on the status of a package bundle installation request.

### Description

The command returns information such as the current status of the request and details about the package bundle version being installed.

### Usage

```bash
sf package bundle install report [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --package-install-request-id <value> [--verbose]
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

#### `-i | --package-install-request-id=<value>`

ID of the package bundle installation request to report on.

- Type: option
- Required: yes

#### `--verbose`

Show verbose output.

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

Report on a package bundle installation request:

```bash
sf package bundle install report --package-install-request-id 0Ho0x0000000000000
```

---

## `sf package bundle installed list`

Status: beta

List all installed package bundles in the target org.

### Description

Displays information about all package bundles installed in the target org, including the bundle details and the associated packages with their expected and actual versions.

### Usage

```bash
sf package bundle installed list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

List all installed package bundles in your default org:

```bash
sf package bundle installed list
```

List all installed package bundles in the example org myorg@example.com:

```bash
sf package bundle installed list --target-org myorg@example.com
```

---

## `sf package bundle list`

Status: beta

List all package bundles in the Dev Hub org.

### Usage

```bash
sf package bundle list [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--verbose]
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

#### `--verbose`

Display extended details about the package bundles.

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

List all package bundles in the Dev Hub org with the username `devhub@example.com`:

```bash
sf package bundle list --target-dev-hub devhub@example.com
```

---

## `sf package bundle uninstall`

Status: beta

Uninstall a package bundle version from a target org.

### Description

To start an uninstall request, provide the package bundle version ID or alias and the target org. Optionally enter the number of minutes to wait for the uninstall to complete. If the time to uninstall exceeds the number of minutes, the request times out.

### Usage

```bash
sf package bundle uninstall [--json] [--flags-dir <value>] --bundle <value> --target-org <value> [--api-version <value>] [--wait <value>] [--verbose]
```

### Flags

#### `-b | --bundle=<value>`

ID (starts with 1Q8) or alias of the package bundle version to uninstall.

- Type: option
- Required: yes

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

#### `-w | --wait=<value>`

Number of minutes to wait for the uninstall request to complete.

- Type: option
- Required: no
- Default: `0`

#### `--verbose`

Show additional progress information while waiting for the uninstall to finish.

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

Uninstall a bundle version by ID from the example org myorg@example.com:

```bash
sf package bundle uninstall --bundle 1Q8... --target-org myorg@example.com
```

Uninstall a bundle version by alias from your default org and wait up to 10 minutes to complete:

```bash
sf package bundle uninstall --bundle MyBundle@1.2 --wait 10
```

---

## `sf package bundle version create`

Status: beta

Create a new package bundle version.

### Description

Before you create a new bundle version, create a definition file (similar to a scratch org definition file) that contains the list of package versions to include in the bundle. The definition file must be JSON and you must specify the package versions in the correct order of installation. The package bundle version is based on package versions listed in the definition file.

After the first bundle version that you create, make sure to update the version number in the sfdx-project.json file for subsequent bundle versions.

To retrieve details about a package bundle version create request, including status and package bundle version ID (04t), run "sf package version create report -i 08c...".

### Usage

```bash
sf package bundle version create [--json] [--flags-dir <value>] --bundle <value> [--description <value>] --definition-file <value> --target-dev-hub <value> [--api-version <value>] [--wait <value>] [--verbose] [--version-number <value>]
```

### Flags

#### `-b | --bundle=<value>`

Name or ID of the package bundle to create a version for.

- Type: option
- Required: yes

#### `-d | --description=<value>`

Description of the package bundle version.

- Type: option
- Required: no

#### `-p | --definition-file=<value>`

Path to a definition file, similar to a scratch org definition file, that contains the list of package versions to include in the bundle.

- Type: option
- Required: yes

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

#### `-w | --wait=<value>`

Number of minutes to wait for the package bundle version to be created.

- Type: option
- Required: no
- Default: `0`

#### `--verbose`

Show verbose output of the command execution.

- Type: boolean
- Required: no

#### `-n | --version-number=<value>`

Version number of the package bundle version to be created; overrides the sfdx-project.json value.

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

Create a package bundle version in the Dev Hub org; uses the Dev Hub org with the username devhub@example.com:

```bash
sf package bundle version create --bundle “Your bundle name” --definition-file resources/definition.json --target-dev-hub devhub@example.com
```

---

## `sf package bundle version create list`

Status: beta

List package bundle version creation requests.

### Description

Shows the details of each request to create a package bundle version in the Dev Hub org.

All filter parameters are applied using the AND logical operator (not OR).

To get information about a specific request, run "sf package bundle version create report" and enter the request ID.

### Usage

```bash
sf package bundle version create list [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--created-last-days <value>] [--status <value>] [--verbose]
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

#### `-c | --created-last-days=<value>`

Number of days since the request was created, starting at 0. Use 0 for today.

- Type: option
- Required: no

#### `-s | --status=<value>`

Status of the installation request, used to filter the list.

- Type: option
- Required: no
- Permitted values: `Queued`, `InProgress`, `Success`, `Error`

#### `--verbose`

Display additional information, such as the version name and number for each package bundle version creation request.

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

List all package bundle version creation requests in your default Dev Hub org:

```bash
sf package bundle version create list
```

List package bundle version creation requests from the last three days in the Dev Hub org with the username devhub@example.com:

```bash
sf package bundle version create list --created-last-days 3 --target-dev-hub devhub@example.com
```

List package bundle version creation requests with the Error status:

```bash
sf package bundle version create list --status Error
```

List package bundle version creation requests with the Queued status:

```bash
sf package bundle version create list --status Queued
```

List package bundle version creation requests from today with the Success status:

```bash
sf package bundle version create list --created-last-days 0 --status Success
```

---

## `sf package bundle version create report`

Status: beta

Report on the status of a package bundle version creation request.

### Description

The command returns information such as the request's current status and details about the package bundle version being created.

### Usage

```bash
sf package bundle version create report [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --bundle-version-create-request-id <value>
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

#### `-i | --bundle-version-create-request-id=<value>`

ID of the package bundle version creation request to report on.

- Type: option
- Required: yes

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

Report on a package bundle version creation request:

```bash
sf package bundle version create report --package-create-request-id 0Ho0x0000000000000
```

---

## `sf package bundle version list`

Status: beta

List all package bundle versions in the Dev Hub org.

### Usage

```bash
sf package bundle version list [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--verbose]
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

#### `--verbose`

Display extended details about the package bundle versions.

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

List package bundle versions in the Dev Hub org with the username devhub@example.com:

```bash
sf package bundle version list --target-dev-hub devhub@example.com
```

---

## `sf package bundle version report`

Status: beta

Retrieve details about a specific package bundle version.

### Usage

```bash
sf package bundle version report [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --bundle-version <value> [--verbose]
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

#### `-b | --bundle-version=<value>`

Name or ID of the package bundle version to retrieve details about.

- Type: option
- Required: yes

#### `--verbose`

Display extended details about the package bundle version.

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

Retrieve details about the package bundle version; uses the Dev Hub org with the username devhub@example.com:

```bash
sf package bundle version report --bundle-version "Your bundle version name or ID" --target-dev-hub devhub@example.com
```

---

## `sf telemetry`

### Usage

```bash
sf telemetry [--json] [--flags-dir <value>]
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

---

## `sf template generate ui-embedding`

Status: beta

Generate a Lightning Web Component (LWC) bundle that wraps the \<lightning-ui-embedding\> base component.

### Description

The generated LWC bundle consumes the first-party \<lightning-ui-embedding\> component, which is pre-wired with the three required attributes: the embedding URL (src), iframe sandbox tokens, and an accessible iframe title (shell-title).

The generated LWC bundle contains four files (.html, .js, .js-meta.xml, .css) in a directory named with the camelCased component name. The bundle must live under a parent folder named "lwc".

### Usage

```bash
sf template generate ui-embedding [--json] [--flags-dir <value>] --name <value> --src <value> --sandbox <value> --shell-title <value> [--output-dir <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated component; must be in PascalCase format.

The component name is also used (camelCased) as the LWC folder name and file stem. Must contain only alphanumeric characters and start with a letter.

- Type: option
- Required: yes

#### `-s | --src=<value>`

Absolute HTTPS URL that the iframe will load.

The URL is bound to the \<lightning-ui-embedding\> "src" attribute as a reactive property in the generated LWC. Must use HTTPS; plain HTTP is allowed only for localhost or 127.0.0.1 (for local development).

- Type: option
- Required: yes

#### `--sandbox=<value>`

Iframe sandbox token. Specify this flag multiple times to set more than one token.

Each token is written into the space-separated "sandbox" attribute on \<lightning-ui-embedding\>. Only W3C-defined sandbox tokens are accepted.

- Type: option
- Required: yes
- Multiple values: yes
- Permitted values: `allow-forms`, `allow-modals`, `allow-orientation-lock`, `allow-pointer-lock`, `allow-popups`, `allow-popups-to-escape-sandbox`, `allow-presentation`, `allow-same-origin`, `allow-scripts`, `allow-storage-access-by-user-activation`, `allow-top-navigation`, `allow-top-navigation-by-user-activation`

#### `--shell-title=<value>`

Accessible title for the embedded iframe.

Written to the "shell-title" attribute on \<lightning-ui-embedding\> and used as the iframe's accessible name (announced by screen readers).

- Type: option
- Required: yes

#### `-d | --output-dir=<value>`

Directory for saving the created files.

The location can be an absolute path or relative to the current working directory. The default is the current directory.

- Type: option
- Required: no
- Default: `.`
- Aliases: `--outputdir`

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

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

Generate an embedding wrapper LWC in the current directory:

```bash
sf template generate ui-embedding --name MyEmbeddingWrapper --src https://app.example.com --sandbox allow-forms --shell-title "Expense Report Embedding"
```

Generate an embedding wrapper LWC in the "force-app/main/default/lwc" directory with multiple sandbox tokens:

```bash
sf template generate ui-embedding --name MyEmbeddingWrapper --src https://app.example.com --sandbox allow-forms --sandbox allow-scripts --shell-title "Expense Report Embedding" --output-dir force-app/main/default/lwc
```

---

## `sf ui-bundle upload`

Status: preview

Upload a UI Bundle to your org.

### Description

Use this command to upload a React-based UI Bundle to your Salesforce org. Provide the bundle source as either a compressed ZIP file (--zip-file) or an uncompressed source directory (--bundle-dir). This command compresses the directory for you. This command can be used by both admin and non-admin users.

The upload is asynchronous. View the UI bundle in your org to verify upload completion.

### Usage

```bash
sf ui-bundle upload [--json] [--flags-dir <value>] [--zip-file <value>] [--bundle-dir <value>] --use-salesforce-pages --target-org <value> [--api-version <value>] [--bundle-name <value>]
```

### Flags

#### `-z | --zip-file=<value>`

Path to the compressed UI Bundle source to upload.

- Type: option
- Required: no

#### `-d | --bundle-dir=<value>`

Path to an uncompressed UI Bundle source directory. This command compresses the directory into a ZIP file before uploading.

- Type: option
- Required: no

#### `--use-salesforce-pages`

Upload UI Bundle to Salesforce Pages. This is a required flag as only Salesforce Pages uploads are currently supported.

- Type: boolean
- Required: yes

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `--bundle-name=<value>`

Name to associate with the uploaded UI Bundle.

A human-readable name for the UI Bundle. If not specified, defaults to the base name of --bundle-dir or --zip-file, with any .zip extension removed. When used with --bundle-dir, this name also becomes the zip's top-level directory name, so it must start with a letter and contain only letters, numbers, and underscores after that.

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

Upload a UI Bundle to Salesforce Pages using your default org:

```bash
sf ui-bundle upload --zip-file my-compressed-bundle.zip --use-salesforce-pages
```

Upload an uncompressed source directory (auto-compressed by the CLI):

```bash
sf ui-bundle upload --bundle-dir ./my-bundle-src --use-salesforce-pages
```

Upload to a specific org by alias:

```bash
sf ui-bundle upload --zip-file my-compressed-bundle.zip --use-salesforce-pages --target-org my-org
```
