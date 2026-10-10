# cmdt Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_cmdt.html

## `sf cmdt generate field`

Generate a field for a custom metadata type based on the provided field type.

### Description

Similar to a custom object, a custom metadata type has a list of custom fields that represent aspects of the metadata.

This command creates a metadata file that describes the new custom metadata type field. By default, the file is created in a "fields" directory in the current directory. Use the --output-directory to generate the file in the directory that contains the custom metadata type metdata files, such as "force-app/main/default/objects/MyCmdt__mdt" for the custom metadata type called MyCmdt.

### Aliases

- `sf force cmdt field create`
- `sf cmdt field create`

### Usage

```bash
sf cmdt generate field [--json] [--flags-dir <value>] --name <value> --type <value> [--picklist-values <value>] [--decimal-places <value>] [--label <value>] [--output-directory <value>]
```

### Flags

#### `-n | --name=<value>`

Unique name for the field.

- Type: option
- Required: yes
- Aliases: `--fieldname`

#### `-f | --type=<value>`

Type of the field.

You can't use this command to create a custom metadata type field of type "Metadata Relationship". Use the Salesforce Setup UI instead.

- Type: option
- Required: yes
- Permitted values: `Checkbox`, `Date`, `DateTime`, `Email`, `Number`, `Percent`, `Phone`, `Picklist`, `Text`, `TextArea`, `LongTextArea`, `Url`
- Aliases: `--fieldtype`

#### `-p | --picklist-values=<value>`

Picklist values; required for picklist fields.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Aliases: `--picklistvalues`

#### `-s | --decimal-places=<value>`

Number of decimal places to use for number or percent fields.

The value must be greater than or equal to zero. Default value is 0.

- Type: option
- Required: no
- Default: `0`
- Aliases: `--decimalplaces`

#### `-l | --label=<value>`

Label for the field.

- Type: option
- Required: no

#### `-d | --output-directory=<value>`

Directory to store newly-created field definition files.

New files are automatically created in the "fields" directory. The location can be an absolute path or relative to the current working directory. The default is the current directory.

- Type: option
- Required: no
- Default: ``
- Aliases: `--outputdir`, `--outputdirectory`

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

Generate a metadata file for a custom checkbox field and add the file to the MyCmdt__mdt/fields directory:

```bash
sf cmdt generate field --name MyCheckboxField --type Checkbox --output-directory force-app/main/default/objects/MyCmdt__mdt
```

Generate a metadata file for a custom picklist field and add a few values:

```bash
sf cmdt generate field --name MyPicklistField --type Picklist --picklist-values A --picklist-values B --picklist-values C --output-directory force-app/main/default/objects/MyCmdt__mdt
```

Generate a metadata file for a custom number field and specify 2 decimal places:

```bash
sf cmdt generate field --name MyNumberField --type Number --decimal-places 2 --output-directory force-app/main/default/objects/MyCmdt__mdt
```

---

## `sf cmdt generate fromorg`

Generate a custom metadata type and all its records from a Salesforce object.

### Description

Use this command to migrate existing custom objects or custom settings in an org to custom metadata types. If a field of the Salesforce object is of an unsupported type, the field type is automatically converted to text. Run "sf cmdt generate field --help" to see the list of supported cmdt field types, listed in the --type flag summary. Use the --ignore-unsupported to ignore these fields.

This command creates the metadata files that describe the new custom metadata type and its fields in the "force-app/main/default/objects/TypeName__mdt" directory by default, where "TypeName" is the value of the required --dev-name flag. Use --type-output-directory to create them in a different directory.

### Aliases

- `sf force cmdt generate`

### Usage

```bash
sf cmdt generate fromorg [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --dev-name <value> [--label <value>] [--plural-label <value>] [--visibility <value>] --sobject <value> [--ignore-unsupported] [--type-output-directory <value>] [--records-output-dir <value>]
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

#### `-n | --dev-name=<value>`

Name of the custom metadata type.

- Type: option
- Required: yes
- Aliases: `--devname`

#### `-l | --label=<value>`

Label for the custom metadata type.

- Type: option
- Required: no

#### `-p | --plural-label=<value>`

Plural version of the label value; if blank, uses label.

- Type: option
- Required: no
- Aliases: `--plurallabel`

#### `-v | --visibility=<value>`

Who can see the custom metadata type.

For more information on what each option means, see this topic in Salesforce Help: https://help.salesforce.com/s/articleView?id=sf.custommetadatatypes_ui_create.htm&type=5.

- Type: option
- Required: no
- Permitted values: `PackageProtected`, `Protected`, `Public`
- Default: `Public`

#### `-s | --sobject=<value>`

API name of the source Salesforce object used to generate the custom metadata type.

- Type: option
- Required: yes
- Aliases: `--sobjectname`

#### `-i | --ignore-unsupported`

Ignore unsupported field types.

In this context, "ignore" means that the fields aren't created. The default behavior is to create fields of type text and convert the field values to text.

- Type: boolean
- Required: no
- Aliases: `--ignoreunsupported`

#### `-d | --type-output-directory=<value>`

Directory to store newly-created custom metadata type files.

- Type: option
- Required: no
- Default: `force-app/main/default/objects`
- Aliases: `--typeoutputdir`

#### `-r | --records-output-dir=<value>`

Directory to store newly-created custom metadata record files.

- Type: option
- Required: no
- Default: `force-app/main/default/customMetadata`
- Aliases: `--recordsoutputdir`

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

Generate a custom metadata type from a custom object called MySourceObject__c in your default org:

```bash
sf cmdt generate fromorg --dev-name MyCMDT --sobject MySourceObject__c
```

Generate a custom metadata type from a custom object in an org with alias my-scratch-org; ignore unsupported field types instead of converting them to text:

```bash
sf cmdt generate fromorg --dev-name MyCMDT --sobject MySourceObject__c --ignore-unsupported --target-org my-scratch-org
```

Generate a protected custom metadata type from a custom object:

```bash
sf cmdt generate fromorg --dev-name MyCMDT --sobject MySourceObject__c --visibility Protected
```

Generate a protected custom metadata type from a custom setting with a specific singular and plural label:

```bash
sf cmdt generate fromorg --dev-name MyCMDT --label "My CMDT" --plural-label "My CMDTs" --sobject MySourceSetting__c --visibility Protected
```

Generate a custom metadata type and put the resulting metadata files in the specified directory:

```bash
sf cmdt generate fromorg --dev-name MyCMDT --sobject MySourceObject__c --type-output-directory path/to/my/cmdt/directory
```

Generate a custom metadata type and put the resulting record metadata file(s) in the specified directory:

```bash
sf cmdt generate fromorg --dev-name MyCMDT --sobject MySourceObject__c --records-output-dir path/to/my/cmdt/record/directory
```

---

## `sf cmdt generate object`

Generate a new custom metadata type in the current project.

### Description

This command creates a metadata file that describes the new custom metadata type. By default, the file is created in the MyCustomType__mdt directory in the current directory, where MyCustomType is the value of the required --type-name flag. Use the --output-directory to generate the file in a package directory with other custom metadata types, such as "force-app/main/default/objects".

### Aliases

- `sf force cmdt create`
- `sf cmdt create`

### Usage

```bash
sf cmdt generate object [--json] [--flags-dir <value>] --type-name <value> [--label <value>] [--plural-label <value>] [--visibility <value>] [--output-directory <value>]
```

### Flags

#### `-n | --type-name=<value>`

Unique object name for the custom metadata type.

The name can contain only underscores and alphanumeric characters, and must be unique in your org. It must begin with a letter, not include spaces, not end with an underscore, and not contain two consecutive underscores.

- Type: option
- Required: yes
- Aliases: `--typename`

#### `-l | --label=<value>`

Label for the custom metadata type.

- Type: option
- Required: no

#### `-p | --plural-label=<value>`

Plural version of the label value; if blank, uses label.

- Type: option
- Required: no
- Aliases: `--plurallabel`

#### `-v | --visibility=<value>`

Who can see the custom metadata type.

For more information on what each option means, see this topic in Salesforce Help: https://help.salesforce.com/s/articleView?id=sf.custommetadatatypes_ui_create.htm&type=5.

- Type: option
- Required: no
- Permitted values: `PackageProtected`, `Protected`, `Public`
- Default: `Public`

#### `-d | --output-directory=<value>`

Directory to store the newly-created custom metadata type files

The location can be an absolute path or relative to the current working directory. The default is the current directory.

- Type: option
- Required: no
- Default: ``
- Aliases: `--outputdir`, `--outputdirectory`

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

Generate a custom metadata type with developer name 'MyCustomType'; this name is also used as the label:

```bash
sf cmdt generate object --type-name MyCustomType
```

Generate a protected custom metadata type with a specific label:

```bash
sf cmdt generate object --type-name MyCustomType --label "Custom Type" --plural-label "Custom Types" --visibility Protected
```

---

## `sf cmdt generate record`

Generate a new record for a given custom metadata type in the current project.

### Description

The custom metadata type must already exist in your project. You must specify a name for the new record. Use name=value pairs to specify the values for the fields, such as MyTextField="some text here" or MyNumberField=32.

### Aliases

- `sf force cmdt record create`
- `sf cmdt record create`

### Usage

```bash
sf cmdt generate record [--json] [--flags-dir <value>] --type-name <value> --record-name <value> [--label <value>] [--protected <value>] [--input-directory <value>] [--output-directory <value>]
```

### Flags

#### `-t | --type-name=<value>`

API name of the custom metadata type to create a record for; must end in "__mdt".

- Type: option
- Required: yes
- Aliases: `--typename`

#### `-n | --record-name=<value>`

Name of the new record.

- Type: option
- Required: yes
- Aliases: `--recordname`

#### `-l | --label=<value>`

Label for the new record.

- Type: option
- Required: no

#### `-p | --protected=<value>`

Protect the record when it's in a managed package.

Protected records can only be accessed by code in the same managed package namespace.

- Type: option
- Required: no
- Permitted values: `true`, `false`
- Default: `false`

#### `-i | --input-directory=<value>`

Directory from which to get the custom metadata type definition from.

- Type: option
- Required: no
- Default: `force-app/main/default/objects`
- Aliases: `--inputdir`, `--inputdirectory`

#### `-d | --output-directory=<value>`

Directory to store newly-created custom metadata record files.

- Type: option
- Required: no
- Default: `force-app/main/default/customMetadata`
- Aliases: `--outputdir`, `--outputdirectory`

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

Create a record metadata file for custom metadata type 'MyCMT' with specified values for two custom fields:

```bash
sf cmdt generate record --type-name MyCMT__mdt --record-name MyRecord My_Custom_Field_1=Foo My_Custom_Field_2=Bar
```

Create a protected record metadata file for custom metadata type 'MyCMT' with a specific label and values specified for two custom fields:

```bash
sf cmdt generate record --type-name MyCMT__mdt --record-name MyRecord --label "My Record" --protected true My_Custom_Field_1=Foo My_Custom_Field_2=Bar
```

---

## `sf cmdt generate records`

Generate new custom metadata type records from a CSV file.

### Description

The custom metadata type must already exist in your project. By default, the Name column is used to determine the record name; use the --name-column flag to specify a different column.

### Aliases

- `sf force cmdt record insert`
- `sf cmdt record insert`

### Usage

```bash
sf cmdt generate records [--json] [--flags-dir <value>] --csv <value> --type-name <value> [--input-directory <value>] [--output-directory <value>] [--name-column <value>]
```

### Flags

#### `-f | --csv=<value>`

Pathname of the CSV file.

- Type: option
- Required: yes
- Aliases: `--filepath`

#### `-t | --type-name=<value>`

API name of the custom metadata type to create a record for.

The '__mdt' suffix is appended to the end of the name if it's omitted.

- Type: option
- Required: yes
- Aliases: `--typename`

#### `-i | --input-directory=<value>`

Directory from which to get the custom metadata type definition from.

- Type: option
- Required: no
- Default: `force-app/main/default/objects`
- Aliases: `--inputdir`, `--inputdirectory`

#### `-d | --output-directory=<value>`

Directory to store newly-created custom metadata record files.

- Type: option
- Required: no
- Default: `force-app/main/default/customMetadata`
- Aliases: `--outputdir`, `--outputdirectory`

#### `-n | --name-column=<value>`

Column used to determine the name of the record.

- Type: option
- Required: no
- Default: `Name`
- Aliases: `--namecolumn`

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

Generate record metadata files from values in a CSV file for the custom metadata type MyCmdt. Use 'Name' as the column that specifies the record name:

```bash
sf cmdt generate records --csv path/to/my.csv --type-name MyCmdt
```

Generate record metadata files from a CSV file in the directory different from the default, and use 'PrimaryKey' as the column that specifies the record name:

```bash
sf cmdt generate records --csv path/to/my.csv --type-name MyCmdt --input-directory path/to/my/cmdt/directory --name-column "PrimaryKey"
```
