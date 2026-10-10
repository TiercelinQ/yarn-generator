# schema Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_schema.html

## `sf schema generate field`

Generate metadata source files for a new custom field on a specified object.

### Description

This command is interactive and must be run in a Salesforce DX project directory. You're required to specify the field's label with the "--label" flag. The command uses this label to provide intelligent suggestions for other field properties, such as its API name.

You can generate a custom field on either a standard object, such as Account, or a custom object. In both cases, the source files for the object must already exist in your local project before you run this command. If you create a relationship field, the source files for the parent object must also exist in your local directory.  Use the command "sf metadata retrieve -m CustomObject:\<object\>" to retrieve source files for both standard and custom objects from your org.  To create a custom object, run the "sf generate metadata sobject" command or use the Object Manager UI in your Salesforce org.

### Aliases

- `sf generate metadata field`

### Usage

```bash
sf schema generate field [--flags-dir <value>] --label <value> [--object <value>]
```

### Flags

#### `-l | --label=<value>`

The field's label.

- Type: option
- Required: yes

#### `-o | --object=<value>`

The directory that contains the object's source files.

The object source files in your local project are grouped in a directoy with the same name as the object. Custom object names always end in "__c". An example of the object directory for the Account standard object is "force-app/main/default/objects/Account" An example custom object directory is "force-app/main/default/objects/MyObject__c"

If you don't specify this flag, the command prompts you to choose from your local objects.

- Type: option
- Required: no

### Global flags

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Create a field with the specified label; the command prompts you for the object:

```bash
sf schema generate field --label "My Field"
```

Specify the local path to the object's folder:

```bash
sf schema generate field --label "My Field" --object force-app/main/default/objects/MyObject__c
```

---

## `sf schema generate platformevent`

Generate metadata source files for a new platform event.

### Description

This command is interactive and must be run in a Salesforce DX project directory. You're required to specify the event's label with the "--label" flag. The command uses this label to provide intelligent suggestions for other event properties, such as its API name.

### Aliases

- `sf generate metadata platformevent`

### Usage

```bash
sf schema generate platformevent [--flags-dir <value>] --label <value>
```

### Flags

#### `-l | --label=<value>`

The platform event's label.

- Type: option
- Required: yes

### Global flags

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Create a platform event with the specified label:

```bash
sf schema generate platformevent --label "My Platform Event"
```

---

## `sf schema generate sobject`

Generate metadata source files for a new custom object.

### Description

This command is interactive and must be run in a Salesforce DX project directory. You're required to specify the object's label with the "--label" flag. The command uses this label to provide intelligent suggestions for other object properties, such as its API name and plural label.

All Salesforce objects are required to have a Name field, so this command also prompts you for the label and type of the Name field. Run the "sf metadata generate field" command to create additional fields for the object.

To reduce the number of prompts, use the "--use-default-features" flag to automatically enable some features, such as reporting and search on the object.

### Aliases

- `sf generate metadata sobject`

### Usage

```bash
sf schema generate sobject [--flags-dir <value>] --label <value> [--use-default-features]
```

### Flags

#### `-l | --label=<value>`

The custom object's label.

- Type: option
- Required: yes

#### `-f | --use-default-features`

Enable all optional features without prompting.

Enables these features:

- Search: Allows users to find the custom object's records when they search, including SOSL.
- Feeds: Enables feed tracking.
- Reports: Allows reporting of the data in the custom object records.
- History: Enables object history tracking.
- Activities: Allows users to associate tasks and scheduled calendar events related to the custom object records.
- Bulk API: With Sharing and Streaming API, classifies the custom object as an Enterprise Application object.
- Sharing: With Bulk API and Streaming API, classifies the custom object as an Enterprise Application object.
- Streaming API: With Bulk API and Sharing, classifies the custom object as an Enterprise Application object.

- Type: boolean
- Required: no

### Global flags

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Create a custom object with the specified label and be prompted for additional information:

```bash
sf schema generate sobject --label "My Object"
```

Create a custom object and enable optional features without prompting:

```bash
sf schema generate sobject --label "My Object" --use-default-features
```

---

## `sf schema generate tab`

Generate the metadata source files for a new custom tab on a custom object.

### Description

Custom tabs let you display custom object data or other web content in Salesforce. Custom tabs appear in Salesforce as an item in the app’s navigation bar and in the App Launcher.

This command must be run in a Salesforce DX project directory. You must pass all required information to it with the required flags. The source files for the custom object for which you're generating a tab don't need to exist in your local project.

### Aliases

- `sf generate metadata tab`

### Usage

```bash
sf schema generate tab [--json] [--flags-dir <value>] --object <value> --directory <value> --icon <value>
```

### Flags

#### `-o | --object=<value>`

API name of the custom object you're generating a tab for.

The API name for a custom object always ends in `__c`, such as `MyObject__c`.

- Type: option
- Required: yes

#### `-d | --directory=<value>`

Path to a "tabs" directory that will contain the source files for your new tab.

- Type: option
- Required: yes

#### `-i | --icon=<value>`

Number from 1 to 100 that specifies the color scheme and icon for the custom tab.

See https://lightningdesignsystem.com/icons/#custom for the available icons.

- Type: option
- Required: yes
- Default: `1`

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

Create a tab on the `MyObject__c` custom object:

```bash
sf schema generate tab --object `MyObject__c` --icon 54 --directory force-app/main/default/tabs
```
