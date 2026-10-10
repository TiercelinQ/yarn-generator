# community Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_community.html

## `sf community create`

Create an Experience Cloud site using a template.

### Description

Run the "community list template" command to see the templates available in your org. See 'Which Experience Cloud Template Should I Use?' in Salesforce Help for more information about the different template types available. (https://help.salesforce.com/s/articleView?id=sf.siteforce_commtemp_intro.htm&type=5)

When you create a site with the Build Your Own (LWR) template, you must also specify the AuthenticationType value using the format templateParams.AuthenticationType=value, where value is AUTHENTICATED or AUTHENTICATED_WITH_PUBLIC_ACCESS_ENABLED. Name and values are case-sensitive. See 'DigitalExperienceBundle' in the Metadata API Developer Guide for more information. (https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_digitalexperiencebundle.htm)

The site creation process is an async job that generates a jobId. To check the site creation status, query the BackgroundOperation object and enter the jobId as the Id. See ‘BackgroundOperation’ in the Object Reference for the Salesforce Platform for more information. (https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_backgroundoperation.htm)

If the job doesn’t complete within 10 minutes, it times out. You receive an error message and must restart the site creation process. Completed jobs expire after 24 hours and are removed from the database.

When you run this command, it creates the site in preview status, which means that the site isn't yet live. After you finish building your site, you can make it live.

If you have an Experience Builder site, publish the site using the "community publish" command to make it live.

If you have a Salesforce Tabs + Visualforce site, to activate the site and make it live, update the status field of the Network type in Metadata API. (https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_network.htm) Alternatively, in Experience Workspaces, go to Administration | Settings, and click Activate.

For Experience Builder sites, activating the site sends a welcome email to site members.

### Aliases

- `sf force community create`

### Usage

```bash
sf community create [--json] [--flags-dir <value>] --name <value> --template-name <value> [--url-path-prefix <value>] [--description <value>] --target-org <value> [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the site to create.

- Type: option
- Required: yes

#### `-t | --template-name=<value>`

Template to use to create a site.

An example of a template is Customer Service. Run the "community template list" command to see which templates are available in your org.

- Type: option
- Required: yes
- Aliases: `--templatename`

#### `-p | --url-path-prefix=<value>`

URL to append to the domain created when Digital Experiences was enabled for this org.

For example, if your domain name is https://MyDomainName.my.site.com and you create a customer site, enter 'customers' to create the unique URL https://MyDomainName.my.site.com/customers.

- Type: option
- Required: no
- Default: ``
- Aliases: `--urlpathprefix`

#### `-d | --description=<value>`

Description of the site.

The description displays in Digital Experiences - All Sites in Setup and helps with site identification.

- Type: option
- Required: no

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

Create an Experience Cloud site using template 'Customer Service' and URL path prefix 'customers':

```bash
sf community create --name 'My Customer Site' --template-name 'Customer Service' --url-path-prefix customers --description 'My customer site'
```

Create a site using 'Partner Central' template:

```bash
sf community create --name partnercentral --template-name 'Partner Central' --url-path-prefix partners
```

Create a site using the 'Build Your Own (LWR)' template with authentication type of UNAUTHENTICATED:

```bash
sf community create --name lwrsite --template-name 'Build Your Own (LWR)' --url-path-prefix lwrsite templateParams.AuthenticationType=UNAUTHENTICATED
```

---

## `sf community list template`

Retrieve the list of templates available in your org.

### Description

See 'Which Experience Cloud Template Should I Use?' (https://help.salesforce.com/s/articleView?id=sf.siteforce_commtemp_intro.htm&type=5) in Salesforce Help for more information about the different template types available for Experience Cloud.

### Aliases

- `sf force community template list`

### Usage

```bash
sf community list template [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

Retrieve the template list from an org with alias my-scratch-org:

```bash
sf community list template --target-org my-scratch-org
```

---

## `sf community publish`

Publish an Experience Builder site to make it live.

### Description

Each time you publish a site, you update the live site with the most recent updates. When you publish an Experience Builder site for the first time, you make the site's URL live and enable login access for site members.

In addition to publishing, you must activate a site to send a welcome email to all site members. Activation is also required to set up SEO for Experience Builder sites. To activate a site, update the status field of the Network type in Metadata API. (https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_network.htm) Alternatively, in Experience Workspaces, go to Administration | Settings, and click Activate.

An email notification informs you when your changes are live on the published site. The site publish process is an async job that generates a jobId. To check the site publish status manually, query the BackgroundOperation object and enter the jobId as the Id. See ‘BackgroundOperation’ in the Object Reference for the Salesforce Platform for more information. (https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_backgroundoperation.htm)

If the job doesn’t complete within 15 minutes, it times out. You receive an error message and must restart the site publish process. Completed jobs expire after 24 hours and are removed from the database.

### Aliases

- `sf force community publish`

### Usage

```bash
sf community publish [--json] [--flags-dir <value>] --name <value> --target-org <value> [--api-version <value>]
```

### Flags

#### `-n | --name=<value>`

Name of the Experience Builder site to publish.

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

Publish the Experience Builder site with name "My Customer Site':

```bash
sf community publish --name 'My Customer Site'
```
