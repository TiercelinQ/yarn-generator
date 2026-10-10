# package Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_package.html

## `sf package convert`

Convert a managed-released first-generation managed package into a second-generation managed package.

### Description

The package conversion command automatically selects the latest released major.minor first-generation managed package version, and converts it into a second-generation managed package version.

Use --patch-version to specify a released patch version.

To retrieve details about a package version create request, including status and package version ID (04t), run "sf package version create report -i 08c...".

To protect the contents of your package and to prevent unauthorized installation of your package, specify the --installation-key flag.

To promote a package version to released, you must use the --code-coverage parameter. The package must also meet the code coverage requirements.

To list package version creation requests in the org, run "sf package version create list".

### Aliases

- `sf force package convert`

### Usage

```bash
sf package convert [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--installation-key <value>] [--definition-file <value>] [--installation-key-bypass] [--wait <value>] [--seed-metadata <value>] [--verbose] [--patch-version <value>] [--code-coverage]
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

ID (starts with 033) of the first-generation managed package to convert.

- Type: option
- Required: yes

#### `-k | --installation-key=<value>`

Installation key for key-protected package.

Either an --installation-key value or the --installation-key-bypass flag is required.

- Type: option
- Required: no
- Aliases: `--installationkey`

#### `-f | --definition-file=<value>`

Path to a definition file that contains features and org preferences that the metadata of the package version depends on.

This definition file is similar to the scratch org definition file.

- Type: option
- Required: no
- Aliases: `--definitionfile`

#### `-x | --installation-key-bypass`

Bypass the installation key requirement.

If you bypass this requirement, anyone can install your package. Either an --installation-key value or the --installation-key-bypass flag is required.

- Type: boolean
- Required: no
- Aliases: `--installationkeybypass`

#### `-w | --wait=<value>`

Minutes to wait for the package version to be created.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-m | --seed-metadata=<value>`

Directory containing metadata to be deployed prior to conversion.

The directory containing metadata that will be deployed on the build org prior to attempting package conversion.

- Type: option
- Required: no

#### `--verbose`

Display verbose command output.

- Type: boolean
- Required: no

#### `-a | --patch-version=<value>`

Specific released patch version to be converted.

Specify a released patch version as major.minor.patch to convert to a second-generation managed package version.

- Type: option
- Required: no
- Aliases: `--patchversion`

#### `-c | --code-coverage`

Calculate and store the code coverage percentage by running the packaged Apex tests included in this package version.

Before you can promote and release a managed package version, the Apex code must meet a minimum 75% code coverage requirement.

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

Create a second-generation managed package version from the first-generation managed package with the specified ID and give it the installation key "password123"; uses your default Dev Hub org:

```bash
sf package convert --package 033... --installation-key password123
```

Similar to previous example, but uses the specified Dev Hub org:

```bash
sf package convert --package 033... --installation-key password123 --target-dev-hub devhuborg@example.com
```

---

## `sf package create`

Create a package.

### Description

First, use this command to create a package. Then create a package version.

If you don’t have a namespace defined in your sfdx-project.json file, use --no-namespace.

Your --name value must be unique within your namespace.

Run 'sf package list to list all packages in the Dev Hub org.

### Aliases

- `sf force package create`

### Usage

```bash
sf package create [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --name <value> --package-type <value> [--description <value>] [--no-namespace] --path <value> [--org-dependent] [--error-notification-username <value>]
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

#### `-n | --name=<value>`

Name of the package to create.

- Type: option
- Required: yes

#### `-t | --package-type=<value>`

Type of package.

The options for package type are Managed and Unlocked (Managed=DeveloperManagedSubscriberManaged, Unlocked=DeveloperControlledSubscriberEditable). These options determine upgrade and editability rules.

- Type: option
- Required: yes
- Permitted values: `Managed`, `Unlocked`
- Aliases: `--packagetype`

#### `-d | --description=<value>`

Description of the package.

- Type: option
- Required: no

#### `-e | --no-namespace`

Create the package with no namespace; available only for unlocked packages.

This flag is useful when you’re migrating an existing org to packages. But use a namespaced package for new metadata.

- Type: boolean
- Required: no
- Aliases: `--nonamespace`

#### `-r | --path=<value>`

Path to directory that contains the contents of the package.

- Type: option
- Required: yes

#### `--org-dependent`

Depends on unpackaged metadata in the installation org; applies to unlocked packages only.

Use Source Tracking in Sandboxes to develop your org-dependent unlocked package. For more information, see "Create Org-Dependent Unlocked Packages" in the Salesforce DX Developer Guide.

- Type: boolean
- Required: no
- Aliases: `--orgdependent`

#### `-o | --error-notification-username=<value>`

Active Dev Hub user designated to receive email notifications for package errors.

Email notifications include information about unhandled Apex exceptions, and install, upgrade, or uninstall failures associated with your package.

- Type: option
- Required: no
- Aliases: `--errornotificationusername`

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

Create an unlocked package from the files in the "force-app" directory; uses your default Dev Hub org:

```bash
sf package create --name MyUnlockedPackage --package-type Unlocked --path force-app
```

Create a managed packaged from the "force-app" directory files, give the package a description, and use the specified Dev Hub org:

```bash
sf package create --name MyManagedPackage --description "Your Package Descripton" --package-type Managed --path force-app --target-dev-hub devhub@example.com
```

---

## `sf package delete`

Delete a package.

### Description

Specify the ID or alias of the package you want to delete.

Delete unlocked and second-generation managed packages. Before you delete a package, first delete all associated package versions.

### Aliases

- `sf force package delete`

### Usage

```bash
sf package delete [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--no-prompt] --package <value>
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

Don't prompt before deleting the package.

- Type: boolean
- Required: no
- Aliases: `--noprompt`

#### `-p | --package=<value>`

ID (starts with 0Ho) or alias of the package to delete.

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

Delete a package using its alias from your default Dev Hub org:

```bash
sf package delete --package "Your Package Alias"
```

Delete a package using its ID from the specified Dev Hub org:

```bash
sf package delete --package 0Ho... --target-dev-hub devhub@example.com
```

---

## `sf package install`

Install or upgrade a version of a package in the target org.

### Description

To install or upgrade a package, specify a specific version of the package using the 04t package ID. The package and the version you specified installs in your default target org unless you supply the username for a different target org.

When upgrading an unlocked package, include the --upgrade-type value to specify whether any removed components are deprecated or deleted. To delete components that can be safely deleted and deprecate the others, specify "--upgrade-type Mixed" (the default). To deprecate all removed components, specify "--upgrade-type DeprecateOnly". To delete all removed components, except for custom objects and custom fields, that don't have dependencies, specify "--upgrade-type Delete". (Note: This option can result in the loss of data that is associated with the deleted components.)

### Aliases

- `sf force package install`

### Usage

```bash
sf package install [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--wait <value>] [--installation-key <value>] [--publish-wait <value>] [--no-prompt] --package <value> [--apex-compile <value>] [--security-type <value>] [--upgrade-type <value>]
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

#### `-w | --wait=<value>`

Number of minutes to wait for installation status.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-k | --installation-key=<value>`

Installation key for key-protected package (default: null).

- Type: option
- Required: no
- Aliases: `--installationkey`

#### `-b | --publish-wait=<value>`

Maximum number of minutes to wait for the Subscriber Package Version ID to become available in the target org before canceling the install request.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--publishwait`

#### `-r | --no-prompt`

Don't prompt for confirmation.

Allows the following without an explicit confirmation response: 1) Remote Site Settings and Content Security Policy websites to send or receive data, and 2) --upgrade-type Delete to proceed.

- Type: boolean
- Required: no
- Aliases: `--noprompt`

#### `-p | --package=<value>`

ID (starts with 04t) or alias of the package version to install.

- Type: option
- Required: yes

#### `-a | --apex-compile=<value>`

Compile all Apex in the org and package, or only Apex in the package; unlocked packages only.

Applies to unlocked packages only. Specifies whether to compile all Apex in the org and package, or only the Apex in the package.

For package installs into production orgs, or any org that has Apex Compile on Deploy enabled, the platform compiles all Apex in the org after the package install or upgrade operation completes.

This approach assures that package installs and upgrades don’t impact the performance of an org, and is done even if --apex-compile package is specified.

- Type: option
- Required: no
- Permitted values: `all`, `package`
- Default: `all`
- Aliases: `--apexcompile`

#### `-s | --security-type=<value>`

Security access type for the installed package. Available options are AdminsOnly and AllUsers.

- Type: option
- Required: no
- Permitted values: `AllUsers`, `AdminsOnly`
- Default: `AdminsOnly`
- Aliases: `--securitytype`

#### `-t | --upgrade-type=<value>`

Upgrade type for the package installation; available only for unlocked packages.

For unlocked package upgrades, set this flag to one of these values:

- DeprecateOnly: Mark all removed components as deprecated.
- Mixed: Delete all removed components that can be safely deleted and deprecate the other components.
- Delete: Delete removed components, except for custom objects and custom fields, that don't have dependencies.

- Type: option
- Required: no
- Permitted values: `DeprecateOnly`, `Mixed`, `Delete`
- Default: `Mixed`
- Aliases: `--upgradetype`

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

Install or upgrade a package version with the specified ID in the org with username "me@example.com":

```bash
sf package install --package 04t... --target-org me@example.com
```

Install or upgrade a package version with the specified alias into your default org:

```bash
sf package install --package awesome_package_alias
```

Install or upgrade a package version with an alias that includes spaces into your default org:

```bash
sf package install --package "Awesome Package Alias"
```

Upgrade an unlocked package version with the specified ID and deprecate all removed components:

```bash
sf package install --package 04t... --upgrade-type DeprecateOnly
```

---

## `sf package install report`

Retrieve the status of a package installation request.

### Aliases

- `sf force package install report`

### Usage

```bash
sf package install report [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --request-id <value>
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

ID of the package install request you want to check; starts with 0Hf.

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

Retrieve the status of a package installation request with the specified ID on your default org:

```bash
sf package install report --request-id 0Hf...
```

Similar to previous example, except use the org with username me@example.com:

```bash
sf package install report --request-id 0Hf... --target-org me@example.com
```

---

## `sf package installed list`

List the org’s installed packages.

### Aliases

- `sf force package installed list`

### Usage

```bash
sf package installed list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

List the installed packages in your default org:

```bash
sf package installed list
```

List the installed packages in the org with username me@example.com:

```bash
sf package installed list --target-org me@example.com
```

---

## `sf package list`

List all packages in the Dev Hub org.

### Description

Description

### Aliases

- `sf force package list`

### Usage

```bash
sf package list [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--verbose]
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

Display extended package detail.

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

List all packages in the specified Dev Hub org:

```bash
sf package list --target-dev-hub devhub@example.com
```

List all packages details in the specified Dev Hub org, and show extended details about each package:

```bash
sf package list --target-dev-hub devhub@example.com --verbose
```

---

## `sf package push-upgrade abort`

Abort a package push upgrade that has been scheduled. Only push upgrade requests with a status of Created or Pending can be aborted.

### Description

Specify the request ID that you want to abort. If applicable, the command displays errors related to the request.

To show all requests in the org, run "sf package pushupgrade list --package 033...".

### Usage

```bash
sf package push-upgrade abort [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --push-request-id <value>
```

### Flags

#### `-v | --target-dev-hub=<value>`

Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `-i | --push-request-id=<value>`

ID of the package push request (starts with 0DV). This ID is returned after the package push-upgrade schedule command completes successfully.

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

Cancel the specified package push upgrade request with the specified ID; uses your default Dev Hub org:

```bash
sf package push-upgrade abort --push-request-id 0DV...
```

Cancel the specified package push upgrade request in the Dev Hub org with username devhub@example.com:

```bash
sf package push-upgrade abort --push-request-id 0DV... --target-dev-hub devhub@example.com
```

---

## `sf package push-upgrade list`

Lists the status of push upgrade requests for a given package.

### Description

Shows the details of each request to create a push upgrade in the Dev Hub org.

All filter parameters are applied using the AND logical operator (not OR).

To get information about a specific request, run "sf package pushupgrade report" and supply the request ID.

### Aliases

- `sf force package push-upgrade list`

### Usage

```bash
sf package push-upgrade list [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--scheduled-last-days <value>] [--status <value>] [--show-push-migrations-only]
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
sf package push-upgrade list --package 033xyz --target-dev-hub myHub
```

List all package push upgrade requests in the specified Dev Hub org scheduled in the last 30 days:

```bash
sf package push-upgrade list --package 033xyz --scheduled-last-days 30 --target-dev-hub myHub
```

List all package push upgrade with a status Succeeded:

```bash
sf package push-upgrade list --package 033xyz –-status Succeeded
```

List all package push upgrade with a status Failed:

```bash
sf package push-upgrade list --package 033xyz –-status Failed
```

---

## `sf package push-upgrade report`

Retrieve the status of a package push upgrade.

### Description

Specify the request ID for which you want to view details. If applicable, the command displays errors related to the request.

To show all requests in the org, run "sf package pushupgrade list".

### Aliases

- `sf force package push-upgrade report`

### Usage

```bash
sf package push-upgrade report [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --push-request-id <value>
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

#### `-i | --push-request-id=<value>`

ID of the package push request (starts with 0DV). This ID is returned after the package push-upgrade schedule command completes successfully.

- Type: option
- Required: yes
- Aliases: `--pushrequestid`

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

Retrieve details about the package push upgrade with the specified ID; uses your default Dev Hub org:

```bash
sf package push-upgrade report --push-request-id 0DV...
```

Retrieve details about the specified package push request in the Dev Hub org with username devhub@example.com:

```bash
sf package push-upgrade report --push-request-id 0DV... --target-dev-hub devhub@example.com
```

---

## `sf package push-upgrade schedule`

Schedule a package push upgrade.

### Description

Represents a push upgrade request for upgrading a package in one or many orgs from one version to another version.
To initiate a push upgrade for an unlocked or second-generation managed package, the Create and Update Second-Generation Packages user permission is required.
For second-generation managed packages, the push upgrade feature is available only for packages that have passed AppExchange security review. To enable push upgrades for your managed package, log a support case in the Salesforce Partner Community.
For unlocked packages, push upgrades are enabled by default.

Use the -–migrate-to-2GP flag to indicate you’re installing a converted second-generation managed package into an org that has the first-generation managed package version of that package installed.

### Usage

```bash
sf package push-upgrade schedule [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--start-time <value>] [--org-list <value>] [--org-file <value>] [--migrate-to-2gp]
```

### Flags

#### `-v | --target-dev-hub=<value>`

Username or alias of the Dev Hub org that owns the package.

Overrides the value of the target-dev-hub configuration variable, if set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-p | --package=<value>`

ID (starts with 04t) of the package version that the package is being upgraded to. The package version must be an active, non-beta package version.

- Type: option
- Required: yes

#### `-t | --start-time=<value>`

Date and time (UTC) when the push upgrade is processed. Set to the earliest time that you want Salesforce to attempt to start the upgrade.

Scheduled push upgrades begin as soon as resources are available on the Salesforce instance, which is either at or after the start time you specify. In certain scenarios, the push upgrade starts a few hours after the scheduled start time.

As a best practice, schedule push upgrades at off-peak hours like 1:00 AM Saturday.  
If you don't specify this flag, the push upgrade is scheduled to run as soon as resources are available on the Salesforce instance.

- Type: option
- Required: no

#### `-l | --org-list=<value>`

Comma-separated list of subscriber org IDs that need the package upgrade. Either --org-list or --org-file must be specified.

- Type: option
- Required: no
- Exclusive with: `--org-file`

#### `-f | --org-file=<value>`

Filename of the CSV file that contains the list of subscriber org IDs that need the package upgrade. Either --org-list or --org-file must be specified.

The file must contain one org per line. The org ID must be the only value in each row.
All listed orgs must have a package version installed in their org that is lower than the package version you specified for the --package flag.

- Type: option
- Required: no
- Exclusive with: `--org-list`

#### `--migrate-to-2gp`

Upgrade from a first-generation managed package (1GP) to a second-generation managed package (2GP). Required when you’re pushing a 2GP package to orgs with the 1GP version installed.

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

Schedule a push upgrade that initiates at a specified time:

```bash
sf package push-upgrade schedule --package 04txyz --start-time "2024-12-06T21:00:00" --org-file upgrade-orgs.csv --target-dev-hub myHub
```

Schedule a push upgrade that initiates as soon as possible:

```bash
sf package push-upgrade schedule --package 04txyz --org-file upgrade-orgs.csv --target-dev-hub myHub
```

Schedule a push migration from a 1GP package to a 2GP package:

```bash
sf package push-upgrade schedule --migrate-to-2gp --package 04txyz --start-time "2024-12-06T21:00:00" --org-file upgrade-orgs.csv --target-dev-hub myHub
```

---

## `sf package uninstall`

Uninstall a second-generation package from the target org.

### Description

Specify the package ID for a second-generation package.

To list the org’s installed packages, run "sf package installed list".

To uninstall a first-generation package, from Setup, enter Installed Packages in the Quick Find box, then select Installed Packages.

### Aliases

- `sf force package uninstall`

### Usage

```bash
sf package uninstall [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--wait <value>] --package <value>
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

#### `-w | --wait=<value>`

Number of minutes to wait for uninstall status.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-p | --package=<value>`

ID (starts with 04t) or alias of the package version to uninstall.

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

Uninstall a package with specified ID from an org with username me@example.com:

```bash
sf package uninstall --package 04t... --target-org me@example.com
```

Uninstall a package with the specified alias from your default org:

```bash
sf package uninstall --package undesirable_package_alias
```

Uninstall a package with an alias that contains spaces from your default org:

```bash
sf package uninstall --package "Undesirable Package Alias"
```

---

## `sf package uninstall report`

Retrieve the status of a package uninstall request.

### Aliases

- `sf force package uninstall report`

### Usage

```bash
sf package uninstall report [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --request-id <value>
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

ID of the package uninstall request you want to check; starts with 06y.

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

Retrieve the status of a package uninstall in your default org using the specified request ID:

```bash
sf package uninstall report --request-id 06y...
```

Similar to previous example, but use the org with username me@example.com:

```bash
sf package uninstall report --request-id 06y... --target-org me@example.com
```

---

## `sf package update`

Update package details.

### Description

Specify a new value for each option you want to update.

Run "sf package list" to list all packages in the Dev Hub org.

### Aliases

- `sf force package update`

### Usage

```bash
sf package update [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--name <value>] [--description <value>] [--error-notification-username <value>] [--[no-]enable-app-analytics] [--recommended-version-id <value>] [--skip-ancestor-check]
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

ID (starts with 0Ho) or alias of the package to update.

- Type: option
- Required: yes

#### `-n | --name=<value>`

New name of the package.

- Type: option
- Required: no

#### `-d | --description=<value>`

New description of the package.

- Type: option
- Required: no

#### `-o | --error-notification-username=<value>`

Active Dev Hub user designated to receive email notifications for package errors.

Email notifications include information about unhandled Apex exceptions, and install, upgrade, or uninstall failures associated with your package.

- Type: option
- Required: no
- Aliases: `--errornotificationusername`

#### `--[no-]enable-app-analytics`

Enable AppExchange App Analytics usage data collection on this managed package and its components.

- Type: boolean
- Required: no

#### `-r | --recommended-version-id=<value>`

ID of the package version that's installed when subscribers click the Upgrade to Recommended Version option on the Installed Packages page of their org.

Specify the recommended package version for subscribers to install. If a subscriber has a package version installed in their org that's lower than the version you set, the subscriber sees the Upgrade to Recommended Version option on the Installed Packages page. Only released package versions can be set as the recommended version.

- Type: option
- Required: no

#### `--skip-ancestor-check`

Bypass the ancestry check for setting a recommended version.

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

Update the name of the package with the specified alias; uses your default Dev Hub org:

```bash
sf package update --package "Your Package Alias" --name "New Package Name"
```

Update the description of the package with the specified ID; uses the specified Dev Hub org:

```bash
sf package update --package 0Ho... --description "New Package Description" --target-dev-hub devhub@example.com
```

---

## `sf package version create`

Create a package version in the Dev Hub org.

### Description

The package version is based on the package contents in the specified directory.

To retrieve details about a package version create request, including status and package version ID (04t), run "sf package version create report -i 08c...".

We recommend that you specify the --installation-key parameter to protect the contents of your package and to prevent unauthorized installation of your package.

To list package version creation requests in the org, run "sf package version create list".
To promote a package version to released, you must use the --code-coverage parameter. The package must also meet the code coverage requirements. This requirement applies to both managed and unlocked packages.

We don’t calculate code coverage for org-dependent unlocked packages, or for package versions that specify --skip-validation.

### Aliases

- `sf force package version create`

### Usage

```bash
sf package version create [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--branch <value>] [--code-coverage] [--definition-file <value>] [--installation-key <value>] [--installation-key-bypass] [--package <value>] [--path <value>] [--post-install-script <value>] [--post-install-url <value>] [--releasenotes-url <value>] [--skip-ancestor-check] [--skip-validation] [--async-validation] [--generate-pkg-zip] [--tag <value>] [--uninstall-script <value>] [--version-description <value>] [--version-name <value>] [--version-number <value>] [--wait <value>] [--language <value>] [--verbose]
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

#### `-b | --branch=<value>`

Name of the branch in your source control system that the package version is based on.

- Type: option
- Required: no

#### `-c | --code-coverage`

Calculate and store the code coverage percentage by running the packaged Apex tests included in this package version.

Before you can promote and release a managed or unlocked package version, the Apex code must meet a minimum 75% code coverage requirement. We don’t calculate code coverage for org-dependent unlocked packages or for package versions that specify --skip-validation.

- Type: boolean
- Required: no
- Exclusive with: `--skip-validation`
- Aliases: `--codecoverage`

#### `-f | --definition-file=<value>`

Path to a definition file similar to scratch org definition file that contains the list of features and org preferences that the metadata of the package version depends on.

For a patch version, the features specified in this file are ignored, and instead the features specified for the ancestor version are used.

- Type: option
- Required: no
- Aliases: `--definitionfile`

#### `-k | --installation-key=<value>`

Installation key for key-protected package. (either --installation-key or --installation-key-bypass is required)

- Type: option
- Required: no
- Aliases: `--installationkey`

#### `-x | --installation-key-bypass`

Bypass the installation key requirement. (either --installation-key or --installation-key-bypass is required)

If you bypass this requirement, anyone can install your package.

- Type: boolean
- Required: no
- Aliases: `--installationkeybypass`

#### `-p | --package=<value>`

ID (starts with 0Ho) or alias of the package to create a version of.

- Type: option
- Required: no

#### `-d | --path=<value>`

Path to the directory that contains the contents of the package.

- Type: option
- Required: no

#### `--post-install-script=<value>`

Name of the post-install script; applies to managed packages only.

The post-install script is an Apex class within this package that is run in the installing org after installations or upgrades of this package version.

- Type: option
- Required: no
- Aliases: `--postinstallscript`

#### `--post-install-url=<value>`

Post-install instructions URL.

The contents of the post-installation instructions URL are displayed in the UI after installation of the package version.

- Type: option
- Required: no
- Aliases: `--postinstallurl`

#### `--releasenotes-url=<value>`

Release notes URL.

This link is displayed in the package installation UI to provide release notes for this package version to subscribers.

- Type: option
- Required: no
- Aliases: `--releasenotesurl`

#### `--skip-ancestor-check`

Override ancestry requirements, which allows you to specify a package ancestor that isn’t the highest released package version.

- Type: boolean
- Required: no
- Aliases: `--skipancestorcheck`

#### `--skip-validation`

Skip validation during package version creation; you can’t promote unvalidated package versions.

Skips validation of dependencies, package ancestors, and metadata during package version creation. Skipping validation reduces the time it takes to create a new package version, but you can promote only validated package versions. Skipping validation can suppress important errors that can surface at a later stage. You can specify skip validation or code coverage, but not both. Code coverage is calculated during validation.

- Type: boolean
- Required: no
- Exclusive with: `--code-coverage`, `--async-validation`
- Aliases: `--skipvalidation`

#### `--async-validation`

Return a new package version before completing package validations.

Specifying async validation returns the package version earlier in the process, allowing you to install and test the new version right away. If your development team is using continuous integration (CI) scripts, async validation can reduce your overall CI run time.

- Type: boolean
- Required: no
- Exclusive with: `--skip-validation`

#### `--generate-pkg-zip`

Generate a package ZIP file that you can use for debugging or to examine the package contents.

- Type: boolean
- Required: no

#### `-t | --tag=<value>`

Package version’s tag.

- Type: option
- Required: no

#### `--uninstall-script=<value>`

Uninstall script name; applies to managed packages only.

The uninstall script is an Apex class within this package that is run in the installing org after uninstallations of this package.

- Type: option
- Required: no
- Aliases: `--uninstallscript`

#### `-e | --version-description=<value>`

Description of the package version to be created; overrides the sfdx-project.json value.

- Type: option
- Required: no
- Aliases: `--versiondescription`

#### `-a | --version-name=<value>`

Name of the package version to be created; overrides the sfdx-project.json value.

- Type: option
- Required: no
- Aliases: `--versionname`

#### `-n | --version-number=<value>`

Version number of the package version to be created; overrides the sfdx-project.json value.

For information about the format of the version number, see https://developer.salesforce.com/docs/atlas.en-us.pkg2_dev.meta/pkg2_dev/sfdx_dev2gp_config_file.htm.

- Type: option
- Required: no
- Aliases: `--versionnumber`

#### `-w | --wait=<value>`

Number of minutes to wait for the package version to be created.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `--language=<value>`

Language for the package.

Specify the language using a language code listed under "Supported Languages" in Salesforce Help. If no language is specified, the language defaults to the language of the Dev Hub user who created the package.

- Type: option
- Required: no

#### `--verbose`

Display verbose command output.

Display verbose command output. When polling for the status of the creation, this will output status and timeout data on a separate line for each poll request, which is useful in CI systems where timeouts can occur with long periods of no output from commands.

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

Create a package version from the contents of the "common" directory and give it an installation key of "password123"; uses your default Dev Hub org:

```bash
sf package version create --path common --installation-key password123
```

Create a package version from a package with the specified alias; uses the Dev Hub org with username devhub@example.com:

```bash
sf package version create --package "Your Package Alias" --installation-key password123 --target-dev-hub devhub@example.com
```

Create a package version from a package with the specified ID:

```bash
sf package version create --package 0Ho... --installation-key password123
```

Create a package version and skip the validation step:

```bash
sf package version create --path common --installation-key password123 --skip-validation
```

Create a package version and perform package validations asynchronously:

```bash
sf package version create --path common --installation-key password123 --async-validation
```

---

## `sf package version create list`

List package version creation requests.

### Description

Shows the details of each request to create a package version in the Dev Hub org.

All filter parameters are applied using the AND logical operator (not OR).

To get information about a specific request, run "sf package version create report" and supply the request ID.

### Aliases

- `sf force package version create list`

### Usage

```bash
sf package version create list [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--created-last-days <value>] [--status <value>] [--show-conversions-only] [--verbose]
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

Number of days since the request was created, starting at 00:00:00 of first day to now. Use 0 for today.

- Type: option
- Required: no
- Aliases: `--createdlastdays`

#### `-s | --status=<value>`

Status of the version creation request, used to filter the list.

- Type: option
- Required: no
- Permitted values: `Queued`, `InProgress`, `Success`, `Error`

#### `--show-conversions-only`

Filter the list output to display only converted package version.

- Type: boolean
- Required: no

#### `--verbose`

Displays additional information at a slight performance cost, such as the version name and number for each package version create request.

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

List all package version creation requests in your default Dev Hub org:

```bash
sf package version create list
```

List package version creation requests from the last 3 days in the Dev Hub org with username devhub@example.com:

```bash
sf package version create list --created-last-days 3 --target-dev-hub
```

List package version creation requests with status Error:

```bash
sf package version create list --status Error
```

List package version creation requests with status InProgress:

```bash
sf package version create list --status InProgress
```

List package version creation requests with status Success that were created today:

```bash
sf package version create list --created-last-days 0 --status Success
```

---

## `sf package version create report`

Retrieve details about a package version creation request.

### Description

Specify the request ID for which you want to view details. If applicable, the command displays errors related to the request.

To show all requests in the org, run "sf package version create list".

### Aliases

- `sf force package version create report`

### Usage

```bash
sf package version create report [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package-create-request-id <value>
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

#### `-i | --package-create-request-id=<value>`

ID (starts with 08c) of the package version creation request you want to display.

- Type: option
- Required: yes
- Aliases: `--packagecreaterequestid`

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

Retrieve details about the package version creation request with the specified ID; uses your default Dev Hub org:

```bash
sf package version create report --package-create-request-id 08c...
```

Retrieve details about the specified package version creation request in the Dev Hub org with username devhub@example.com:

```bash
sf package version create report --package-create-request-id 08c... --target-dev-hub devhub@example.com
```

---

## `sf package version delete`

Delete a package version.

### Description

Specify the ID or alias of the package version you want to delete. In second-generation managed packaging, only beta package versions can be deleted. Before deleting a package version, review the considerations outlined in https://developer.salesforce.com/docs/atlas.en-us.pkg2_dev.meta/pkg2_dev/sfdx_dev_dev2gp_package_deletion.htm.

### Aliases

- `sf force package version delete`

### Usage

```bash
sf package version delete [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--no-prompt] --package <value>
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

Don’t prompt before deleting the package version.

- Type: boolean
- Required: no
- Aliases: `--noprompt`

#### `-p | --package=<value>`

ID (starts with 04t) or alias of the package version to delete.

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

Delete a package version with the specified alias using your default Dev Hub org:

```bash
sf package version delete --package "Your Package Alias"
```

Delete a package version with the specified ID using the Dev Hub org with username "devhub@example.com":

```bash
sf package version delete --package 04t... --target-org devhub@example.com
```

---

## `sf package version displayancestry`

Display the ancestry tree for a 2GP managed package version.

### Aliases

- `sf force package version displayancestry`

### Usage

```bash
sf package version displayancestry [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--dot-code] [--verbose]
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

ID or alias of the package (starts with 0Ho) or package version (starts with 04t) to display ancestry for.

If you specify a package ID (starts with 0Ho) or alias, the ancestor tree for every package version associated with the package ID is displayed. If you specify a package version (starts with 04t) or alias, the ancestry tree of the specified package version is displayed.

- Type: option
- Required: yes

#### `--dot-code`

Display the ancestry tree in DOT code.

You can use the DOT code output in graph visualization software to create tree visualizations.

- Type: boolean
- Required: no
- Aliases: `--dotcode`

#### `--verbose`

Display both the package version ID (starts with 04t) and the version number (major.minor.patch.build) in the ancestry tree.

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

Display the ancestry tree for a package version with the specified alias, using your default Dev Hub org:

```bash
sf package version displayancestry --package package_version_alias
```

Similar to previous example, but display the output in DOT code:

```bash
sf package version displayancestry --package package_version_alias --dot-code
```

Display the ancestry tree for a package with the specified ID, using the Dev Hub org with username devhub@example.com:

```bash
sf package version displayancestry --package OHo... --target-dev-hub devhub@example.com
```

Display the ancestry tree of a package version with the specified ID, using your default Dev Hub org:

```bash
sf package version displayancestry --package 04t...
```

---

## `sf package version displaydependencies`

Display the dependency graph for an unlocked or 2GP managed package version.

### Usage

```bash
sf package version displaydependencies [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--installation-key <value>] [--edge-direction <value>] [--verbose]
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

ID or alias of the package version (starts with 04t) or the package version create request (starts with 08c) to display the dependency graph for.

Before running this command, update your sfdx-project.json file to specify the calculateTransitiveDependencies attribute, and set the value to true. This command returns GraphViz code, which can be compiled to a graph using DOT code or another graph visualization software.

- Type: option
- Required: yes

#### `-k | --installation-key=<value>`

Installation key for a key-protected package version (starts with 04t).

- Type: option
- Required: no

#### `--edge-direction=<value>`

Order (root-first or root-last) in which the dependencies are displayed.

A root-first graph declares the root as the package that must be installed last. A root-last graph is the reverse order of root-first. If you specify "--edge-direction root-last", the graph displays the packages in the order they must be installed. The root starts with the farthest leaf of the package dependencies and ends with the base package, which must be installed last.

- Type: option
- Required: no
- Permitted values: `root-first`, `root-last`
- Default: `root-first`

#### `--verbose`

Display both the package version ID (starts with 04t) and the version number (major.minor.patch.build) in each node.

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

Display the dependency graph for a package version with the specified alias, using your default Dev Hub org and the default edge-direction:

```bash
sf package version displaydependencies --package package_version_alias
```

Display the dependency graph for a package version with the specified ID and display the graph using a root-last edge direction. Use the Dev Hub org with username devhub@example.com:

```bash
sf package version displaydependencies --package 04t... --edge-direction root-last --target-dev-hub devhub@example.com
```

Display the dependency graph of a version create request with the specified ID, using your default Dev Hub org and the default edge-direction:

```bash
sf package version displaydependencies --package 08c...
```

Display the dependency graph for a key-protected package version:

```bash
sf package version displaydependencies --package 04t... --installation-key "my installation key"
```

---

## `sf package version list`

List all package versions in the Dev Hub org.

### Description

Description

### Aliases

- `sf force package version list`

### Usage

```bash
sf package version list [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] [--created-last-days <value>] [--concise] [--show-conversions-only] [--modified-last-days <value>] [--packages <value>] [--released] [--branch <value>] [--order-by <value>] [--verbose]
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

Number of days since the request was created, starting at 00:00:00 of first day to now. Use 0 for today.

- Type: option
- Required: no
- Aliases: `--createdlastdays`

#### `--concise`

Display limited package version details.

- Type: boolean
- Required: no

#### `--show-conversions-only`

Filter the list output to display only converted package version.

- Type: boolean
- Required: no

#### `-m | --modified-last-days=<value>`

Number of days since the items were modified, starting at 00:00:00 of first day to now. Use 0 for today.

- Type: option
- Required: no
- Aliases: `--modifiedlastdays`

#### `-p | --packages=<value>`

Comma-delimited list of packages (aliases or 0Ho IDs) to list.

- Type: option
- Required: no

#### `-r | --released`

Display released versions only (IsReleased=true).

- Type: boolean
- Required: no

#### `-b | --branch=<value>`

Branch in your source control system used to filter the results; only package versions based on the specified branch are listed.

- Type: option
- Required: no

#### `-o | --order-by=<value>`

Package version fields used to order the list.

- Type: option
- Required: no
- Aliases: `--orderby`

#### `--verbose`

Display extended package version details.

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

List package versions in your default Dev Hub org that were created in the last 3 days; show only the released versions and order the list using the PatchVersion field. Display extended details about each package version:

```bash
sf package version list --verbose --created-last-days 3 --released --order-by PatchVersion
```

List the released package versions for the two specified packages that were modified today; use the Dev Hub org with username devhub@example.com:

```bash
sf package version list --packages 0Ho000000000000,0Ho000000000001 --released --modified-last-days 0 --target-dev-hub devhub@example.com
```

List all released package versions in your default Dev Hub org:

```bash
sf package version list --released
```

List package versions that were modified today in your default Dev Hub org; show limited details about each one:

```bash
sf package version list --concise --modified-last-days 0
```

List package versions that are based on the "featureA" branch in your source control system that were modified today in your default Dev Hub org; show limited details about each one:

```bash
sf package version list --concise --modified-last-days 0 --branch featureA
```

List released package versions that were created in the last 3 days in your default Dev Hub org; show limited details:

```bash
sf package version list --concise --created-last-days 3 --released
```

List released package versions that were modified today for the two packages with specified aliases in your default Dev Hub org:

```bash
sf package version list --packages exp-mgr,exp-mgr-util --released --modified-last-days 0
```

---

## `sf package version promote`

Promote a package version to released.

### Description

Supply the ID or alias of the package version you want to promote. Promotes the package version to released status.

### Aliases

- `sf force package version promote`

### Usage

```bash
sf package version promote [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--no-prompt]
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

ID (starts with 04t) or alias of the package version to promote.

- Type: option
- Required: yes

#### `-n | --no-prompt`

Don't prompt to confirm setting the package version as released.

- Type: boolean
- Required: no
- Aliases: `--noprompt`

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

Promote the package version with the specified ID to released; uses your default Dev Hub org:

```bash
sf package version promote --package 04t...
```

Promote the package version with the specified alias to released; uses the Dev Hub org with username devhub@example.com:

```bash
sf package version promote --package awesome_package_alias --target-dev-hub devhub@example.com
```

Promote the package version with an alias that has spaces to released:

```bash
sf package version promote --package "Awesome Package Alias"
```

---

## `sf package version report`

Retrieve details about a package version in the Dev Hub org.

### Description

To update package version values, run "sf package version update".

### Aliases

- `sf force package version report`

### Usage

```bash
sf package version report [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--verbose]
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

ID (starts with 04t) or alias of the package to retrieve details for.

- Type: option
- Required: yes

#### `--verbose`

Display extended package version details.

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

Retrieve details about the package version with the specified ID from your default Dev Hub org:

```bash
sf package version report --package 04t...
```

Retrieve details about the package version with the specified alias (that contains spaces) from the Dev Hub org with username devhub@example.com:

```bash
sf package version report --package "Your Package Alias" --target-dev-hub devhub@example.com
```

---

## `sf package version retrieve`

Retrieve package metadata for a specified package version. Package metadata can be retrieved for only second-generation managed package versions or unlocked packages.

### Description

Retrieving a package version downloads the metadata into the directory you specify.

When you run this command, specify the subscriber package version ID (starts with 04t) and the path to an empty directory.

By default, the package version retrieve command is available to 2GP managed packages that were converted from 1GP. To use this command with a managed package created using 2GP (not converted from 1GP) or with an unlocked package, specify IsDevUsePkgZipRequested = true in the Package2VersionCreateRequest Tooling API object. If you run this command and the zip folder with the package version’s source files is missing, confirm that IsDevUsePkgZipRequested is set to true.

### Usage

```bash
sf package version retrieve [--json] [--flags-dir <value>] [--api-version <value>] --target-dev-hub <value> --package <value> [--output-dir <value>]
```

### Flags

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-v | --target-dev-hub=<value>`

Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetdevhubusername`

#### `-p | --package=<value>`

Subscriber package version ID (starts with 04t).

- Type: option
- Required: yes

#### `-d | --output-dir=<value>`

Path within your Salesforce DX project directory in which to download the metadata. This directory must be empty.

- Type: option
- Required: no
- Default: `force-app`

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

Retrieve package metadata for a converted subscriber package version ID (starts with 04t) into my-directory/ within your Salesforce DX project directory:

```bash
sf package version retrieve --package 04tXXX --output-dir my-directory/ --target-dev-hub devhub@example.com
```

---

## `sf package version update`

Update a package version.

### Description

Specify a new value for each option you want to update.

To display details about a package version, run "sf package version display".

### Aliases

- `sf force package version update`

### Usage

```bash
sf package version update [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --package <value> [--version-name <value>] [--version-description <value>] [--branch <value>] [--tag <value>] [--installation-key <value>]
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

ID (starts with 04t) or alias of the package to update a version of.

- Type: option
- Required: yes

#### `-a | --version-name=<value>`

New package version name.

- Type: option
- Required: no
- Aliases: `--versionname`

#### `-e | --version-description=<value>`

New package version description.

- Type: option
- Required: no
- Aliases: `--versiondescription`

#### `-b | --branch=<value>`

New package version branch.

- Type: option
- Required: no

#### `-t | --tag=<value>`

New package version tag.

- Type: option
- Required: no

#### `-k | --installation-key=<value>`

New installation key for key-protected package (default: null)

- Type: option
- Required: no
- Aliases: `--installationkey`

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

Update the package version that has the specified alias (that contains spaces) with a new installation key "password123"; uses your default Dev Hub org:

```bash
sf package version update --package "Your Package Alias" --installation-key password123
```

Update the package version that has the specified ID with a new branch and tag; use the Dev Hub org with username devhub@example.com:

```bash
sf package version update --package 04t... --branch main --tag 'Release 1.0.7' --target-dev-hub devhub@example.com
```

Update the package version that has the specified ID with a new description:

```bash
sf package version update --package 04t... --version-description "New Package Version Description"
```
