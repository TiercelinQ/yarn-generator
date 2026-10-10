# project Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project.html

## `sf project convert mdapi`

Convert metadata retrieved via Metadata API into the source format used in Salesforce DX projects.

### Description

To use Salesforce CLI to work with components that you retrieved via Metadata API, first convert your files from the metadata format to the source format using this command.

To convert files from the source format back to the metadata format, run "sf project convert source".

To convert multiple metadata components, either set multiple --metadata \<name\> flags or a single --metadata flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --source-dir.

### Aliases

- `sf force mdapi convert`

### Usage

```bash
sf project convert mdapi [--json] [--flags-dir <value>] [--api-version <value>] --root-dir <value> [--output-dir <value>] [--manifest <value>] [--metadata-dir <value>] [--metadata <value>]
```

### Flags

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-r | --root-dir=<value>`

Root directory that contains the Metadata API–formatted metadata.

- Type: option
- Required: yes
- Aliases: `--rootdir`

#### `-d | --output-dir=<value>`

Directory to store your files in after they’re converted to source format; can be an absolute or relative path.

- Type: option
- Required: no
- Aliases: `--outputdir`

#### `-x | --manifest=<value>`

File path to manifest (package.xml) of metadata types to convert.

If you specify this flag, don’t specify --metadata or --source-dir.

- Type: option
- Required: no

#### `-p | --metadata-dir=<value>`

Root of directory or zip file of metadata formatted files to convert.

The supplied paths can be to a single file (in which case the operation is applied to only one file) or to a folder (in which case the operation is applied to all metadata types in the directory and its sub-directories).

If you specify this flag, don’t specify --manifest or --metadata. If the comma-separated list you’re supplying contains spaces, enclose the entire comma-separated list in one set of double quotes.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Exclusive with: `--manifest`, `--metadata`
- Aliases: `--metadatapath`

#### `-m | --metadata=<value>`

Metadata component names to convert.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Exclusive with: `--manifest`, `--metadatapath`

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
Convert metadata formatted files in the specified directory into source formatted files; writes converted files to your default package directory:
$ sf project convert mdapi --root-dir path/to/metadata
```

```bash
Similar to previous example, but writes converted files to the specified output directory:
$ sf project convert mdapi --root-dir path/to/metadata --output-dir path/to/outputdir
```

---

## `sf project convert source`

Convert source-formatted files into metadata that you can deploy using Metadata API.

### Description

To convert source-formatted files into the metadata format, so that you can deploy them using Metadata API, run this command. Then deploy the metadata using "sf project deploy".

To convert Metadata API–formatted files into the source format, run "sf project convert mdapi".

To specify a package name that includes spaces, enclose the name in single quotes.

To convert multiple components, either set multiple --metadata \<name\> flags or a single --metadata flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --source-dir.

### Aliases

- `sf force source convert`

### Usage

```bash
sf project convert source [--json] [--flags-dir <value>] [--api-version <value>] [--root-dir <value>] [--output-dir <value>] [--package-name <value>] [--manifest <value>] [--source-dir <value>] [--metadata <value>]
```

### Flags

#### `--api-version=<value>`

API Version to use in the generated project's manifest. By default, will use the version from sfdx-project.json

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-r | --root-dir=<value>`

Source directory other than the default package to convert.

- Type: option
- Required: no
- Aliases: `--rootdir`

#### `-d | --output-dir=<value>`

Output directory to store the Metadata API–formatted files in.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--outputdir`

#### `-n | --package-name=<value>`

Name of the package to associate with the metadata-formatted files.

- Type: option
- Required: no
- Aliases: `--packagename`

#### `-x | --manifest=<value>`

Path to the manifest (package.xml) file that specifies the metadata types to convert.

If you specify this flag, don’t specify --metadata or --source-dir.

- Type: option
- Required: no

#### `-p | --source-dir=<value>`

Paths to the local source files to convert.

The supplied paths can be to a single file (in which case the operation is applied to only one file) or to a folder (in which case the operation is applied to all metadata types in the directory and its sub-directories).

If you specify this flag, don’t specify --manifest or --metadata.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Exclusive with: `--manifest`, `--metadata`
- Aliases: `--sourcepath`

#### `-m | --metadata=<value>`

Metadata component names to convert.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Exclusive with: `--manifest`, `--sourcepath`

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
Convert source-formatted files in the specified directory into metadata-formatted files; writes converted files into a new directory:
$ sf project convert source --root-dir path/to/source
```

```bash
Similar to previous example, but writes converted files to the specified output directory and associates the files with the specified package:
$ sf project convert source --root-dir path/to/source --output-dir path/to/outputdir --package-name 'My Package'
```

---

## `sf project convert source-behavior`

Status: beta

Enable a behavior of your project source files, and then update your Salesforce DX project to implement the behavior.

### Description

Specifically, this command updates the "sourceBehaviorOption" option in the "sfdx-project.json" file and then converts the associated local source files in your project as needed.

For example, run this command with the "--behavior decomposePermissionSetBeta" flag to start decomposing permission sets when you deploy or retrieve them. Decomposing means breaking up the monolithic metadata API format XML file that corresponds to a metadata component into smaller XML files and directories based on its subtypes. Permission sets are not decomposed by default; you must opt-in to start decomposing them by using this command. When the command finishes, your "sfdx-project.json" file is updated to always decompose permission sets, and the existing permission set files in your local package directories are converted into the new decomposed format. You run this command only once for a given behavior change.

For more information about the possible values for the --behavior flag, see the "sourceBehaviorOptions" section in the https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm topic.

### Usage

```bash
sf project convert source-behavior [--json] [--flags-dir <value>] --behavior <value> [--dry-run] [--preserve-temp-dir] [--target-org <value>]
```

### Flags

#### `-b | --behavior=<value>`

Behavior to enable; the values correspond to the possible values of the "sourceBehaviorOption" option in the "sfdx-project.json" file.

- Type: option
- Required: yes
- Permitted values: `decomposeCustomLabelsBeta2`, `decomposeCustomLabelsBeta`, `decomposePermissionSetBeta`, `decomposePermissionSetBeta2`, `decomposeSharingRulesBeta`, `decomposeWorkflowBeta`, `decomposeExternalServiceRegistrationBeta`

#### `--dry-run`

Display what the command would do, but don't make any actual changes.

- Type: boolean
- Required: no

#### `--preserve-temp-dir`

Don't delete the metadata API format temporary directory that this command creates. Useful for debugging.

- Type: boolean
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the target org.

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

Update your Salesforce DX project to decompose custom permission sets:

```bash
sf project convert source-behavior --behavior decomposePermissionSetBeta
```

Display what the command would do, but don't change any existing files:

```bash
sf project convert source-behavior --behavior decomposePermissionSetBeta --dry-run
```

Keep the temporary directory that contains the interim metadata API formatted files:

```bash
sf project convert source-behavior --behavior decomposePermissionSetBeta --dry-run --preserve-temp-dir
```

---

## `sf project delete source`

Delete source from your project and from a non-source-tracked org.

### Description

Use this command to delete components from orgs that don’t have source tracking. To remove deleted items from orgs that have source tracking enabled, "sf project deploy start".

When you run this command, both the local source file and the metadata component in the org are deleted.

To delete multiple metadata components, either set multiple --metadata \<name\> flags or a single --metadata flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --source-dir.

### Aliases

- `sf force source delete`

### Usage

```bash
sf project delete source [--json] [--flags-dir <value>] [--api-version <value>] --target-org <value> [--check-only] [--wait <value>] [--tests <value>] [--test-level <value>] [--no-prompt] [--metadata <value>] [--source-dir <value>] [--track-source] [--force-overwrite] [--verbose]
```

### Flags

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `-c | --check-only`

Validate delete command but don't delete anything from the org or the local project.

IMPORTANT: Where possible, we changed noninclusive terms to align with our company value of Equality. We maintained certain terms to avoid any effect on customer implementations.

Validates the deleted metadata and runs all Apex tests, but prevents the deletion from being saved to the org.

If you change a field type from Master-Detail to Lookup or vice versa, that change isn’t supported when using the --check-only flag to test a deletion (validation). This kind of change isn’t supported for test deletions to avoid the risk of data loss or corruption. If a change that isn’t supported for test deletions is included in a deletion package, the test deletion fails and issues an error.

If your deletion package changes a field type from Master-Detail to Lookup or vice versa, you can still validate the changes prior to deploying to Production by performing a full deletion to another test Sandbox. A full deletion includes a validation of the changes as part of the deletion process.

Note: A Metadata API deletion that includes Master-Detail relationships deletes all detail records in the Recycle Bin in the following cases.

    1. For a deletion with a new Master-Detail field, soft delete (send to the Recycle Bin) all detail records before proceeding to delete the Master-Detail field, or the deletion fails. During the deletion, detail records are permanently deleted from the Recycle Bin and cannot be recovered.

    2. For a deletion that converts a Lookup field relationship to a Master-Detail relationship, detail records must reference a master record or be soft-deleted (sent to the Recycle Bin) for the deletion to succeed. However, a successful deletion permanently deletes any detail records in the Recycle Bin.

- Type: boolean
- Required: no
- Aliases: `--checkonly`

#### `-w | --wait=<value>`

Number of minutes to wait for the command to finish.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-r | --no-prompt`

Don't prompt for delete confirmation.

- Type: boolean
- Required: no
- Aliases: `--noprompt`

#### `-m | --metadata=<value>`

Metadata components to delete.

If you specify this flag, don’t specify --source-dir.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)

#### `-p | --source-dir=<value>`

Source file paths to delete.

The supplied paths can be a single file (in which case the operation is applied to only one file) or a folder (in which case the operation is applied to all metadata types in the directory and its sub-directories).

If you specify this flag, don’t specify --metadata.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Aliases: `--sourcepath`

#### `-t | --track-source`

If the delete succeeds, update the source tracking information.

- Type: boolean
- Required: no
- Exclusive with: `--check-only`
- Aliases: `--tracksource`

#### `-f | --force-overwrite`

Ignore conflict warnings and overwrite changes to the org.

- Type: boolean
- Required: no
- Depends on: `--track-source`
- Aliases: `--forceoverwrite`

#### `--verbose`

Verbose output of the delete result.

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

### Test flags

#### `--tests=<value>`

Apex tests to run when --test-level is RunSpecifiedTests.

If a test name contains a space, enclose it in double quotes.
For multiple test names, use one of the following formats:

- Repeat the flag for multiple test names: --tests Test1 --tests Test2 --tests "Test With Space"
- Separate the test names with spaces: --tests Test1 Test2 "Test With Space"

- Type: option
- Required: no
- Multiple values: yes

#### `-l | --test-level=<value>`

Deployment Apex testing level.

Valid values are:

- NoTestRun — No tests are run. This test level applies only to deployments to development environments, such as sandbox, Developer Edition, or trial orgs. This test level is the default for development environments.

- RunSpecifiedTests — Runs only the tests that you specify with the --tests flag. Code coverage requirements differ from the default coverage requirements when using this test level. Executed tests must comprise a minimum of 75% code coverage for each class and trigger in the deployment package. This coverage is computed for each class and trigger individually and is different than the overall coverage percentage.

- RunLocalTests — All tests in your org are run, except the ones that originate from installed managed and unlocked packages. This test level is the default for production deployments that include Apex classes or triggers.

- RunAllTestsInOrg — All tests in your org are run, including tests of managed packages.

- RunRelevantTests (Beta) — Runs only tests that are relevant to the files being deployed. Salesforce automatically identifies the relevant tests based on an analysis of the deployment payload and the payload dependencies. For fine-grained control, you can also annotate test classes so that they always run in certain conditions. See "@IsTest Annotation" in the "Apex Developer Guide" (https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_isTest.htm). Each class and trigger in the deployment package must be covered by the executed tests for a minimum of 75% code coverage. This coverage is computed for each class and triggers individually and is different than the overall coverage percentage.

If you don’t specify a test level, the default behavior depends on the contents of your deployment package and target org. For more information, see "Running Tests in a Deployment" (https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_running_tests.htm) in the "Metadata API Developer Guide".

- Type: option
- Required: no
- Permitted values: `NoTestRun`, `RunSpecifiedTests`, `RunLocalTests`, `RunAllTestsInOrg`, `RunRelevantTests`
- Aliases: `--testlevel`

### Examples

Delete all local Apex source files and all Apex classes from the org with alias "my-scratch":

```bash
sf project delete source --metadata ApexClass --target-org my-scratch
```

Delete a specific Apex class and a Profile that has a space in it from your default org; don't prompt for confirmation:

```bash
sf project delete source --metadata ApexClass:MyFabulousApexClass --metadata "Profile: My Profile" --no-prompt
```

Run the tests that aren’t in any managed packages as part of the deletion; if the delete succeeds, and the org has source-tracking enabled, update the source tracking information:

```bash
sf project delete source --metadata ApexClass --test-level RunLocalTests --track-source
```

Delete the Apex source files in a directory and the corresponding components from your default org:

```bash
sf project delete source --source-dir force-app/main/default/classes
```

---

## `sf project delete tracking`

Delete all local source tracking information.

### Description

WARNING: This command deletes or overwrites all existing source tracking files. Use with extreme caution.

Deletes all local source tracking information. When you next run 'project deploy preview', Salesforce CLI displays all local and remote files as changed, and any files with the same name are listed as conflicts.

### Aliases

- `sf force source tracking clear`

### Usage

```bash
sf project delete tracking [--json] [--flags-dir <value>] [--api-version <value>] --target-org <value> [--no-prompt]
```

### Flags

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `-p | --no-prompt`

Don't prompt for source tracking override confirmation.

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

```bash
Delete local source tracking for the org with alias "my-scratch":
$ sf project delete tracking --target-org my-scratch
```

---

## `sf project deploy cancel`

Cancel a deploy operation.

### Description

Use this command to cancel a deploy operation that hasn't yet completed in the org. Deploy operations include standard deploys, quick deploys, deploy validations, and deploy cancellations.

Run this command by either passing it a job ID or specifying the --use-most-recent flag to use the job ID of the most recent deploy operation.

### Aliases

- `sf deploy metadata cancel`

### Usage

```bash
sf project deploy cancel [--json] [--flags-dir <value>] [--target-org <value>] [--async] [--job-id <value>] [--use-most-recent] [--wait <minutes>]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `--async`

Run the command asynchronously.

The command immediately returns the control of the terminal to you. This way, you can continue to use the CLI. To resume watching the cancellation, run "sf project deploy resume". To check the status of the cancellation, run "sf project deploy report".

- Type: boolean
- Required: no
- Exclusive with: `--wait`

#### `-i | --job-id=<value>`

Job ID of the deploy operation you want to cancel.

These commands return a job ID if they time out or you specified the --async flag:

- sf project deploy start
- sf project deploy validate
- sf project deploy quick
- sf project deploy cancel

The job ID is valid for 10 days from when you started the deploy operation.

- Type: option
- Required: no

#### `-r | --use-most-recent`

Use the job ID of the most recent deploy operation.

For performance reasons, this flag uses job IDs for deploy operations that started only in the past 3 days or less. If your most recent deploy operations was more than 3 days ago, this flag won't find a job ID.

- Type: boolean
- Required: no

#### `-w | --wait=<minutes>`

Number of minutes to wait for the command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you. To resume watching the cancellation, run "sf project deploy resume". To check the status of the cancellation, run "sf project deploy report".

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

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

Cancel a deploy operation using a job ID:

```bash
sf project deploy cancel --job-id 0Af0x000017yLUFCA2
```

Cancel the most recent deploy operation:

```bash
sf project deploy cancel --use-most-recent
```

---

## `sf project deploy pipeline quick`

Status: beta

Quickly deploy a validated deployment to an org.

### Description

The first time you run any "project deploy pipeline" command, be sure to authorize the org in which DevOps Center is installed. The easiest way to authorize an org is with the "org login web" command.

Before you run this command, create a validated deployment with the "project deploy pipeline validate" command, which returns a job ID. Validated deployments haven't been deployed to the org yet; you deploy them with this command. Either pass the job ID to this command or use the --use-most-recent flag to use the job ID of the most recently validated deployment. For the quick deploy to succeed, the associated validated deployment must also have succeeded.

Executing this quick deploy command takes less time than a standard deploy because it skips running Apex tests. These tests were previously run as part of the validation. Validating first and then running a quick deploy is useful if the deployment to your production org take several hours and you don’t want to risk a failed deploy.

This command doesn't support source-tracking. The source you deploy overwrites the corresponding metadata in your org. This command doesn’t attempt to merge your source with the versions in your org.

### Usage

```bash
sf project deploy pipeline quick [--json] [--flags-dir <value>] [--async] [--concise] [--verbose] [--wait <minutes>] --devops-center-username <value> [--job-id <value>] [--use-most-recent]
```

### Flags

#### `--async`

Run the command asynchronously.

The command immediately returns the job ID and control of the terminal to you. This way, you can continue to use the CLI. To resume the deployment, run "sf project deploy pipeline resume". To check the status of the deployment, run "sf project deploy pipeline report".

- Type: boolean
- Required: no

#### `--concise`

Show concise output of the command result.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

#### `--verbose`

Show verbose output of the command result.

- Type: boolean
- Required: no

#### `-w | --wait=<minutes>`

Number of minutes to wait for command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you and returns the job ID. To check the status of the operation, run "sf project deploy pipeline report".

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

#### `-c | --devops-center-username=<value>`

Username or alias of the DevOps Center org.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-i | --job-id=<value>`

Job ID of the validated deployment to quick deploy.

The job ID is valid for 10 days from when you started the validation.

- Type: option
- Required: no

#### `-r | --use-most-recent`

Use the job ID of the most recently validated deployment.

For performance reasons, this flag uses only job IDs that were validated in the past 3 days or less. If your most recent deployment validation was more than 3 days ago, this flag won't find the job ID.

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

Run a quick deploy using your default Devops Center org and a job ID:

```bash
sf project deploy pipeline quick --job-id 0Af0x000017yLUFCA2
```

Asynchronously run a quick deploy of the most recently validated deployment using an org with alias "my-prod-org":

```bash
sf project deploy pipeline quick --async --use-most-recent --devops-center-username my-prod-org
```

---

## `sf project deploy pipeline report`

Status: beta

Check the status of a pipeline deploy operation.

### Description

The first time you run any "project deploy pipeline" command, be sure to authorize the org in which DevOps Center is installed. The easiest way to authorize an org is with the "org login web" command.

Run this command by either indicating a job ID or specifying the —use-most-recent flag to use the job ID of the most recent deploy operation.

### Usage

```bash
sf project deploy pipeline report [--json] [--flags-dir <value>] --devops-center-username <value> [--job-id <value>] [--use-most-recent]
```

### Flags

#### `-c | --devops-center-username=<value>`

Username or alias of the DevOps Center org.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-i | --job-id=<value>`

Job ID of the pipeline deployment to check the status of.

The job ID is valid for 10 days from when you started the deploy operation.

- Type: option
- Required: no

#### `-r | --use-most-recent`

Use the job ID of the most recent deploy operation.

For performance reasons, this flag uses job IDs for deploy operations that started in the past 3 days or fewer. If your most recent operation was longer than 3 days ago, this flag won't find the job ID.

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

Check the status using a job ID:

```bash
sf project deploy pipeline report --devops-center-username MyStagingSandbox --job-id 0Af0x000017yLUFCA2
```

Check the status of the most recent deploy operation:

```bash
sf project deploy pipeline report --devops-center-username MyStagingSandbox --use-most-recent
```

---

## `sf project deploy pipeline resume`

Status: beta

Resume watching a pipeline deploy operation.

### Description

The first time you run any "project deploy pipeline" command, be sure to authorize the org in which DevOps Center is installed. The easiest way to authorize an org is with the "org login web" command. 

Use this command to resume watching a pipeline deploy operation if the original command times out or you specified the --async flag.

Run this command by either indicating a job ID or specifying the --use-most-recent flag to use the job ID of the most recent deploy operation.

### Usage

```bash
sf project deploy pipeline resume [--json] [--flags-dir <value>] --devops-center-username <value> [--job-id <value>] [--use-most-recent] [--concise] [--verbose] [--wait <minutes>]
```

### Flags

#### `-c | --devops-center-username=<value>`

Username or alias of the DevOps Center org.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-i | --job-id=<value>`

Job ID of the pipeline deploy operation you want to resume.

These commands return a job ID if they time out or you specified the --async flag:

- sf project deploy pipeline start
- sf project deploy pipeline validate
- sf project deploy pipeline quick

The job ID is valid for 10 days from when you started the deploy operation.

- Type: option
- Required: no

#### `-r | --use-most-recent`

Use the job ID of the most recent deploy operation.

For performance reasons, this flag uses job IDs for operations that started in the past 3 days or fewer. If your most recent operation was longer than 3 days ago, this flag won't find a job ID.

- Type: boolean
- Required: no

#### `--concise`

Show concise output of the command result.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

#### `--verbose`

Show verbose output of the command result.

- Type: boolean
- Required: no

#### `-w | --wait=<minutes>`

Number of minutes to wait for command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you and returns the job ID. To check the status of the operation, run "sf project deploy pipeline report".

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

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

Resume watching a deploy operation using a job ID:

```bash
sf project deploy pipeline resume --job-id 0Af0x000017yLUFCA2
```

Resume watching the most recent deploy operation:

```bash
sf project deploy pipeline resume --use-most-recent
```

---

## `sf project deploy pipeline start`

Status: beta

Deploy changes from a branch to the pipeline stage’s org.

### Description

The first time you run any "project deploy pipeline" command, be sure to authorize the org in which DevOps Center is installed. The easiest way to authorize an org is with the "org login web" command.

Before you run this command, changes in the pipeline stage's branch must be merged in the source control repository.

### Usage

```bash
sf project deploy pipeline start [--json] [--flags-dir <value>] --branch-name <value> [--bundle-version-name <value>] [--deploy-all] --devops-center-project-name <value> --devops-center-username <value> [--tests <value>] [--test-level <value>] [--async] [--wait <minutes>] [--verbose] [--concise]
```

### Flags

#### `-b | --branch-name=<value>`

Name of the branch in the source control repository that corresponds to the pipeline stage that you want to deploy the changes to.

- Type: option
- Required: yes

#### `-v | --bundle-version-name=<value>`

Version name of the bundle.

You must indicate the bundle version if deploying to the environment that corresponds to the first stage after the bundling stage.

- Type: option
- Required: no

#### `-a | --deploy-all`

Deploy all metadata in the branch to the stage's org.

If you don’t specify this flag, only changes in the stage’s branch are deployed.

- Type: boolean
- Required: no

#### `-p | --devops-center-project-name=<value>`

Name of the DevOps Center project.

- Type: option
- Required: yes

#### `-c | --devops-center-username=<value>`

Username or alias of the DevOps Center org.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-t | --tests=<value>`

Apex tests to run when --test-level is RunSpecifiedTests.

Separate multiple test names with commas. Enclose the entire flag value in double quotes if a test name contains spaces.

- Type: option
- Required: no
- Multiple values: yes

#### `-l | --test-level=<value>`

Deployment Apex testing level.

Valid values are:

- NoTestRun — No tests are run. This test level applies only to deployments to development environments, such as sandbox, Developer Edition, or trial orgs. This test level is the default for development environments.

- RunSpecifiedTests — Runs only the tests that you specify with the --tests flag. Code coverage requirements differ from the default coverage requirements when using this test level. Executed tests must comprise a minimum of 75% code coverage for each class and trigger in the deployment package. This coverage is computed for each class and trigger individually and is different than the overall coverage percentage.

- RunLocalTests — All tests in your org are run, except the ones that originate from installed managed and unlocked packages. This test level is the default for production deployments that include Apex classes or triggers.

- RunAllTestsInOrg — All tests in your org are run, including tests of managed packages.

If you don’t specify a test level, the default behavior depends on the contents of your deployment package. For more information, see the section "Running Tests in a Deployment" in the "Metadata API Developer Guide". (https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_running_tests.htm)

- Type: option
- Required: no
- Permitted values: `NoTestRun`, `RunSpecifiedTests`, `RunLocalTests`, `RunAllTestsInOrg`

#### `--async`

Run the command asynchronously.

The command immediately returns the job ID and control of the terminal to you. This way, you can continue to use the CLI. To resume the deployment, run "sf project deploy pipeline resume". To check the status of the deployment, run "sf project deploy pipeline report".

- Type: boolean
- Required: no

#### `-w | --wait=<minutes>`

Number of minutes to wait for command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you and returns the job ID. To check the status of the operation, run "sf project deploy pipeline report".

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

#### `--verbose`

Show verbose output of the command result.

- Type: boolean
- Required: no

#### `--concise`

Show concise output of the command result.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

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

Deploy changes in the Staging branch to the Staging environment (sandbox), if the previous stage is the bundling stage:

```bash
sf project deploy pipeline start --devops-center-project-name “Recruiting App” --branch-name staging --devops-center-username MyStagingSandbox --bundle-version-name 1.0
```

Deploy all changes in the main branch to the release environment:

```bash
sf project deploy pipeline start --devops-center-project-name “Recruiting App” --branch-name main --devops-center-username MyReleaseOrg --deploy-all
```

---

## `sf project deploy pipeline validate`

Status: beta

Perform a validate-only deployment from a branch to the pipeline stage’s org.

### Description

The first time you run any "project deploy pipeline" command, be sure to authorize the org in which DevOps Center is installed. The easiest way to authorize an org is with the "org login web" command.

A validation runs Apex tests to verify whether a deployment will succeed without actually deploying the metadata to your environment, so you can then quickly deploy the changes later without re-running the tests.

### Usage

```bash
sf project deploy pipeline validate [--json] [--flags-dir <value>] --branch-name <value> [--bundle-version-name <value>] [--deploy-all] --devops-center-project-name <value> --devops-center-username <value> [--tests <value>] [--test-level <value>] [--async] [--wait <minutes>] [--verbose] [--concise]
```

### Flags

#### `-b | --branch-name=<value>`

Name of the branch in the source control repository that corresponds to the pipeline stage that you want to deploy the changes to.

- Type: option
- Required: yes

#### `-v | --bundle-version-name=<value>`

Version name of the bundle.

You must indicate the bundle version if deploying to the environment that corresponds to the first stage after the bundling stage.

- Type: option
- Required: no

#### `-a | --deploy-all`

Deploy all metadata in the branch to the stage's org.

If you don’t specify this flag, only changes in the stage’s branch are deployed.

- Type: boolean
- Required: no

#### `-p | --devops-center-project-name=<value>`

Name of the DevOps Center project.

- Type: option
- Required: yes

#### `-c | --devops-center-username=<value>`

Username or alias of the DevOps Center org.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-t | --tests=<value>`

Apex tests to run when --test-level is RunSpecifiedTests.

Separate multiple test names with commas. Enclose the entire flag value in double quotes if a test name contains spaces.

- Type: option
- Required: no
- Multiple values: yes

#### `-l | --test-level=<value>`

Deployment Apex testing level.

Valid values are:

- NoTestRun — No tests are run. This test level applies only to deployments to development environments, such as sandbox, Developer Edition, or trial orgs. This test level is the default for development environments.

- RunSpecifiedTests — Runs only the tests that you specify with the --tests flag. Code coverage requirements differ from the default coverage requirements when using this test level. Executed tests must comprise a minimum of 75% code coverage for each class and trigger in the deployment package. This coverage is computed for each class and trigger individually and is different than the overall coverage percentage.

- RunLocalTests — All tests in your org are run, except the ones that originate from installed managed and unlocked packages. This test level is the default for production deployments that include Apex classes or triggers.

- RunAllTestsInOrg — All tests in your org are run, including tests of managed packages.

If you don’t specify a test level, the default behavior depends on the contents of your deployment package. For more information, see the section "Running Tests in a Deployment" in the "Metadata API Developer Guide". (https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_running_tests.htm)

- Type: option
- Required: no
- Permitted values: `NoTestRun`, `RunSpecifiedTests`, `RunLocalTests`, `RunAllTestsInOrg`

#### `--async`

Run the command asynchronously.

The command immediately returns the job ID and control of the terminal to you. This way, you can continue to use the CLI. To resume the deployment, run "sf project deploy pipeline resume". To check the status of the deployment, run "sf project deploy pipeline report".

- Type: boolean
- Required: no

#### `-w | --wait=<minutes>`

Number of minutes to wait for command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you and returns the job ID. To check the status of the operation, run "sf project deploy pipeline report".

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

#### `--verbose`

Show verbose output of the command result.

- Type: boolean
- Required: no

#### `--concise`

Show concise output of the command result.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

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

Perform a validate-only deployment from the Staging branch to the Staging environment (sandbox):

```bash
sf project deploy pipeline validate --devops-center-project-name “Recruiting App” --branch-name staging --devops-center-username MyStagingSandbox
```

Perform a validate-only deployment of all changes from the main branch to the release environment:

```bash
sf project deploy pipeline validate --devops-center-project-name “Recruiting App” --branch-name main --devops-center-username MyReleaseOrg --deploy-all
```

---

## `sf project deploy preview`

Preview a deployment to see what will deploy to the org, the potential conflicts, and the ignored files.

### Description

You must run this command from within a project.

The command outputs a table that describes what will happen if you run the "sf project deploy start" command. The table lists the metadata components that will be deployed and deleted. The table also lists the current conflicts between files in your local project and components in the org. Finally, the table lists the files that won't be deployed because they're included in your .forceignore file.

If your org allows source tracking, then this command displays potential conflicts between the org and your local project. Some orgs, such as production org, never allow source tracking. Source tracking is enabled by default on scratch and sandbox orgs; you can disable source tracking when you create the orgs by specifying the --no-track-source flag on the "sf org create scratch|sandbox" commands.

To preview the deployment of multiple metadata components, either set multiple --metadata \<name\> flags or a single --metadata flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --source-dir.

### Aliases

- `sf deploy metadata preview`

### Usage

```bash
sf project deploy preview [--json] [--flags-dir <value>] [--ignore-conflicts] [--manifest <value>] [--metadata <value>] [--source-dir <value>] --target-org <value> [--concise]
```

### Flags

#### `-c | --ignore-conflicts`

Don't display conflicts in preview of the deployment.

This flag applies only to orgs that allow source tracking. It has no effect on orgs that don't allow it, such as production orgs.

- Type: boolean
- Required: no

#### `-x | --manifest=<value>`

Full file path for manifest (package.xml) of components to preview.

All child components are included. If you specify this flag, don’t specify --metadata or --source-dir.

- Type: option
- Required: no
- Exclusive with: `--source-dir`, `--metadata`

#### `-m | --metadata=<value>`

Metadata component names to preview.

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--manifest`, `--source-dir`

#### `-d | --source-dir=<value>`

Path to the local source files to preview.

The supplied path can be to a single file (in which case the operation is applied to only one file) or to a folder (in which case the operation is applied to all metadata types in the directory and its subdirectories).

If you specify this flag, don’t specify --metadata or --manifest.

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--manifest`, `--metadata`

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--concise`

Show only the changes that will be deployed; omits files that are forceignored.

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

```bash
NOTE: The commands to preview a deployment and actually deploy it use similar flags. We provide a few preview examples here, but see the help for "sf project deploy start" for more examples that you can adapt for previewing.
```

Preview the deployment of source files in a directory, such as force-app, to your default org:

```bash
sf project deploy preview  --source-dir force-app
```

Preview the deployment of all Apex classes to an org with alias "my-scratch":

```bash
sf project deploy preview --metadata ApexClass --target-org my-scratch
```

Preview deployment of a specific Apex class:

```bash
sf project deploy preview --metadata ApexClass:MyApexClass
```

Preview deployment of all components listed in a manifest:

```bash
sf project deploy preview --manifest path/to/package.xml
```

---

## `sf project deploy quick`

Quickly deploy a validated deployment to an org.

### Description

Before you run this command, first create a validated deployment with the "sf project deploy validate" command, which returns a job ID. Validated deployments haven't been deployed to the org yet; you deploy them with this command. Either pass the job ID to this command or use the --use-most-recent flag to use the job ID of the most recently validated deployment. For the quick deploy to succeed, the associated validated deployment must also have succeeded.

Executing this quick deploy command takes less time than a standard deploy because it skips running Apex tests. These tests were previously run as part of the validation. Validating first and then running a quick deploy is useful if the deployment to your production org take several hours and you don’t want to risk a failed deploy.

This command doesn't support source-tracking. The source you deploy overwrites the corresponding metadata in your org. This command doesn’t attempt to merge your source with the versions in your org.

Note: Don't use this command on sandboxes; the command is intended to be used on production orgs. By default, sandboxes don't run tests during a deploy. Use "sf project deploy start" instead.

### Aliases

- `sf deploy metadata quick`

### Usage

```bash
sf project deploy quick [--json] [--flags-dir <value>] [--async] [--concise] [--job-id <value>] [--target-org <value>] [--use-most-recent] [--verbose] [--wait <minutes>] [--api-version <value>]
```

### Flags

#### `--async`

Run the command asynchronously.

The command immediately returns the control of the terminal to you. This way, you can continue to use the CLI. To resume watching the deploy, run "sf project deploy resume". To check the status of the deploy, run "sf project deploy report".

- Type: boolean
- Required: no
- Exclusive with: `--wait`

#### `--concise`

Show concise output of the deploy result.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

#### `-i | --job-id=<value>`

Job ID of the deployment you want to quick deploy.

The job ID is valid for 10 days from when you started the validation.

- Type: option
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the target org.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-r | --use-most-recent`

Use the job ID of the most recently validated deployment.

For performance reasons, this flag uses only job IDs that were validated in the past 3 days or less. If your most recent deployment validation was more than 3 days ago, this flag won't find a job ID.

- Type: boolean
- Required: no

#### `--verbose`

Show verbose output of the deploy result.

- Type: boolean
- Required: no
- Exclusive with: `--concise`

#### `-w | --wait=<minutes>`

Number of minutes to wait for the command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you. To resume watching the deploy, run "sf project deploy resume". To check the status of the deploy, run "sf project deploy report".

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

#### `-a | --api-version=<value>`

Target API version for the deploy.

Use this flag to override the default API version with the API version of your package.xml file. The default API version is the latest version supported by the CLI.

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

Run a quick deploy to your default org using a job ID:

```bash
sf project deploy quick --job-id 0Af0x000017yLUFCA2
```

Asynchronously run a quick deploy of the most recently validated deployment to an org with alias "my-prod-org":

```bash
sf project deploy quick --async --use-most-recent --target-org my-prod-org
```

### Error codes

**ERROR CODES**

[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]

---

## `sf project deploy report`

Check or poll for the status of a deploy operation.

### Description

Deploy operations include standard deploys, quick deploys, deploy validations, and deploy cancellations.

Run this command by either passing it a job ID or specifying the --use-most-recent flag to use the job ID of the most recent deploy operation. If you specify the --wait flag, the command polls for the status every second until the timeout of --wait minutes. If you don't specify the --wait flag, the command simply checks and displays the status of the deploy; the command doesn't poll for the status.

You typically don't specify the --target-org flag because the cached job already references the org to which you deployed. But if you run this command on a computer different than the one from which you deployed, then you must specify the --target-org and it must point to the same org.

This command doesn't update source tracking information.

### Aliases

- `sf deploy metadata report`

### Usage

```bash
sf project deploy report [--json] [--flags-dir <value>] [--target-org <value>] [--job-id <value>] [--use-most-recent] [--coverage-formatters <value>] [--junit] [--results-dir <value>] [--wait <minutes>]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-i | --job-id=<value>`

Job ID of the deploy operation you want to check the status of.

These commands return a job ID if they time out or you specified the --async flag:

- sf project deploy start
- sf project deploy validate
- sf project deploy quick
- sf project deploy cancel

The job ID is valid for 10 days from when you started the deploy operation.

- Type: option
- Required: no

#### `-r | --use-most-recent`

Use the job ID of the most recent deploy operation.

For performance reasons, this flag uses job IDs for deploy operations that started only in the past 3 days or less. If your most recent operation was more than 3 days ago, this flag won't find a job ID.

- Type: boolean
- Required: no

#### `-w | --wait=<minutes>`

Number of minutes to wait for command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you and returns the job ID. To resume the deployment, run "sf project deploy resume". To check the status of the deployment, run "sf project deploy report".

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

### Test flags

#### `--coverage-formatters=<value>`

Format of the code coverage results.

For multiple formatters, repeat the flag for each formatter.
--coverage-formatters lcov --coverage-formatters clover

- Type: option
- Required: no
- Multiple values: yes
- Permitted values: `clover`, `cobertura`, `html-spa`, `html`, `json`, `json-summary`, `lcovonly`, `none`, `teamcity`, `text`, `text-summary`

#### `--junit`

Output JUnit test results.

- Type: boolean
- Required: no

#### `--results-dir=<value>`

Output directory for code coverage and JUnit results; defaults to the deploy ID.

- Type: option
- Required: no
- Relationships: some: `--coverage-formatters`, `--junit`

### Examples

Check the status using a job ID:

```bash
sf project deploy report --job-id 0Af0x000017yLUFCA2
```

Check the status of the most recent deploy operation:

```bash
sf project deploy report --use-most-recent
```

Poll for the status using a job ID and target org:

```bash
sf project deploy report --job-id 0Af0x000017yLUFCA2 --target-org me@my.org --wait 30
```

---

## `sf project deploy resume`

Resume watching a deploy operation and update source tracking when the deploy completes.

### Description

Use this command to resume watching a deploy operation if the original command times out or you specified the --async flag. Deploy operations include standard deploys, quick deploys, deploy validations, and deploy cancellations. This command doesn't resume the original operation itself, because the operation always continues after you've started it, regardless of whether you're watching it or not. When the deploy completes, source tracking information is updated as needed.

Run this command by either passing it a job ID or specifying the --use-most-recent flag to use the job ID of the most recent deploy operation.

### Aliases

- `sf deploy metadata resume`

### Usage

```bash
sf project deploy resume [--json] [--flags-dir <value>] [--concise] [--job-id <value>] [--use-most-recent] [--verbose] [--wait <minutes>] [--coverage-formatters <value>] [--junit] [--results-dir <value>]
```

### Flags

#### `--concise`

Show concise output of the deploy operation result.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

#### `-i | --job-id=<value>`

Job ID of the deploy operation you want to resume.

These commands return a job ID if they time out or you specified the --async flag:

- sf project deploy start
- sf project deploy validate
- sf project deploy quick
- sf project deploy cancel

The job ID is valid for 10 days from when you started the deploy operation.

- Type: option
- Required: no

#### `-r | --use-most-recent`

Use the job ID of the most recent deploy operation.

For performance reasons, this flag uses job IDs for deploy operations that started only in the past 3 days or less. If your most recent operation was more than 3 days ago, this flag won't find a job ID.

- Type: boolean
- Required: no

#### `--verbose`

Show verbose output of the deploy operation result.

- Type: boolean
- Required: no
- Exclusive with: `--concise`

#### `-w | --wait=<minutes>`

Number of minutes to wait for the command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you. To resume watching the deploy operation, run this command again. To check the status of the deploy operation, run "sf project deploy report".

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

### Test flags

#### `--coverage-formatters=<value>`

Format of the code coverage results.

For multiple formatters, repeat the flag for each formatter.
--coverage-formatters lcov --coverage-formatters clover

- Type: option
- Required: no
- Multiple values: yes
- Permitted values: `clover`, `cobertura`, `html-spa`, `html`, `json`, `json-summary`, `lcovonly`, `none`, `teamcity`, `text`, `text-summary`

#### `--junit`

Output JUnit test results.

- Type: boolean
- Required: no

#### `--results-dir=<value>`

Output directory for code coverage and JUnit results; defaults to the deploy ID.

- Type: option
- Required: no
- Relationships: some: `--coverage-formatters`, `--junit`

### Examples

Resume watching a deploy operation using a job ID:

```bash
sf project deploy resume --job-id 0Af0x000017yLUFCA2
```

Resume watching the most recent deploy operation:

```bash
sf project deploy resume --use-most-recent
```

### Environment variables

**ENVIRONMENT VARIABLES**

[object Object]

### Error codes

**ERROR CODES**

[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]

---

## `sf project deploy start`

Deploy metadata to an org from your local project.

### Description

You must run this command from within a project.

Metadata components are deployed in source format by default. Deploy them in metadata format by specifying the --metadata-dir flag, which specifies the root directory or ZIP file that contains the metadata formatted files you want to deploy.

If your org allows source tracking, then this command tracks the changes in your source. Some orgs, such as production orgs, never allow source tracking. Source tracking is enabled by default on scratch and sandbox orgs; you can disable source tracking when you create the orgs by specifying the --no-track-source flag on the "sf org create scratch|sandbox" commands.

To deploy multiple metadata components, either set multiple --metadata \<name\> flags or a single --metadata flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --source-dir.

### Aliases

- `sf deploy metadata`

### Usage

```bash
sf project deploy start [--json] [--flags-dir <value>] [--api-version <value>] [--async] [--concise] [--dry-run] [--ignore-conflicts] [--ignore-errors] [--ignore-warnings] [--manifest <value>] [--metadata <value>] [--metadata-dir <value>] [--single-package] [--source-dir <value>] --target-org <value> [--tests <value>] [--test-level <value>] [--verbose] [--wait <minutes>] [--purge-on-delete] [--pre-destructive-changes <value>] [--post-destructive-changes <value>] [--coverage-formatters <value>] [--junit] [--results-dir <value>]
```

### Flags

#### `-a | --api-version=<value>`

Target API version for the deploy.

Use this flag to override the default API version with the API version of your package.xml file. The default API version is the latest version supported by the CLI.

- Type: option
- Required: no

#### `--async`

Run the command asynchronously.

The command immediately returns the job ID and control of the terminal to you. This way, you can continue to use the CLI. To resume the deployment, run "sf project deploy resume". To check the status of the deployment, run "sf project deploy report".

- Type: boolean
- Required: no
- Exclusive with: `--wait`

#### `--concise`

Show concise output of the deploy result.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

#### `--dry-run`

Validate deploy and run Apex tests but don’t save to the org.

- Type: boolean
- Required: no

#### `-c | --ignore-conflicts`

Ignore conflicts and deploy local files, even if they overwrite changes in the org.

This flag applies only to orgs that allow source tracking. It has no effect on orgs that don't allow it, such as production orgs.

- Type: boolean
- Required: no

#### `-r | --ignore-errors`

Ignore any errors and don’t roll back deployment.

Never use this flag when deploying to a production org. If you specify it, components without errors are deployed and components with errors are skipped, and could result in an inconsistent production org.

- Type: boolean
- Required: no

#### `-g | --ignore-warnings`

Ignore warnings and allow a deployment to complete successfully.

If you specify this flag, and a warning occurs, the success status of the deployment is set to true. If you don't specify this flag, and a warning occurs, then the success status is set to false, and the warning is treated like an error.

This flag is useful in a CI environment and your deployment includes destructive changes; if you try to delete a component that doesn't exist in the org, you get a warning. In this case, to ensure that the command returns a success value of true, specify this flag.

- Type: boolean
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--verbose`

Show verbose output of the deploy result.

- Type: boolean
- Required: no
- Exclusive with: `--concise`

#### `-w | --wait=<minutes>`

Number of minutes to wait for command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you and returns the job ID. To resume the deployment, run "sf project deploy resume". To check the status of the deployment, run "sf project deploy report".

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

### Global flags

#### `--json`

Format output as json.

- Type: boolean
- Required: no

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Source Format flags

#### `-x | --manifest=<value>`

Full file path for manifest (package.xml) of components to deploy.

All child components are included. If you specify this flag, don’t specify --metadata or --source-dir.

- Type: option
- Required: no
- Exclusive with: `--source-dir`, `--metadata`, `--metadata-dir`

#### `-m | --metadata=<value>`

Metadata component names to deploy. Wildcards (`*` ) supported as long as you use quotes, such as `ApexClass:MyClass*`.

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--manifest`, `--source-dir`, `--metadata-dir`

#### `-d | --source-dir=<value>`

Path to the local source files to deploy.

The supplied path can be to a single file (in which case the operation is applied to only one file) or to a folder (in which case the operation is applied to all metadata types in the directory and its subdirectories).

If you specify this flag, don’t specify --metadata or --manifest.

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--manifest`, `--metadata`, `--metadata-dir`

### Metadata API Format flags

#### `--metadata-dir=<value>`

Root of directory or zip file of metadata formatted files to deploy.

- Type: option
- Required: no
- Exclusive with: `--manifest`, `--source-dir`, `--metadata`

#### `--single-package`

Indicates that the metadata zip file points to a directory structure for a single package.

- Type: boolean
- Required: no
- Depends on: `--metadata-dir`

### Test flags

#### `-t | --tests=<value>`

Apex tests to run when --test-level is RunSpecifiedTests.

If a test name contains a space, enclose it in double quotes.
For multiple test names, use one of the following formats:

- Repeat the flag for multiple test names: --tests Test1 --tests Test2 --tests "Test With Space"
- Separate the test names with spaces: --tests Test1 Test2 "Test With Space"

- Type: option
- Required: no
- Multiple values: yes

#### `-l | --test-level=<value>`

Deployment Apex testing level.

Valid values are:

- NoTestRun — No tests are run. This test level applies only to deployments to development environments, such as sandbox, Developer Edition, or trial orgs. This test level is the default for development environments.

- RunSpecifiedTests — Runs only the tests that you specify with the --tests flag. Code coverage requirements differ from the default coverage requirements when using this test level. Executed tests must comprise a minimum of 75% code coverage for each class and trigger in the deployment package. This coverage is computed for each class and trigger individually and is different than the overall coverage percentage.

- RunLocalTests — All tests in your org are run, except the ones that originate from installed managed and unlocked packages. This test level is the default for production deployments that include Apex classes or triggers.

- RunAllTestsInOrg — All tests in your org are run, including tests of managed packages.

- RunRelevantTests (Beta) — Runs only tests that are relevant to the files being deployed. Salesforce automatically identifies the relevant tests based on an analysis of the deployment payload and the payload dependencies. For fine-grained control, you can also annotate test classes so that they always run in certain conditions. See "@IsTest Annotation" in the "Apex Developer Guide" (https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_isTest.htm). Each class and trigger in the deployment package must be covered by the executed tests for a minimum of 75% code coverage. This coverage is computed for each class and triggers individually and is different than the overall coverage percentage.

If you don’t specify a test level, the default behavior depends on the contents of your deployment package and target org. For more information, see "Running Tests in a Deployment" (https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_running_tests.htm) in the "Metadata API Developer Guide".

- Type: option
- Required: no
- Permitted values: `NoTestRun`, `RunSpecifiedTests`, `RunLocalTests`, `RunAllTestsInOrg`, `RunRelevantTests`

#### `--coverage-formatters=<value>`

Format of the code coverage results.

For multiple formatters, repeat the flag for each formatter.
--coverage-formatters lcov --coverage-formatters clover

- Type: option
- Required: no
- Multiple values: yes
- Permitted values: `clover`, `cobertura`, `html-spa`, `html`, `json`, `json-summary`, `lcovonly`, `none`, `teamcity`, `text`, `text-summary`

#### `--junit`

Output JUnit test results.

- Type: boolean
- Required: no

#### `--results-dir=<value>`

Output directory for code coverage and JUnit results; defaults to the deploy ID.

- Type: option
- Required: no
- Relationships: some: `--coverage-formatters`, `--junit`

### Delete flags

#### `--purge-on-delete`

Specify that deleted components in the destructive changes manifest file are immediately eligible for deletion rather than being stored in the Recycle Bin.

- Type: boolean
- Required: no
- Relationships: some: `--pre-destructive-changes`, `--manifest`, `--metadata-dir`, `--post-destructive-changes`

#### `--pre-destructive-changes=<value>`

File path for a manifest (destructiveChangesPre.xml) of components to delete before the deploy.

- Type: option
- Required: no
- Depends on: `--manifest`

#### `--post-destructive-changes=<value>`

File path for a manifest (destructiveChangesPost.xml) of components to delete after the deploy.

- Type: option
- Required: no
- Depends on: `--manifest`

### Examples

Deploy local changes not in the org; uses your default org:

```bash
sf project deploy start
```

Deploy all source files in the "force-app" directory to an org with alias "my-scratch"; show only concise output, in other words don't print a list of all the source that was deployed:

```bash
sf project deploy start  --source-dir force-app --target-org my-scratch --concise
```

Deploy all the Apex classes and custom objects that are in the "force-app" directory. The list views, layouts, etc, that are associated with the custom objects are also deployed. Both examples are equivalent:

```bash
sf project deploy start --source-dir force-app/main/default/classes force-app/main/default/objects
sf project deploy start --source-dir force-app/main/default/classes --source-dir force-app/main/default/objects
```

Deploy all Apex classes that are in all package directories defined in the "sfdx-project.json" file:

```bash
sf project deploy start --metadata ApexClass
```

Deploy a specific Apex class; ignore any conflicts between the local project and org (be careful with this flag, because it will overwrite the Apex class in the org if there are conflicts!):

```bash
sf project deploy start --metadata ApexClass:MyApexClass --ignore-conflicts
```

Deploy specific Apex classes that match a pattern; in this example, deploy Apex classes whose names contain the string "MyApex". Also ignore any deployment warnings (again, be careful with this flag! You typically want to see the warnings):

```bash
sf project deploy start --metadata 'ApexClass:MyApex*' --ignore-warnings
```

Deploy a custom object called ExcitingObject that's in the SBQQ namespace:

```bash
sf project deploy start --metadata CustomObject:SBQQ__ExcitingObject
```

Deploy all custom objects in the SBQQ namespace by using a wildcard and quotes:

```bash
sf project deploy start --metadata 'CustomObject:SBQQ__*'
```

Deploy all custom objects and Apex classes found in all defined package directories (both examples are equivalent):

```bash
sf project deploy start --metadata CustomObject ApexClass
sf project deploy start --metadata CustomObject --metadata ApexClass
```

Deploy all Apex classes and a profile that has a space in its name:

```bash
sf project deploy start --metadata ApexClass --metadata "Profile:My Profile"
```

Deploy all components listed in a manifest:

```bash
sf project deploy start --manifest path/to/package.xml
```

Run the tests that aren’t in any managed packages as part of a deployment:

```bash
sf project deploy start --metadata ApexClass --test-level RunLocalTests
```

Deploy all metadata formatted files in the "MDAPI" directory:

```bash
sf project deploy start --metadata-dir MDAPI
```

Deploy all metadata formatted files in the "MDAPI" directory; items listed in the MDAPI/destructiveChangesPre.xml and MDAPI/destructiveChangesPost.xml manifests are immediately eligible for deletion rather than stored in the Recycle Bin:

```bash
sf project deploy start --metadata-dir MDAPI --purge-on-delete
```

### Environment variables

**ENVIRONMENT VARIABLES**

[object Object]
[object Object]

### Error codes

**ERROR CODES**

[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]

---

## `sf project deploy validate`

Validate a metadata deployment without actually executing it.

### Description

Use this command to verify whether a deployment will succeed without actually deploying the metadata to your org. This command is similar to "sf project deploy start", except you're required to run Apex tests, and the command returns a job ID rather than executing the deployment. If the validation succeeds, then you pass this job ID to the "sf project deploy quick" command to actually deploy the metadata. This quick deploy takes less time because it skips running Apex tests. The job ID is valid for 10 days from when you started the validation. Validating first is useful if the deployment to your production org take several hours and you don’t want to risk a failed deploy.

You must run this command from within a project.

This command doesn't support source-tracking. When you quick deploy with the resulting job ID, the source you deploy overwrites the corresponding metadata in your org.

To validate the deployment of multiple metadata components, either set multiple --metadata \<name\> flags or a single --metadata flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --source-dir.

Note: Don't use this command on sandboxes; the command is intended to be used on production orgs. By default, sandboxes don't run tests during a deploy. If you want to validate a deployment with tests on a sandbox, use "sf project deploy start --dry-run --test-level RunLocalTests" instead.

### Aliases

- `sf deploy metadata validate`

### Usage

```bash
sf project deploy validate [--json] [--flags-dir <value>] [--api-version <value>] [--async] [--concise] [--manifest <value>] [--metadata <value>] [--source-dir <value>] [--metadata-dir <value>] [--single-package] --target-org <value> [--tests <value>] [--test-level <value>] [--verbose] [--wait <minutes>] [--ignore-warnings] [--coverage-formatters <value>] [--junit] [--results-dir <value>] [--purge-on-delete] [--pre-destructive-changes <value>] [--post-destructive-changes <value>]
```

### Flags

#### `-a | --api-version=<value>`

Target API version for the validation.

Use this flag to override the default API version with the API version of your package.xml file. The default API version is the latest version supported by the CLI.

- Type: option
- Required: no

#### `--async`

Run the command asynchronously.

The command immediately returns the job ID and control of the terminal to you. This way, you can continue to use the CLI. To resume watching the validation, run "sf project deploy resume". To check the status of the validation, run "sf project deploy report".

- Type: boolean
- Required: no

#### `--concise`

Show concise output of the validation result.

- Type: boolean
- Required: no
- Exclusive with: `--verbose`

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--verbose`

Show verbose output of the validation result.

- Type: boolean
- Required: no
- Exclusive with: `--concise`

#### `-w | --wait=<minutes>`

Number of minutes to wait for the command to complete and display results.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you and returns the job ID. To resume watching the validation, run "sf project deploy resume". To check the status of the validation, run "sf project deploy report".

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-g | --ignore-warnings`

Ignore warnings and allow a deployment to complete successfully.

If you specify this flag, and a warning occurs, the success status of the deployment is set to true. If you don't specify this flag, and a warning occurs, then the success status is set to false, and the warning is treated like an error.

This flag is useful in a CI environment and your deployment includes destructive changes; if you try to delete a component that doesn't exist in the org, you get a warning. In this case, to ensure that the command returns a success value of true, specify this flag.

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

### Source Format flags

#### `-x | --manifest=<value>`

Full file path for manifest (package.xml) of components to validate for deployment.

All child components are included. If you specify this flag, don’t specify --metadata or --source-dir.

- Type: option
- Required: no

#### `-m | --metadata=<value>`

Metadata component names to validate for deployment.

- Type: option
- Required: no
- Multiple values: yes

#### `-d | --source-dir=<value>`

Path to the local source files to validate for deployment.

The supplied path can be to a single file (in which case the operation is applied to only one file) or to a folder (in which case the operation is applied to all metadata types in the directory and its subdirectories).

If you specify this flag, don’t specify --metadata or --manifest.

- Type: option
- Required: no
- Multiple values: yes

### Metadata API Format flags

#### `--metadata-dir=<value>`

Root of directory or zip file of metadata formatted files to deploy.

- Type: option
- Required: no

#### `--single-package`

Indicates that the metadata zip file points to a directory structure for a single package.

- Type: boolean
- Required: no
- Depends on: `--metadata-dir`

### Test flags

#### `-t | --tests=<value>`

Apex tests to run when --test-level is RunSpecifiedTests.

If a test name contains a space, enclose it in double quotes.
For multiple test names, use one of the following formats:

- Repeat the flag for multiple test names: --tests Test1 --tests Test2 --tests "Test With Space"
- Separate the test names with spaces: --tests Test1 Test2 "Test With Space"

- Type: option
- Required: no
- Multiple values: yes

#### `-l | --test-level=<value>`

Deployment Apex testing level.

Valid values are:

- RunSpecifiedTests — Runs only the tests that you specify with the --tests flag. Code coverage requirements differ from the default coverage requirements when using this test level. Executed tests must comprise a minimum of 75% code coverage for each class and trigger in the deployment package. This coverage is computed for each class and trigger individually and is different than the overall coverage percentage.

- RunLocalTests — All tests in your org are run, except the ones that originate from installed managed and unlocked packages. This test level is the default.

- RunAllTestsInOrg — All tests in your org are run, including tests of managed packages.

- RunRelevantTests (Beta) — Runs only tests that are relevant to the files being deployed. Salesforce automatically identifies the relevant tests based on an analysis of the deployment payload and the payload dependencies. For fine-grained control, you can also annotate test classes so that they always run in certain conditions. See "@IsTest Annotation" in the "Apex Developer Guide" (https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_isTest.htm). Each class and trigger in the deployment package must be covered by the executed tests for a minimum of 75% code coverage. This coverage is computed for each class and triggers individually and is different than the overall coverage percentage.

If you don’t specify a test level, the default behavior depends on the contents of your deployment package and target org. For more information, see "Running Tests in a Deployment" (https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_running_tests.htm) in the "Metadata API Developer Guide".

- Type: option
- Required: no
- Permitted values: `RunAllTestsInOrg`, `RunLocalTests`, `RunSpecifiedTests`, `RunRelevantTests`
- Default: `RunLocalTests`

#### `--coverage-formatters=<value>`

Format of the code coverage results.

For multiple formatters, repeat the flag for each formatter.
--coverage-formatters lcov --coverage-formatters clover

- Type: option
- Required: no
- Multiple values: yes
- Permitted values: `clover`, `cobertura`, `html-spa`, `html`, `json`, `json-summary`, `lcovonly`, `none`, `teamcity`, `text`, `text-summary`

#### `--junit`

Output JUnit test results.

- Type: boolean
- Required: no

#### `--results-dir=<value>`

Output directory for code coverage and JUnit results; defaults to the deploy ID.

- Type: option
- Required: no
- Relationships: some: `--coverage-formatters`, `--junit`

### Delete flags

#### `--purge-on-delete`

Specify that deleted components in the destructive changes manifest file are immediately eligible for deletion rather than being stored in the Recycle Bin.

- Type: boolean
- Required: no
- Depends on: `--manifest`
- Relationships: some: `--pre-destructive-changes`, `--post-destructive-changes`

#### `--pre-destructive-changes=<value>`

File path for a manifest (destructiveChangesPre.xml) of components to delete before the deploy

- Type: option
- Required: no
- Depends on: `--manifest`

#### `--post-destructive-changes=<value>`

File path for a manifest (destructiveChangesPost.xml) of components to delete after the deploy.

- Type: option
- Required: no
- Depends on: `--manifest`

### Examples

```bash
NOTE: These examples focus on validating large deployments. See the help for "sf project deploy start" for examples of deploying smaller sets of metadata which you can also use to validate.
```

Validate the deployment of all source files in the "force-app" directory to the default org:

```bash
sf project deploy validate --source-dir force-app
```

Validate the deployment of all source files in two directories: "force-app" and "force-app-utils":

```bash
sf project deploy validate --source-dir force-app --source-dir force-app-utils
```

Asynchronously validate the deployment and run all tests in the org with alias "my-prod-org"; command immediately returns the job ID:

```bash
sf project deploy validate --source-dir force-app --async --test-level RunAllTestsInOrg --target-org my-prod-org
```

Validate the deployment of all components listed in a manifest:

```bash
sf project deploy validate --manifest path/to/package.xml
```

### Environment variables

**ENVIRONMENT VARIABLES**

[object Object]
[object Object]

### Error codes

**ERROR CODES**

[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]

---

## `sf project generate manifest`

Create a project manifest that lists the metadata components you want to deploy or retrieve.

### Description

Create a manifest from a list of metadata components (--metadata) or from one or more local directories that contain source files (--source-dir). You can specify either of these flags, not both.

Use --type to specify the type of manifest you want to create. The resulting manifest files have specific names, such as the standard package.xml or destructiveChanges.xml to delete metadata. Valid values for this flag, and their respective file names, are:

    * package : package.xml (default)
    * pre : destructiveChangesPre.xml
    * post : destructiveChangesPost.xml
    * destroy : destructiveChanges.xml

See https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_deleting_files.htm for information about these destructive manifest files.

Use --name to specify a custom name for the generated manifest if the pre-defined ones don’t suit your needs. You can specify either --type or --name, but not both.

To include multiple metadata components, either set multiple --metadata \<name\> flags or a single --metadata flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --include-packages and --source-dir.

To build a manifest from the metadata in an org, use the --from-org flag. You can combine --from-org with the --metadata flag to include only certain metadata types, or with the --excluded-metadata flag to exclude certain metadata types. When building a manifest from an org, the command makes many concurrent API calls to discover the metadata that exists in the org. To limit the number of concurrent requests, use the SF_LIST_METADATA_BATCH_SIZE environment variable and set it to a size that works best for your org and environment. If you experience timeouts or inconsistent manifest contents, then setting this environment variable can improve accuracy. However, the command takes longer to run because it sends fewer requests at a time.

### Aliases

- `sf force source manifest create`

### Usage

```bash
sf project generate manifest [--json] [--flags-dir <value>] [--api-version <value>] [--metadata <value>] [--source-dir <value>] [--name <value>] [--type <value>] [--include-packages <value>] [--excluded-metadata <value>] [--from-org <value>] [--output-dir <value>]
```

### Flags

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-m | --metadata=<value>`

Names of metadata components to include in the manifest.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)

#### `-p | --source-dir=<value>`

Paths to the local source files to include in the manifest.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Aliases: `--sourcepath`

#### `-n | --name=<value>`

Name of a custom manifest file to create.

- Type: option
- Required: no
- Exclusive with: `--type`
- Aliases: `--manifestname`

#### `-t | --type=<value>`

Type of manifest to create; the type determines the name of the created file.

- Type: option
- Required: no
- Permitted values: `pre`, `post`, `destroy`, `package`
- Exclusive with: `--name`
- Aliases: `--manifesttype`

#### `-c | --include-packages=<value>`

Package types (managed, unlocked) whose metadata is included in the manifest; by default, metadata in managed and unlocked packages is excluded. Metadata in unmanaged packages is always included.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Permitted values: `managed`, `unlocked`
- Depends on: `--from-org`
- Aliases: `--includepackages`

#### `--excluded-metadata=<value>`

Metadata types to exclude when building a manifest from an org. Specify the name of the type, not the name of a specific component.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Relationships: some: `--from-org`, `--source-dir`

#### `--from-org=<value>`

Username or alias of the org that contains the metadata components from which to build a manifest.

- Type: option
- Required: no
- Exclusive with: `--source-dir`
- Aliases: `--fromorg`

#### `-d | --output-dir=<value>`

Directory to save the created manifest.

- Type: option
- Required: no
- Aliases: `--outputdir`, `--o`

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
Create a manifest for deploying or retrieving all Apex classes and custom objects:
$ sf project generate manifest --metadata ApexClass --metadata CustomObject
```

```bash
Create a manifest for deleting the specified Apex class:
$ sf project generate manifest --metadata ApexClass:MyApexClass --type destroy
```

```bash
Create a manifest for deploying or retrieving all the metadata components in the specified local directory; name the file myNewManifest.xml:
$ sf project generate manifest --source-dir force-app --name myNewManifest
```

```bash
Create a manifest from the metadata components in the specified org and include metadata in any unlocked packages:
$ sf project generate manifest --from-org test@myorg.com --include-packages unlocked
```

```bash
Create a manifest from specific metadata types in an org:
$ sf project generate manifest --from-org test@myorg.com --metadata ApexClass,CustomObject,CustomLabels
```

```bash
Create a manifest from all metadata components in an org excluding specific metadata types:
$ sf project generate manifest --from-org test@myorg.com --excluded-metadata StandardValueSet
```

---

## `sf project list ignored`

Check your local project package directories for forceignored files.

### Description

When deploying or retrieving metadata between your local project and an org, you can specify the source files you want to exclude with a .forceignore file. The .forceignore file structure mimics the .gitignore structure. Each line in .forceignore specifies a pattern that corresponds to one or more files. The files typically represent metadata components, but can be any files you want to exclude, such as LWC configuration JSON files or tests.

### Aliases

- `sf force source ignored list`

### Usage

```bash
sf project list ignored [--json] [--flags-dir <value>] [--source-dir <value>]
```

### Flags

#### `-p | --source-dir=<value>`

File or directory of files that the command checks for foreceignored files.

- Type: option
- Required: no
- Aliases: `--sourcepath`

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

List all the files in all package directories that are ignored:

```bash
sf project list ignored
```

List all the files in a specific directory that are ignored:

```bash
sf project list ignored --source-dir force-app
```

Check if a particular file is ignored:

```bash
sf project list ignored --source-dir package.xml
```

---

## `sf project reset tracking`

Reset local and remote source tracking.

### Description

WARNING: This command deletes or overwrites all existing source tracking files. Use with extreme caution.

Resets local and remote source tracking so that Salesforce CLI no longer registers differences between your local files and those in the org. When you next run 'project deploy preview', Salesforce CLI returns no results, even though conflicts might actually exist. Salesforce CLI then resumes tracking new source changes as usual.

Use the --revision flag to reset source tracking to a specific revision number of an org source member. To get the revision number, query the SourceMember Tooling API object with the 'data soql' command. For example:

    sf data query --query "SELECT MemberName, MemberType, RevisionCounter FROM SourceMember" --use-tooling-api --target-org my-scratch

### Aliases

- `sf force source tracking reset`

### Usage

```bash
sf project reset tracking [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--revision <value>] [--no-prompt]
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

#### `-r | --revision=<value>`

SourceMember revision counter number to reset to.

- Type: option
- Required: no

#### `-p | --no-prompt`

Don't prompt for source tracking override confirmation.

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

```bash
Reset source tracking for the org with alias "my-scratch":
$ sf project reset tracking --target-org my-scratch
```

```bash
Reset source tracking to revision number 30 for your default org:
$ sf project reset tracking --revision 30
```

---

## `sf project retrieve preview`

Preview a retrieval to see what will be retrieved from the org, the potential conflicts, and the ignored files.

### Description

You must run this command from within a project.

The command outputs a table that describes what will happen if you run the "sf project retrieve start" command. The table lists the metadata components that will be retrieved and deleted. The table also lists the current conflicts between files in your local project and components in the org. Finally, the table lists the files that won't be retrieved because they're included in your .forceignore file.

If your org allows source tracking, then this command displays potential conflicts between the org and your local project. Some orgs, such as production org, never allow source tracking. Source tracking is enabled by default on scratch and sandbox orgs; you can disable source tracking when you create the orgs by specifying the --no-track-source flag on the "sf org create scratch|sandbox" commands.

### Aliases

- `sf retrieve metadata preview`

### Usage

```bash
sf project retrieve preview [--json] [--flags-dir <value>] [--ignore-conflicts] --target-org <value> [--concise]
```

### Flags

#### `-c | --ignore-conflicts`

Don't display conflicts in the preview of the retrieval.

This flag applies only to orgs that allow source tracking. It has no effect on orgs that don't allow it, such as production orgs.

- Type: boolean
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--concise`

Show only the changes that will be retrieved; omits files that are forceignored.

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

Preview the retrieve of all changes from your default org:

```bash
sf project retrieve preview
```

Preview the retrieve when ignoring any conflicts from an org with alias "my-scratch":

```bash
sf project retrieve preview --ignore-conflicts --target-org my-scratch
```

---

## `sf project retrieve start`

Retrieve metadata from an org to your local project.

### Description

You must run this command from within a project.

Metadata components are retrieved in source format by default. Retrieve them in metadata format by specifying the --target-metadata-dir flag, which retrieves the components into a ZIP file in the specified directory.

If your org allows source tracking, then this command tracks the changes in your source. Some orgs, such as production orgs, never allow source tracking. Source tracking is enabled by default on scratch and sandbox orgs; you can disable source tracking when you create the orgs by specifying the --no-track-source flag on the "sf org create scratch|sandbox" commands.

To retrieve multiple metadata components, either use multiple --metadata \<name\> flags or use a single --metadata flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --source-dir.

### Aliases

- `sf retrieve metadata`

### Usage

```bash
sf project retrieve start [--json] [--flags-dir <value>] [--api-version <value>] [--ignore-conflicts] [--manifest <value>] [--metadata <value>] [--package-name <value>] [--root-type-with-dependencies <value>] [--output-dir <value>] [--single-package] [--source-dir <value>] [--target-metadata-dir <value>] --target-org <value> [--wait <value>] [--unzip] [--zip-file-name <value>]
```

### Flags

#### `-a | --api-version=<value>`

Target API version for the retrieve.

Use this flag to override the default API version, which is the latest version supported the CLI, with the API version in your package.xml file.

- Type: option
- Required: no

#### `-c | --ignore-conflicts`

Ignore conflicts and retrieve and save files to your local filesystem, even if they overwrite your local changes.

This flag applies only to orgs that allow source tracking. It has no effect on orgs that don't allow it, such as production orgs.

- Type: boolean
- Required: no

#### `-x | --manifest=<value>`

File path for the manifest (package.xml) that specifies the components to retrieve.

If you specify this flag, don’t specify --metadata or --source-dir.

- Type: option
- Required: no
- Exclusive with: `--metadata`, `--source-dir`

#### `-m | --metadata=<value>`

Metadata component names to retrieve. Wildcards (`*`) supported as long as you use quotes, such as `ApexClass:MyClass*`.

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--manifest`, `--source-dir`

#### `-n | --package-name=<value>`

Package names to retrieve. Use of this flag is for reference only; don't use it to retrieve packaged metadata for development.

The metadata of the supplied package name(s) will be retrieved into a child directory of the project. The name of that child directory matches the name of the package. The retrieved metadata is meant for your reference only, don't add it to a source control system for development and deployment. For package development, retrieve the metadata using a manifest (`--manifest` flag) or by targeting a source controlled package directory within your project (`--source-dir` flag).

- Type: option
- Required: no
- Multiple values: yes

#### `--root-type-with-dependencies=<value>`

Metadata type whose dependent types should also be retrieved.

- Type: option
- Required: no
- Multiple values: yes
- Permitted values: `Bot`, `AiAgentDefinitionVersion`

#### `-r | --output-dir=<value>`

Directory root for the retrieved source files.

The root of the directory structure into which the source files are retrieved.
If the target directory matches one of the package directories in your sfdx-project.json file, the command fails.
Running the command multiple times with the same target adds new files and overwrites existing files.

- Type: option
- Required: no
- Exclusive with: `--package-name`, `--source-dir`

#### `-d | --source-dir=<value>`

File paths for source to retrieve from the org.

The supplied paths can be to a single file (in which case the operation is applied to only one file) or to a folder (in which case the operation is applied to all source files in the directory and its subdirectories).

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--manifest`, `--metadata`

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-w | --wait=<value>`

Number of minutes to wait for the command to complete and display results to the terminal window.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you.

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

### Metadata API Format flags

#### `--single-package`

Indicates that the zip file points to a directory structure for a single package.

- Type: boolean
- Required: no
- Depends on: `--target-metadata-dir`
- Exclusive with: `--ignore-conflicts`

#### `-t | --target-metadata-dir=<value>`

Directory that will contain the retrieved metadata format files or ZIP.

- Type: option
- Required: no
- Exclusive with: `--ignore-conflicts`
- Relationships: some: `--manifest`, `--metadata`, `--source-dir`, `--package-name`

#### `-z | --unzip`

Extract all files from the retrieved zip file.

- Type: boolean
- Required: no
- Depends on: `--target-metadata-dir`
- Exclusive with: `--ignore-conflicts`

#### `--zip-file-name=<value>`

File name to use for the retrieved zip file.

- Type: option
- Required: no
- Depends on: `--target-metadata-dir`
- Exclusive with: `--ignore-conflicts`

### Examples

Retrieve all remote changes from your default org:

```bash
sf project retrieve start
```

Retrieve the source files in the "force-app" directory from an org with alias "my-scratch":

```bash
sf project retrieve start --source-dir force-app --target-org my-scratch
```

Retrieve all the Apex classes and custom objects whose source is in the "force-app" directory. The list views, layouts, etc, that are associated with the custom objects are also retrieved. Both examples are equivalent:

```bash
sf project retrieve start --source-dir force-app/main/default/classes force-app/main/default/objects
sf project retrieve start --source-dir force-app/main/default/classes --source-dir force-app/main/default/objects
```

Retrieve all Apex classes that are in all package directories defined in the "sfdx-project.json" file:

```bash
sf project retrieve start --metadata ApexClass
```

Retrieve a specific Apex class; ignore any conflicts between the local project and org (be careful with this flag, because it will overwrite the Apex class source files in your local project if there are conflicts!):

```bash
sf project retrieve start --metadata ApexClass:MyApexClass --ignore-conflicts
```

Retrieve specific Apex classes that match a pattern; in this example, retrieve Apex classes whose names contain the string "MyApex":

```bash
sf project retrieve start --metadata 'ApexClass:MyApex*'
```

Retrieve the source files in the "force-app" directory; if any of the retrieved metadata is of type "Bot", also retrieve all dependent components of the Bot, such as GenAiPlannerBundles, GenAiPlugins, and GenAiFunctions:

```bash
sf project retrieve start --source-dir force-app -root-type-with-dependencies Bot
```

Retrieve a custom object called ExcitingObject that's in the SBQQ namespace:

```bash
sf project retrieve start --metadata CustomObject:SBQQ__ExcitingObject
```

Retrieve all custom objects in the SBQQ namespace by using a wildcard and quotes:

```bash
sf project retrieve start --metadata 'CustomObject:SBQQ__*'
```

Retrieve all list views for the Case standard object:

```bash
sf project retrieve start --metadata 'ListView:Case*'
```

Retrieve all custom objects and Apex classes found in all defined package directories (both examples are equivalent):

```bash
sf project retrieve start --metadata CustomObject ApexClass
sf project retrieve start --metadata CustomObject --metadata ApexClass
```

Retrieve all metadata components listed in a manifest:

```bash
sf project retrieve start --manifest path/to/package.xml
```

Retrieve metadata from a package:

```bash
sf project retrieve start --package-name MyPackageName
```

Retrieve metadata from multiple packages, one of which has a space in its name (both examples are equivalent):

```bash
sf project retrieve start --package-name Package1 "PackageName With Spaces" Package3
sf project retrieve start --package-name Package1 --package-name "PackageName With Spaces" --package-name Package3
```

Retrieve the metadata components listed in the force-app directory, but retrieve them in metadata format into a ZIP file in the "output" directory:

```bash
sf project retrieve start --source-dir force-app --target-metadata-dir output
```

Retrieve in metadata format and automatically extract the contents into the "output" directory:

```bash
sf project retrieve start --source-dir force-app --target-metadata-dir output --unzip
```

### Environment variables

**ENVIRONMENT VARIABLES**

[object Object]
[object Object]
