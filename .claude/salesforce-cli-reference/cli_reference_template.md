# template Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_template.html

## `sf template generate analytics template`

Generate a simple Analytics template.

### Description

The metadata files associated with the Analytics template must be contained in a parent directory called "waveTemplates" in your package directory. Either run this command from an existing directory of this name, or use the --output-dir flag to generate one or point to an existing one.

### Aliases

- `sf force analytics template create`
- `sf analytics generate template`

### Usage

```bash
sf template generate analytics template [--json] [--flags-dir <value>] [--output-dir <value>] [--api-version <value>] --name <value>
```

### Flags

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

#### `-n | --name=<value>`

Name of the Analytics template.

- Type: option
- Required: yes
- Aliases: `--templatename`

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

Generate the metadata files for a simple Analytics template file called myTemplate in the force-app/main/default/waveTemplates directory:

```bash
sf template generate analytics template --name myTemplate --output-dir force-app/main/default/waveTemplates
```

---

## `sf template generate apex class`

Generate an Apex class.

### Description

Generates the Apex *.cls file and associated metadata file. These files must be contained in a parent directory called "classes" in your package directory. Either run this command from an existing directory of this name, or use the --output-dir flag to generate one or point to an existing one.

### Aliases

- `sf force apex class create`
- `sf apex generate class`

### Usage

```bash
sf template generate apex class [--json] [--flags-dir <value>] --name <value> [--template <value>] [--output-dir <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated Apex class.

The name can be up to 40 characters and must start with a letter.

- Type: option
- Required: yes
- Aliases: `--classname`

#### `-t | --template=<value>`

Template to use for file creation.

Supplied parameter values or default values are filled into a copy of the template.

- Type: option
- Required: no
- Permitted values: `ApexException`, `ApexUnitTest`, `BasicUnitTest`, `Batchable`, `DefaultApexClass`, `InboundEmailService`, `Queueable`
- Default: `DefaultApexClass`

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

Generate two metadata files associated with the MyClass Apex class (MyClass.cls and MyClass.cls-meta.xml) in the current directory:

```bash
sf template generate apex class --name MyClass
```

Similar to previous example, but generates the files in the "force-app/main/default/classes" directory:

```bash
sf template generate apex class --name MyClass --output-dir force-app/main/default/classes
```

---

## `sf template generate apex trigger`

Generate an Apex trigger.

### Description

Generates the Apex trigger *.trigger file and associated metadata file. These files must be contained in a parent directory called "triggers" in your package directory. Either run this command from an existing directory of this name, or use the --output-dir flag to generate one or point to an existing one.

If you don't specify the --sobject flag, the .trigger file contains the generic placeholder SOBJECT; replace it with the Salesforce object you want to generate a trigger for. If you don't specify --event, "before insert" is used.

### Aliases

- `sf force apex trigger create`
- `sf apex generate trigger`

### Usage

```bash
sf template generate apex trigger [--json] [--flags-dir <value>] --name <value> [--template <value>] [--output-dir <value>] [--api-version <value>] [--sobject <value>] [--event <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated Apex trigger

The name can be up to 40 characters and must start with a letter.

- Type: option
- Required: yes
- Aliases: `--triggername`

#### `-t | --template=<value>`

Template to use for file creation.

Supplied parameter values or default values are filled into a copy of the template.

- Type: option
- Required: no
- Permitted values: `ApexTrigger`
- Default: `ApexTrigger`

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

#### `-s | --sobject=<value>`

Salesforce object to generate a trigger on.

- Type: option
- Required: no
- Default: `SOBJECT`

#### `-e | --event=<value>`

Events that fire the trigger.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Permitted values: `before insert`, `before update`, `before delete`, `after insert`, `after update`, `after delete`, `after undelete`
- Default: `["before insert"]`
- Aliases: `--triggerevents`

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

Generate two files associated with the MyTrigger Apex trigger (MyTrigger.trigger and MyTrigger.trigger-meta.xml) in the current directory:

```bash
sf template generate apex trigger --name MyTrigger
```

Similar to the previous example, but generate the files in the "force-app/main/default/triggers" directory:

```bash
sf template generate apex trigger --name MyTrigger --output-dir force-app/main/default/triggers
```

Generate files for a trigger that fires on the Account object before and after an insert:

```bash
sf template generate apex trigger --name MyTrigger --sobject Account --event "before insert,after insert"
```

---

## `sf template generate digital-experience site`

Status: preview

Generate an Experience Cloud site.

### Description

Creates the metadata of an Experience Cloud site with the specified template, name, and URL path prefix. The output includes all the necessary metadata files, including DigitalExperienceConfig, DigitalExperienceBundle, Network, and CustomSite.
Unlike `sf community create`, which builds the site directly in the org, this command generates only the local metadata.

### Usage

```bash
sf template generate digital-experience site [--json] [--flags-dir <value>] [--target-org <value>] --name <value> --template-name <value> [--url-path-prefix <value>] [--admin-email <value>] [--output-dir <value>]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-n | --name=<value>`

Name of the Experience Cloud site to generate.

- Type: option
- Required: yes

#### `-t | --template-name=<value>`

Template to use when generating the site.

- Type: option
- Required: yes
- Permitted values: `Build Your Own (LWR)`

#### `-p | --url-path-prefix=<value>`

URL path prefix for the site; must contain only alphanumeric characters.

- Type: option
- Required: no
- Default: ``

#### `-e | --admin-email=<value>`

Email address for the site administrator. Defaults to the username of the currently authenticated user.

- Type: option
- Required: no

#### `-d | --output-dir=<value>`

Directory to generate the site files in.

The location can be an absolute path or relative to the current working directory. If not specified, the command reads your sfdx-project.json file and uses the default package directory. When running outside a Salesforce DX project, defaults to the current directory.

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

Generate an Experience Cloud site using the Build Your Own (LWR) template. The site is called "mysite" and has the URL path prefix "mysite":

```bash
sf template generate digital-experience site --template-name "Build Your Own (LWR)" --name mysite --url-path-prefix mysite
```

Generate an Experience Cloud site like the last example, but generate the files into the specified output directory:

```bash
sf template generate digital-experience site --template-name "Build Your Own (LWR)" --name mysite --url-path-prefix mysite --output-dir force-app/main/default
```

---

## `sf template generate flexipage`

Status: beta

Generate a FlexiPage, also known as a Lightning page.

### Description

FlexiPages are the metadata types associated with a Lightning page. A Lightning page represents a customizable screen made up of regions containing Lightning components.

You can use this command to generate these types of FlexiPages; specify the type with the --template flag:

- AppPage: A Lightning page used as the home page for a custom app or a standalone application page.
- HomePage: A Lightning page used to override the Home page in Lightning Experience.
- RecordPage: A Lightning page used to override an object record page in Lightning Experience. Requires that you specify the object name with the --sobject flag.

### Usage

```bash
sf template generate flexipage [--json] [--flags-dir <value>] --name <value> --template <value> [--output-dir <value>] [--api-version <value>] [--label <value>] [--description <value>] [--sobject <value>] [--primary-field <value>] [--secondary-fields <value>] [--detail-fields <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the FlexiPage.

The name can contain only alphanumeric characters, must start with a letter, and can't end with an underscore or contain two consecutive underscores.

- Type: option
- Required: yes
- Aliases: `--flexipagename`

#### `-t | --template=<value>`

Template type for the FlexiPage.

- Type: option
- Required: yes
- Permitted values: `RecordPage`, `AppPage`, `HomePage`

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

#### `--label=<value>`

Label of this FlexiPage; if not specified, uses the FlexiPage name as the label.

- Type: option
- Required: no
- Aliases: `--masterlabel`

#### `--description=<value>`

Description for the FlexiPage, which provides context about its purpose.

- Type: option
- Required: no

#### `-s | --sobject=<value>`

API name of the Salesforce object; required when creating a RecordPage.

For RecordPage FlexiPages, you must specify the associated object API name, such as 'Account', 'Opportunity', or 'Custom_Object__c'. This sets the `sobjectType` field in the FlexiPage metadata.

- Type: option
- Required: no
- Aliases: `--entity-name`, `--entity`

#### `--primary-field=<value>`

Primary field for the dynamic highlights header; typically 'Name'. Used only with RecordPage.

- Type: option
- Required: no

#### `--secondary-fields=<value>`

Secondary fields shown in the dynamic highlights header. Specify multiple fields separated by commas. Maximum of 11 fields. Used only with RecordPage.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)

#### `--detail-fields=<value>`

Fields to display in the Details tab. Specify multiple fields separated by commas. Fields are split into two columns. Used only with RecordPage.

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

Generate a RecordPage FlexiPage for the Account object in the current directory:

```bash
sf template generate flexipage --name Account_Record_Page --template RecordPage --sobject Account
```

Generate an AppPage FlexiPage in the "force-app/main/default/flexipages" directory:

```bash
sf template generate flexipage --name Sales_Dashboard --template AppPage --output-dir force-app/main/default/flexipages
```

Generate a HomePage FlexiPage with a custom label:

```bash
sf template generate flexipage --name Custom_Home --template HomePage --label "Sales Home Page"
```

Generate a RecordPage with dynamic highlights and detail fields:

```bash
sf template generate flexipage --name Property_Page --template RecordPage --sobject Rental_Property__c --primary-field Name --secondary-fields Property_Address__c,City__c --detail-fields Name,Property_Address__c,City__c,Monthly_Rent__c,Bedrooms__c
```

---

## `sf template generate lightning app`

Generate a Lightning App.

### Description

Generates a Lightning App bundle in the specified directory or the current working directory. The bundle consists of multiple files in a folder with the designated name.

### Aliases

- `sf force lightning app create`
- `sf lightning generate app`

### Usage

```bash
sf template generate lightning app [--json] [--flags-dir <value>] --name <value> [--template <value>] [--output-dir <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated Lightning App.

The name can be up to 40 characters and must start with a letter.

- Type: option
- Required: yes
- Aliases: `--appname`

#### `-t | --template=<value>`

Template to use for file creation.

Supplied parameter values or default values are filled into a copy of the template. For Lightning Web Components, if this flag isn't specified, the CLI command automatically selects the template based on the "defaultLwcLanguage" field in the DX project's "sfdx-project.json" file.

- Type: option
- Required: no
- Permitted values: `DefaultLightningApp`
- Default: `DefaultLightningApp`

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

Generate the metadata files for a Lightning app bundle called "myapp" in the current directory:

```bash
sf template generate lightning app --name myapp
```

Similar to the previous example, but generate the files in the "force-app/main/default/aura" directory:

```bash
sf template generate lightning app --name myapp --output-dir force-app/main/default/aura
```

---

## `sf template generate lightning component`

Generate a bundle for an Aura component or a Lightning web component.

### Description

Generates the bundle in the specified directory or the current working directory. The bundle consists of multiple files in a directory with the designated name. Lightning web components are contained in the directory with name "lwc", Aura components in "aura".

To generate a Lightning web component, pass "--type lwc" to the command. If you don’t specify --type, Salesforce CLI generates an Aura component by default.

### Aliases

- `sf force lightning component create`
- `sf lightning generate component`

### Usage

```bash
sf template generate lightning component [--json] [--flags-dir <value>] --name <value> [--template <value>] [--output-dir <value>] [--api-version <value>] [--type <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated Lightning Component.

The name can be up to 40 characters and must start with a letter.

- Type: option
- Required: yes
- Aliases: `--componentname`

#### `-t | --template=<value>`

Template to use for file creation.

Supplied parameter values or default values are filled into a copy of the template. For Lightning Web Components, if this flag isn't specified, the CLI command automatically selects the template based on the "defaultLwcLanguage" field in the DX project's "sfdx-project.json" file.

- Type: option
- Required: no
- Permitted values: `default`, `analyticsDashboard`, `analyticsDashboardWithStep`, `typescript`
- Default: `default`

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

#### `--type=<value>`

Type of the component bundle.

- Type: option
- Required: no
- Permitted values: `aura`, `lwc`
- Default: `aura`

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

Generate the metadata files for an Aura component bundle in the current directory:

```bash
sf template generate lightning component --name mycomponent
```

Generate a Lightning web component bundle in the current directory:

```bash
sf template generate lightning component --name mycomponent --type lwc
```

Generate an Aura component bundle in the "force-app/main/default/aura" directory:

```bash
sf template generate lightning component --name mycomponent --output-dir force-app/main/default/aura
```

Generate a Lightning web component bundle in the "force-app/main/default/lwc" directory:

```bash
sf template generate lightning component --name mycomponent --type lwc --output-dir force-app/main/default/lwc
```

Generate a TypeScript Lightning Web Component:

```bash
sf template generate lightning component --name mycomponent --type lwc --template typescript
```

---

## `sf template generate lightning event`

Generate a Lightning Event.

### Description

Generates a Lightning Event bundle in the specified directory or the current working directory. The bundle consists of multiple files in a folder with the designated name.

### Aliases

- `sf force lightning event create`
- `sf lightning generate event`

### Usage

```bash
sf template generate lightning event [--json] [--flags-dir <value>] --name <value> [--template <value>] [--output-dir <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated Lightning Event.

The name can be up to 40 characters and must start with a letter.

- Type: option
- Required: yes
- Aliases: `--eventname`

#### `-t | --template=<value>`

Template to use for file creation.

Supplied parameter values or default values are filled into a copy of the template. For Lightning Web Components, if this flag isn't specified, the CLI command automatically selects the template based on the "defaultLwcLanguage" field in the DX project's "sfdx-project.json" file.

- Type: option
- Required: no
- Permitted values: `DefaultLightningEvt`
- Default: `DefaultLightningEvt`

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

Generate the metadata files for a Lightning event bundle called "myevent" in the current directory:

```bash
sf template generate lightning event --name myevent
```

Similar to previous example, but generate the files in the "force-app/main/default/aura" directory:

```bash
sf template generate lightning event --name myevent --output-dir force-app/main/default/aura
```

---

## `sf template generate lightning interface`

Generate a Lightning Interface.

### Description

Generates a Lightning Interface bundle in the specified directory or the current working directory. The bundle consists of multiple files in a folder with the designated name.

### Aliases

- `sf force lightning interface create`
- `sf lightning generate interface`

### Usage

```bash
sf template generate lightning interface [--json] [--flags-dir <value>] --name <value> [--template <value>] [--output-dir <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated Lightning Interface.

The name can be up to 40 characters and must start with a letter.

- Type: option
- Required: yes
- Aliases: `--interfacename`

#### `-t | --template=<value>`

Template to use for file creation.

Supplied parameter values or default values are filled into a copy of the template. For Lightning Web Components, if this flag isn't specified, the CLI command automatically selects the template based on the "defaultLwcLanguage" field in the DX project's "sfdx-project.json" file.

- Type: option
- Required: no
- Permitted values: `DefaultLightningIntf`
- Default: `DefaultLightningIntf`

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

Generate the metadata files for a Lightning interface bundle called "myinterface" in the current directory:

```bash
sf template generate lightning interface --name myinterface
```

Similar to the previous example but generate the files in the "force-app/main/default/aura" directory:

```bash
sf template generate lightning interface --name myinterface --output-dir force-app/main/default/aura
```

---

## `sf template generate lightning test`

Generate a Lightning test.

### Description

Generates the test in the specified directory or the current working directory. The .resource file and associated metadata file are generated.

### Aliases

- `sf force lightning test create`
- `sf lightning generate test`

### Usage

```bash
sf template generate lightning test [--json] [--flags-dir <value>] --name <value> [--template <value>] [--output-dir <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated Lightning Test.

Name of the new Lightning test; can be up to 40 characters and must start with a letter.

- Type: option
- Required: yes
- Aliases: `--testname`

#### `-t | --template=<value>`

Template to use for file creation.

Supplied parameter values or default values are filled into a copy of the template. For Lightning Web Components, if this flag isn't specified, the CLI command automatically selects the template based on the "defaultLwcLanguage" field in the DX project's "sfdx-project.json" file.

- Type: option
- Required: no
- Permitted values: `DefaultLightningTest`
- Default: `DefaultLightningTest`

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

Generate the metadata files for the Lightning test called MyLightningTest in the current directory:

```bash
sf template generate lightning test --name MyLightningTest
```

Similar to the previous example but generate the files in the "force-app/main/default/lightningTests" directory:

```bash
sf template generate lightning test --name MyLightningTest --output-dir force-app/main/default/lightningTests
```

---

## `sf template generate project`

Generate a Salesforce DX project.

### Description

A Salesforce DX project has a specific structure and a configuration file (sfdx-project.json) that identifies the directory as a Salesforce DX project. This command generates the necessary configuration files and directories to get you started.

By default, the generated sfdx-project.json file sets the sourceApiVersion property to the default API version currently used by Salesforce CLI. To specify a different version, set the apiVersion configuration variable. For example: "sf config set apiVersion=57.0 --global".

### Aliases

- `sf force project create`
- `sf project generate`

### Usage

```bash
sf template generate project [--json] [--flags-dir <value>] --name <value> [--template <value>] [--output-dir <value>] [--namespace <value>] [--default-package-dir <value>] [--manifest] [--lwc-language <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated project.

Generates a project directory with this name; any valid directory name is accepted. Also sets the "name" property in the sfdx-project.json file to this name.

- Type: option
- Required: yes
- Aliases: `--projectname`

#### `-t | --template=<value>`

Template to use for project creation.

The template determines the sample configuration files and directories that this command generates. For example, the empty template provides these files and directory to get you started.

- .forceignore
- config/project-scratch-def.json
- sfdx-project.json
- package.json
- force-app (basic source directory structure)

The standard template provides a complete force-app directory structure so you know where to put your source. It also provides additional files and scripts, especially useful when using Salesforce Extensions for VS Code. For example:

- .gitignore: Use Git for version control.
- .prettierrc and .prettierignore: Use Prettier to format your Aura components.
- .vscode/extensions.json: When launched, Visual Studio Code, prompts you to install the recommended extensions for your project.
- .vscode/launch.json: Configures Replay Debugger.
- .vscode/settings.json: Additional configuration settings.

The analytics template provides similar files and the force-app/main/default/waveTemplates directory.

The reactinternalapp and reactexternalapp templates provide React-based project scaffolding for internal and external UI bundle use cases.

The angularinternalapp and angularexternalapp templates provide Angular-based project scaffolding for internal and external UI bundle use cases.

The agent template provides project scaffolding for building Agentforce agents and includes a sample agent called Local Info Agent.

- Type: option
- Required: no
- Permitted values: `standard`, `empty`, `analytics`, `reactinternalapp`, `reactexternalapp`, `angularinternalapp`, `angularexternalapp`, `agent`
- Default: `standard`

#### `-d | --output-dir=<value>`

Directory for saving the created files.

The location can be an absolute path or relative to the current working directory. The default is the current directory.

- Type: option
- Required: no
- Default: `.`
- Aliases: `--outputdir`

#### `-s | --namespace=<value>`

Namespace associated with this project and any connected scratch orgs.

- Type: option
- Required: no
- Default: ``

#### `-p | --default-package-dir=<value>`

Default package directory name.

Metadata items such as classes and Lightning bundles are placed inside this folder.

- Type: option
- Required: no
- Default: `force-app`
- Aliases: `--defaultpackagedir`

#### `-x | --manifest`

Generate a manifest (package.xml) for change-set based development.

Generates a default manifest (package.xml) for fetching Apex, Visualforce, Lightning components, and static resources.

- Type: boolean
- Required: no

#### `--lwc-language=<value>`

Language of the Lightning Web Components. If not specified, "javascript" is used.

When set to `'typescript'`, generates TypeScript configuration files (tsconfig.json, package.json with TypeScript dependencies, and TypeScript-aware ESLint config). When you deploy the TypeScript-based Lightning Web Components, the TypeScript files are first compiled locally for validation and then the `.ts` files are deployed to your org for server-side type stripping.

- Type: option
- Required: no
- Permitted values: `javascript`, `typescript`

#### `--api-version=<value>`

Will set this version as sourceApiVersion in the sfdx-project.json file

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

Generate a project called "mywork":

```bash
sf template generate project --name mywork
```

Similar to previous example, but generate the files in a directory called "myapp":

```bash
sf template generate project --name mywork --default-package-dir myapp
```

Similar to prevoius example, but also generate a default package.xml manifest file:

```bash
sf template generate project --name mywork --default-package-dir myapp --manifest
```

Generate a project with the minimum files and directories:

```bash
sf template generate project --name mywork --template empty
```

Generate a project in which the Lightning Web Components use TypeScript rather than the default JavaScript:

```bash
sf template generate project --name mywork --lwc-language typescript
```

---

## `sf template generate static-resource`

Generate a static resource.

### Description

Generates the metadata resource file in the specified directory or the current working directory. Static resource files must be contained in a parent directory called "staticresources" in your package directory. Either run this command from an existing directory of this name, or use the --output-dir flag to create one or point to an existing one.

### Aliases

- `sf force staticresource create`
- `sf static-resource generate`

### Usage

```bash
sf template generate static-resource [--json] [--flags-dir <value>] --name <value> [--type <value>] [--output-dir <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the generated static resource.

This name can contain only underscores and alphanumeric characters, and must be unique in your org. It must begin with a letter, not include spaces, not end with an underscore, and not contain two consecutive underscores.

- Type: option
- Required: yes
- Aliases: `--resourcename`

#### `--type=<value>`

Content type (mime type) of the generated static resource.

Must be a valid MIME type such as application/json, application/javascript, application/zip, text/plain, text/css, etc.

- Type: option
- Required: no
- Default: `application/zip`
- Aliases: `--contenttype`

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

Generate the metadata file for a static resource called MyResource in the current directory:

```bash
sf template generate static-resource --name MyResource
```

Similar to previous example, but specifies a MIME type of application/json:

```bash
sf template generate static-resource --name MyResource --type application/json
```

Generate the resource file in the "force-app/main/default/staticresources" directory:

```bash
sf template generate static-resource --name MyResource --output-dir force-app/main/default/staticresources
```

---

## `sf template generate ui-bundle`

Generate a UI bundle, which contains the code and metadata to build a UI experience that uses non-native Salesforce frameworks, such as React or Angular.

### Description

Salesforce provides native UI frameworks, such as Lighting Web Components (LWC), to build applications that run on the Salesforce Platform. But you can also use non-native JavaScript- or TypeScript-based UI frameworks, such as React, to build a UI experience for the Salesforce Platform and that you can launch from the App Launcher.

These non-native UI experiences are defined by the "UIBundle" metadata type in your DX project. Use this command to generate the required DX project structure and files. For example, when you run this command and specify the name MyUiBundle, then the files are generated into a "uiBundles/MyUiBundle" directory. Use the --output-dir flag to specify a different directory.

Use the --template flag for generating the files to get started with a specific UI framework, such as React or Angular. Check out the README.md file in the generated "uiBundles/\<bundlename\>" directory for more information about the template.

### Usage

```bash
sf template generate ui-bundle [--json] [--flags-dir <value>] --name <value> [--template <value>] [--label <value>] [--output-dir <value>] [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

API name of the generated UI bundle.

This name can contain only underscores and alphanumeric characters, and must be unique in your org. It must begin with a letter, not include spaces, not end with an underscore, and not contain two consecutive underscores.

- Type: option
- Required: yes

#### `-t | --template=<value>`

Template to use when creating the files for a specific UI framework.

Supplied parameter values or default values are filled into a copy of the template.

- Type: option
- Required: no
- Permitted values: `default`, `reactbasic`, `angularbasic`
- Default: `default`

#### `-l | --label=<value>`

Master label for the UI bundle.

If not specified, the label is derived from the name.

- Type: option
- Required: no

#### `-d | --output-dir=<value>`

Directory into which the files are created.

The location can be an absolute path or relative to the current working directory.

If not specified, the command reads your sfdx-project.json and defaults to "uiBundles" directory within your default package directory. When running outside a Salesforce DX project, defaults to the current directory.

**Important:** This command automatically ensures the output directory ends with "uiBundles". If your specified path doesn't end with "uiBundles", it's automatically appended. The UI bundle is created at "\<output-dir\>/\<name\>".

**Examples:**

- "--output-dir force-app/main/default" → Creates a UI bundle at "force-app/main/default/uiBundles/MyUiBundle/"
- "--output-dir force-app/main/default/uiBundles" → Creates a UI bundle at "force-app/main/default/uiBundles/MyUiBundle/" (no change)

- Type: option
- Required: no

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

Generate a UI bundle called MyUiBundle in the current directory:

```bash
sf template generate ui-bundle --name MyUiBundle
```

Generate a React-based UI bundle:

```bash
sf template generate ui-bundle --name MyReactApp --template reactbasic
```

Generate an Angular-based UI bundle:

```bash
sf template generate ui-bundle --name MyAngularApp --template angularbasic
```

Generate the React-based UI bundle in the "force-app/main/default/uiBundles" directory:

```bash
sf template generate ui-bundle --name MyUiBundle --template reactbasic --output-dir force-app/main/default/uiBundles
```

---

## `sf template generate visualforce component`

Generate a Visualforce Component.

### Description

The command generates the .Component file and associated metadata file in the specified directory or the current working directory by default.

### Aliases

- `sf force visualforce component create`
- `sf visualforce generate component`

### Usage

```bash
sf template generate visualforce component [--json] [--flags-dir <value>] --name <value> [--template <value>] [--output-dir <value>] [--api-version <value>] --label <value>
```

### Flags

#### `-n | --name=<value>`

Name of the generated Visualforce Component.

The name can be up to 40 characters and must start with a letter.

- Type: option
- Required: yes
- Aliases: `--componentname`

#### `-t | --template=<value>`

Template to use for file creation.

Supplied parameter values or default values are filled into a copy of the template.

- Type: option
- Required: no
- Permitted values: `DefaultVFComponent`
- Default: `DefaultVFComponent`

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

#### `-l | --label=<value>`

Visualforce Component label.

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

Generate the metadata files for a Visualforce component in the current directory:

```bash
sf template generate visualforce component --name mycomponent --label mylabel
```

Similar to previous example, but generate the files in the directory "force-app/main/default/components":

```bash
sf template generate visualforce component --name mycomponent --label mylabel --output-dir components
```

---

## `sf template generate visualforce page`

Generate a Visualforce Page.

### Description

The command generates the .Page file and associated metadata file in the specified directory or the current working directory by default.

### Aliases

- `sf force visualforce page create`
- `sf visualforce generate page`

### Usage

```bash
sf template generate visualforce page [--json] [--flags-dir <value>] --name <value> [--output-dir <value>] [--api-version <value>] --label <value>
```

### Flags

#### `-n | --name=<value>`

Name of the generated Visualforce Page.

The name can be up to 40 characters and must start with a letter.

- Type: option
- Required: yes
- Aliases: `--pagename`

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

#### `-l | --label=<value>`

Visualforce Page label.

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

Generate the metadata files for a Visualforce page in the current directory:

```bash
sf template generate visualforce page --name mypage --label mylabel
```

Similar to previous example, but generate the files in the directory "force-app/main/default/pages":

```bash
sf template generate visualforce page --name mypage --label mylabel --output-dir pages
```
