# devops Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_devops.html

## `sf devops pipeline create`

Create a DevOps Center pipeline.

### Description

Provide the URL of an existing repository, or use `--create-repo` with a repository name to create one. After you create the pipeline, add stages, and activate the pipeline.

### Usage

```bash
sf devops pipeline create [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --name <value> --repo <value> [--repo-type <value>] [--create-repo] [--repo-owner <value>] [--bitbucket-workspace <value>] [--bitbucket-project-key <value>] [--stage <value>] [--project-id <value>]
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

#### `-n | --name=<value>`

Name of the pipeline.

- Type: option
- Required: yes

#### `-r | --repo=<value>`

URL of an existing repository or the name of a repository to create.

- Type: option
- Required: yes

#### `--repo-type=<value>`

Type of the source code repository. Required when creating a repository using '--create-repo'.

- Type: option
- Required: no
- Permitted values: `github`, `bitbucket`

#### `--create-repo`

Create a repository if it doesn't exist.

- Type: boolean
- Required: no

#### `--repo-owner=<value>`

Owner (organization or user) of the GitHub repository. Required when creating a GitHub repository using '--create-repo'.

- Type: option
- Required: no

#### `--bitbucket-workspace=<value>`

Bitbucket workspace that will own the repository. Required when creating a Bitbucket repository using '--create-repo'.

- Type: option
- Required: no

#### `--bitbucket-project-key=<value>`

Bitbucket project key to associate with the repository. Optional when creating a Bitbucket repository using '--create-repo'.

- Type: option
- Required: no

#### `-s | --stage=<value>`

Name of a pipeline stage, in promotion order. Repeat the flag for each stage. Defaults to Integration, UAT, Staging, and Production.

- Type: option
- Required: no
- Multiple values: yes

#### `--project-id=<value>`

ID of a project to associate with the pipeline. Repeat the flag to associate multiple projects.

- Type: option
- Required: no
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

Create a pipeline and associate it with an existing GitHub repository:

```bash
sf devops pipeline create --target-org my-devops-org --name "Release Pipeline" --repo https://github.com/myorg/myrepo
```

Create a pipeline and associate it with a new GitHub repository:

```bash
sf devops pipeline create --target-org my-devops-org --name "Release Pipeline" --repo my-new-repo --repo-type github --repo-owner myorg --create-repo
```

Create a pipeline and create a new Bitbucket repository:

```bash
sf devops pipeline create --target-org my-devops-org --name "Release Pipeline" --repo my-new-repo --repo-type bitbucket --bitbucket-workspace myworkspace --bitbucket-project-key PROJ --create-repo
```

Create a pipeline and associate it with an existing Bitbucket repository:

```bash
sf devops pipeline create --target-org my-devops-org --name "Release Pipeline" --repo https://bitbucket.org/myworkspace/myrepo
```

Create a pipeline with custom stage names instead of the default stages:

```bash
sf devops pipeline create --target-org my-devops-org --name "Release Pipeline" --repo https://github.com/myorg/myrepo --stage Dev --stage QA --stage Prod
```

Create a pipeline and associate one or more projects with it:

```bash
sf devops pipeline create --target-org my-devops-org --name "Release Pipeline" --repo https://github.com/myorg/myrepo --project-id 0Hn000000000001 --project-id 0Hn000000000002
```

---

## `sf devops pipeline get`

Get details of a DevOps Center pipeline including its stages, repositories, and connected projects.

### Description

Returns full details for a single DevOps Center pipeline: its stages in order, the source code repository and branch associated with each stage, and any connected projects.

### Usage

```bash
sf devops pipeline get [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value>
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

#### `-i | --pipeline-id=<value>`

ID of the DevOps Center pipeline.

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

Get details for a specific pipeline:

```bash
sf devops pipeline get --target-org my-devops-org --pipeline-id 0Do000000000001
```

---

## `sf devops pipeline list`

List DevOps Center pipelines with their stages, repositories, and connected projects.

### Description

Returns all DevOps Center pipelines in the org, including each pipeline's stages (in order), source code repository information per stage, and any connected projects.

### Usage

```bash
sf devops pipeline list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

List all pipelines in the org:

```bash
sf devops pipeline list --target-org my-devops-org
```

---

## `sf devops pipeline project add`

Attach a DevOps Center project to a pipeline.

### Description

You can attach a project to only one pipeline.

### Usage

```bash
sf devops pipeline project add [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value> --project-id <value>
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

#### `--pipeline-id=<value>`

ID of the pipeline.

- Type: option
- Required: yes

#### `--project-id=<value>`

ID of the DevOps Center project.

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

Attach a project to a pipeline using the project ID and pipeline ID.

```bash
sf devops pipeline project add --target-org my-devops-org --pipeline-id 0XB000000000001 --project-id 0Hn000000000001
```

---

## `sf devops pipeline project delete`

Remove a DevOps Center project's connection to a pipeline.

### Description

Deletes the junction record that connects the project to the pipeline. The project itself is not deleted.

### Usage

```bash
sf devops pipeline project delete [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value> --project-id <value>
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

#### `--pipeline-id=<value>`

ID of the pipeline.

- Type: option
- Required: yes

#### `--project-id=<value>`

ID of the DevOps Center project.

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

Remove a project from a pipeline using the project ID and pipeline ID.

```bash
sf devops pipeline project delete --target-org my-devops-org --pipeline-id 0XB000000000001 --project-id 0Hn000000000001
```

---

## `sf devops pipeline stage add`

Add a stage to a DevOps Center pipeline.

### Description

Inserts an empty stage before the stage specified by `--next-stage-id`. The new stage doesn't include a branch or environment. Configure them separately after you create the stage.

### Usage

```bash
sf devops pipeline stage add [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value> --name <value> --next-stage-id <value>
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

#### `--pipeline-id=<value>`

ID of the pipeline where the stage is added.

- Type: option
- Required: yes

#### `-n | --name=<value>`

Name of the pipeline stage, such as Integration, UAT, or Staging.

- Type: option
- Required: yes

#### `--next-stage-id=<value>`

ID of the stage that follows the new stage in the pipeline.

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

Add a Development stage before Integration in a specific pipeline.

```bash
sf devops pipeline stage add --target-org my-devops-org --pipeline-id 0XB000000000001 --name "Development" --next-stage-id 0Xc000000000002
```

Add a QA stage before UAT in a specific pipeline.

```bash
sf devops pipeline stage add --target-org my-devops-org --pipeline-id 0XB000000000001 --name "QA" --next-stage-id 0Xc000000000003
```

---

## `sf devops pipeline stage delete`

Delete a stage from a DevOps Center pipeline.

### Description

Deletes the specified stage from the pipeline. If the stage sits between two other stages, the predecessor stage is automatically re-linked to the successor so the pipeline chain stays intact.

### Usage

```bash
sf devops pipeline stage delete [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value> --stage-id <value>
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

#### `--pipeline-id=<value>`

ID of the pipeline that contains the stage.

- Type: option
- Required: yes

#### `--stage-id=<value>`

ID of the stage to delete.

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

Delete a stage from a pipeline:

```bash
sf devops pipeline stage delete --target-org my-devops-org --pipeline-id 0XB000000000001 --stage-id 0Xc000000000002
```

---

## `sf devops pipeline stage update`

Update a DevOps Center pipeline stage.

### Description

Updates the name of a pipeline stage.

### Usage

```bash
sf devops pipeline stage update [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --stage-id <value> --name <value>
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

#### `-s | --stage-id=<value>`

ID of the pipeline stage to update.

- Type: option
- Required: yes

#### `-n | --name=<value>`

New name for the pipeline stage.

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

Rename a pipeline stage.

```bash
sf devops pipeline stage update --target-org my-devops-org --stage-id 1QV000000000001 --name "Integration"
```

---

## `sf devops pipeline update`

Update a DevOps Center pipeline.

### Description

Activate, deactivate, or rename a DevOps Center pipeline. Use --activate to activate, --deactivate to deactivate, and --name to rename. You can combine --deactivate and --name in one command.

A pipeline must have at least one stage before you can activate it. You can't modify the pipeline stages after you activate and promote changes through it.

### Usage

```bash
sf devops pipeline update [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value> [--activate] [--deactivate] [--name <value>]
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

#### `--pipeline-id=<value>`

ID of the pipeline.

- Type: option
- Required: yes

#### `--activate`

Activate the pipeline. Can't be used with --deactivate.

- Type: boolean
- Required: no
- Exclusive with: `--deactivate`

#### `--deactivate`

Deactivate the pipeline. Can't be used with --activate.

- Type: boolean
- Required: no
- Exclusive with: `--activate`

#### `-n | --name=<value>`

New name for the pipeline.

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

Activate a pipeline:

```bash
sf devops pipeline update --target-org my-devops-org --pipeline-id 0XB000000000001 --activate
```

Deactivate and rename in one step.

```bash
sf devops pipeline update --target-org my-devops-org --pipeline-id 0XB000000000001 --deactivate --name "My Pipeline"
```

---

## `sf devops project create`

Create a DevOps Center project in a DevOps Center org.

### Description

Creates a new DevOps Center project with the specified name and optional description.

### Usage

```bash
sf devops project create [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --name <value> [--description <value>]
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

#### `-n | --name=<value>`

Name of the new DevOps Center project.

- Type: option
- Required: yes

#### `-d | --description=<value>`

Description of the new project; if not specified, the description is blank.

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

Create a new DevOps Center project in the specified org.

```bash
sf devops project create --target-org my-devops-org --name "MyApp Release"
```

Create a project with a name and description.

```bash
sf devops project create --target-org my-devops-org --name "Platform Update" --description "Platform services update"
```

---

## `sf devops project list`

List all DevOps Center projects in a Salesforce org.

### Description

This command queries the DevopsProject standard object and returns the project Id, Name, and Description for each project found.

### Usage

```bash
sf devops project list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

List all DevOps Center projects in an org with alias "my-devops-org":

```bash
sf devops project list --target-org my-devops-org
```

List projects using an org's username:

```bash
sf devops project list --target-org devops-center@example.com
```

---

## `sf devops project update`

Update a DevOps Center project.

### Description

Update the name, description, or active status of a DevOps Center project. At least one of --name, --description, or --is-active must be provided.

### Usage

```bash
sf devops project update [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --project-id <value> [--name <value>] [--description <value>] [--[no-]is-active]
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

#### `-i | --project-id=<value>`

ID of the DevOps Center project to update.

- Type: option
- Required: yes

#### `-n | --name=<value>`

New name for the project.

- Type: option
- Required: no

#### `-d | --description=<value>`

New description for the project.

- Type: option
- Required: no

#### `--[no-]is-active`

Set the project active status. Use --is-active to activate or --no-is-active to deactivate.

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

Rename a project:

```bash
sf devops project update --target-org my-devops-org --project-id 1Qg000000000001 --name "MyApp Release v2"
```

Update the description of a project:

```bash
sf devops project update --target-org my-devops-org --project-id 1Qg000000000001 --description "Updated release description"
```

Deactivate a project:

```bash
sf devops project update --target-org my-devops-org --project-id 1Qg000000000001 --no-is-active
```

Update all fields at once:

```bash
sf devops project update --target-org my-devops-org --project-id 1Qg000000000001 --name "Archived App" --description "Archived" --no-is-active
```

---

## `sf devops promote`

Promote work items or a pipeline stage to a target pipeline stage.

### Description

Promote specific work items or all approved work items from a source stage to the target pipeline stage.

Pass --work-item-id to promote one or more specific work items to the target stage.

Pass --stage-id to promote all approved work items from that source stage to the target stage.

Exactly one of --work-item-id or --stage-id must be provided.

Use --deploy-all to deploy all metadata in the branch rather than only changes not yet in the target stage.

### Usage

```bash
sf devops promote [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --target-stage-id <value> [--work-item-id <value>] [--stage-id <value>] [--deploy-all] [--test-level <value>] [--tests <value>] [--skip-validation]
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

#### `-t | --target-stage-id=<value>`

ID of the pipeline stage to promote to.

- Type: option
- Required: yes

#### `-i | --work-item-id=<value>`

ID of the work item to promote. Mutually exclusive with --stage-id.

Specify this flag multiple times to promote multiple work items in a single operation.

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--stage-id`

#### `-s | --stage-id=<value>`

ID of the source pipeline stage whose approved work items will be promoted. Mutually exclusive with --work-item-id.

- Type: option
- Required: no
- Exclusive with: `--work-item-id`

#### `-a | --deploy-all`

Deploy all metadata in the branch to the stage's org.

If you don’t specify this flag, only changes in the stage’s branch are deployed.

- Type: boolean
- Required: no

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

#### `--tests=<value>`

Apex tests to run when --test-level is RunSpecifiedTests.

Separate multiple test names with commas. Enclose the entire flag value in double quotes if a test name contains spaces.

- Type: option
- Required: no
- Multiple values: yes

#### `--skip-validation`

Skip pre-promote validation. By default, promotion is validated before proceeding to prevent promoting work items without an associated PR. Use this flag to bypass validation.

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

Promote all approved work items from a source stage to a target stage:

```bash
sf devops promote --target-org my-devops-org --stage-id 1QVxx0000000001 --target-stage-id 1QVxx0000000002
```

Promote a specific work item to a stage:

```bash
sf devops promote --target-org my-devops-org --work-item-id 1fkxx0000000001 --target-stage-id 1QVxx0000000001
```

Promote multiple work items:

```bash
sf devops promote --target-org my-devops-org --work-item-id 1fkxx0000000001 --work-item-id 1fkxx0000000002 --target-stage-id 1QVxx0000000001
```

Promote a stage with full deploy:

```bash
sf devops promote --target-org my-devops-org --stage-id 1QVxx0000000001 --target-stage-id 1QVxx0000000002 --deploy-all
```

---

## `sf devops promotion complete`

Deploy undeployed work items to a pipeline stage org.

### Description

Deploys work items that were merged into the pipeline branch outside of DevOps Center (externally merged) into the target stage org and updates DevOps Center records. Equivalent to the "Complete Promotion" action in the DevOps Center UI when a stage is out of sync.

If no undeployed work items are found for the stage, the command exits successfully with no action taken.

### Usage

```bash
sf devops promotion complete [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --target-stage-id <value> [--work-item-id <value>] [--deploy-all] [--test-level <value>] [--tests <value>]
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

#### `-t | --target-stage-id=<value>`

ID of the out-of-sync pipeline stage to deploy to.

- Type: option
- Required: yes

#### `-i | --work-item-id=<value>`

ID of a specific work item to deploy. Omit to deploy all undeployed work items for the stage. Use this for the first stage of a pipeline where no source stage exists.

- Type: option
- Required: no
- Multiple values: yes

#### `-a | --deploy-all`

Deploy all metadata in the branch to the stage's org.

If you don’t specify this flag, only changes in the stage’s branch are deployed.

- Type: boolean
- Required: no

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

#### `--tests=<value>`

Apex tests to run when --test-level is RunSpecifiedTests.

Separate multiple test names with commas. Enclose the entire flag value in double quotes if a test name contains spaces.

- Type: option
- Required: no
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

Complete a promotion for an out-of-sync pipeline stage:

```bash
sf devops promotion complete --target-org my-devops-org --target-stage-id 1QV000000000001
```

Complete a promotion for a specific work item (e.g. first stage of a pipeline):

```bash
sf devops promotion complete --target-org my-devops-org --target-stage-id 1QV000000000001 --work-item-id 1fk000000000001
```

Complete a promotion with full deploy and a specific test level:

```bash
sf devops promotion complete --target-org my-devops-org --target-stage-id 1QV000000000001 --deploy-all --test-level RunLocalTests
```

---

## `sf devops promotion validate`

Validate work item promotion for a pipeline stage.

### Description

Validates whether the specified work items can be promoted to the target pipeline stage. Checks for VCS and object permission errors before a promotion is attempted.

### Usage

```bash
sf devops promotion validate [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --target-stage-id <value> --work-item-id <value>
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

#### `-t | --target-stage-id=<value>`

ID of the target pipeline stage to validate promotion to.

- Type: option
- Required: yes

#### `-i | --work-item-id=<value>`

ID of a work item to validate for promotion. Specify multiple times for multiple work items.

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

Validate promotion of a work item to a target stage:

```bash
sf devops promotion validate --target-org my-devops-org --target-stage-id 1QV000000000001 --work-item-id 1fk000000000001
```

Validate promotion of multiple work items:

```bash
sf devops promotion validate --target-org my-devops-org --target-stage-id 1QV000000000001 --work-item-id 1fk000000000001 --work-item-id 1fk000000000002
```

---

## `sf devops request status`

Get the status of a request.

### Description

Returns the current status of a request identified by its request token.

### Usage

```bash
sf devops request status [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --request-token <value>
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

#### `-i | --request-token=<value>`

Request token from the promote response.

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

Get the status of a request:

```bash
sf devops request status --target-org my-devops-org --request-token a0B000000000001
```

---

## `sf devops review create`

Create a pull request for a work item branch.

### Description

Creates a pull request via the Salesforce DevOps Center API, using the VCS credentials stored in the org. Works with GitHub and Bitbucket without requiring local VCS authentication.

### Usage

```bash
sf devops review create [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--work-item-name <value>] [--work-item-id <value>]
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

#### `-n | --work-item-name=<value>`

Name of the work item, such as WI-000001.

- Type: option
- Required: no

#### `-w | --work-item-id=<value>`

ID of the work item.

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

Create a pull request for a work item.

```bash
sf devops review create --target-org my-devops-org --work-item-name WI-000001
```

Create a pull request using the work item ID.

```bash
sf devops review create --target-org my-devops-org --work-item-id 0Wx000000000001
```

---

## `sf devops stage branch add`

Add a source code repository branch to a pipeline stage.

### Description

By default, the branch must exist in the repository. Use --create-vcs-branch to create a branch if it doesn't exist.
Each pipeline stage supports only one branch. Adding a branch replaces any existing branch linked to the pipeline stage.

### Usage

```bash
sf devops stage branch add [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value> --stage-id <value> --branch-name <value> [--create-vcs-branch]
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

#### `--pipeline-id=<value>`

ID of the pipeline that contains the stage.

- Type: option
- Required: yes

#### `--stage-id=<value>`

ID of the pipeline stage to associate the branch with.

- Type: option
- Required: yes

#### `-b | --branch-name=<value>`

Name of the repository branch to assign to the stage.

- Type: option
- Required: yes

#### `--create-vcs-branch`

Create the branch in the remote repository if it doesn't already exist.

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

Add an existing branch to a stage:

```bash
sf devops stage branch add --target-org my-devops-org --pipeline-id 0Xo000000000001 --stage-id 0Xp000000000001 --branch-name main
```

Create and add a branch to a pipeline stage:

```bash
sf devops stage branch add --target-org my-devops-org --pipeline-id 0Xo000000000001 --stage-id 0Xp000000000002 --branch-name integration --create-vcs-branch
```

---

## `sf devops stage branch delete`

Delete the source code repository branch associated with a pipeline stage.

### Description

Removes the branch linked to the specified pipeline stage. Because branches are configured from right to left (a stage can have a branch only after the stage to its right does), removing a branch also removes the branches from all upstream stages (to the left) in the pipeline, keeping it in a valid state. The branch records in the repository are not deleted; only their association with the stages is removed. The stage must belong to an inactive pipeline.

### Usage

```bash
sf devops stage branch delete [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value> --stage-id <value>
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

#### `--pipeline-id=<value>`

ID of the pipeline that contains the stage. Used to verify the pipeline is inactive before deleting.

- Type: option
- Required: yes

#### `--stage-id=<value>`

ID of the pipeline stage whose branch you want to delete.

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

Delete the branch associated with a pipeline stage:

```bash
sf devops stage branch delete --target-org my-devops-org --pipeline-id 0Xo000000000001 --stage-id 0Xp000000000001
```

---

## `sf devops stage environment add`

Add a Salesforce environment to a pipeline stage.

### Description

This command triggers an OAuth flow to authenticate the environment. A browser window opens automatically for you to log in.

### Usage

```bash
sf devops stage environment add [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value> --stage-id <value> --environment-name <value> --org-type <value> [--no-browser]
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

#### `--pipeline-id=<value>`

ID of the pipeline that contains the stage.

- Type: option
- Required: yes

#### `--stage-id=<value>`

ID of the pipeline stage.

- Type: option
- Required: yes

#### `-e | --environment-name=<value>`

Name of the environment.

- Type: option
- Required: yes

#### `--org-type=<value>`

Type of the Salesforce org. Valid values: Production, Sandbox.

- Type: option
- Required: yes
- Permitted values: `Production`, `Sandbox`

#### `--no-browser`

Don't auto-open the browser for OAuth authentication. The redirect URL is printed for manual use.

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

Add a production environment to a stage using its ID:

```bash
sf devops stage environment add --target-org my-devops-org --stage-id 0Xp000000000001 --environment-name Production_Org --org-type Production
```

---

## `sf devops stage environment delete`

Delete an environment from a DevOps Center pipeline stage.

### Description

Removes the specified environment from the pipeline stage. The environment must belong to an inactive pipeline.

### Usage

```bash
sf devops stage environment delete [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --pipeline-id <value> --environment-id <value>
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

#### `--pipeline-id=<value>`

ID of the pipeline. Used to verify the pipeline is inactive before deleting.

- Type: option
- Required: yes

#### `-e | --environment-id=<value>`

ID of the environment to delete.

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

Delete an environment:

```bash
sf devops stage environment delete --target-org my-devops-org --pipeline-id 0XB000000000001 --environment-id 0Xe000000000001
```

---

## `sf devops work-item combine`

Prepare work items to be combined for custom promotion.

### Description

Use this command when work items in the same stage share metadata or have dependencies. DevOps Center combines the selected work items so they can be promoted together during custom promotion.

After running this command, use "sf devops work-item promote" with the parent work item ID to complete the promotion. The combined work items are promoted as a single unit.

### Usage

```bash
sf devops work-item combine [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --parent-work-item-id <value> --child-work-item-id <value> --target-stage-id <value>
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

#### `--parent-work-item-id=<value>`

ID of the parent work item.

The parent work item is the primary work item that continues through the pipeline. Changes from all child work items are merged into the parent's branch during promotion.

- Type: option
- Required: yes

#### `--child-work-item-id=<value>`

ID of a work item to combine.

Specify this flag multiple times to combine multiple work items with the parent.

- Type: option
- Required: yes
- Multiple values: yes

#### `-t | --target-stage-id=<value>`

ID of the pipeline stage to promote the combined work item to.

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

Prepare three work items to be combined to prevent conflicts during promotion:

```bash
sf devops work-item combine --target-org my-devops-org --parent-work-item-id 0Wx000000000001 --child-work-item-id 0Wx000000000002 --child-work-item-id 0Wx000000000003 --target-stage-id 05S000000000002
```

---

## `sf devops work-item create`

Create a new work item in a DevOps Center project.

### Description

The command creates the work item using the Connect API. Requires a project ID and a subject for the new work item; run the `devops project list` command to get the IDs for all existing projects.

### Usage

```bash
sf devops work-item create [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --project-id <value> --subject <value> [--description <value>]
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

#### `-p | --project-id=<value>`

ID of the DevOps Center project to create the work item in.

- Type: option
- Required: yes

#### `-s | --subject=<value>`

Subject (title) of the new work item.

- Type: option
- Required: yes

#### `-d | --description=<value>`

Description of the new work item; if not specified, the description is blank.

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

Create a work item for the project with the specified ID and give the work item the specified subject (title); use the DevOps Center org with alias "my-devops-org":

```bash
sf devops work-item create --target-org my-devops-org --project-id 1Qg000000000001 --subject "Fix login bug"
```

Create a work item with a subject and description:

```bash
sf devops work-item create --target-org my-devops-org --project-id 1Qg000000000001 --subject "Add dark mode" --description "Implement dark mode toggle in settings page"
```

---

## `sf devops work-item list`

List all work items for a DevOps Center project.

### Description

Each work item displays the branch, environment, and repository details needed for checkout and promotion. Requires a project ID; run the `devops project list` command to get the IDs for all existing projects.

### Usage

```bash
sf devops work-item list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --project-id <value>
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

#### `-p | --project-id=<value>`

ID of the DevOps Center project to list work items for.

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

List work items for a specific project in the DevOps org with alias "my-devops-org":

```bash
sf devops work-item list --target-org my-devops-org --project-id 1Qg000000000001
```

List work items using JSON output:

```bash
sf devops work-item list --target-org my-devops-org --project-id 1Qg000000000001 --json
```

---

## `sf devops work-item prepare`

Prepare a work item for one-off promotion between pipeline stages.

### Description

Prepares a work item for one-off promotion by creating the necessary branches and pull requests in the source control repository. Run this command before running "sf devops work-item promote" for a one-off promotion.

Use "sf devops work-item list" to find the work item ID and target stage ID for a project.

### Usage

```bash
sf devops work-item prepare [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --work-item-id <value> --target-stage-id <value>
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

#### `-i | --work-item-id=<value>`

ID of the work item to prepare for one-off promotion.

- Type: option
- Required: yes

#### `-t | --target-stage-id=<value>`

ID of the pipeline stage to promote the work item to.

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

Prepare a work item for one-off promotion to the UAT stage:

```bash
sf devops work-item prepare --target-org my-devops-org --work-item-id 0Wx000000000001 --target-stage-id 05S000000000002
```

Prepare a work item using a DevOps Center org username:

```bash
sf devops work-item prepare --target-org devops-center@example.com --work-item-id 0Wx000000000001 --target-stage-id 05S000000000002
```

---

## `sf devops work-item update`

Update a work item in DevOps Center.

### Description

Update the subject, description, or status of a work item. At least one of --subject, --description, or --status must be provided.

### Usage

```bash
sf devops work-item update [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--work-item-name <value>] [--work-item-id <value>] [--subject <value>] [--description <value>] [--status <value>]
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

#### `-n | --work-item-name=<value>`

Name of the work item, such as WI-000001.

- Type: option
- Required: no

#### `-w | --work-item-id=<value>`

ID of the work item.

- Type: option
- Required: no

#### `--subject=<value>`

New subject for the work item.

- Type: option
- Required: no

#### `--description=<value>`

New description for the work item.

- Type: option
- Required: no

#### `--status=<value>`

New status for the work item. Allowed values: "In Progress", "Ready to Promote".

- Type: option
- Required: no
- Permitted values: `In Progress`, `Ready to Promote`

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

Update the subject of a work item by name:

```bash
sf devops work-item update --target-org my-devops-org --work-item-name WI-000001 --subject "Fix login bug"
```

Update the status of a work item by ID:

```bash
sf devops work-item update --target-org my-devops-org --work-item-id 0Wx000000000001 --status "In Progress"
```

Update multiple fields at once:

```bash
sf devops work-item update --target-org my-devops-org --work-item-name WI-000001 --subject "Fix login bug" --description "Users can't log in on mobile" --status "In Progress"
```
