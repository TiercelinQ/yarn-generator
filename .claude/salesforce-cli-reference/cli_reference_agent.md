# agent Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent.html

## `sf agent activate`

Activate an agent in an org.

### Description

Activating an agent makes it immediately available to your users. A published agent must be active before you can preview it with the "agent preview" CLI command or VS Code. Agents can have multiple versions; only one version can be active at a time.

If you run the command without the --api-name or --version flags, the command provides a list of agent API names and versions for you to choose from. Use the flags to specify the exact agent and version without being prompted. If you use the --json flag and not --version, then the latest agent version is automatically activated.

The value of the --version flag is always a number, corresponding to the "vX" part of the "BotVersion" metadata in your project. For example, if you have a force-app/main/default/bots/My_Agent/v4.botVersion-meta.xml file in your project, then you activate this version with the "--version 4" flag.

### Usage

```bash
sf agent activate [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--api-name <value>] [--version <value>]
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

API name of the agent to activate; if not specified, the command provides a list that you choose from.

- Type: option
- Required: no

#### `--version=<value>`

Version number of the agent to activate; if not specified, the command provides a list that you choose from.

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

Activate an agent in your default target org by being prompted for both its API name and version:

```bash
sf agent activate
```

Activate version 2 of an agent with API name Resort_Manager in the org with alias "my-org":

```bash
sf agent activate --api-name Resort_Manager --version 2 --target-org my-org
```

### Environment variables

**ENVIRONMENT VARIABLES**

[object Object]

### Error codes

**ERROR CODES**

[object Object]
[object Object]
[object Object]

---

## `sf agent adl create`

Create an Agentforce Data Library.

### Description

Creates a new data library in the target org. The --source-type flag determines the type of library: SFDRIVE (file upload), KNOWLEDGE (Salesforce Knowledge articles), or RETRIEVER (existing active Custom Retriever).

For SFDRIVE libraries, creation provisions the full Data Cloud pipeline (DLO → DMO → SearchIndex → Retriever). Upload files with `sf agent adl upload` after creation.

### Usage

```bash
sf agent adl create [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --name <value> --developer-name <value> --source-type <value> [--description <value>] [--index-mode <value>] [--retriever-id <value>] [--primary-index-field1 <value>] [--primary-index-field2 <value>] [--content-fields <value>] [--data-category-ids <value>] [--data-category-names <value>] [--wait <value>]
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

Display name for the data library (max 80 characters).

- Type: option
- Required: yes

#### `--developer-name=<value>`

API name for the data library (max 80 characters, alphanumeric and underscores only, must start with a letter).

- Type: option
- Required: yes

#### `--source-type=<value>`

Type of grounding source: sfdrive (file upload), knowledge (Salesforce Knowledge articles), or retriever (existing active Custom Retriever).

- Type: option
- Required: yes
- Permitted values: `sfdrive`, `knowledge`, `retriever`

#### `--description=<value>`

Description of the data library (max 255 characters).

- Type: option
- Required: no

#### `--index-mode=<value>`

Index mode for SFDRIVE libraries: basic or enhanced.

- Type: option
- Required: no
- Permitted values: `basic`, `enhanced`

#### `--retriever-id=<value>`

ID of an active Custom Retriever (required for RETRIEVER source type; retriever must be active).

- Type: option
- Required: no

#### `--primary-index-field1=<value>`

Primary index field 1 for KNOWLEDGE libraries (required, immutable after creation).

- Type: option
- Required: no

#### `--primary-index-field2=<value>`

Primary index field 2 for KNOWLEDGE libraries (required, immutable after creation).

- Type: option
- Required: no

#### `--content-fields=<value>`

Comma-separated list of content fields for KNOWLEDGE libraries (optional, mutable after creation).

- Type: option
- Required: no

#### `--data-category-ids=<value>`

Comma-separated list of data category selection IDs for KNOWLEDGE libraries. Mutually exclusive with --data-category-names (provide one or the other, not both).

- Type: option
- Required: no

#### `--data-category-names=<value>`

Comma-separated list of data category names in qualified format (e.g., "Group_API_Name.Category"). Mutually exclusive with --data-category-ids (provide one or the other, not both).

- Type: option
- Required: no

#### `-w | --wait=<value>`

Wait N minutes for indexing to complete (KNOWLEDGE libraries). SFDRIVE libraries require upload before indexing; RETRIEVER libraries are ready immediately.

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

Create an SFDRIVE library:

```bash
sf agent adl create --target-org myOrg --name "My Docs" --developer-name My_Docs --source-type sfdrive
```

Create a KNOWLEDGE library with index fields:

```bash
sf agent adl create --target-org myOrg --name "KB Library" --developer-name KB_Library --source-type knowledge --primary-index-field1 Title --primary-index-field2 Summary
```

Create a RETRIEVER library:

```bash
sf agent adl create --target-org myOrg --name "Existing Retriever" --developer-name Existing_Retriever --source-type retriever --retriever-id 0ppXX0000000001
```

---

## `sf agent adl delete`

Delete an Agentforce Data Library.

### Description

Permanently deletes a data library and all associated files and indexing data.

### Usage

```bash
sf agent adl delete [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --library-id <value>
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

#### `-i | --library-id=<value>`

Agentforce Data Library ID (18-char Salesforce ID with prefix 1JD).

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

Delete a data library:

```bash
sf agent adl delete --library-id 1JDSG000007IbWX4A0 --target-org myOrg
```

---

## `sf agent adl file add`

Add files to an existing Agentforce Data Library.

### Description

Adds one or more files to an existing SFDRIVE data library and triggers SearchIndex re-hydration. This is the day-2 operation for adding files to an already-provisioned library.

Adds files to an existing READY library. Unlike `sf agent adl upload`, this does NOT create new downstream Data Cloud assets — it appends files to the existing SearchIndex and triggers re-indexing.

Constraints: at least 1 file required, no duplicate file names in a batch, maximum 1000 files per library.

### Usage

```bash
sf agent adl file add [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --library-id <value> --path <value>
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

#### `-i | --library-id=<value>`

Agentforce Data Library ID (18-char Salesforce ID with prefix 1JD).

- Type: option
- Required: yes

#### `-f | --path=<value>`

Path to file(s) to add. Specify multiple times for batch upload.

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

Add a file to an existing library:

```bash
sf agent adl file add -i 1JDSG000007IbWX4A0 --path ./docs/new-guide.pdf --target-org myOrg
```

Add multiple files:

```bash
sf agent adl file add -i 1JDSG000007IbWX4A0 --path ./docs/guide.pdf --path ./docs/faq.txt --target-org myOrg
```

---

## `sf agent adl file delete`

Delete a file from an Agentforce Data Library.

### Description

Permanently removes a file from an SFDRIVE data library and triggers re-indexing of the search index.

### Usage

```bash
sf agent adl file delete [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --library-id <value> --file-id <value>
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

#### `-i | --library-id=<value>`

Agentforce Data Library ID (18-char Salesforce ID with prefix 1JD).

- Type: option
- Required: yes

#### `--file-id=<value>`

ID of the file to delete (AiGroundingFileRef record ID).

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

Delete a file from a data library:

```bash
sf agent adl file delete --library-id 1JDSG000007IbWX4A0 --file-id a1B2C3D4E5F6G7H8I9 --target-org myOrg
```

---

## `sf agent adl file list`

List files in an Agentforce Data Library.

### Description

Returns the list of files in an SFDRIVE library including file name, size, and creation date.

### Usage

```bash
sf agent adl file list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --library-id <value> [--page-size <value>] [--offset <value>] [--status <value>]
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

#### `-i | --library-id=<value>`

Agentforce Data Library ID (18-char Salesforce ID with prefix 1JD).

- Type: option
- Required: yes

#### `--page-size=<value>`

Number of files to return per page (1-200, default 50).

- Type: option
- Required: no
- Default: `50`

#### `--offset=<value>`

Number of files to skip before returning results (for pagination).

- Type: option
- Required: no
- Default: `0`

#### `--status=<value>`

Filter files by indexing status.

- Type: option
- Required: no
- Permitted values: `uploaded`, `indexing`, `indexed`, `index_failed`, `deleting`, `delete_failed`

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

List files in a data library:

```bash
sf agent adl file list --library-id 1JDSG000007IbWX4A0 --target-org myOrg
```

List files and output as JSON:

```bash
sf agent adl file list --library-id 1JDSG000007IbWX4A0 --target-org myOrg --json
```

---

## `sf agent adl get`

Get details of an Agentforce Data Library.

### Description

Returns the full detail of a data library including its grounding source configuration, status, and retriever ID.

### Usage

```bash
sf agent adl get [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --library-id <value>
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

#### `-i | --library-id=<value>`

Agentforce Data Library ID (18-char Salesforce ID with prefix 1JD).

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

Get details of a data library:

```bash
sf agent adl get --library-id 1JDSG000007IbWX4A0 --target-org myOrg
```

---

## `sf agent adl list`

List Agentforce Data Libraries in an org.

### Description

Returns all data libraries in the target org, including their source type, status, and library ID.

### Usage

```bash
sf agent adl list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--source-type <value>]
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

#### `--source-type=<value>`

Filter by source type: sfdrive, knowledge, or retriever.

- Type: option
- Required: no
- Permitted values: `sfdrive`, `knowledge`, `retriever`

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

List all data libraries in the default target org:

```bash
sf agent adl list --target-org myOrg
```

List data libraries and output as JSON:

```bash
sf agent adl list --target-org myOrg --json
```

---

## `sf agent adl status`

Get indexing status of an Agentforce Data Library.

### Description

Returns the current indexing status including stage details (DATA_STREAM, DATA_LAKE_OBJECT, DATA_MODEL_OBJECT, SEARCH_INDEX, RETRIEVER) and any errors.

### Usage

```bash
sf agent adl status [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --library-id <value> [--include-artifacts]
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

#### `-i | --library-id=<value>`

Agentforce Data Library ID (18-char Salesforce ID with prefix 1JD).

- Type: option
- Required: yes

#### `--include-artifacts`

Resolve DC asset artifacts (DataStream, DLO, DMO, SearchIndex, Retriever) with entity IDs and names on each stage. Slower — requires additional queries.

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

Get status of a data library:

```bash
sf agent adl status --library-id 1JDSG000007IbWX4A0 --target-org myOrg
```

---

## `sf agent adl update`

Update an Agentforce Data Library.

### Description

Updates the label, description, or other mutable properties of an existing data library.

### Usage

```bash
sf agent adl update [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --library-id <value> [--name <value>] [--description <value>] [--content-fields <value>] [--[no-]restrict-to-public-articles] [--[no-]data-category-rule] [--retriever-id <value>]
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

#### `-i | --library-id=<value>`

Agentforce Data Library ID (18-char Salesforce ID with prefix 1JD).

- Type: option
- Required: yes

#### `-n | --name=<value>`

New display name for the data library (max 80 characters).

- Type: option
- Required: no

#### `--description=<value>`

New description for the data library (max 255 characters).

- Type: option
- Required: no

#### `--content-fields=<value>`

Comma-separated list of content fields for KNOWLEDGE libraries (triggers re-indexing).

- Type: option
- Required: no

#### `--[no-]restrict-to-public-articles`

Restrict to public Knowledge articles only (KNOWLEDGE libraries, triggers re-indexing).

- Type: boolean
- Required: no

#### `--[no-]data-category-rule`

Enable or disable data category filtering for KNOWLEDGE libraries. Use --no-data-category-rule to disable.

- Type: boolean
- Required: no

#### `--retriever-id=<value>`

Swap the retriever for a RETRIEVER library (must be an active Custom Retriever ID).

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

Update the label of a data library:

```bash
sf agent adl update --library-id 1JDSG000007IbWX4A0 --name "New Name" --target-org myOrg
```

Update the description:

```bash
sf agent adl update --library-id 1JDSG000007IbWX4A0 --description "Updated description" --target-org myOrg
```

Update Knowledge library content fields (triggers re-indexing):

```bash
sf agent adl update --library-id 1JDSG000007IbWX4A0 --content-fields "Answer**c,Summary**c" --target-org myOrg
```

Restrict Knowledge library to public articles:

```bash
sf agent adl update --library-id 1JDSG000007IbWX4A0 --restrict-to-public-articles --target-org myOrg
```

---

## `sf agent adl upload`

Upload a file to an SFDRIVE Agentforce Data Library.

### Description

Performs the multi-step upload workflow: checks upload readiness, obtains a pre-signed S3 URL, uploads the file, triggers indexing, and optionally polls until the library is ready (retrieverId is populated).

Upload triggers the full Data Cloud provisioning pipeline, creating all downstream assets (DLO, DMO, SearchIndex, Retriever). Use `sf agent adl status` to monitor progress. For adding files to an already-provisioned library, use `sf agent adl file add` instead.

This command only works with SFDRIVE libraries. KNOWLEDGE libraries index automatically after creation, and RETRIEVER libraries require no file upload.

### Usage

```bash
sf agent adl upload [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --library-id <value> --file <value> [--wait <value>]
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

#### `-i | --library-id=<value>`

Agentforce Data Library ID (18-char Salesforce ID with prefix 1JD).

- Type: option
- Required: yes

#### `-f | --file=<value>`

Path to the file to upload.

- Type: option
- Required: yes
- Multiple values: yes

#### `-w | --wait=<value>`

Number of minutes to wait for indexing to complete. If not specified, returns after triggering indexing.

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

Upload a file and wait for indexing to complete:

```bash
sf agent adl upload --library-id 1JDSG000007IbWX4A0 --file ./docs/guide.pdf --target-org myOrg --wait 10
```

Upload a file without waiting:

```bash
sf agent adl upload --library-id 1JDSG000007IbWX4A0 --file ./docs/guide.pdf --target-org myOrg
```

---

## `sf agent create`

Create an agent in your org using a local agent spec file.

### Description

NOTE: This command creates an agent that doesn't use Agent Script as its blueprint. We generally don't recommend you use this workflow to create an agent. Rather, use the "agent generate|validate|publish authoring-bundle" commands to author agents that use the Agent Script language. See "Author an Agent" (https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-nga-author-agent.html) for details.

To run this command, you must have an agent spec file, which is a YAML file that define the agent properties and contains a list of AI-generated topics. Topics define the range of jobs the agent can handle. Use the "agent generate agent-spec" CLI command to generate an agent spec file. Then specify the file to this command using the --spec flag, along with the name (label) of the new agent with the --name flag. If you don't specify any of the required flags, the command prompts you.

When this command completes, your org contains the new agent, which you can then edit and customize in the Agent Builder UI. The new agent's topics are the same as the ones listed in the agent spec file. The agent might also have some AI-generated actions, or you can add them. This command also retrieves all the metadata files associated with the new agent to your local Salesforce DX project.

Use the --preview flag to review what the agent looks like without actually saving it in your org. When previewing, the command creates a JSON file in the current directory with all the agent details. The name of the JSON file is the agent's API name and a timestamp.

To open the new agent in your org's Agent Builder UI, run this command: "sf org open agent --api-name \<api-name\>".

### Usage

```bash
sf agent create [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--name <value>] [--api-name <value>] [--spec <value>] [--preview]
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

#### `--name=<value>`

Name (label) of the new agent.

- Type: option
- Required: no

#### `--api-name=<value>`

API name of the new agent; if not specified, the API name is derived from the agent name (label); the API name must not exist in the org.

- Type: option
- Required: no

#### `--spec=<value>`

Path to an agent spec file.

- Type: option
- Required: no

#### `--preview`

Preview the agent without saving it in your org.

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

Create an agent by being prompted for the required information, such as the agent spec file and agent name, and then create it in your default org:

```bash
sf agent create
```

Create an agent by specifying the agent name, API name, and spec file with flags; use the org with alias "my-org"; the command fails if the API name is already being used in your org:

```bash
sf agent create --name "Resort Manager" --api-name Resort_Manager --spec specs/resortManagerAgent.yaml --target-org my-org
```

Preview the creation of an agent named "Resort Manager" and use your default org:

```bash
sf agent create --name "Resort Manager" --spec specs/resortManagerAgent.yaml --preview
```

---

## `sf agent deactivate`

Deactivate an agent in an org.

### Description

Deactivating an agent makes it unavailable to your users. To make changes to an agent, such as adding or removing topics or actions, you must deactivate it. You can't preview an agent with the "agent preview" CLI command or VS Code if it's deactivated.

If you run the command without the --api-name flag, the command provides a list of agent API names for you to choose from. Use the flag to specify the exact agent without being prompted.

### Usage

```bash
sf agent deactivate [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--api-name <value>]
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

API name of the agent to deactivate; if not specified, the command provides a list that you choose from.

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

Deactivate an agent in your default target org by being prompted:

```bash
sf agent deactivate
```

Deactivate the agent Resort_Manager in the org with alias "my_org":

```bash
sf agent deactivate --api-name Resort_Manager --target-org my-org
```

### Environment variables

**ENVIRONMENT VARIABLES**

[object Object]

### Error codes

**ERROR CODES**

[object Object]
[object Object]
[object Object]

---

## `sf agent generate agent-spec`

Generate an agent spec, which is a YAML file that captures what an agent can do.

### Description

An agent spec is a YAML-formatted file that contains basic information about the agent, such as its role, company description, and an AI-generated list of topics based on this information. Topics define the range of jobs your agent can handle.

Use flags, such as --role and --company-description, to provide details about your company and the role that the agent plays in your company. If you prefer, you can also be prompted for the basic information; use --full-interview to be prompted for all required and optional properties. Upon command execution, the large language model (LLM) associated with your org uses the provided information to generate a list of topics for the agent. Because the LLM uses the company and role information to generate the topics, we recommend that you provide accurate, complete, and specific details so the LLM generates the best and most relevant topics. Once generated, you can edit the spec file; for example, you can remove topics that don't apply or change a topic's description.

You can also iterate the spec generation process by using the --spec flag to pass an existing agent spec file to this command, and then using the --role, --company-description, etc, flags to refine your agent properties. Iteratively improving the description of your agent allows the LLM to generate progressively better topics.

You can also specify other agent properties, such as a custom prompt template, how to ground the prompt template to add context to the agent's prompts, the tone of the prompts, and the username of a user in the org to assign to the agent.

When your agent spec is ready, generate an authoring bundle from it by passing the spec file to the --spec flag of the "agent generate authoring-bundle" CLI command. An authoring bundle is a metadata type that contains an Agent Script file, which is the blueprint for an agent. (While not recommended, you can also use the agent spec file to immediately create an agent with the "agent create" command. We don't recommend this workflow because these types of agents don't use Agent Script, and are thus less flexible and more difficult to maintain.)

### Usage

```bash
sf agent generate agent-spec [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--type <value>] [--role <value>] [--company-name <value>] [--company-description <value>] [--company-website <value>] [--max-topics <value>] [--agent-user <value>] [--enrich-logs <value>] [--tone <value>] [--spec <value>] [--output-file <value>] [--full-interview] [--prompt-template <value>] [--grounding-context <value>] [--force-overwrite]
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

#### `--type=<value>`

Type of agent to create. Internal types are copilots used internally by your company and customer types are the agents you create for your customers.

- Type: option
- Required: no
- Permitted values: `customer`, `internal`

#### `--role=<value>`

Role of the agent.

- Type: option
- Required: no

#### `--company-name=<value>`

Name of your company.

- Type: option
- Required: no

#### `--company-description=<value>`

Description of your company.

- Type: option
- Required: no

#### `--company-website=<value>`

Website URL of your company.

- Type: option
- Required: no

#### `--max-topics=<value>`

Maximum number of topics to generate in the agent spec; default is 5.

- Type: option
- Required: no

#### `--agent-user=<value>`

Username of a user in your org to assign to your agent; determines what your agent can access and do.

- Type: option
- Required: no

#### `--enrich-logs=<value>`

Adds agent conversation data to event logs so you can view all agent session activity in one place.

- Type: option
- Required: no
- Permitted values: `true`, `false`

#### `--tone=<value>`

Conversational style of the agent, such as how it expresses your brand personality in its messages through word choice, punctuation, and sentence structure.

- Type: option
- Required: no
- Permitted values: `formal`, `casual`, `neutral`

#### `--spec=<value>`

Agent spec file, in YAML format, to use as input to the command.

- Type: option
- Required: no

#### `--output-file=<value>`

Path for the generated YAML agent spec file; can be an absolute or relative path.

- Type: option
- Required: no
- Default: `specs/agentSpec.yaml`

#### `--full-interview`

Prompt for both required and optional flags.

- Type: boolean
- Required: no

#### `--prompt-template=<value>`

API name of a customized prompt template to use instead of the default prompt template.

- Type: option
- Required: no

#### `--grounding-context=<value>`

Context information and personalization that's added to your prompts when using a custom prompt template.

- Type: option
- Required: no
- Depends on: `--prompt-template`

#### `--force-overwrite`

Don't prompt the user to confirm that an existing spec file will be overwritten.

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

Generate an agent spec in the default location and use flags to specify the agent properties, such as its role and your company details; use your default org:

```bash
sf agent generate agent-spec --type customer --role "Field customer complaints and manage employee schedules." --company-name "Coral Cloud Resorts" --company-description "Provide customers with exceptional destination activities, unforgettable experiences, and reservation services."
```

Generate an agent spec by being prompted for the required agent properties and generate a maxiumum of 5 topics; write the generated file to the "specs/resortManagerSpec.yaml" file and use the org with alias "my-org":

```bash
sf agent generate agent-spec --max-topics 5 --output-file specs/resortManagerAgent.yaml --target-org my-org
```

Be prompted for all required and optional agent properties; use your default org:

```bash
sf agent generate agent-spec --full-interview
```

Specify an existing agent spec file called "specs/resortManagerAgent.yaml", and then overwrite it with a new version that contains newly AI-generated topics based on the updated role information passed in with the --role flag:

```bash
sf agent generate agent-spec --spec specs/resortManagerAgent.yaml --output-file specs/resortManagerAgent.yaml --role "Field customer complaints, manage employee schedules, and ensure all resort operations are running smoothly"
```

Specify that the conversational tone of the agent is formal and to attach the "resortmanager@myorg.com" username to it; be prompted for the required properties and use your default org:

```bash
sf agent generate agent-spec --tone formal --agent-user resortmanager@myorg.com
```

---

## `sf agent generate authoring-bundle`

Generate an authoring bundle from an existing agent spec YAML file.

### Description

Authoring bundles are metadata components that contain an agent's Agent Script file. The Agent Script file is the agent's blueprint; it fully describes what the agent can do using the Agent Script language.

Use this command to generate a new authoring bundle based on an agent spec YAML file, which you create with the "agent generate agent-spec" command. The agent spec YAML file is a high-level description of the agent; it describes its essence rather than exactly what it can do. The resulting Agent Script file is customized to reflect what's in the agent spec file. You can also create an authoring bundle without an agent spec file by specifying the "--no-spec" flag; in this case, the resulting Agent Script file is just the default boilerplate.

The metadata type for authoring bundles is aiAuthoringBundle, which consist of a standard "\<bundle-api-name\>.bundle-meta.xml" metadata file and the Agent Script file (with extension ".agent"). When you run this command, the new authoring bundle is generated in the force-app/main/default/aiAuthoringBundles/\<bundle-api-name\> directory. Use the --output-dir flag to generate them elsewhere.

After you generate the initial authoring bundle, code the Agent Script file so your agent behaves exactly as you want. The Agent Script file generated by this command is just a first draft of your agent! Interactively test the agent by conversing with it using the "agent preview" command. Then publish the agent to your org with the "agent publish authoring-bundle" command.

This command requires an org because it uses it to access an LLM for generating the Agent Script file.

### Usage

```bash
sf agent generate authoring-bundle [--json] [--flags-dir <value>] --target-org <value> [--api-name <value>] [--api-version <value>] [--spec <value>] [--no-spec] [--output-dir <value>] [--name <value>] [--force-overwrite]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--api-name=<value>`

API name of the new authoring bundle; if not specified, the API name is derived from the authoring bundle name (label); the API name can't exist in the org.

- Type: option
- Required: no

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `-f | --spec=<value>`

Path to the agent spec YAML file. If you don't specify the flag, the command provides a list that you can choose from. Use the --no-spec flag to skip using an agent spec entirely.

- Type: option
- Required: no

#### `--no-spec`

Skip prompting for an agent spec and use the default Agent Script boilerplate in the generated authoring bundle.

- Type: boolean
- Required: no

#### `-d | --output-dir=<value>`

Directory where the authoring bundle files are generated.

- Type: option
- Required: no

#### `-n | --name=<value>`

Name (label) of the authoring bundle; if not specified, you're prompted for the name.

- Type: option
- Required: no

#### `--force-overwrite`

Overwrite the existing authoring bundle if one with the same API name already exists locally.

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

Generate an authoring bundle by being prompted for all required values, such as the agent spec YAML file, the bundle name, and the API name; use your default org:

```bash
sf agent generate authoring-bundle
```

Generate an authoring bundle without using an agent spec file; give the bundle the label "My Authoring Bundle" and use your default org:

```bash
sf agent generate authoring-bundle --no-spec --name "My Authoring Bundle"
```

Generate an authoring bundle from the "specs/agentSpec.yaml" agent spec YAML file and give it the label "My Authoring Bundle"; use your default org:

```bash
sf agent generate authoring-bundle --spec specs/agentSpec.yaml --name "My Authoring Bundle"
```

Similar to previous example, but generate the authoring bundle files in the "other-package-dir/main/default" package directory; use the org with alias "my-dev-org":

```bash
sf agent generate authoring-bundle --spec specs/agentSpec.yaml --name "My Authoring Bundle" --output-dir other-package-dir/main/default --target-org my-dev-org
```

---

## `sf agent generate template`

Generate an agent template from an existing agent in your DX project so you can then package the template in a second-generation managed package.

### Description

WARNING: This command doesn't work for agents that were created from an Agent Script file. In other words, you can't currently package an agent template for agents that use Agent Script.

At a high-level, agents are defined by the Bot, BotVersion, and GenAiPlannerBundle metadata types. The GenAiPlannerBundle type in turn defines the agent's topics and actions. This command uses the metadata files for these three types, located in your local DX project, to generate a BotTemplate metadata file for a specific agent (Bot). You then use the BotTemplate metadata file, along with the GenAiPlannerBundle metadata file that references the BotTemplate, to package the template in a managed package that you can share between orgs or on AppExchange.

Use the --agent-file flag to specify the relative or full pathname of the Bot metadata file, such as force-app/main/default/bots/My_Awesome_Agent/My_Awesome_Agent.bot-meta.xml. A single Bot can have multiple BotVersions, so use the --agent-version flag to specify the version. The corresponding BotVersion metadata file must exist locally. For example, if you specify "--agent-version 4", then the file force-app/main/default/bots/My_Awesome_Agent/v4.botVersion-meta.xml must exist.

The new BotTemplate metadata file is generated in the "botTemplates" directory in the output directory specified with the --output-dir flag, and has the name \<Agent_API_name\>\_v\<Version\>\_Template.botTemplate-meta.xml, such as my-package/botTemplates/My_Awesome_Agent_v4_Template.botTemplate-meta.xml. The command displays the full pathname of the generated files when it completes.

See "Develop and Package Agent Templates Using Scratch Orgs" (https://developer.salesforce.com/docs/atlas.en-us.pkg2_dev.meta/pkg2_dev/dev2gp_package_agent_templates.htm) for details about the complete process, which includes using a scratch org to create and test the agent, retrieving the agent metadata to your DX project, running this command to create the agent template, and then packaging the template.

### Usage

```bash
sf agent generate template [--json] [--flags-dir <value>] [--api-version <value>] --source-org <value> --agent-version <value> --agent-file <value> [--output-dir <value>]
```

### Flags

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `-s | --source-org=<value>`

Username or alias of the namespaced scratch org that contains the agent which this template is based on.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--agent-version=<value>`

Version of the agent (BotVersion).

- Type: option
- Required: yes

#### `-f | --agent-file=<value>`

Path to an agent (Bot) metadata file.

- Type: option
- Required: yes

#### `-r | --output-dir=<value>`

Directory where the generated BotTemplate and GenAiPlannerBundle files are saved.

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

Generate an agent template from the My_Awesome_Agent Bot metadata file in your DX project and save the BotTemplate and GenAiPlannerBundle to the specified directory; use version 1 of the agent. The agent that the template is based on is in the org with alias "my-scratch-org":

```bash
sf agent generate template --agent-file force-app/main/default/bots/My_Awesome_Agent/My_Awesome_Agent.bot-meta.xml --agent-version 1 --output-dir my-package --source-org my-scratch-org
```

---

## `sf agent generate test-spec`

Generate an agent test spec, which is a YAML file that lists the test cases for testing a specific agent.

### Description

The first step when using Salesforce CLI to create an agent test in your org is to use this interactive command to generate a local YAML-formatted test spec file. The test spec YAML file contains information about the agent being tested, such as its API name, and then one or more test cases. This command uses the metadata components in your DX project when prompting for information, such as the agent API name; it doesn't look in your org.

To generate a specific agent test case, this command prompts you for this information; when possible, the command provides a list of options for you to choose from:

- Utterance: Natural language statement, question, or command used to test the agent.
- Expected topic: API name of the topic you expect the agent to use when responding to the utterance.
- Expected actions: One or more API names of the expection actions the agent takes.
- Expected outcome: Natural language description of the outcome you expect.
- (Optional) Custom evaluation: Test an agent's response for specific strings or numbers.
- (Optional) Conversation history: Boilerplate for additional context you can add to the test in the form of a conversation history.

You can manually add contextVariables to test cases in the generated YAML file to inject contextual data (such as CaseId or RoutableId) into agent sessions. This is useful for testing agent behavior with different contextual information.

When your test spec is ready, you then run the "agent test create" command to actually create the test in your org and synchronize the metadata with your DX project. The metadata type for an agent test is `AiEvaluationDefinition` (legacy testing-center) or `AiTestingDefinition` (Agentforce Studio / NGT), selected via --test-runner.

If you have an existing AiEvaluationDefinition or AiTestingDefinition metadata XML file in your DX project, you can generate its equivalent YAML test spec file with the --from-definition flag. The runner is inferred from the file extension; pass --test-runner to override.

### Usage

```bash
sf agent generate test-spec [--flags-dir <value>] [--from-definition <value>] [--force-overwrite] [--output-file <value>] [--test-runner <value>]
```

### Flags

#### `-d | --from-definition=<value>`

Filepath to an AiEvaluationDefinition or AiTestingDefinition metadata XML file in your DX project that you want to convert to a test spec YAML file.

- Type: option
- Required: no

#### `--force-overwrite`

Don't prompt for confirmation when overwriting an existing test spec YAML file.

- Type: boolean
- Required: no

#### `-f | --output-file=<value>`

Name of the generated test spec YAML file. Default value is "specs/\<AGENT_API_NAME\>-testSpec.yaml" (legacy) or "specs/\<AGENT_API_NAME\>-ngtTestSpec.yaml" (Agentforce Studio).

- Type: option
- Required: no

#### `--test-runner=<value>`

Explicitly specify which test runner to use (agentforce-studio or testing-center).

By default, the command automatically detects which test runner to use based on the test definition metadata type in your org. Use this flag to explicitly specify the runner type. 'agentforce-studio' uses AiTestingDefinition metadata. 'testing-center' uses AiEvaluationDefinition metadata.

- Type: option
- Required: no
- Permitted values: `agentforce-studio`, `testing-center`

### Global flags

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Generate an agent test spec YAML file interactively:

```bash
sf agent generate test-spec
```

Generate an Agentforce Studio (NGT) test spec YAML file interactively:

```bash
sf agent generate test-spec --test-runner agentforce-studio
```

Generate an agent test spec YAML file and specify a name for the new file; if the file exists, overwrite it without confirmation:

```bash
sf agent generate test-spec --output-file specs/Resort_Manager-new-version-testSpec.yaml --force-overwrite
```

Generate an agent test spec YAML file from an existing AiEvaluationDefinition metadata XML file in your DX project:

```bash
sf agent generate test-spec --from-definition force-app/main/default/aiEvaluationDefinitions/Resort_Manager_Tests.aiEvaluationDefinition-meta.xml
```

Generate an Agentforce Studio (NGT) test spec YAML file from an existing AiTestingDefinition metadata XML file:

```bash
sf agent generate test-spec --from-definition force-app/main/default/aiTestingDefinitions/Returns_Checkout_Tests.aiTestingDefinition-meta.xml
```

---

## `sf agent mcp asset list`

Status: preview

List the assets (tools, prompts, and resources) for an MCP server in the catalog.

### Description

Returns the assets discovered for the specified MCP server, including each asset's kind (MCP_TOOL, MCP_PROMPT, or MCP_RESOURCE), whether it is active, and whether it is available as an agent action.

### Usage

```bash
sf agent mcp asset list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --mcp-server-id <value>
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

#### `-i | --mcp-server-id=<value>`

The ID of the MCP server whose assets you want to list.

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

List the assets for an MCP server in the default target org:

```bash
sf agent mcp asset list --target-org myOrg --mcp-server-id 0XSxx0000000001
```

List the assets for an MCP server and output as JSON:

```bash
sf agent mcp asset list --target-org myOrg --mcp-server-id 0XSxx0000000001 --json
```

---

## `sf agent mcp asset replace`

Status: preview

Replace the asset set of an MCP server in the API Catalog.

### Description

Replaces the full set of assets (tools, prompts, resources) for an MCP server with the asset items you supply. Provide the assets either inline with `--assets` (a JSON string, or `-` to read from stdin) or from a file with `--assets-file`. The JSON must be either an array of asset items or an object of the form `{ "assets": [...] }`. Each asset item may include `id`, `name`, `label`, `description`, `active`, and `kind`. This is a full replacement: existing assets not present in the supplied set are removed, so provide the complete desired asset set (read the current set first with `agent mcp asset list` or `agent mcp fetch`).

### Usage

```bash
sf agent mcp asset replace [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --mcp-server-id <value> [--assets <value>] [--assets-file <value>]
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

#### `-i | --mcp-server-id=<value>`

ID of the MCP server whose assets you want to replace.

- Type: option
- Required: yes

#### `--assets=<value>`

The desired asset allowlist as a JSON string (or "-" to read from stdin). Mutually exclusive with --assets-file.

- Type: option
- Required: no
- Exclusive with: `--assets-file`

#### `--assets-file=<value>`

Path to a JSON file containing the desired asset allowlist. Mutually exclusive with --assets.

- Type: option
- Required: no
- Exclusive with: `--assets`

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

Replace the assets inline with a JSON string:

```bash
sf agent mcp asset replace --mcp-server-id 0XSxx0000000001 --assets '{"assets":[{"name":"McpTool__add","active":true}]}' --target-org myOrg
```

Replace the assets from a JSON file:

```bash
sf agent mcp asset replace --mcp-server-id 0XSxx0000000001 --assets-file ./assets.json --target-org myOrg
```

```bash
Pipe the assets from stdin:
cat assets.json | sf agent mcp asset replace --mcp-server-id 0XSxx0000000001 --assets - --target-org myOrg
```

---

## `sf agent mcp create`

Status: preview

Create an MCP server in the API Catalog.

### Description

Registers an external Model Context Protocol (MCP) server with the API Catalog and discovers its assets (tools, prompts, and resources). Provide the server URL and, when the server requires it, OAuth authorization details. When the authorization type is OAUTH you must supply the identity provider, client ID, client secret, and scope.

### Usage

```bash
sf agent mcp create [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --name <value> [--label <value>] [--description <value>] --server-url <value> [--auth-type <value>] [--identity-provider <value>] [--client-id <value>] [--client-secret <value>] [--scope <value>]
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

Unique name of the MCP server.

- Type: option
- Required: yes

#### `--label=<value>`

Human-readable label for the MCP server.

- Type: option
- Required: no

#### `--description=<value>`

Description of the MCP server.

- Type: option
- Required: no

#### `--server-url=<value>`

URL of the external MCP server.

- Type: option
- Required: yes

#### `--auth-type=<value>`

Authorization type to use when connecting to the MCP server.

- Type: option
- Required: no
- Permitted values: `OAUTH`, `NO_AUTH`
- Default: `NO_AUTH`

#### `--identity-provider=<value>`

Identity provider to use for OAuth authorization. Required when auth-type is OAUTH.

- Type: option
- Required: no

#### `--client-id=<value>`

OAuth client ID. Required when auth-type is OAUTH.

- Type: option
- Required: no

#### `--client-secret=<value>`

OAuth client secret. Required when auth-type is OAUTH. Pass "-" to read it from stdin (piped) and keep it out of shell history.

- Type: option
- Required: no

#### `--scope=<value>`

OAuth scope to request. Required when auth-type is OAUTH.

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

Create an MCP server with no authentication:

```bash
sf agent mcp create --name myServer --server-url https://mcp.example.com --target-org myOrg
```

```bash
Create an MCP server that uses OAuth authentication, piping the client secret from stdin to keep it out of shell history:
cat secret.txt | sf agent mcp create --name myServer --server-url https://mcp.example.com --auth-type OAUTH --identity-provider myIdp --client-id abc123 --client-secret - --scope "read write" --target-org myOrg
```

---

## `sf agent mcp delete`

Status: preview

Delete an MCP server from the API Catalog.

### Description

Permanently removes an MCP (Model Context Protocol) server registration from the API Catalog, identified by its ID. By default you are prompted to confirm the deletion; pass --no-prompt to skip the confirmation (for example in scripts and CI).

### Usage

```bash
sf agent mcp delete [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --mcp-server-id <value> [--no-prompt]
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

#### `-i | --mcp-server-id=<value>`

ID of the MCP server to delete.

- Type: option
- Required: yes

#### `--no-prompt`

Skip the confirmation prompt and delete the MCP server immediately.

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

Delete an MCP server, confirming interactively:

```bash
sf agent mcp delete --mcp-server-id 0XSxx0000000001 --target-org myOrg
```

Delete an MCP server without a confirmation prompt:

```bash
sf agent mcp delete --mcp-server-id 0XSxx0000000001 --target-org myOrg --no-prompt
```

---

## `sf agent mcp fetch`

Status: preview

Fetch the live assets (tools, prompts, resources) advertised by an MCP server.

### Description

Performs a live fetch against the configured MCP server identified by its ID, returning the assets (MCP tools, prompts, and resources) it currently advertises along with their status and activation state. Use this to refresh the view of what an MCP server exposes before activating its assets as agent actions.

### Usage

```bash
sf agent mcp fetch [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --mcp-server-id <value>
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

#### `-i | --mcp-server-id=<value>`

ID of the MCP server to fetch assets from.

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

Fetch the assets advertised by an MCP server in the default target org:

```bash
sf agent mcp fetch --target-org myOrg --mcp-server-id 0XSxx0000000001
```

Fetch MCP server assets and output as JSON:

```bash
sf agent mcp fetch --target-org myOrg --mcp-server-id 0XSxx0000000001 --json
```

---

## `sf agent mcp get`

Status: preview

Get a single MCP server registered in the API Catalog.

### Description

Retrieves the details of an MCP (Model Context Protocol) server by its identifier, including its name, label, type, status, and server URL.

### Usage

```bash
sf agent mcp get [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --mcp-server-id <value>
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

#### `-i | --mcp-server-id=<value>`

The identifier of the MCP server to retrieve.

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

Get an MCP server by id in the default target org:

```bash
sf agent mcp get --target-org myOrg --mcp-server-id 0Mx000000000001
```

Get an MCP server and output as JSON:

```bash
sf agent mcp get --target-org myOrg --mcp-server-id 0Mx000000000001 --json
```

---

## `sf agent mcp list`

Status: preview

List the MCP servers registered in the API Catalog.

### Description

Returns the Model Context Protocol (MCP) servers registered in the API Catalog, optionally filtered by label, type, or status. Use this to discover which MCP servers are available and inspect their server URLs and current status.

### Usage

```bash
sf agent mcp list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--label <value>] [--type <value>] [--status <value>]
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

#### `--label=<value>`

Filter the MCP servers by label.

- Type: option
- Required: no

#### `--type=<value>`

Filter the MCP servers by type.

- Type: option
- Required: no
- Permitted values: `EXTERNAL`

#### `--status=<value>`

Filter the MCP servers by connection status. Only ACTIVE and DISCONNECTED are supported as filters.

- Type: option
- Required: no
- Permitted values: `ACTIVE`, `DISCONNECTED`

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

List all MCP servers in the default target org:

```bash
sf agent mcp list --target-org myOrg
```

List external MCP servers filtered by status and output as JSON:

```bash
sf agent mcp list --target-org myOrg --type EXTERNAL --status ACTIVE --json
```

---

## `sf agent mcp update`

Status: preview

Update an MCP server registered in the API Catalog.

### Description

Updates an existing MCP server in the API Catalog. Only the fields you provide are changed; omitted fields are left untouched. You can update the label, description, and server URL, and replace the authorization configuration. When setting `--auth-type OAUTH`, you must also provide `--identity-provider`, `--client-id`, `--client-secret`, and `--scope`. When setting `--auth-type NO_AUTH`, no authorization credentials are required. At least one updatable field must be supplied.

### Usage

```bash
sf agent mcp update [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --mcp-server-id <value> [--label <value>] [--description <value>] [--server-url <value>] [--auth-type <value>] [--identity-provider <value>] [--client-id <value>] [--client-secret <value>] [--scope <value>]
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

#### `-i | --mcp-server-id=<value>`

ID of the MCP server to update.

- Type: option
- Required: yes

#### `--label=<value>`

New display label for the MCP server.

- Type: option
- Required: no

#### `--description=<value>`

New description for the MCP server.

- Type: option
- Required: no

#### `--server-url=<value>`

New endpoint URL of the MCP server.

- Type: option
- Required: no

#### `--auth-type=<value>`

Authorization type to apply to the MCP server (OAUTH or NO_AUTH).

- Type: option
- Required: no
- Permitted values: `OAUTH`, `NO_AUTH`

#### `--identity-provider=<value>`

Identity provider name for OAuth authorization (required when --auth-type is OAUTH).

- Type: option
- Required: no

#### `--client-id=<value>`

OAuth client ID (required when --auth-type is OAUTH).

- Type: option
- Required: no

#### `--client-secret=<value>`

OAuth client secret (required when --auth-type is OAUTH). Pass "-" to read it from stdin (piped) and keep it out of shell history.

- Type: option
- Required: no

#### `--scope=<value>`

OAuth scope (required when --auth-type is OAUTH).

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

Update the label and description of an MCP server in the default target org:

```bash
sf agent mcp update --mcp-server-id 0XSxx0000000001 --label "Orders MCP" --description "Order tooling" --target-org myOrg
```

```bash
Update the server URL and switch the authorization to OAuth, piping the client secret from stdin and outputting as JSON:
cat secret.txt | sf agent mcp update --mcp-server-id 0XSxx0000000001 --server-url https://mcp.example.com --auth-type OAUTH --identity-provider MyIdp --client-id abc --client-secret - --scope "read write" --target-org myOrg --json
```

---

## `sf agent preview`

Interact with an agent to preview how it responds to your statements, questions, and commands (utterances).

### Description

Use this command to have a natural language conversation with an agent, either while you code its local Agent Script file or when it's published to an org. Previewing an agent acts like an initial test to make sure it responds to your utterances as you expect. For example, you can test that the agent uses a particular topic when asked a question, and then whether it invokes the correct action associated with that topic. This command is the CLI-equivalent of the Preview panel in your org's Agentforce Builder UI.

Run without flags, this command provides a list of agents to preview, divided into two categories: "Agent Script", which are agents that have a local authoring bundle in your DX project, or "Published", which are agents that are published and activated in your org. Authoring bundles contain an agent's Agent Script file. You then choose the agent you want to preview from the list. Or you can use the --authoring-bundle flag to specify a local authoring bundle's API name or --api-name to specify an activated published agent.

When previewing an agent from its Agent Script file, you can use these two modes:

- Simulated mode (Default): Uses only the Agent Script file to converse, and it simulates (mocks) all the actions. Use this mode if none of the Apex classes, flows, or prompt templates that implement your actions are available yet. The LLM uses the information about topics in the Agent Script file to simulate what the action does or how it responds.
- Live mode: Uses the actual Apex classes, flows, and prompt templates in your development org in the agent preview. If you've changed the Apex classe, flows, or prompt templates in your local DX project, then you must deploy them to your development org if you want to use them in your live preview.

You can use the Apex Replay Debugger to debug your Apex classes when using live mode for Agent Script files and for activated published agents; specify the --apex-debug flag.

Once connected to your agent, the preview interface is simple: in the "Start typing..." prompt, enter a statement, question, or command; when you're done, enter Return. Your utterance is posted on the right along with a timestamp. The agent then responds on the left. To exit the conversation, hit ESC or Control+C.

When the session concludes, the command asks if you want to save the API responses and chat transcripts. By default, the files are saved to the "./temp/agent-preview" directory. Specify a new default directory with the --output-dir flag.

### Usage

```bash
sf agent preview [--flags-dir <value>] --target-org <value> [--api-version <value>] [--api-name <value>] [--authoring-bundle <value>] [--output-dir <value>] [--apex-debug] [--use-live-actions] [--context-variables <value>]
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

API name of the activated published agent you want to interact with.

- Type: option
- Required: no

#### `--authoring-bundle=<value>`

API name of the authoring bundle metadata component that contains the agent's Agent Script file.

- Type: option
- Required: no

#### `-d | --output-dir=<value>`

Directory where conversation transcripts are saved.

- Type: option
- Required: no

#### `-x | --apex-debug`

Enable Apex debug logging during the agent preview conversation.

- Type: boolean
- Required: no

#### `--use-live-actions`

Use real actions in the org; if not specified, preview uses AI to simulate (mock) actions.

- Type: boolean
- Required: no

#### `--context-variables=<value>`

Session variables for the agent preview session, in the form Name=Value.

Sets variables on the agent preview session, mirroring what the in-org Agentforce Builder UI does when you override variables before sending a message. Specify this flag multiple times or use comma-separated values. Two namespaces are supported, distinguished by the name shape. Names pass through to the runtime verbatim — the CLI doesn't transform them.

Linked context variables use the "$Context." prefix. These map to externally-provided fields that the runtime resolves (declared in the bundle's globalConfiguration.contextVariables) and are read by live actions and topic-routing expressions via $Context.Name. Example: $Context.MyLinkedVar=some-value.

State variables use the bare developerName, no prefix. These seed mutable agent state declared in agentVersion.stateVariables. Example: MyStateVar=some-value.

Both namespaces can be mixed in one value. Example: --context-variables '$Context.MyLinkedVar=foo,MyStateVar=bar'.

Tips: (1) Quote the whole value in single quotes so $Context isn't shell-expanded. (2) Names are sent verbatim — a bare name is treated as a state variable, not a linked context variable, so live actions that bind via $Context.Name will see null. (3) Type defaults to Text.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)

### Global flags

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Preview an agent by choosing from the list of available local Agent Script or published agents. If previewing a local Agent Script agent, use simulated mode. Use the org with alias "my-dev-org".

```bash
sf agent preview --target-org my-dev-org
```

Preview an agent in live mode by choosing from a list of authoring bundles. Save the conversation transcripts to the "./transcripts/my-preview" directory, enable the Apex debug logs, and use your default org:

```bash
sf agent preview --use-live-actions --apex-debug --output-dir transcripts/my-preview
```

---

## `sf agent preview end`

End an existing programmatic agent preview session and get trace location.

### Description

You must have previously started a programmatic agent preview session with the "agent preview start" command to then use this command to end it. This command also displays the local directory where the session trace files are stored.

The original "agent preview start" command outputs a session ID which you then use with the --session-id flag of this command to end the session. You don't have to specify the --session-id flag if an agent has only one active preview session. You must also use either the --authoring-bundle or --api-name flag to specify the API name of the authoring bundle or the published agent, respectively. To find either API name, navigate to your package directory in your DX project. The API name of an authoring bundle is the same as its directory name under the "aiAuthoringBundles" metadata directory. Similarly, the published agent's API name is the same as its directory name under the "Bots" metadata directory.

Use the --all flag to end all active preview sessions at once. You can combine --all with --api-name or --authoring-bundle to end only sessions for a specific agent, or use --all on its own to end every session across all agents in the project.

### Usage

```bash
sf agent preview end [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--session-id <value>] [--api-name <value>] [--authoring-bundle <value>] [--all] [--no-prompt]
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

#### `--session-id=<value>`

Session ID outputted by "agent preview start". Not required when the agent has exactly one active session. Run "agent preview sessions" to see the list of all sessions.

- Type: option
- Required: no
- Exclusive with: `--all`

#### `-n | --api-name=<value>`

API name of the activated published agent you want to preview.

- Type: option
- Required: no
- Exclusive with: `--authoring-bundle`

#### `--authoring-bundle=<value>`

API name of the authoring bundle metadata component that contains the agent's Agent Script file.

- Type: option
- Required: no
- Exclusive with: `--api-name`

#### `--all`

End all active preview sessions. Combine with --api-name or --authoring-bundle to limit to a specific agent, or use with only --target-org to end sessions for all agents found in the local session cache. Requires --target-org.

- Type: boolean
- Required: no
- Exclusive with: `--session-id`

#### `-p | --no-prompt`

Don't prompt for confirmation before ending sessions. Has an effect only when used with --all.

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

End a preview session of a published agent by specifying its session ID and API name; use the default org:

```bash
sf agent preview end --session-id <SESSION_ID> --api-name My_Published_Agent
```

Similar to previous example, but don't specify a session ID; you get an error if the published agent has more than one active session. Use the org with alias "my-dev-org":

```bash
sf agent preview end --api-name My_Published_Agent --target-org my-dev-org
```

End a preview session of an agent using its authoring bundle API name; you get an error if the agent has more than one active session.

```bash
sf agent preview end --authoring-bundle My_Local_Agent
```

End all active preview sessions for a specific agent without prompting:

```bash
sf agent preview end --all --authoring-bundle My_Local_Agent --target-org <target_org> --no-prompt
```

End all active preview sessions across every agent in the local session cache for an org:

```bash
sf agent preview end --all --target-org <target_org>
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

---

## `sf agent preview send`

Send a message to an existing agent preview session.

### Description

You must have previously started a programmatic agent preview session with the "agent preview start" command to then use this command to send the agent a message (utterance). This command then displays the agent's response.

The original "agent preview start" command outputs a session ID which you then use with the --session-id flag of this command to send a message. You don't have to specify the --session-id flag if an agent has only one active preview session. You must also use either the --authoring-bundle or --api-name flag to specify the API name of the authoring bundle or the published agent, respecitvely. To find either API name, navigate to your package directory in your DX project. The API name of an authoring bundle is the same as its directory name under the "aiAuthoringBundles" metadata directory. Similarly, the published agent's API name is the same as its directory name under the "Bots" metadata directory.

### Usage

```bash
sf agent preview send [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--session-id <value>] --utterance <value> [--api-name <value>] [--authoring-bundle <value>]
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

#### `--session-id=<value>`

Session ID outputted by "agent preview start". Not required when the agent has exactly one active session. Run "agent preview sessions" to see list of all sessions.

- Type: option
- Required: no

#### `-u | --utterance=<value>`

Utterance to send to the agent, enclosed in double quotes.

- Type: option
- Required: yes

#### `-n | --api-name=<value>`

API name of the activated published agent you want to preview.

- Type: option
- Required: no

#### `--authoring-bundle=<value>`

API name of the authoring bundle metadata component that contains the agent's Agent Script file.

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

Send a message to an activated published agent using its API name and session ID; use the default org:

```bash
sf agent preview send --utterance "What can you help me with?" --api-name My_Published_Agent --session-id <SESSION_ID>
```

Similar to previous example, but don't specify a session ID; you get an error if the agent has more than one active session. Use the org with alias "my-dev-org":

```bash
sf agent preview send --utterance "What can you help me with?" --api-name My_Published_Agent --target-org my-dev-org
```

Send a message to an agent using its authoring bundle API name; you get an error if the agent has more than one active session:

```bash
sf agent preview send --utterance "what can you help me with?" --authoring-bundle My_Local_Agent
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

---

## `sf agent preview sessions`

List all known programmatic agent preview sessions.

### Description

This command lists the agent preview sessions that were started with the "agent preview start" command and are still in the local cache. Use this command to discover specific session IDs that you can pass to the "agent preview send" or "agent preview end" commands with the --session-id flag.

Programmatic agent preview sessions can be started for both published activated agents and by using an agent's local authoring bundle, which contains its Agent Script file. In this command's output table, the Agent column contains either the API name of the authoring bundle or the published agent, whichever was used when starting the session. In the table, if the same API name has multiple rows with different session IDs, then it means that you previously started multiple preview sessions with the associated agent.

### Usage

```bash
sf agent preview sessions [--json] [--flags-dir <value>]
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

List all cached agent preview sessions:

```bash
sf agent preview sessions
```

### Error codes

**ERROR CODES**

[object Object]

---

## `sf agent preview start`

Start a programmatic agent preview session.

### Description

This command outputs a session ID that you then use with the "agent preview send" command to send an utterance to the agent. Use the "agent preview sessions" command to list all active sessions and the "agent preview end" command to end a specific session.

Identify the agent you want to start previewing with either the --authoring-bundle flag to specify a local authoring bundle's API name or --api-name to specify an activated published agent's API name. To find either API name, navigate to your package directory in your DX project. The API name of an authoring bundle is the same as its directory name under the "aiAuthoringBundles" metadata directory. Similarly, the published agent's API name is the same as its directory name under the "Bots" metadata directory.

When starting a preview session with --authoring-bundle, you must explicitly specify the execution mode using one of these flags:

- --use-live-actions: Executes real Apex classes, flows, and other actions in the org. This surfaces compile and validation errors during preview.
- --simulate-actions: Uses AI to simulate action execution without calling real implementations.

Published agents (--api-name) always use live actions. The mode flags are optional and have no effect for published agents.

### Usage

```bash
sf agent preview start [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--api-name <value>] [--authoring-bundle <value>] [--use-live-actions] [--simulate-actions] [--context-variables <value>]
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

API name of the activated published agent you want to preview.

- Type: option
- Required: no

#### `--authoring-bundle=<value>`

API name of the authoring bundle metadata component that contains the agent's Agent Script file.

- Type: option
- Required: no

#### `--use-live-actions`

Execute real actions in the org (Apex classes, flows, etc.). Required with --authoring-bundle.

- Type: boolean
- Required: no
- Exclusive with: `--simulate-actions`

#### `--simulate-actions`

Use AI to simulate action execution instead of calling real actions. Required with --authoring-bundle.

- Type: boolean
- Required: no
- Exclusive with: `--use-live-actions`

#### `--context-variables=<value>`

Session variables for the agent preview session, in the form Name=Value.

Sets variables on the agent preview session, mirroring what the in-org Agentforce Builder UI does when you override variables before sending a message. Specify this flag multiple times or use comma-separated values. Two namespaces are supported, distinguished by the name shape. Names pass through to the runtime verbatim — the CLI doesn't transform them.

Linked context variables use the "$Context." prefix. These map to externally-provided fields that the runtime resolves (declared in the bundle's globalConfiguration.contextVariables) and are read by live actions and topic-routing expressions via $Context.Name. Example: $Context.MyLinkedVar=some-value.

State variables use the bare developerName, no prefix. These seed mutable agent state declared in agentVersion.stateVariables. Example: MyStateVar=some-value.

Both namespaces can be mixed in one value. Example: --context-variables '$Context.MyLinkedVar=foo,MyStateVar=bar'.

Tips: (1) Quote the whole value in single quotes so $Context isn't shell-expanded. (2) Names are sent verbatim — a bare name is treated as a state variable, not a linked context variable, so live actions that bind via $Context.Name will see null. (3) Type defaults to Text.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)

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

Start a programmatic agent preview session by specifying an authoring bundle; use simulated actions. Use the org with alias "my-dev-org":

```bash
sf agent preview start --authoring-bundle My_Agent_Bundle --target-org my-dev-org --simulate-actions
```

Similar to previous example but use live actions and the default org:

```bash
sf agent preview start --authoring-bundle My_Agent_Bundle --use-live-actions
```

Start a preview session with an activated published agent (always uses live actions):

```bash
sf agent preview start --api-name My_Published_Agent
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

---

## `sf agent publish authoring-bundle`

Publish an authoring bundle to your org, which results in a new agent or a new version of an existing agent.

### Description

An authoring bundle is a metadata type (named aiAuthoringBundle) that provides the blueprint for an agent. The metadata type contains two files: the standard metatada XML file and an Agent Script file (extension ".agent") that fully describes the agent using the Agent Script language.

When you publish an authoring bundle to your org, a number of things happen. First, this command validates that the Agent Script file successfully compiles. If there are compilation errors, the command exits and you must fix the Agent Script file to continue. Once the Agent Script file compiles, then it's published to the org, which in turn creates new associated metadata (Bot, BotVersion, GenAiX), or new versions of the metadata if the agent already exists. The new or updated metadata is retrieved back to your DX project; specify the --skip-retrieve flag to skip this step. Finally, the authoring bundle metadata (AiAuthoringBundle) is deployed to your org.

This command uses the API name of the authoring bundle.

### Usage

```bash
sf agent publish authoring-bundle [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--api-name <value>] [--skip-retrieve] [--verbose] [--concise]
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

API name of the authoring bundle you want to publish; if not specified, the command provides a list that you can choose from.

- Type: option
- Required: no

#### `--skip-retrieve`

Don't retrieve the metadata associated with the agent to your DX project.

- Type: boolean
- Required: no

#### `-v | --verbose`

Display detailed output showing all metadata components retrieved and deployed during the publish process.

- Type: boolean
- Required: no
- Exclusive with: `--concise`

#### `--concise`

Display minimal output with only essential information about the publish operation.

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

Publish an authoring bundle by being prompted for its API name; use your default org:

```bash
sf agent publish authoring-bundle
```

Publish an authoring bundle with API name MyAuthoringBundle to the org with alias "my-dev-org":

```bash
sf agent publish authoring-bundle --api-name MyAuthoringbundle --target-org my-dev-org
```

Publish with verbose output to see all retrieved and deployed metadata components:

```bash
sf agent publish authoring-bundle --api-name MyAuthoringbundle --verbose
```

Publish with concise output showing only essential information:

```bash
sf agent publish authoring-bundle --api-name MyAuthoringbundle --concise
```

### Error codes

**ERROR CODES**

[object Object]
[object Object]

---

## `sf agent test create`

Create an agent test in your org using a local test spec YAML file.

### Description

To run this command, you must have an agent test spec file, which is a YAML file that lists the test cases for testing a specific agent. Use the "agent generate test-spec" CLI command to generate a test spec file. Then specify the file to this command with the --spec flag, or run this command with no flags to be prompted.

When this command completes, your org contains the new agent test, which you can view and edit using the Testing Center UI (legacy) or Agentforce Studio (NGT). This command also retrieves the metadata component associated with the new test to your local Salesforce DX project and displays its filename. By default, the legacy AiEvaluationDefinition is created; use --test-runner agentforce-studio to author an AiTestingDefinition (NGT) instead.

After you've created the test in the org, use the "agent test run" command to run it.

### Usage

```bash
sf agent test create [--json] [--flags-dir <value>] [--api-name <value>] [--spec <value>] --target-org <value> [--api-version <value>] [--preview] [--force-overwrite] [--test-runner <value>]
```

### Flags

#### `--api-name=<value>`

API name of the new test; the API name must not exist in the org.

- Type: option
- Required: no

#### `--spec=<value>`

Path to the test spec YAML file.

- Type: option
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `--preview`

Preview the test metadata file without deploying to your org.

- Type: boolean
- Required: no

#### `--force-overwrite`

Don't prompt for confirmation when overwriting an existing test (based on API name) in your org.

- Type: boolean
- Required: no

#### `--test-runner=<value>`

Explicitly specify which test runner to use (agentforce-studio or testing-center).

By default, the command automatically detects which test runner to use based on the test definition metadata type in your org. Use this flag to explicitly specify the runner type. 'agentforce-studio' uses AiTestingDefinition metadata. 'testing-center' uses AiEvaluationDefinition metadata.

- Type: option
- Required: no
- Permitted values: `agentforce-studio`, `testing-center`

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

Create an agent test interactively and be prompted for the test spec and API name of the test in the org; use the default org:

```bash
sf agent test create
```

Create an agent test and use flags to specify all required information; if a test with same API name already exists in the org, overwrite it without confirmation. Use the org with alias "my-org":

```bash
sf agent test create --spec specs/Resort_Manager-testSpec.yaml --api-name Resort_Manager_Test --force-overwrite --target-org my-org
```

Preview what the agent test metadata (AiEvaluationDefinition) looks like without deploying it to your default org:

```bash
sf agent test create --spec specs/Resort_Manager-testSpec.yaml --api-name Resort_Manager_Test --preview
```

Author an Agentforce Studio (NGT) test from an NGT-shaped YAML; writes an AiTestingDefinition metadata file:

```bash
sf agent test create --spec specs/ReturnsCheckout.ngt.yaml --api-name Returns_Checkout --test-runner agentforce-studio --target-org my-org
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

---

## `sf agent test list`

List the available agent tests in your org.

### Description

The command outputs a table with the name (API name) of each test along with its unique ID, type ('agentforce-studio' or 'testing-center'), and the date it was created in the org.

### Usage

```bash
sf agent test list [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

List the agent tests in your default org:

```bash
sf agent test list
```

List the agent tests in an org with alias "my-org""

```bash
sf agent test list --target-org my-org
```

### Environment variables

**ENVIRONMENT VARIABLES**

[object Object]

### Error codes

**ERROR CODES**

[object Object]
[object Object]

---

## `sf agent test results`

Get the results of a completed agent test run.

### Description

This command requires a job ID, which the original "agent test run" command displays when it completes. You can also use the --use-most-recent flag to see results for the most recently run agent test.

By default, this command outputs test results in human-readable tables for each test case. The tables show whether the test case passed, the expected and actual values, the test score, how long the test took, and more. Use the --result-format to display the test results in JSON or Junit format. Use the --output-dir flag to write the results to a file rather than to the terminal.

### Usage

```bash
sf agent test results [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --job-id <value> [--result-format <value>] [--output-dir <value>] [--test-runner <value>] [--verbose]
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

#### `-i | --job-id=<value>`

Job ID of the completed agent test run.

- Type: option
- Required: yes

#### `--result-format=<value>`

Format of the agent test run results.

- Type: option
- Required: no
- Permitted values: `json`, `human`, `junit`, `tap`
- Default: `human`

#### `-d | --output-dir=<value>`

Directory to write the agent test results into.

If the agent test run completes, write the results to the specified directory. If the test is still running, the test results aren't written.

- Type: option
- Required: no

#### `--test-runner=<value>`

Explicitly specify which test runner to use (agentforce-studio or testing-center).

By default, the command automatically detects which test runner to use based on the test definition metadata type in your org. Use this flag to explicitly specify the runner type. 'agentforce-studio' uses AiTestingDefinition metadata. 'testing-center' uses AiEvaluationDefinition metadata.

- Type: option
- Required: no
- Permitted values: `agentforce-studio`, `testing-center`

#### `--verbose`

Show generated data in the test results output.

When enabled, includes detailed generated data (such as invoked actions) in the human-readable test results output. This is useful for debugging test failures and understanding what actions were actually invoked during the test run.

The generated data is in JSON format and includes the Apex classes or Flows that were invoked, the Salesforce objects that were touched, and so on. Use the JSON structure of this information to build the test case JSONPath expression when using custom evaluations.

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

Get the results of an agent test run in your default org using its job ID:

```bash
sf agent test results --job-id 4KBfake0000003F4AQ
```

Get the results of the most recently run agent test in an org with alias "my-org":

```bash
sf agent test results --use-most-recent --target-org my-org
```

Get the results of the most recently run agent test in your default org, and write the JSON-formatted results into a directory called "test-results":

```bash
sf agent test results --use-most-recent --output-dir ./test-results --result-format json
```

### Environment variables

**ENVIRONMENT VARIABLES**

[object Object]

### Error codes

**ERROR CODES**

[object Object]
[object Object]
[object Object]

---

## `sf agent test resume`

Resume an agent test that you previously started in your org so you can view the test results.

### Description

This command requires a job ID, which the original "agent test run" command displays when it completes. You can also use the --use-most-recent flag to see results for the most recently run agent test.

Use the --wait flag to specify the number of minutes for this command to wait for the agent test to complete; if the test completes by the end of the wait time, the command displays the test results. If not, the CLI returns control of the terminal to you, and you must run "agent test resume" again.

By default, this command outputs test results in human-readable tables for each test case. The tables show whether the test case passed, the expected and actual values, the test score, how long the test took, and more. Use the --result-format to display the test results in JSON or Junit format. Use the --output-dir flag to write the results to a file rather than to the terminal.

### Usage

```bash
sf agent test resume [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--job-id <value>] [--use-most-recent] [--wait <value>] [--result-format <value>] [--output-dir <value>] [--test-runner <value>] [--verbose]
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

#### `-i | --job-id=<value>`

Job ID of the original agent test run.

- Type: option
- Required: no

#### `-r | --use-most-recent`

Use the job ID of the most recent agent test run.

- Type: boolean
- Required: no

#### `-w | --wait=<value>`

Number of minutes to wait for the command to complete and display results to the terminal window.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `--result-format=<value>`

Format of the agent test run results.

- Type: option
- Required: no
- Permitted values: `json`, `human`, `junit`, `tap`
- Default: `human`

#### `-d | --output-dir=<value>`

Directory to write the agent test results into.

If the agent test run completes, write the results to the specified directory. If the test is still running, the test results aren't written.

- Type: option
- Required: no

#### `--test-runner=<value>`

Explicitly specify which test runner to use (agentforce-studio or testing-center).

By default, the command automatically detects which test runner to use based on the test definition metadata type in your org. Use this flag to explicitly specify the runner type. 'agentforce-studio' uses AiTestingDefinition metadata. 'testing-center' uses AiEvaluationDefinition metadata.

- Type: option
- Required: no
- Permitted values: `agentforce-studio`, `testing-center`

#### `--verbose`

Show generated data in the test results output.

When enabled, includes detailed generated data (such as invoked actions) in the human-readable test results output. This is useful for debugging test failures and understanding what actions were actually invoked during the test run.

The generated data is in JSON format and includes the Apex classes or Flows that were invoked, the Salesforce objects that were touched, and so on. Use the JSON structure of this information to build the test case JSONPath expression when using custom evaluations.

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

Resume an agent test in your default org using a job ID:

```bash
sf agent test resume --job-id 4KBfake0000003F4AQ
```

Resume the most recently-run agent test in an org with alias "my-org" org; wait 10 minutes for the tests to finish:

```bash
sf agent test resume --use-most-recent --wait 10 --target-org my-org
```

Resume the most recent agent test in your default org, and write the JSON-formatted results into a directory called "test-results":

```bash
sf agent test resume --use-most-recent --output-dir ./test-results --result-format json
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

---

## `sf agent test run`

Start an agent test in your org.

### Description

Use the --api-name flag to specify the name of the agent test you want to run. Use the output of the "agent test list" command to get the names of all the available agent tests in your org.

By default, this command starts the agent test in your org, but it doesn't wait for the test to finish. Instead, it displays the "agent test resume" command, with a job ID, that you execute to see the results of the test run, and then returns control of the terminal window to you. Use the --wait flag to specify the number of minutes for the command to wait for the agent test to complete; if the test completes by the end of the wait time, the command displays the test results. If not, run "agent test resume".

By default, this command outputs test results in human-readable tables for each test case, if the test completes in time. The tables show whether the test case passed, the expected and actual values, the test score, how long the test took, and more. Use the --result-format to display the test results in JSON or Junit format. Use the --output-dir flag to write the results to a file rather than to the terminal.

### Usage

```bash
sf agent test run [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--api-name <value>] [--wait <value>] [--result-format <value>] [--output-dir <value>] [--test-runner <value>] [--verbose]
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

API name of the agent test to run; corresponds to the name of the AiEvaluationDefinition metadata component that implements the agent test.

- Type: option
- Required: no

#### `-w | --wait=<value>`

Number of minutes to wait for the command to complete and display results to the terminal window.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `--result-format=<value>`

Format of the agent test run results.

- Type: option
- Required: no
- Permitted values: `json`, `human`, `junit`, `tap`
- Default: `human`

#### `-d | --output-dir=<value>`

Directory to write the agent test results into.

If the agent test run completes, write the results to the specified directory. If the test is still running, the test results aren't written.

- Type: option
- Required: no

#### `--test-runner=<value>`

Explicitly specify which test runner to use (agentforce-studio or testing-center).

By default, the command automatically detects which test runner to use based on the test definition metadata type in your org. Use this flag to explicitly specify the runner type. 'agentforce-studio' uses AiTestingDefinition metadata. 'testing-center' uses AiEvaluationDefinition metadata.

- Type: option
- Required: no
- Permitted values: `agentforce-studio`, `testing-center`

#### `--verbose`

Show generated data in the test results output.

When enabled, includes detailed generated data (such as invoked actions) in the human-readable test results output. This is useful for debugging test failures and understanding what actions were actually invoked during the test run.

The generated data is in JSON format and includes the Apex classes or Flows that were invoked, the Salesforce objects that were touched, and so on. Use the JSON structure of this information to build the test case JSONPath expression when using custom evaluations.

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

Start an agent test called Resort_Manager_Test for an agent in your default org, don't wait for the test to finish:

```bash
sf agent test run --api-name Resort_Manager_Test
```

Start an agent test for an agent in an org with alias "my-org" and wait for 10 minutes for the test to finish:

```bash
sf agent test run --api-name Resort_Manager_Test --wait 10 --target-org my-org
```

Start an agent test and write the JSON-formatted results into a directory called "test-results":

```bash
sf agent test run --api-name Resort_Manager_Test --wait 10 --output-dir ./test-results --result-format json
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

---

## `sf agent test run-eval`

Status: beta

Run rich evaluation tests against an Agentforce agent.

### Description

Specify the tests you want to run with one of these inputs to the --spec flag:

- YAML test spec generated by the `agent generate test-spec` CLI command
- JSON payload

When you provide a YAML test spec, this command automatically translates test cases into internal state-based evaluation framework calls and infers the agent name from the test spec's `subjectName` field. As a result, you can use the same test spec with both the `agent test run` and `agent test run-eval` commands. YAML test specs also support context variables, which allow you to inject contextual data (such as CaseId or RoutableId) into agent sessions for testing with different contexts.

When you provide a JSON payload, it's sent directly to the evaluation framework with optional normalization. The normalizer auto-corrects common field name mistakes, converts shorthand references to JSONPath, and injects defaults. Use `--no-normalize` to disable this auto-normalization. JSON payloads can also include context_variables on agent.create_session steps for the same contextual testing capabilities as when you use a YAML test spec.

This command supports more than 8 evaluator types, including subagent routing assertions, action invocation checks, string/numeric assertions, semantic similarity scoring, and LLM-based quality ratings.

### Usage

```bash
sf agent test run-eval [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --spec <value> [--api-name <value>] [--result-format <value>] [--batch-size <value>] [--no-normalize]
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

#### `-s | --spec=<value>`

Path to test spec file (YAML or JSON). Supports reading from stdin when piping content.

- Type: option
- Required: yes

#### `-n | --api-name=<value>`

Agent API name (also called DeveloperName) used to resolve agent_id and agent_version_id. Auto-inferred from the YAML spec's subjectName.

- Type: option
- Required: no

#### `--result-format=<value>`

Format of the agent test run results.

- Type: option
- Required: no
- Permitted values: `json`, `human`, `junit`, `tap`
- Default: `human`

#### `--batch-size=<value>`

Number of tests per API request (max 5).

- Type: option
- Required: no
- Default: `5`

#### `--no-normalize`

Disable auto-normalization of field names and shorthand references.

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

Run tests using a YAML test spec on the org with alias "my-org":

```bash
sf agent test run-eval --spec specs/my-agent-testSpec.yaml --target-org my-org
```

Run tests using a YAML spec with explicit agent name override; use your default org:

```bash
sf agent test run-eval --spec specs/my-agent-testSpec.yaml --api-name My_Agent
```

Run tests using a JSON payload:

```bash
sf agent test run-eval --spec specs/eval-payload.json --target-org my-org
```

Run tests and output results in JUnit format; useful for continuous integration and deployment (CI/CD):

```bash
sf agent test run-eval --spec specs/my-agent-testSpec.yaml --target-org my-org --result-format junit
```

Run tests with contextVariables to inject contextual data into agent sessions (add contextVariables to test cases in your YAML spec):

```bash
sf agent test run-eval --spec specs/agent-with-context.yaml --target-org my-org
```

```bash
Pipe JSON payload from stdin (--spec flag is automatically populated from stdin):
$ echo '{"tests":[...]}' | sf agent test run-eval --spec --target-org my-org
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

---

## `sf agent trace delete`

Delete trace files from an agent preview session.

### Description

When you run an agent preview conversation (either interactive or programmatic), trace files are automatically recorded and saved in your local DX project. Use this command to delete some or all of the trace files.

By default, this command shows a preview of what will be deleted and prompts for confirmation. Use --no-prompt to skip confirmation.

Without filters, this comamnd deletes all trace files for all agents and sessions. Use flags to narrow the scope: filter by agent API name (--agent), by session (--session-id), or by age (--older-than).

### Usage

```bash
sf agent trace delete [--json] [--flags-dir <value>] [--agent <value>] [--session-id <value>] [--older-than <value>] [--no-prompt]
```

### Flags

#### `-a | --agent=<value>`

API name of the agent used to filter the list of trace files you want to delete. Matches against the API name used when starting the session, either an authoring bundle or a published agent API name.

- Type: option
- Required: no

#### `--session-id=<value>`

Session ID used to filter the list of trace files you want to delete. Use the "agent preview sessions" CLI command to list all known agent preview sessions along with their session IDs.

- Type: option
- Required: no

#### `--older-than=<value>`

Duration used to filter the list of trace files; only files older than the duration are deleted. Accepts a number followed by a unit: m/minutes, h/hours, d/days, w/weeks. Examples: 7d, 24h, 2w.

- Type: option
- Required: no

#### `--no-prompt`

Skip the confirmation prompt and delete immediately.

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

Delete all traces for all agents and sessions; prompt for confirmation:

```bash
sf agent trace delete
```

Delete all traces for a specific agent:

```bash
sf agent trace delete --agent My_Agent
```

Delete traces from a specific session:

```bash
sf agent trace delete --session-id <SESSION_ID>
```

Delete traces older than 7 days:

```bash
sf agent trace delete --older-than 7d
```

Delete traces older than 24 hours for a specific agent; don't prompt for confirmation:

```bash
sf agent trace delete --agent My_Agent --older-than 24h --no-prompt
```

Delete all traces for all agents and sessions; don't prompt for confirmation:

```bash
sf agent trace delete --no-prompt
```

### Error codes

**ERROR CODES**

[object Object]

---

## `sf agent trace list`

List the available trace files that were recorded during all agent preview sessions.

### Description

When you run an agent preview conversation (either interactive or programmatic), trace files are automatically recorded and saved in your local DX project. By default, this command lists all trace files for all agents and all of their sessions. Use flags to narrow results: filter by agent name (--agent), by session (--session-id), or by date (--since).

Each row in the output corresponds to one trace file, which in turn corresponds to one agent session. The Agent column shows the authoring bundle or API name used when starting the session.

### Usage

```bash
sf agent trace list [--json] [--flags-dir <value>] [--session-id <value>] [--agent <value>] [--since <value>]
```

### Flags

#### `--session-id=<value>`

Session ID used to filter the list of trace files. Use the "agent preview sessions" CLI command to list all known agent preview sessions along with their session IDs.

- Type: option
- Required: no

#### `-a | --agent=<value>`

API name of the agent used to filter the list of available trace files. Matches against the API name used when starting the session, either an authoring bundle or a published agent API name.

- Type: option
- Required: no

#### `--since=<value>`

Date used to filter the list of trace files; only those recorded on or after the date are listed.

Accepts ISO 8601 format: date-only (2026-04-20), date-time (2026-04-20T14:00:00Z), or date-time with milliseconds (2026-04-20T14:00:00.000Z). The "Recorded At" values shown in the table output are valid inputs.

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

List all trace files for all agents and sessions:

```bash
sf agent trace list
```

List all trace files for a specific agent:

```bash
sf agent trace list --agent My_Agent
```

List trace files for a specific session:

```bash
sf agent trace list --session-id <SESSION_ID>
```

List trace files recorded on or after April 20, 2026 (date-only, interpreted as UTC midnight):

```bash
sf agent trace list --since 2026-04-20
```

List trace files recorded on or after a specific UTC time:

```bash
sf agent trace list --since 2026-04-20T14:00:00Z
```

Filter by agent and date together:

```bash
sf agent trace list --agent My_Agent --since 2026-04-20
```

Return results as JSON:

```bash
sf agent trace list --json
```

### Error codes

**ERROR CODES**

[object Object]

---

## `sf agent trace read`

Read trace files from an agent preview session.

### Description

When you run an agent preview conversation (either interactive or programmatic), trace files are automatically recorded and saved in your local DX project. Each turn (utterance or response) of a conversation creates trace data. Use this command to view trace data for a specific preview session, so you can then analyze the trace data to observe, monitor, investigate, and troubleshoot agent events and behavior.

Use the --format flag to specify one of these formats of the outputted trace data:

- summary (Default): A per-turn narrative showing topic routing, actions executed, and the agent's response. Use this to quickly understand what happened in a preview session.
- detail: Diagnostic drill-down into a specific dimension. Filters output to only the trace steps relevant to that dimension, minimizing noise.
- raw: Unprocessed trace JSON. Use this as a fallback when the trace schema has changed or you need to perform custom analysis.

If you specify "--format detail", you must also specify a dimension with the --dimension flag. Dimensions are a way to slice and analyze the agent execution trace from a specific angle or concern. Instead of looking at the raw sequence of everything that happened, each dimension filters and organizes the trace data to answer a specific type of question. These are the available dimensions and the information they provide:

- actions: The actions the agent executed. Includes action name, input parameters, output, and latency. Use this dimension to understand what the agent actually did when answering an utterance in the preview session.
- grounding: The reasoning steps used by the LLM. Use this dimension to see how the agent "thought" about the problem - the AI reasoning that determined which actions to take.
- routing: How the agent navigated between subagents. Use this dimension to understand conversation flow - when and why the agent switched between different subagents or contexts during the conversation.
- errors: Aggregates all errors during the session. Use this dimension to quickly identify and debug issues across all steps.

### Usage

```bash
sf agent trace read [--json] [--flags-dir <value>] --session-id <value> [--format <value>] [--dimension <value>] [--turn <value>]
```

### Flags

#### `-s | --session-id=<value>`

Session ID to read traces for. Use the "agent preview sessions" CLI command to list all known agent preview sessions along with their session IDs

- Type: option
- Required: yes

#### `-f | --format=<value>`

Output format of the trace data; specifies the level of detail you want in the trace files.

- Type: option
- Required: no
- Permitted values: `summary`, `detail`, `raw`
- Default: `summary`

#### `-d | --dimension=<value>`

Dimension to drill into when using "--format detail"; used to filter and organize the trace data to answer a specific type of question.

- Type: option
- Required: no
- Permitted values: `actions`, `grounding`, `routing`, `errors`

#### `-t | --turn=<value>`

Turn number for which you want trace data. A turn is a single utterance or response in a conversation, starting with 1.

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

Show a session trace summary for all turns in the session with the specified ID:

```bash
sf agent trace read --session-id <SESSION_ID>
```

Show a trace summary for the second turn (utterance or response) of the conversation:

```bash
sf agent trace read --session-id <SESSION_ID> --turn 2
```

Drill into action execution across all turns:

```bash
sf agent trace read --session-id <SESSION_ID> --format detail --dimension actions
```

Drill into routing decisions for the first turn of the conversation:

```bash
sf agent trace read --session-id <SESSION_ID> --format detail --dimension routing --turn 1
```

Show all errors across the session:

```bash
sf agent trace read --session-id <SESSION_ID> --format detail --dimension errors
```

Output raw trace JSON for custom parsing:

```bash
sf agent trace read --session-id <SESSION_ID> --format raw
```

Return results as JSON:

```bash
sf agent trace read --session-id <SESSION_ID> --json
```

---

## `sf agent validate authoring-bundle`

Validate an authoring bundle to ensure its Agent Script file compiles successfully and can be used to publish an agent.

### Description

An authoring bundle is a metadata type (named aiAuthoringBundle) that provides the blueprint for an agent. The metadata type contains two files: the standard metatada XML file and an Agent Script file (extension ".agent") that fully describes the agent using the Agent Script language.

This command validates that the Agent Script file in the authoring bundle compiles without errors so that you can later publish the bundle to your org. Use this command while you code the Agent Script file to ensure that it's valid. If the validation fails, the command outputs the list of syntax errors, a brief description of the error, and the location in the Agent Script file where the error occurred.

This command uses the API name of the authoring bundle. If you don't provide an API name with the --api-name flag, the command searches the current DX project and outputs a list of authoring bundles that it found for you to choose from.

### Usage

```bash
sf agent validate authoring-bundle [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--api-name <value>]
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

API name of the authoring bundle you want to validate; if not specified, the command provides a list that you can choose from.

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

Validate an authoring bundle by being prompted for its API name; use your default org:

```bash
sf agent validate authoring-bundle
```

Validate an authoring bundle with API name MyAuthoringBundle; use the org with alias "my-dev-org":

```bash
sf agent validate authoring-bundle --api-name MyAuthoringBundle --target-org my-dev-org
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
