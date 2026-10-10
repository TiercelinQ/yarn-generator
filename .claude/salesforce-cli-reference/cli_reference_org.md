# org Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_org.html

## `sf org assign permset`

Assign a permission set to one or more org users.

### Description

To specify an alias for the --target-org or --on-behalf-of flags, use the CLI username alias, such as the one you set with the "alias set" command. Don't use the value of the Alias field of the User Salesforce object for the org user.

To assign multiple permission sets, either set multiple --name flags or a single --name flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --on-behalf-of.

### Usage

```bash
sf org assign permset [--json] [--flags-dir <value>] --name <value> [--on-behalf-of <value>] --target-org <value> [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Permission set to assign.

- Type: option
- Required: yes
- Multiple values: yes
- Aliases: `--permsetname`

#### `-b | --on-behalf-of=<value>`

Username or alias to assign the permission set to.

- Type: option
- Required: no
- Multiple values: yes
- Aliases: `--onbehalfof`

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

Assign two permission sets called DreamHouse and CloudHouse to original admin user of your default org:

```bash
sf org assign permset --name DreamHouse --name CloudHouse
```

Assign the Dreamhouse permission set to the original admin user of the org with alias "my-scratch":

```bash
sf org assign permset --name DreamHouse --target-org my-scratch
```

Assign the Dreamhouse permission set to the specified list of users of your default org:

```bash
sf org assign permset --name DreamHouse --on-behalf-of user1@my.org --on-behalf-of user2 --on-behalf-of user
```

---

## `sf org assign permsetlicense`

Assign a permission set license to one or more org users.

### Description

To specify an alias for the --target-org or --on-behalf-of flags, use the CLI username alias, such as the one you set with the "alias set" command. Don't use the value of the Alias field of the User Salesforce object for the org user.

To assign multiple permission sets, either set multiple --name flags or a single --name flag with multiple names separated by spaces. Enclose names that contain spaces in one set of double quotes. The same syntax applies to --on-behalf-of.

### Usage

```bash
sf org assign permsetlicense [--json] [--flags-dir <value>] --name <value> [--on-behalf-of <value>] --target-org <value> [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the permission set license to assign.

- Type: option
- Required: yes
- Multiple values: yes
- Aliases: `--perm-set-license`, `--psl`

#### `-b | --on-behalf-of=<value>`

Usernames or alias to assign the permission set license to.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Aliases: `--onbehalfof`

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

Assign the DreamHouse permission set license to original admin user of your default org:

```bash
sf org assign permsetlicense --name DreamHouse
```

Assign two permission set licenses to the original admin user of the org with alias "my-scratch":

```bash
sf org assign permsetlicense --name DreamHouse --name CloudHouse --target-org my-scratch
```

Assign the Dreamhouse permission set license to the specified list of users of your default org:

```bash
sf org assign permsetlicense --name DreamHouse --on-behalf-of user1@my.org --on-behalf-of user2 --on-behalf-of user3
```

---

## `sf org auth show-access-token`

Show the current access token for an org.

### Description

Because access tokens are sensitive credentials that grant full access to an org, this command prompts for confirmation before revealing the token. Skip confirmation by specifying either the --no-prompt or --json flag.

### Usage

```bash
sf org auth show-access-token [--json] [--flags-dir <value>] --target-org <value> [--no-prompt]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-p | --no-prompt`

Skip the security warning and reveal the access token without confirmation.

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

Show the access token for the default org:

```bash
sf org auth show-access-token
```

Show the access token for an org with alias "my-org":

```bash
sf org auth show-access-token --target-org my-org
```

Show the access token without the confirmation prompt:

```bash
sf org auth show-access-token --target-org my-org --no-prompt
```

Get the access token as JSON for use in scripts:

```bash
sf org auth show-access-token --target-org my-org --json
```

---

## `sf org auth show-sfdx-auth-url`

Show the SFDX Auth URL for an org.

### Description

Shows the SFDX Auth URL for an org. This URL is only available for orgs authenticated via a web-based OAuth flow. This command prompts for confirmation before revealing it. Skip confirmation by specifying either the --no-prompt or --json flag.

### Usage

```bash
sf org auth show-sfdx-auth-url [--json] [--flags-dir <value>] --target-org <value> [--no-prompt]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-p | --no-prompt`

Skip the security warning and reveal the SFDX Auth URL without confirmation.

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

Show the SFDX Auth URL for the default org:

```bash
sf org auth show-sfdx-auth-url
```

Show the SFDX Auth URL for an org with alias "my-org":

```bash
sf org auth show-sfdx-auth-url --target-org my-org
```

Show the SFDX Auth URL without the confirmation prompt:

```bash
sf org auth show-sfdx-auth-url --target-org my-org --no-prompt
```

Get the SFDX Auth URL as JSON for use in scripts:

```bash
sf org auth show-sfdx-auth-url --target-org my-org --json
```

---

## `sf org auth show-user-password`

Show the stored password for an org's user.

### Description

This command shows only passwords that were generated locally in your DX project with either the "org generate password" or "org create user" CLI command. If you generated a password for a user in Setup in your org, you can't show it with this command.

Because passwords are sensitive credentials, this command prompts for confirmation before revealing it. Skip confirmation by specifying either the --no-prompt or --json flag.

### Usage

```bash
sf org auth show-user-password [--json] [--flags-dir <value>] --target-org <value> [--no-prompt]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-p | --no-prompt`

Skip the security warning and reveal the password without confirmation.

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

Show the password for the default org's user:

```bash
sf org auth show-user-password
```

Show the password for an org with alias "my-org":

```bash
sf org auth show-user-password --target-org my-org
```

Show the password without the confirmation prompt:

```bash
sf org auth show-user-password --target-org my-org --no-prompt
```

Get the password as JSON for use in scripts:

```bash
sf org auth show-user-password --target-org my-org --json
```

---

## `sf org create agent-user`

Create the default Salesforce user that is used to run an agent.

### Description

You specify this user in the agent's Agent Script file using the "default_agent_user" parameter in the "config" block.

By default, this command:

- Generates a user called "Agent User" with a globally unique username. Use flags to change these default names.
- Sets the user's email to the new username.
- Assigns the user the "Einstein Agent User" profile.
- Assigns the user these required permission sets: AgentforceServiceAgentBase, AgentforceServiceAgentUser,
  EinsteinGPTPromptTemplateUser
- Checks that the user licenses required by the profile and permission sets are available in your org.

The generated user doesn't have a password. You can’t log into Salesforce using the agent user's username. Only
Salesforce users with admin permissions can view or edit an agent user in Setup.

To assign additional permission sets or licenses after the user was created, use the "org assign permset" or "org assign
permsetlicense" commands.

When the command completes, it displays a summary of what it did, including the new agent user's username and ID, the
available licenses associated with the Einstein Agent User profile, and the profile and permission sets assigned to the
agent user.

### Usage

```bash
sf org create agent-user [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--base-username <value>] [--first-name <value>] [--last-name <value>]
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

#### `--base-username=<value>`

Base username pattern. A unique ID is appended to ensure global uniqueness of the usename.

Specify a base username in email format, such as "service-agent@corp.com". The command then appends a 12-character
globally unique ID (GUID) to the name before the "@" sign, which ensures that the username is globally unique across all
Salesforce orgs and sandboxes.

For example, if you specify "service-agent@corp.com", then the username might be "service-agent.a1b2c3d4e5f6@corp.com".

If not specified, the command auto-generates the username using this pattern: "agent.user.\<GUID\>@your-org-domain.com".

- Type: option
- Required: no

#### `--first-name=<value>`

First name for the agent user.

- Type: option
- Required: no
- Default: `Agent`

#### `--last-name=<value>`

Last name for the agent user.

- Type: option
- Required: no
- Default: `User`

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

Create an agent user with an auto-generated username; create the user in the org with alias "myorg":

```bash
sf org create agent-user --target-org myorg
```

Create an agent user by specifying a base username pattern; to make the username unique, the command appends a unique
identifier:

```bash
sf org create agent-user --base-username service-agent@corp.com --target-org myorg
```

Create an agent user with an auto-generated username but the custom name "Service Agent"; create the user in your
default org:

```bash
sf org create agent-user --first-name Service --last-name Agent
```

---

## `sf org create sandbox`

Create a sandbox org.

### Description

There are two ways to create a sandbox org: specify a definition file that contains the sandbox options or use the --name and --license-type flags to specify the two required options. If you want to set an option other than name or license type, such as apexClassId, you must use a definition file.

You can also use this command to clone an existing sandbox. Use the --source-sandbox-name flag to specify the existing sandbox name and the --name flag to the name of the new sandbox.

### Aliases

- `sf env create sandbox`

### Usage

```bash
sf org create sandbox [--json] [--flags-dir <value>] [--definition-file <value>] [--set-default] [--alias <value>] [--wait <minutes>] [--poll-interval <seconds>] [--async] [--name <value>] [--source-sandbox-name <value>] [--source-id <value>] [--license-type <value>] --target-org <value> [--no-prompt] [--no-track-source]
```

### Flags

#### `-f | --definition-file=<value>`

Path to a sandbox definition file.

The sandbox definition file is a blueprint for the sandbox. You can create different definition files for each sandbox type that you use in the development process. See <https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_sandbox_definition.htm> for all the options you can specify in the definition file.

- Type: option
- Required: no

#### `-s | --set-default`

Set the sandbox org as your default org.

- Type: boolean
- Required: no

#### `-a | --alias=<value>`

Alias for the sandbox org.

When you create a sandbox, the generated usernames are based on the usernames present in the production org. To ensure uniqueness, the new usernames are appended with the name of the sandbox. For example, the username "user@example.com" in the production org results in the username "user@example.com.mysandbox" in a sandbox named "mysandbox". When you set an alias for a sandbox org, it's assigned to the resulting username of the user running this command.

- Type: option
- Required: no

#### `-w | --wait=<minutes>`

Number of minutes to wait for the sandbox org to be ready.

If the command continues to run after the wait period, the CLI returns control of the terminal to you and displays the "sf org resume sandbox" command you run to check the status of the create. The displayed command includes the job ID for the running sandbox creation.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

#### `-i | --poll-interval=<seconds>`

Number of seconds to wait between retries.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

#### `--async`

Request the sandbox creation, but don't wait for it to complete.

The command immediately displays the job ID and returns control of the terminal to you. This way, you can continue to use the CLI. To check the status of the sandbox creation, run "sf org resume sandbox".

- Type: boolean
- Required: no
- Exclusive with: `--wait`, `--poll-interval`

#### `-n | --name=<value>`

Name of the sandbox org.

The name must be a unique alphanumeric string (10 or fewer characters) to identify the sandbox. You can’t reuse a name while a sandbox is in the process of being deleted.

- Type: option
- Required: no

#### `--source-sandbox-name=<value>`

Name of the sandbox org to clone.

The value of --source-sandbox-name must be an existing sandbox. The existing sandbox, and the new sandbox specified with the --name flag, must both be associated with the production org (--target-org) that contains the sandbox licenses.

You can specify either --source-sandbox-name or --source-id when cloning an existing sandbox, but not both.

- Type: option
- Required: no
- Exclusive with: `--license-type`, `--source-id`
- Aliases: `--clone`, `--c`

#### `--source-id=<value>`

ID of the sandbox org to clone.

The value of --source-id must be an existing sandbox (SandboxInfo.Id). The existing sandbox, and the new sandbox specified with the --name flag, must both be associated with the production org (--target-org) that contains the sandbox licenses.

You can specify either --source-sandbox-name or --source-id when cloning an existing sandbox, but not both.

- Type: option
- Required: no
- Exclusive with: `--license-type`, `--source-sandbox-name`

#### `-l | --license-type=<value>`

Type of sandbox license.

- Type: option
- Required: no
- Permitted values: `Developer`, `Developer_Pro`, `Partial`, `Full`
- Exclusive with: `--source-sandbox-name`, `--source-id`

#### `-o | --target-org=<value>`

Username or alias of the production org that contains the sandbox license.

When it creates the sandbox org, Salesforce copies the metadata, and optionally data, from your production org to the new sandbox org.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--no-prompt`

Don't prompt for confirmation about the sandbox configuration.

- Type: boolean
- Required: no

#### `--no-track-source`

Do not use source tracking for this sandbox.

We recommend you enable source tracking in Developer and Developer Pro sandbox, which is why it's the default behavior. Source tracking allows you to track the changes you make to your metadata, both in your local project and in the sandbox, and to detect any conflicts between the two.

To disable source tracking in the new sandbox, specify the --no-track-source flag. The main reason to disable source tracking is for performance. For example, while you probably want to deploy metadata and run Apex tests in your CI/CD jobs, you probably don't want to incur the costs of source tracking (checking for conflicts, polling the SourceMember object, various file system operations.) This is a good use case for disabling source tracking in the sandbox.

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

Create a sandbox org using a definition file and give it the alias "MyDevSandbox". The production org that contains the sandbox license has the alias "prodOrg".

```bash
sf org create sandbox --definition-file config/dev-sandbox-def.json --alias MyDevSandbox --target-org prodOrg
```

Create a sandbox org by directly specifying its name and type of license (Developer) instead of using a definition file. Set the sandbox org as your default.

```bash
sf org create sandbox --name mysandbox --license-type Developer --alias MyDevSandbox --target-org prodOrg --set-default
```

Clone the existing sandbox with name "ExistingSandbox" and name the new sandbox "NewClonedSandbox". Set the new sandbox as your default org. Wait for 30 minutes for the sandbox creation to complete.

```bash
sf org create sandbox --source-sandbox-name ExistingSandbox --name NewClonedSandbox --target-org prodOrg --alias MyDevSandbox --set-default --wait 30
```

Clone the existing sandbox with ID "0GQB0000000TVobOAG" and do not wait.

```bash
sf org create sandbox --source-id 0GQB0000000TVobOAG --name SbxClone --target-org prodOrg --async
```

---

## `sf org create scratch`

Create a scratch org.

### Description

There are four ways to create a scratch org:

    * Specify a definition file that contains the scratch org options.
    * Use the --edition flag to specify the one required option; this method doesn't require a defintion file.
    * Use the --snapshot flag to create a scratch org from a snapshot. Snapshots are a point-in-time copy of a scratch org; you create a snapshot with the "sf org create snapshot" command.
    * Use the --source-org flag to create a scratch org from an org shape. Org shapes mimic the baseline setup of a source org without the extraneous data and metadata; you create an org shape with the "sf org create shape" command.

The --edition, --snapshot, and --source-org flags are mutually exclusive, which means if you specify one, you can't also specify the others.

For any of the methods, you can also use these flags; if you use them with --definition-file, they override their equivalent option in the scratch org definition file:

    * --description
    * --name  (equivalent to the "orgName" option)
    * --username
    * --release
    * --admin-email (equivalent to the "adminEmail" option)

If you want to set options such as org features or settings, you must use a definition file.

You must specify a Dev Hub to create a scratch org, either with the --target-dev-hub flag or by setting your default Dev Hub with the target-dev-hub configuration variable.

### Aliases

- `sf env create scratch`

### Usage

```bash
sf org create scratch [--json] [--flags-dir <value>] [--alias <value>] [--async] [--set-default] [--definition-file <value>] --target-dev-hub <value> [--no-ancestors] [--edition <value>] [--snapshot <value>] [--no-namespace] [--duration-days <days>] [--wait <minutes>] [--api-version <value>] [--client-id <value>] [--[no-]track-source] [--username <value>] [--description <value>] [--name <value>] [--release <value>] [--admin-email <value>] [--source-org <value>]
```

### Flags

#### `-a | --alias=<value>`

Alias for the scratch org.

New scratch orgs include one administrator by default. The admin user's username is auto-generated and looks something like test-wvkpnfm5z113@example.com. When you set an alias for a new scratch org, it's assigned this username.

- Type: option
- Required: no

#### `--async`

Request the org, but don't wait for it to complete.

The command immediately displays the job ID and returns control of the terminal to you. This way, you can continue to use the CLI. To resume the scratch org creation, run "sf org resume scratch".

- Type: boolean
- Required: no

#### `-d | --set-default`

Set the scratch org as your default org

- Type: boolean
- Required: no

#### `-f | --definition-file=<value>`

Path to a scratch org definition file.

The scratch org definition file is a blueprint for the scratch org. It mimics the shape of an org that you use in the development life cycle, such as acceptance testing, packaging, or production. See <https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_scratch_orgs_def_file.htm> for all the option you can specify in the definition file.

- Type: option
- Required: no

#### `-v | --target-dev-hub=<value>`

Username or alias of the Dev Hub org.

Overrides the value of the target-dev-hub configuration variable, if set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-y | --duration-days=<days>`

Number of days before the org expires.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-w | --wait=<minutes>`

Number of minutes to wait for the scratch org to be ready.

If the command continues to run after the wait period, the CLI returns control of the terminal to you and displays the job ID. To resume the scratch org creation, run the org resume scratch command and pass it the job ID.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `-i | --client-id=<value>`

Consumer key of the Dev Hub connected app.

- Type: option
- Required: no

#### `-t | --[no-]track-source`

Use source tracking for this scratch org. Set --no-track-source to disable source tracking.

We recommend you enable source tracking in scratch orgs, which is why it's the default behavior. Source tracking allows you to track the changes you make to your metadata, both in your local project and in the scratch org, and to detect any conflicts between the two.

To disable source tracking in the new scratch org, specify the --no-track-source flag. The main reason to disable source tracking is for performance. For example, while you probably want to deploy metadata and run Apex tests in your CI/CD jobs, you probably don't want to incur the costs of source tracking (checking for conflicts, polling the SourceMember object, various file system operations.) This is a good use case for disabling source tracking in the scratch org.

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

### Packaging flags

#### `-c | --no-ancestors`

Don't include second-generation managed package (2GP) ancestors in the scratch org.

- Type: boolean
- Required: no

#### `-m | --no-namespace`

Create the scratch org with no namespace, even if the Dev Hub has a namespace.

- Type: boolean
- Required: no

### Definition File Override flags

#### `-e | --edition=<value>`

Salesforce edition of the scratch org. Overrides the value of the "edition" option in the definition file, if set.

The editions that begin with "partner-" are available only if the Dev Hub org is a Partner Business Org.

- Type: option
- Required: no
- Permitted values: `developer`, `enterprise`, `group`, `professional`, `partner-developer`, `partner-enterprise`, `partner-group`, `partner-professional`
- Exclusive with: `--snapshot`, `--source-org`

#### `-s | --snapshot=<value>`

Name of the snapshot to use when creating this scratch org. Overrides the value of the "snapshot" option in the defintion file, if set.

To view the names of the available snapshots for a given Dev Hub org, run the "sf org list snapshot" command.

- Type: option
- Required: no
- Exclusive with: `--edition`, `--source-org`

#### `--username=<value>`

Username of the scratch org admin user. Overrides the value of the "username" option in the definition file, if set.

The username must be unique within the entire scratch org and sandbox universe. You must add your own logic to ensure uniqueness.

Omit this flag to have Salesforce generate a unique username for your org.

- Type: option
- Required: no

#### `--description=<value>`

Description of the scratch org in the Dev Hub. Overrides the value of the "description" option in the definition file, if set.

- Type: option
- Required: no

#### `--name=<value>`

Name of the org, such as "Acme Company". Overrides the value of the "orgName" option in the definition file, if set.

- Type: option
- Required: no

#### `--release=<value>`

Release of the scratch org as compared to the Dev Hub release.

By default, scratch orgs are on the same release as the Dev Hub. During Salesforce release transition periods, you can override this default behavior and opt in or out of the new release.

- Type: option
- Required: no
- Permitted values: `preview`, `previous`

#### `--admin-email=<value>`

Email address that will be applied to the org's admin user. Overrides the value of the "adminEmail" option in the definition file, if set.

- Type: option
- Required: no

#### `--source-org=<value>`

15-character ID of the org shape that the new scratch org is based on. Overrides the value of the "sourceOrg" option in the definition file, if set.

To view the names of the available org shapes for a given Dev Hub org, run the "sf org list shape" command.

- Type: option
- Required: no
- Exclusive with: `--edition`, `--snapshot`

### Examples

Create a Developer edition scratch org using your default Dev Hub and give the scratch org an alias:

```bash
sf org create scratch --edition developer --alias my-scratch-org
```

Create a scratch org with a definition file. Specify the Dev Hub using its alias, set the scratch org as your default, and specify that it expires in 3 days:

```bash
sf org create scratch --target-dev-hub MyHub --definition-file config/project-scratch-def.json --set-default --duration-days 3
```

Create a preview Enterprise edition scratch org; for use only during Salesforce release transition periods:

```bash
sf org create scratch --edition enterprise --alias my-scratch-org --target-dev-hub MyHub --release preview
```

Create a scratch org from a snapshot called "NightlyBranch"; be sure you specify the same Dev Hub org associated with the snapshot. We recommend you increase the --wait time because creating a scratch org from a snapshot can take a while:

```bash
sf org create scratch --alias my-scratch-org --target-dev-hub MyHub --snapshot NightlyBranch --wait 10
```

---

## `sf org create shape`

Create a scratch org configuration (shape) based on the specified source org.

### Description

Scratch org shapes mimic the baseline setup (features, limits, edition, and Metadata API settings) of a source org without the extraneous data and metadata.

Run "sf org list shape" to view the available org shapes and their IDs.

To create a scratch org from an org shape, include the "sourceOrg" property in the scratch org definition file and set it to the org ID of the source org. Then create a scratch org with the "sf org create scratch" command.

### Aliases

- `sf force org shape create`

### Usage

```bash
sf org create shape [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

Create an org shape for the source org with alias SourceOrg:

```bash
sf org create shape --target-org SourceOrg
```

---

## `sf org create snapshot`

Create a snapshot of a scratch org.

### Description

A snapshot is a point-in-time copy of a scratch org. The copy is referenced by its unique name in a scratch org definition file.

Use "sf org get snapshot" to get details, including status, about a snapshot creation request.

To create a scratch org from a snapshot, include the "snapshot" option (instead of "edition") in the scratch org definition file and set it to the name of the snapshot. Then use "sf org create scratch" to create the scratch org.

### Aliases

- `sf force org snapshot create`

### Usage

```bash
sf org create snapshot [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --source-org <value> --name <value> [--description <value>]
```

### Flags

#### `-v | --target-dev-hub=<value>`

Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetdevhubusername`

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-o | --source-org=<value>`

ID or locally authenticated username or alias of scratch org to snapshot.

- Type: option
- Required: yes
- Aliases: `--sourceorg`

#### `-n | --name=<value>`

Unique name of snapshot.

- Type: option
- Required: yes
- Aliases: `--snapshotname`

#### `-d | --description=<value>`

Description of snapshot.

Use this description to document the contents of the snapshot. We suggest that you include a reference point, such as a version control system tag or commit ID.

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

Create a snapshot called "Dependencies" using the source scratch org ID and your default Dev Hub org:

```bash
sf org create snapshot --source-org 00Dxx0000000000 --name Dependencies --description 'Contains PackageA v1.1.0'
```

Create a snapshot called "NightlyBranch" using the source scratch org username and a Dev Hub org with alias NightlyDevHub:

```bash
sf org create snapshot --source-org myuser@myorg --name NightlyBranch --description 'Contains PkgA v2.1.0 and PkgB 3.3.0' --target-dev-hub NightlyDevHub
```

---

## `sf org create user`

Create a user for a scratch org.

### Description

A scratch org includes one administrator user by default. For testing purposes, however, you sometimes need to create additional users.

The easiest way to create a user is to let this command assign default or generated characteristics to the new user. If you want to customize your new user, create a definition file and specify it with the --definition-file flag. In the file, you can include all the User sObject (Salesforce object) fields and Salesforce DX-specific options, as described in "User Definition File for Customizing a Scratch Org User" (https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_scratch_orgs_users_def_file.htm). You can also specify these options on the command line.

If you don't customize your new user, this command creates a user with the following default characteristics:

    * The username is the existing administrator’s username prepended with a timestamp, such as 1505759162830_test-wvkpnfm5z113@example.com.
    * The user’s profile is Standard User.
    * The values of the required fields of the User sObject are the corresponding values of the administrator user.
    * The user has no password.

Use the --set-alias flag to assign a simple name to the user that you can reference in later CLI commands. This alias is local and different from the Alias field of the User sObject record of the new user, which you set in the Setup UI.

When this command completes, it displays the new username and user ID. Run the "org display user" command to get more information about the new user.

After the new user has been created, Salesforce CLI automatically authenticates it to the scratch org so the new user can immediately start using the scratch org. The CLI uses the same authentication method that was used on the associated Dev Hub org. Due to Hyperforce limitations, the scratch org user creation fails if the Dev Hub authentication used the JWT flow and the scratch org is on Hyperforce. For this reason, if you plan to create scratch org users, authenticate to the Dev Hub org with either the "org login web" or "org login sfdx-url" command, and not "org login jwt".

For more information about user limits, defaults, and other considerations when creating a new scratch org user, see https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_scratch_orgs_users.htm.

### Aliases

- `sf force user create`

### Usage

```bash
sf org create user [--json] [--flags-dir <value>] [--set-alias <value>] [--definition-file <value>] [--set-unique-username] --target-org <value> [--api-version <value>]
```

### Flags

#### `-a | --set-alias=<value>`

Set an alias for the created username to reference in other CLI commands.

- Type: option
- Required: no
- Aliases: `--setalias`

#### `-f | --definition-file=<value>`

File path to a user definition file for customizing the new user.

The user definition file uses JSON format and can include any Salesforce User sObject field and Salesforce DX-specific options. See https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_scratch_orgs_users_def_file.htm for more information.

- Type: option
- Required: no
- Aliases: `--definitionfile`

#### `-s | --set-unique-username`

Force the username, if specified in the definition file or at the command line, to be unique by appending the org ID.

The new user’s username must be unique across all Salesforce orgs and in the form of an email address. If you let this command generate a username for you, it's guaranteed to be unique. If you specify an existing username in a definition file, the command fails. Set this flag to force the username to be unique; as a result, the username might be different than what you specify in the definition file.

- Type: boolean
- Required: no
- Aliases: `--setuniqueusername`

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

Create a user for your default scratch org and let this command generate a username, user ID, and other characteristics:

```bash
sf org create user
```

Create a user with alias "testuser1" using a user definition file. Set the "profileName" option to "Chatter Free User", which overrides the value in the defintion file if it also exists there. Create the user for the scratch org with alias "my-scratch":

```bash
sf org create user --set-alias testuser1 --definition-file config/project-user-def.json profileName='Chatter Free User' --target-org my-scratch
```

Create a user by specifying the username, email, and perm set assignment at the command line; command fails if the username already exists in Salesforce:

```bash
sf org create user username=testuser1@my.org email=me@my.org permsets=DreamHouse
```

Create a user with a definition file, set the email value as specified (overriding any value in the definition file), and generate a password for the user. If the username in the definition file isn't unique, the command appends the org ID to make it unique:

```bash
sf org create user --definition-file config/project-user-def.json email=me@my.org generatepassword=true --set-unique-username
```

---

## `sf org delete sandbox`

Delete a sandbox.

### Description

Salesforce CLI marks the org for deletion in the production org that contains the sandbox licenses and then deletes all local references to the org from your computer.
Specify a sandbox with either the username you used when you logged into it, or the alias you gave the sandbox when you created it. Run "sf org list" to view all your orgs, including sandboxes, and their aliases.
Both the sandbox and the associated production org must already be authenticated with the CLI to successfully delete the sandbox.

### Aliases

- `sf env delete sandbox`

### Usage

```bash
sf org delete sandbox [--json] [--flags-dir <value>] --target-org <value> [--no-prompt]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `-p | --no-prompt`

Don't prompt the user to confirm the deletion.

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

Delete a sandbox with alias my-sandbox:

```bash
sf org delete sandbox --target-org my-sandbox
```

Specify a username instead of an alias:

```bash
sf org delete sandbox --target-org myusername@example.com.qa
```

Delete the sandbox without prompting to confirm:

```bash
sf org delete sandbox --target-org my-sandbox --no-prompt
```

---

## `sf org delete scratch`

Delete a scratch org.

### Description

Salesforce CLI marks the org for deletion in the Dev Hub org and then deletes all local references to the org from your computer.
Specify a scratch org with either the username or the alias you gave the scratch org when you created it. Run "sf org list" to view all your orgs, including scratch orgs, and their aliases.

### Aliases

- `sf env delete scratch`

### Usage

```bash
sf org delete scratch [--json] [--flags-dir <value>] --target-org <value> [--no-prompt]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `-p | --no-prompt`

Don't prompt the user to confirm the deletion.

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

Delete a scratch org with alias my-scratch-org:

```bash
sf org delete scratch --target-org my-scratch-org
```

Specify a username instead of an alias:

```bash
sf org delete scratch --target-org test-123456-abcdefg@example.com
```

Delete the scratch org without prompting to confirm :

```bash
sf org delete scratch --target-org my-scratch-org --no-prompt
```

---

## `sf org delete shape`

Delete all org shapes for a target org.

### Description

A source org can have only one active org shape. If you try to create an org shape for a source org that already has one, the previous shape is marked inactive and replaced by a new active shape. If you don’t want to create scratch orgs based on this shape, you can delete the org shape.

### Aliases

- `sf force org shape delete`

### Usage

```bash
sf org delete shape [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--no-prompt]
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

#### `-p | --no-prompt`

Don't prompt for confirmation.

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

Delete all org shapes for the source org with alias SourceOrg:

```bash
sf org delete shape --target-org SourceOrg
```

Delete all org shapes without prompting:

```bash
sf org delete shape --target-org SourceOrg --no-prompt
```

---

## `sf org delete snapshot`

Delete a scratch org snapshot.

### Description

Dev Hub admins can delete any snapshot. Users can delete only their own snapshots, unless a Dev Hub admin gives the user Modify All permission, which works only with the Salesforce license.

### Aliases

- `sf force org snapshot delete`

### Usage

```bash
sf org delete snapshot [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --snapshot <value> [--no-prompt]
```

### Flags

#### `-v | --target-dev-hub=<value>`

Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetdevhubusername`

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-s | --snapshot=<value>`

Name or ID of snapshot to delete.

The IDs of scratch org snapshots start with 0Oo.

- Type: option
- Required: yes

#### `-p | --no-prompt`

Don't prompt the user to confirm the deletion.

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

Delete a snapshot from the default Dev Hub using the snapshot ID:

```bash
sf org delete snapshot --snapshot 0Oo...
```

Delete a snapshot from the specified Dev Hub using the snapshot name:

```bash
sf org delete snapshot --snapshot BaseSnapshot --target-dev-hub SnapshotDevHub
```

---

## `sf org disable tracking`

Prevent Salesforce CLI from tracking changes in your source files between your project and an org.

### Description

Disabling source tracking has no direct effect on the org, it affects only your local environment. Specifically, Salesforce CLI stores the setting in the org's local configuration file so that no source tracking operations are executed when working with the org.

### Usage

```bash
sf org disable tracking [--json] [--flags-dir <value>] --target-org <value>
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
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

Disable source tracking for an org with alias "myscratch":

```bash
sf org disable tracking --target-org myscratch
```

Disable source tracking for an org using a username:

```bash
sf org disable tracking --target-org you@example.com
```

Disable source tracking for your default org:

```bash
sf org disable tracking
```

---

## `sf org display`

Display information about an org.

### Description

Output includes your access token, client Id, connected status, org ID, instance URL, username, and alias, if applicable.

Use --verbose to include the SFDX auth URL. WARNING: The SFDX auth URL contains sensitive information, such as a refresh token that can be used to access an org. Don't share or distribute this URL or token.

Including --verbose displays the sfdxAuthUrl property only if you authenticated to the org using "org login web" (not "org login jwt").

### Aliases

- `sf force org display`

### Usage

```bash
sf org display [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--verbose]
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

#### `--verbose`

Display the sfdxAuthUrl property.

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
Display information about your default org:
$ sf org display
```

```bash
Display information, including the sfdxAuthUrl property, about the org with alias TestOrg1:
$ sf org display --target-org TestOrg1 --verbose
```

---

## `sf org display user`

Display information about a Salesforce user.

### Description

Output includes the profile name, org ID, instance URL, login URL, and alias if applicable. The displayed alias is local and different from the Alias field of the User sObject record of the new user, which you set in the Setup UI.

### Aliases

- `sf force user display`

### Usage

```bash
sf org display user [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

Display information about the admin user of your default scratch org:

```bash
sf org display user
```

Display information about the specified user and output in JSON format:

```bash
sf org display user --target-org me@my.org --json
```

---

## `sf org enable tracking`

Allow Salesforce CLI to track changes in your source files between your project and an org.

### Description

Enabling source tracking has no direct effect on the org, it affects only your local environment. Specifically, Salesforce CLI stores the setting in the org's local configuration file so that source tracking operations are executed when working with the org.

This command throws an error if the org doesn't support tracking. Examples of orgs that don't support source tracking include Developer Edition orgs, production orgs, Partial Copy sandboxes, and Full sandboxes.

### Usage

```bash
sf org enable tracking [--json] [--flags-dir <value>] --target-org <value>
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
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

Enable source tracking for an org with alias "myscratch":

```bash
sf org enable tracking --target-org myscratch
```

Enable source tracking for an org using a username:

```bash
sf org enable tracking --target-org you@example.com
```

Enable source tracking for your default org:

```bash
sf org enable tracking
```

---

## `sf org generate password`

Generate a random password for scratch org users.

### Description

By default, new scratch orgs contain one admin user with no password. Use this command to generate or change a password for this admin user. After it's set, you can’t unset a password, you can only change it.

You can also use the --on-behalf-of flag to generate a password for a scratch org user that you've created locally with the "org create user" command. This command doesn't work for users you created in the scratch org using Setup.

To change the password strength, set the --complexity flag to a value between 3 and 5. Each value specifies the types of characters used in the generated password:

3 - lower and upper case letters and numbers only
4 - lower and upper case letters and symbols only
5 - lower and upper case letters and numbers and symbols only

To see a password that was previously generated, run "org auth show-user-password".

### Usage

```bash
sf org generate password [--json] [--flags-dir <value>] [--on-behalf-of <value>] [--length <value>] [--complexity <value>] --target-org <value> [--api-version <value>]
```

### Flags

#### `-b | --on-behalf-of=<value>`

Comma-separated list of usernames or aliases to assign the password to; must have been created locally with the "org create user" command.

- Type: option
- Required: no
- Multiple values: yes
- Aliases: `--onbehalfof`

#### `-l | --length=<value>`

Number of characters in the generated password; valid values are between 20 and 1000. Default value is 20.

- Type: option
- Required: no
- Default: `20`

#### `-c | --complexity=<value>`

Level of password complexity or strength; the higher the value, the stronger the password.

- Type: option
- Required: no
- Default: `5`

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

Generate a password for the original admin user of your default scratch org:

```bash
sf org generate password
```

Generate a password that contains 25 characters for the original admin user of the scratch org with alias "my-scratch":

```bash
sf org generate password --length 25 --target-org my-scratch
```

Generate a password for your default scratch org admin user that uses lower and upper case letters and numbers only:

```bash
sf org generate password --complexity 3
```

Generate a password for the specified users in the default scratch org; these users must have been created locally with the "org create user" command:

```bash
sf org generate password --on-behalf-of user1@my.org --on-behalf-of user2@my.org --on-behalf-of user3@my.org
```

---

## `sf org get snapshot`

Get details about a scratch org snapshot.

### Description

Snapshot creation can take a while. Use this command with the snapshot name or ID to check its creation status. After the status changes to Active, you can use the snapshot to create scratch orgs.

To create a snapshot, use the "sf org create snapshot" command. To retrieve a list of all snapshots, use "sf org list snapshot".

### Aliases

- `sf force org snapshot get`

### Usage

```bash
sf org get snapshot [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>] --snapshot <value>
```

### Flags

#### `-v | --target-dev-hub=<value>`

Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetdevhubusername`

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-s | --snapshot=<value>`

Name or ID of snapshot to retrieve.

The IDs of scratch org snapshots start with 0Oo.

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

Get snapshot details using its ID and the default Dev Hub org:

```bash
sf org get snapshot --snapshot 0Oo...
```

Get snapshot details using its name from a Dev Hub org with alias SnapshotDevHub:

```bash
sf org get snapshot --snapshot Dependencies --target-dev-hub SnapshotDevHub
```

---

## `sf org list`

List all orgs you’ve created or authenticated to.

### Aliases

- `sf force org list`

### Usage

```bash
sf org list [--json] [--flags-dir <value>] [--verbose] [--all] [--clean] [--no-prompt] [--skip-connection-status]
```

### Flags

#### `--verbose`

List more information about each org.

- Type: boolean
- Required: no

#### `--all`

Include expired, deleted, and unknown-status scratch orgs.

- Type: boolean
- Required: no

#### `--clean`

Remove all local org authorizations for non-active scratch orgs. Use "org logout" to remove non-scratch orgs.

- Type: boolean
- Required: no

#### `-p | --no-prompt`

Don't prompt for confirmation.

- Type: boolean
- Required: no
- Relationships: some: `--clean`
- Aliases: `--noprompt`

#### `--skip-connection-status`

Skip retrieving the connection status of non-scratch orgs.

- Type: boolean
- Required: no
- Aliases: `--skipconnectionstatus`

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
List all orgs you've created or authenticated to:
$ sf org list
```

```bash
List all orgs, including expired, deleted, and unknown-status orgs; don't include the connection status:
$ sf org list --skip-connection-status --all
```

```bash
List orgs and remove local org authorization info about non-active scratch orgs:
$ sf org list --clean
```

---

## `sf org list auth`

List authorization information about the orgs you created or logged into.

### Description

This command uses local authorization information that Salesforce CLI caches when you create a scratch org or log into an org. The command doesn't actually connect to the orgs to verify that they're still active. As a result, this command executes very quickly. If you want to view live information about your authorized orgs, such as their connection status, use the "org list" command.

### Aliases

- `sf force auth list`
- `sf auth list`

### Usage

```bash
sf org list auth [--json] [--flags-dir <value>]
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

List local authorization information about your orgs:

```bash
sf org list auth
```

---

## `sf org list limits`

Display information about limits in your org.

### Description

For each limit, this command returns the maximum allocation and the remaining allocation based on usage. See this topic for a description of each limit: https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_limits.htm.

### Aliases

- `sf force limits api display`
- `sf limits api display`

### Usage

```bash
sf org list limits [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

Display limits in your default org:

```bash
sf org list limits
```

Display limits in the org with alias "my-scratch-org":

```bash
sf org list limits --target-org my-scratch-org
```

---

## `sf org list metadata`

List the metadata components and properties of a specified type.

### Description

Use this command to identify individual components in your manifest file or if you want a high-level view of particular metadata types in your org. For example, you can use this command to return a list of names of all the CustomObject or Layout components in your org, then use this information in a retrieve command that returns a subset of these components.

The username that you use to connect to the org must have the Modify All Data or Modify Metadata Through Metadata API Functions permission.

### Aliases

- `sf force mdapi listmetadata`

### Usage

```bash
sf org list metadata [--json] [--flags-dir <value>] [--api-version <value>] --target-org <value> [--output-file <value>] --metadata-type <value> [--folder <value>]
```

### Flags

#### `--api-version=<value>`

API version to use; default is the most recent API version.

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`, `--a`

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `-f | --output-file=<value>`

Pathname of the file in which to write the results.

- Type: option
- Required: no
- Aliases: `--resultfile`

#### `-m | --metadata-type=<value>`

Metadata type to be retrieved, such as CustomObject; metadata type names are case-sensitive.

- Type: option
- Required: yes
- Aliases: `--metadatatype`

#### `--folder=<value>`

Folder associated with the component; required for components that use folders; folder names are case-sensitive.

Examples of metadata types that use folders are Dashboard, Document, EmailTemplate, and Report.

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
List the CustomObject components, and their properties, in the org with alias "my-dev-org":
$ sf org list metadata --metadata-type CustomObject --target-org my-dev-org
```

```bash
List the CustomObject components in your default org, write the output to the specified file, and use API version 57.0:
$ sf org list metadata --metadata-type CustomObject --api-version 57.0 --output-file /path/to/outputfilename.txt
```

```bash
List the Dashboard components in your default org that are contained in the "folderSales" folder, write the output to the specified file, and use API version 57.0:
$ sf org list metadata --metadata-type Dashboard --folder folderSales --api-version 57.0 --output-file /path/to/outputfilename.txt
```

---

## `sf org list metadata-types`

Display details about the metadata types that are enabled for your org.

### Description

The information includes Apex classes and triggers, custom objects, custom fields on standard objects, tab sets that define an app, and many other metadata types. Use this information to identify the syntax needed for a \<name\> element in a manifest file (package.xml).

The username that you use to connect to the org must have the Modify All Data or Modify Metadata Through Metadata API Functions permission.

### Aliases

- `sf force mdapi describemetadata`

### Usage

```bash
sf org list metadata-types [--json] [--flags-dir <value>] [--api-version <value>] --target-org <value> [--output-file <value>]
```

### Flags

#### `--api-version=<value>`

API version to use; default is the most recent API version.

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`, `--a`

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `-f | --output-file=<value>`

Pathname of the file in which to write the results.

Directing the output to a file makes it easier to extract relevant information for your package.xml manifest file. The default output destination is the terminal or command window console.

- Type: option
- Required: no
- Aliases: `--resultfile`

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
Display information about all known and enabled metadata types in the org with alias "my-dev-org" using API version 57.0:
$ sf org list metadata-types --api-version 57.0 --target-org my-dev-org
```

```bash
Display only the metadata types that aren't yet supported by Salesforce CLI in your default org and write the results to the specified file:
$ sf org list metadata-types --output-file /path/to/outputfilename.txt --filter-known
```

---

## `sf org list shape`

List all org shapes you’ve created.

### Description

The output includes the alias, username, and ID of the source org, the status of the org shape creation, and more. Use the org ID to update your scratch org configuration file so you can create a scratch org based on this org shape.

### Aliases

- `sf force org shape list`

### Usage

```bash
sf org list shape [--json] [--flags-dir <value>]
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

List all org shapes you've created:

```bash
sf org list shape
```

List all org shapes in JSON format and write the output to a file:

```bash
sf org list shape --json > tmp/MyOrgShapeList.json
```

---

## `sf org list snapshot`

List scratch org snapshots.

### Description

You can view all the snapshots in a Dev Hub that you have access to. If you’re an admin, you can see all snapshots associated with the Dev Hub org. If you’re a user, you can see only your snapshots unless a Dev Hub admin gives you View All permissions.

To create a snapshot, use the "sf org create snapshot" command. To get details about a snapshot request, use "sf org get snapshot".

### Aliases

- `sf force org snapshot list`

### Usage

```bash
sf org list snapshot [--json] [--flags-dir <value>] --target-dev-hub <value> [--api-version <value>]
```

### Flags

#### `-v | --target-dev-hub=<value>`

Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetdevhubusername`

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

List snapshots in the default Dev Hub:

```bash
sf org list snapshot
```

List snapshots in the Dev Hub with alias SnapshotDevHub:

```bash
sf org list snapshot --target-dev-hub SnapshotDevHub
```

---

## `sf org list sobject record-counts`

Display record counts for the specified standard or custom objects.

### Description

Use this command to get an approximate count of the records in standard or custom objects in your org. These record counts are the same as the counts listed in the Storage Usage page in the Setup UI. The record counts are approximate because they're calculated asynchronously and your org's storage usage isn't updated immediately. To display all available record counts, run the command without the --sobject flag.

### Aliases

- `sf force limits recordcounts display`
- `sf limits recordcounts display`

### Usage

```bash
sf org list sobject record-counts [--json] [--flags-dir <value>] [--sobject <value>] --target-org <value> [--api-version <value>]
```

### Flags

#### `-s | --sobject=<value>`

API name of the standard or custom object for which to display record counts.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Default: `[]`
- Aliases: `--sobjecttype`

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

Display all available record counts in your default org:

```bash
sf org list sobject record-counts
```

Display record counts for the Account, Contact, Lead, and Opportunity objects in your default org:

```bash
sf org list sobject record-counts --sobject Account --sobject Contact --sobject Lead --sobject Opportunity
```

Display record counts for the Account and Lead objects for the org with alias "my-scratch-org":

```bash
sf org list sobject record-counts --sobject Account --sobject Lead --target-org my-scratch-org
```

---

## `sf org list users`

List all locally-authenticated users of an org.

### Description

For scratch orgs, the list includes any users you've created with the "org create user" command; the original scratch org admin user is marked with "(A)". For other orgs, the list includes the users you used to authenticate to the org.

### Aliases

- `sf force user list`

### Usage

```bash
sf org list users [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

List the locally-authenticated users of your default org:

```bash
sf org list users
```

List the locally-authenticated users of the specified org:

```bash
sf org list users --target-org me@my.org
```

---

## `sf org login access-token`

Authorize an org using an existing Salesforce access token.

### Description

By default, the command runs interactively and asks you for the access token. If you previously authorized the org, the command prompts whether you want to overwrite the local file. Specify --no-prompt to not be prompted.

If you pipe the access token to the command (so stdin isn't an interactive terminal), the command reads the token from stdin and doesn't prompt to overwrite an existing file.

To use the command in a CI/CD script, set the SF_ACCESS_TOKEN environment variable to the access token. Then run the command with the --no-prompt parameter.

### Aliases

- `sf force auth accesstoken store`
- `sf auth accesstoken store`

### Usage

```bash
sf org login access-token [--json] [--flags-dir <value>] --instance-url <value> [--set-default-dev-hub] [--set-default] [--alias <value>] [--no-prompt]
```

### Flags

#### `-r | --instance-url=<value>`

URL of the instance that the org lives on.

If you specify an --instance-url value, this value overrides the sfdcLoginUrl value in your sfdx-project.json file.

To specify a My Domain URL, use the format "https://\<MyDomainName\>.my.salesforce.com".

To specify a sandbox, set --instance-url to "https://\<MyDomainName\>--\<SandboxName\>.sandbox.my.salesforce.com".

- Type: option
- Required: yes
- Aliases: `--instanceurl`

#### `-d | --set-default-dev-hub`

Set the authenticated org as the default Dev Hub.

- Type: boolean
- Required: no
- Aliases: `--setdefaultdevhub`, `--setdefaultdevhubusername`

#### `-s | --set-default`

Set the authenticated org as the default that all org-related commands run against.

- Type: boolean
- Required: no
- Aliases: `--setdefaultusername`

#### `-a | --alias=<value>`

Alias for the org.

- Type: option
- Required: no
- Aliases: `--setalias`

#### `-p | --no-prompt`

Don't prompt for confirmation.

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

Authorize an org on https://mycompany.my.salesforce.com; the command prompts you for the access token:

```bash
sf org login access-token --instance-url https://mycompany.my.salesforce.com
```

Authorize the org without being prompted; you must have previously set the SF_ACCESS_TOKEN environment variable to the access token:

```bash
sf org login access-token --instance-url https://dev-hub.my.salesforce.com --no-prompt
```

---

## `sf org login jwt`

Log in to a Salesforce org using a JSON web token (JWT).

### Description

Use this command in automated environments where you can’t interactively log in with a browser, such as in CI/CD scripts.

Logging into an org authorizes the CLI to run other commands that connect to that org, such as deploying or retrieving a project. You can log into many types of orgs, such as sandboxes, Dev Hubs, Env Hubs, production orgs, and scratch orgs.

Complete these steps before you run this command:

    1. Create a digital certificate (also called digital signature) and the private key to sign the certificate. You can use your own key and certificate issued by a certification authority. Or use OpenSSL to create a key and a self-signed digital certificate.
    2. Store the private key in a file on your computer. When you run this command, you set the --jwt-key-file flag to this file.
    3. Create a custom connected app in your org using the digital certificate. Make note of the consumer key (also called client id) that’s generated for you. Be sure the username of the user logging in is approved to use the connected app. When you run this command, you set the --client-id flag to the consumer key.

See https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_jwt_flow.htm for more information.

We recommend that you set an alias when you log into an org. Aliases make it easy to later reference this org when running commands that require it. If you don’t set an alias, you use the username that you specified when you logged in to the org. If you run multiple commands that reference the same org, consider setting the org as your default. Use --set-default for your default scratch org or sandbox, or --set-default-dev-hub for your default Dev Hub.

### Aliases

- `sf force auth jwt grant`
- `sf auth jwt grant`

### Usage

```bash
sf org login jwt [--json] [--flags-dir <value>] --username <value> --jwt-key-file <value> --client-id <value> [--instance-url <value>] [--set-default-dev-hub] [--set-default] [--alias <value>]
```

### Flags

#### `-o | --username=<value>`

Username of the user logging in.

- Type: option
- Required: yes
- Aliases: `--u`

#### `-f | --jwt-key-file=<value>`

Path to a file containing the private key.

- Type: option
- Required: yes
- Aliases: `--jwtkeyfile`, `--keyfile`

#### `-i | --client-id=<value>`

OAuth client ID (also called consumer key) of your custom connected app.

- Type: option
- Required: yes
- Aliases: `--clientid`

#### `-r | --instance-url=<value>`

URL of the instance that the org lives on.

If you specify an --instance-url value, this value overrides the sfdcLoginUrl value in your sfdx-project.json file.

To specify a My Domain URL, use the format "https://\<MyDomainName\>.my.salesforce.com".

To specify a sandbox, set --instance-url to "https://\<MyDomainName\>--\<SandboxName\>.sandbox.my.salesforce.com".

- Type: option
- Required: no
- Aliases: `--instanceurl`, `--l`

#### `-d | --set-default-dev-hub`

Set the authenticated org as the default Dev Hub.

- Type: boolean
- Required: no
- Aliases: `--setdefaultdevhub`, `--setdefaultdevhubusername`, `--v`

#### `-s | --set-default`

Set the authenticated org as the default that all org-related commands run against.

- Type: boolean
- Required: no
- Aliases: `--setdefaultusername`

#### `-a | --alias=<value>`

Alias for the org.

- Type: option
- Required: no
- Aliases: `--setalias`

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

Log into an org with username jdoe@example.org and on the default instance URL (https://login.salesforce.com). The private key is stored in the file /Users/jdoe/JWT/server.key and the command uses the connected app with consumer key (client id) 04580y4051234051.

```bash
sf org login jwt --username jdoe@example.org --jwt-key-file /Users/jdoe/JWT/server.key --client-id 04580y4051234051
```

Set the org as the default and give it an alias:

```bash
sf org login jwt --username jdoe@example.org --jwt-key-file /Users/jdoe/JWT/server.key --client-id 04580y4051234051 --alias ci-org --set-default
```

Set the org as the default Dev Hub and give it an alias:

```bash
sf org login jwt --username jdoe@example.org --jwt-key-file /Users/jdoe/JWT/server.key --client-id 04580y4051234051 --alias ci-dev-hub --set-default-dev-hub
```

Log in to a sandbox using URL https://MyDomainName--SandboxName.sandbox.my.salesforce.com:

```bash
sf org login jwt --username jdoe@example.org --jwt-key-file /Users/jdoe/JWT/server.key --client-id 04580y4051234051 --alias ci-org --set-default --instance-url https://MyDomainName--SandboxName.sandbox.my.salesforce.com
```

---

## `sf org login sfdx-url`

Authorize an org using a Salesforce DX authorization URL stored in a file or through standard input (stdin).

### Description

You use the Salesforce DX (SFDX) authorization URL to authorize Salesforce CLI to connect to a target org. The URL contains the required data to accomplish the authorization, such as the client ID, client secret, and instance URL. You must specify the SFDX authorization URL in this format: "force://\<clientId\>:\<clientSecret\>:\<refreshToken\>@\<instanceUrl\>". Replace \<clientId\>, \<clientSecret\>, \<refreshToken\>, and \<instanceUrl\> with the values specific to your target org. For \<instanceUrl\>, don't include a protocol (such as "https://"). Note that although the SFDX authorization URL starts with "force://", it has nothing to do with the actual authorization. Salesforce CLI always communicates with your org using HTTPS.

To see the SFDX authorization URL for an org, run "org auth show-sfdx-auth-url".

You have three options when creating the authorization file. The easiest option is to redirect the output of the "sf org auth show-sfdx-auth-url --json" command into a file. For example, using an org with alias my-org that you've already authorized:

    $ sf org auth show-sfdx-auth-url --target-org my-org --json > authFile.json

The resulting JSON file contains the URL in the "sfdxAuthUrl" property of the "result" object. You can then reference the file when running this command:

    $ sf org:login:sfdx-url --sfdx-url-file authFile.json

NOTE: The SFDX auth URL is only available for orgs authorized with a web-based OAuth flow, and not the JWT bearer flow.

You can also create a JSON file that has a top-level property named sfdxAuthUrl whose value is the authorization URL. Finally, you can create a normal text file that includes just the URL and nothing else.

Alternatively, you can pipe the SFDX authorization URL through standard input by specifying the --sfdx-url-stdin flag.

### Aliases

- `sf force auth sfdxurl store`
- `sf auth sfdxurl store`

### Usage

```bash
sf org login sfdx-url [--json] [--flags-dir <value>] [--sfdx-url-file <value>] [--sfdx-url-stdin <value>] [--set-default-dev-hub] [--set-default] [--alias <value>]
```

### Flags

#### `-f | --sfdx-url-file=<value>`

Path to a file that contains the Salesforce DX authorization URL.

- Type: option
- Required: no
- Aliases: `--sfdxurlfile`

#### `-u | --sfdx-url-stdin=<value>`

Pipe the Salesforce DX authorization URL through standard input (stdin).

- Type: option
- Required: no
- Aliases: `--sfdxurlstdin`

#### `-d | --set-default-dev-hub`

Set the authenticated org as the default Dev Hub.

- Type: boolean
- Required: no
- Aliases: `--setdefaultdevhub`, `--setdefaultdevhubusername`

#### `-s | --set-default`

Set the authenticated org as the default that all org-related commands run against.

- Type: boolean
- Required: no
- Aliases: `--setdefaultusername`

#### `-a | --alias=<value>`

Alias for the org.

- Type: option
- Required: no
- Aliases: `--setalias`

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

Authorize an org using the SFDX authorization URL in the files/authFile.json file:

```bash
sf org login sfdx-url --sfdx-url-file files/authFile.json
```

Similar to previous example, but set the org as your default and give it an alias MyDefaultOrg:

```bash
sf org login sfdx-url --sfdx-url-file files/authFile.json --set-default --alias MyDefaultOrg
```

```bash
Pipe the SFDX authorization URL from stdin:
$ echo url | sf org login sfdx-url --sfdx-url-stdin
```

---

## `sf org login web`

Log in to a Salesforce org using the web server flow.

### Description

Opens a Salesforce instance URL in a web browser so you can enter your credentials and log in to your org. After you log in, you can close the browser window.

Logging into an org authorizes the CLI to run other commands that connect to that org, such as deploying or retrieving metadata. You can log into many types of orgs, such as sandboxes, Dev Hubs, Env Hubs, production orgs, and scratch orgs.

We recommend that you set an alias when you log into an org. Aliases make it easy to later reference this org when running commands that require it. If you don’t set an alias, you use the username that you specified when you logged in to the org. If you run multiple commands that reference the same org, consider setting the org as your default. Use --set-default for your default scratch org or sandbox, or --set-default-dev-hub for your default Dev Hub.

By default, this command uses the global out-of-the-box connected app in your org. If you need more security or control, such as setting the refresh token timeout or specifying IP ranges, create your own connected app using a digital certificate. Make note of the consumer key (also called cliend id) that’s generated for you. Then specify the consumer key with the --client-id flag.

You can also use this command to link one or more connected or external client apps in an org to an already-authenticated user. Then Salesforce CLI commands that have API-specific requirements, such as new OAuth scopes or JWT-based access tokens, can use these custom client apps rather than the default one. To create the link, you use the --client-app flag to give the link a name and the --username flag to specify the already-authenticated user. Use the --scopes flag to add OAuth scopes if required. After you create the link, you then use the --client-app value in the other command that has the API-specific requirements. An example of a command that uses this feature is "agent preview"; see the "Preview an Agent" section in the "Agentforce Developer Guide" for details and examples. (https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-preview.html)

### Aliases

- `sf force auth web login`
- `sf auth web login`

### Usage

```bash
sf org login web [--json] [--flags-dir <value>] [--browser <value>] [--client-id <value>] [--instance-url <value>] [--set-default-dev-hub] [--set-default] [--alias <value>] [--client-app <value>] [--username <value>] [--scopes <value>]
```

### Flags

#### `-b | --browser=<value>`

Browser in which to open the org.

If you don’t specify --browser, the command uses your default browser. The exact names of the browser applications differ depending on the operating system you're on; check your documentation for details.

- Type: option
- Required: no
- Permitted values: `chrome`, `edge`, `firefox`

#### `-i | --client-id=<value>`

OAuth client ID (also called consumer key) of your custom connected app.

- Type: option
- Required: no
- Aliases: `--clientid`

#### `-r | --instance-url=<value>`

URL of the instance that the org lives on.

If you specify an --instance-url value, this value overrides the sfdcLoginUrl value in your sfdx-project.json file.

To specify a My Domain URL, use the format "https://\<MyDomainName\>.my.salesforce.com".

To specify a sandbox, set --instance-url to "https://\<MyDomainName\>--\<SandboxName\>.sandbox.my.salesforce.com".

- Type: option
- Required: no
- Aliases: `--instanceurl`, `--l`

#### `-d | --set-default-dev-hub`

Set the authenticated org as the default Dev Hub.

- Type: boolean
- Required: no
- Aliases: `--setdefaultdevhubusername`, `--setdefaultdevhub`, `--v`

#### `-s | --set-default`

Set the authenticated org as the default that all org-related commands run against.

- Type: boolean
- Required: no
- Aliases: `--setdefaultusername`

#### `-a | --alias=<value>`

Alias for the org.

- Type: option
- Required: no
- Aliases: `--setalias`

#### `-c | --client-app=<value>`

Name to give to the link between the connected app or external client and the already-authenticated user. You can specify any string you want. Must be used with --username.

- Type: option
- Required: no
- Depends on: `--username`

#### `--username=<value>`

Username of the already-authenticated user to link to the connected app or external client app. Must be used with --client-app.

- Type: option
- Required: no
- Depends on: `--client-app`

#### `--scopes=<value>`

Authentication (OAuth) scopes to request. Use the scope's short name; specify multiple scopes using just one flag instance and separated by spaces: --scopes "sfap_api chatbot_api".

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

Run the command with no flags to open the default Salesforce login page (https://login.salesforce.com):

```bash
sf org login web
```

Log in to your Dev Hub, set it as your default Dev Hub, and set an alias that you reference later when you create a scratch org:

```bash
sf org login web --set-default-dev-hub --alias dev-hub
```

Log in to a sandbox and set it as your default org:

```bash
sf org login web --instance-url https://MyDomainName--SandboxName.sandbox.my.salesforce.com --set-default
```

Use --browser to specify a specific browser, such as Google Chrome:

```bash
sf org login web --instance-url https://MyDomainName--SandboxName.sandbox.my.salesforce.com --set-default --browser chrome
```

Use your own connected app by specifying its consumer key (also called client ID) and specify additional OAuth scopes:

```bash
sf org login web --instance-url https://MyDomainName--SandboxName.sandbox.my.salesforce.com --set-default --browser chrome --client-id 04580y4051234051 --scopes "sfap_api chatbot_api"
```

---

## `sf org logout`

Log out of a Salesforce org.

### Description

If you run this command with no flags and no default org set in your config or environment, it first displays a list of orgs you've created or logged into, with none of the orgs selected. Use the arrow keys to scroll through the list and the space bar to select the orgs you want to log out of. Press Enter when you're done; the command asks for a final confirmation before logging out of the selected orgs.

The process is similar if you specify --all, except that in the initial list of orgs, they're all selected. Use --target-org to logout of a specific org. In both these cases by default, you must still confirm that you want to log out. Use --no-prompt to never be asked for confirmation when also using --all or --target-org.

Be careful! If you log out of a scratch org without having access to its password, you can't access the scratch org again, either through the CLI or the Salesforce UI.

Use the --client-app flag to log out of the link you previously created between an authenticated user and a connected app or external client app; you create these links with "org login web --client-app". Run "org display" to get the list of client app names.

### Aliases

- `sf force auth logout`
- `sf auth logout`

### Usage

```bash
sf org logout [--json] [--flags-dir <value>] [--target-org <value>] [--client-app <value>] [--all] [--no-prompt]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org.

- Type: option
- Required: no
- Aliases: `--targetusername`, `--u`

#### `-c | --client-app=<value>`

Client app to log out of.

- Type: option
- Required: no
- Depends on: `--target-org`

#### `-a | --all`

Include all authenticated orgs.

All orgs includes Dev Hubs, sandboxes, DE orgs, and expired, deleted, and unknown-status scratch orgs.

- Type: boolean
- Required: no
- Exclusive with: `--target-org`

#### `-p | --no-prompt`

Don't prompt for confirmation.

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

Interactively select the orgs to log out of:

```bash
sf org logout
```

Log out of the org with username me@my.org:

```bash
sf org logout --target-org me@my.org
```

Log out of all orgs after confirmation:

```bash
sf org logout --all
```

Logout of the org with alias my-scratch and don't prompt for confirmation:

```bash
sf org logout --target-org my-scratch --no-prompt
```

---

## `sf org open`

Open your default scratch org, or another specified org, in a browser.

### Description

To open a specific page, specify the portion of the URL after "https://mydomain.my.salesforce.com" as the value for the --path flag. For example, specify "--path lightning" to open Lightning Experience, or specify "--path /apex/YourPage" to open a Visualforce page.

Use the --source-file flag to open ApexPage, FlexiPage, Flow, or Agent metadata from your local project in the associated Builder within the Org.

To generate a URL but not launch it in your browser, specify --url-only.

To open in a specific browser, use the --browser flag. Supported browsers are "chrome", "edge", and "firefox". If you don't specify --browser, the org opens in your default browser.

### Aliases

- `sf force org open`
- `sf force source open`

### Usage

```bash
sf org open [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--private] [--browser <value>] [--path <value>] [--url-only] [--source-file <value>]
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

#### `--private`

Open the org in the default browser using private (incognito) mode.

- Type: boolean
- Required: no
- Exclusive with: `--url-only`, `--browser`

#### `-b | --browser=<value>`

Browser where the org opens.

- Type: option
- Required: no
- Permitted values: `chrome`, `edge`, `firefox`
- Exclusive with: `--url-only`, `--private`

#### `-p | --path=<value>`

Navigation URL path to open a specific page.

- Type: option
- Required: no
- Exclusive with: `--source-file`
- Environment variable: `FORCE_OPEN_URL`

#### `-r | --url-only`

Display navigation URL, but don’t launch browser.

- Type: boolean
- Required: no
- Aliases: `--urlonly`

#### `-f | --source-file=<value>`

Path to ApexPage, FlexiPage, Flow, or Agent metadata to open in the associated Builder.

- Type: option
- Required: no
- Exclusive with: `--path`
- Aliases: `--sourcefile`

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
Open your default org in your default browser:
$ sf org open
```

```bash
Open your default org in an incognito window of your default browser:
$ sf org open --private
```

```bash
Open the org with alias MyTestOrg1 in the Firefox browser:
$ sf org open --target-org MyTestOrg1 --browser firefox
```

```bash
Display the navigation URL for the Lightning Experience page for your default org, but don't open the page in a browser:
$ sf org open --url-only --path lightning
```

```bash
Open a local Lightning page in your default org's Lightning App Builder:
$ sf org open --source-file force-app/main/default/flexipages/Hello.flexipage-meta.xml
```

```bash
Open a local Flow in Flow Builder:
$ sf org open --source-file force-app/main/default/flows/Hello.flow-meta.xml
```

```bash
Open local Agent metadata (Bot) in Agent Builder:
$ sf org open --source-file force-app/main/default/bots/Coral_Cloud_Agent/Coral_Cloud_Agent.bot-meta.xml
```

---

## `sf org open agent`

Open an agent in your org's Agentforce Builder UI in a browser.

### Description

Use the --api-name flag to open an agent using its API name in the Agentforce Builder UI of your org. Alternatively, use the --authoring-bundle flag to open an agent using the API name of its authoring bundle. The two API names are typically the same for the same agent. Optionally specify the --version flag to open a specific version of the agent.

To generate the URL but not launch it in your browser, specify --url-only.

To open Agentforce Builder in a specific browser, use the --browser flag. Supported browsers are "chrome", "edge", and "firefox". If you don't specify --browser, the org opens in your default browser.

### Usage

```bash
sf org open agent [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--api-name <value>] [--private] [--browser <value>] [--url-only] [--authoring-bundle <value>] [--version <value>]
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

#### `-n | --api-name=<value>`

API name, also known as developer name, of the agent you want to open in the org's Agentforce Builder UI.

- Type: option
- Required: no

#### `--private`

Open the agent in the default browser using private (incognito) mode.

- Type: boolean
- Required: no
- Exclusive with: `--url-only`, `--browser`

#### `-b | --browser=<value>`

Browser where the org opens.

- Type: option
- Required: no
- Permitted values: `chrome`, `edge`, `firefox`
- Exclusive with: `--url-only`, `--private`

#### `-r | --url-only`

Display navigation URL, but don’t launch browser.

- Type: boolean
- Required: no
- Aliases: `--urlonly`

#### `--authoring-bundle=<value>`

API name of the agent's authoring bundle to open in Agentforce Builder.

- Type: option
- Required: no

#### `--version=<value>`

Version number of the agent to open in Agentforce Builder. If not specified, the highest version is opened by default.

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
Open the agent with API name Coral_Cloud_Agent in your default org using your default browser; opens the highest version:
$ sf org open agent --api-name Coral_Cloud_Agent
```

```bash
Open the agent in an incognito window of your default browser:
$ sf org open agent --private --api-name Coral_Cloud_Agent:
```

```bash
Open the agent in an org with alias MyTestOrg1 using the Firefox browser:
$ sf org open agent --target-org MyTestOrg1 --browser firefox --api-name Coral_Cloud_Agent
```

```bash
Open an agent in Agentforce Builder using its authoring bundle API name:
$ sf org open agent --authoring-bundle Coral_Cloud_Agent
```

```bash
Open a version 1 of an agent in Agentforce Builder:
$ sf org open agent --authoring-bundle Coral_Cloud_Agent --version 1
```

---

## `sf org refresh sandbox`

Refresh a sandbox org using the sandbox name.

### Description

Refreshing a sandbox copies the metadata, and optionally data, from your source org to the refreshed sandbox org. You can optionally specify a definition file if you want to change the configuration of the refreshed sandbox, such as its license type or template ID. You can also use the --source-id or --source-sandbox-name flags to change the refreshed sandbox org's original source org to a new org; in this case, the refreshed sandbox org's metadata is updated with the new source org's metadata.

You're not allowed to change the sandbox name when you refresh it with this command. If you want to change the sandbox name, first delete it with the "org delete sandbox" command. And then recreate it with the "org create sandbox" command and give it a new name.

### Usage

```bash
sf org refresh sandbox [--json] [--flags-dir <value>] [--no-auto-activate] [--wait <minutes>] [--poll-interval <seconds>] [--source-sandbox-name <value>] [--source-id <value>] [--async] [--name <value>] [--definition-file <value>] --target-org <value> [--no-prompt]
```

### Flags

#### `--no-auto-activate`

Disable auto-activation of the sandbox after a successful refresh.

By default, a sandbox auto-activates after a refresh. Use this flag to control sandbox activation manually.

- Type: boolean
- Required: no

#### `-w | --wait=<minutes>`

Number of minutes to poll for sandbox refresh status.

If the command continues to run after the wait period, the CLI returns control of the terminal to you and displays the "sf org resume sandbox" command for you run to check the status of the refresh. The displayed command includes the job ID for the running sandbox refresh.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

#### `-i | --poll-interval=<seconds>`

Number of seconds to wait between status polling requests.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)
- Exclusive with: `--async`

#### `--source-sandbox-name=<value>`

Name of the sandbox org that becomes the new source org for the refreshed sandbox.

The value of --source-sandbox-name must be an existing sandbox. The new source sandbox, and the refreshed sandbox specified with the --name flag, must both be associated with the production org (--target-org) that contains the sandbox licenses.

You can specify either --source-sandbox-name or --source-id when refreshing an existing sandbox, but not both.

- Type: option
- Required: no
- Exclusive with: `--source-id`

#### `--source-id=<value>`

ID of the sandbox org that becomes the new source org for the refreshed sandbox.

The value of --source-id must be an existing sandbox. The new source sandbox, and the refreshed sandbox specified with the --name flag, must both be associated with the production org (--target-org) that contains the sandbox licenses.

You can specify either --source-id or --source-sandbox-name when refreshing an existing sandbox, but not both.

- Type: option
- Required: no
- Exclusive with: `--source-sandbox-name`

#### `--async`

Request the sandbox refresh, but don't wait for it to complete.

The command immediately displays the job ID and returns control of the terminal to you. This way, you can continue to use the CLI. To check the status of the sandbox refresh, run "sf org resume sandbox".

- Type: boolean
- Required: no
- Exclusive with: `--wait`, `--poll-interval`

#### `-n | --name=<value>`

Name of the existing sandbox org in your production org that you want to refresh.

- Type: option
- Required: no

#### `-f | --definition-file=<value>`

Path to a sandbox definition file for overriding its configuration when you refresh it.

The sandbox definition file is a blueprint for the sandbox; use the file to change the sandbox configuration during a refresh. If you don't want to change the sandbox configuration when you refresh it, then simply use the --name flag to specify the sandbox and don't use this flag. See <https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_sandbox_definition.htm> for all the options you can specify in the definition file.

- Type: option
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the production org that contains the sandbox license.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--no-prompt`

Don't prompt for confirmation about the sandbox refresh.

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

Refresh the sandbox named "devSbx1". The production org that contains the sandbox license has the alias "prodOrg".

```bash
sf org refresh sandbox --name devSbx1 --target-org prodOrg
```

Refresh the sandbox named "devSbx2", and override the configuration of the refreshed sandbox with the properties in the specified defintion file. The default target org is the production org, so you don't need to specify the `--target-org` flag in this case.

```bash
sf org refresh sandbox --name devSbx2 --definition-file devSbx2-config.json
```

Refresh the sandbox using the name defined in the definition file. The production org that contains the sandbox license has the alias "prodOrg".

```bash
sf org refresh sandbox --definition-file devSbx3-config.json --target-org prodOrg
```

Refresh the sandbox named "devSbx2" by changing its original source org to be a sandbox called "devSbx3":

```bash
sf org refresh sandbox --name devSbx2 --source-sandbox-name devSbx3 --target-org prodOrg
```

---

## `sf org resume sandbox`

Check the status of a sandbox creation, and log in to it if it's ready.

### Description

Sandbox creation can take a long time. If the original "sf org create sandbox" command either times out, or you specified the --async flag, the command displays a job ID. Use this job ID to check whether the sandbox creation is complete, and if it is, the command then logs into it.

You can also use the sandbox name to check the status or the --use-most-recent flag to use the job ID of the most recent sandbox creation.

### Aliases

- `sf env resume sandbox`

### Usage

```bash
sf org resume sandbox [--json] [--flags-dir <value>] [--wait <minutes>] [--name <value>] [--job-id <value>] [--use-most-recent] [--target-org <value>]
```

### Flags

#### `-w | --wait=<minutes>`

Number of minutes to wait for the sandbox org to be ready.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you and returns the job ID. To resume checking the sandbox creation, rerun this command.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-n | --name=<value>`

Name of the sandbox org.

- Type: option
- Required: no
- Exclusive with: `--job-id`

#### `-i | --job-id=<value>`

Job ID of the incomplete sandbox creation that you want to check the status of.

The job ID is valid for 24 hours after you start the sandbox creation.

- Type: option
- Required: no
- Exclusive with: `--name`

#### `-l | --use-most-recent`

Use the most recent sandbox create request.

- Type: boolean
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the production org that contains the sandbox license.

When it creates the sandbox org, Salesforce copies the metadata, and optionally data, from your production org to the new sandbox org.

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

Check the status of a sandbox creation using its name and specify a production org with alias "prodOrg":

```bash
sf org resume sandbox --name mysandbox --target-org prodOrg
```

Check the status using the job ID:

```bash
sf org resume sandbox --job-id 0GRxxxxxxxx
```

Check the status of the most recent sandbox create request:

```bash
sf org resume sandbox --use-most-recent
```

---

## `sf org resume scratch`

Resume the creation of an incomplete scratch org.

### Description

When the original "sf org create scratch" command either times out or is run with the --async flag, it displays a job ID.

Run this command by either passing it a job ID or using the --use-most-recent flag to specify the most recent incomplete scratch org.

### Aliases

- `sf env resume scratch`

### Usage

```bash
sf org resume scratch [--json] [--flags-dir <value>] [--job-id <value>] [--use-most-recent] [--wait <minutes>]
```

### Flags

#### `-i | --job-id=<value>`

Job ID of the incomplete scratch org create that you want to resume.

The job ID is the same as the record ID of the incomplete scratch org in the ScratchOrgInfo object of the Dev Hub.

The job ID is valid for 24 hours after you start the scratch org creation.

- Type: option
- Required: no

#### `-r | --use-most-recent`

Use the job ID of the most recent incomplete scratch org.

- Type: boolean
- Required: no

#### `-w | --wait=<minutes>`

Number of minutes to wait for the scratch org to be ready.

If the command continues to run after the wait period, the CLI returns control of the terminal window to you and returns the job ID. To resume checking the scratch creation, rerun this command.

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

Resume a scratch org create with a job ID:

```bash
sf org resume scratch --job-id 2SR3u0000008fBDGAY
```

Resume your most recent incomplete scratch org:

```bash
sf org resume scratch --use-most-recent
```
