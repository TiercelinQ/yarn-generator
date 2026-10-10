# api Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_api.html

## `sf api request graphql`

Execute a GraphQL statement.

### Description

Specify the GraphQL statement with the "--body" flag, either directly at the command line or with a file that contains the statement. You can query Salesforce records using a "query" statement or use mutations to modify Salesforce records.

This command uses the GraphQL API to query or modify Salesforce objects. For details about the API, and examples of queries and mutations, see https://developer.salesforce.com/docs/platform/graphql/guide/graphql-about.html.

### Usage

```bash
sf api request graphql [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--stream-to-file Example: report.xlsx] [--include] --body file
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

#### `-S | --stream-to-file=Example: report.xlsx`

Stream responses to a file.

- Type: option
- Required: no
- Exclusive with: `--include`

#### `-i | --include`

Include the HTTP response status and headers in the output.

- Type: boolean
- Required: no
- Exclusive with: `--stream-to-file`

#### `--body=file`

File or content with the GraphQL statement. Specify "-" to read from standard input.

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

Execute a GraphQL query on the Account object by specifying the query directly to the "--body" flag; the command uses your default org:

```bash
sf api request graphql --body "query accounts { uiapi { query { Account { edges { node { Id \n Name { value } } } } } } }"
```

Read the GraphQL statement from a file called "example.txt" and execute it on an org with alias "my-org":

```bash
sf api request graphql --body example.txt --target-org my-org
```

```bash
Pipe the GraphQL statement that you want to execute from standard input to the command:
$ echo graphql | sf api request graphql --body -
```

Write the output of the command to a file called "output.txt" and include the HTTP response status and headers:

```bash
sf api request graphql --body example.txt --stream-to-file output.txt --include
```

---

## `sf api request rest`

Make an authenticated HTTP request using the Salesforce REST API.

### Description

When sending the HTTP request with the "--body" flag, you can specify the request directly at the command line or with a file that contains the request.

For a full list of supported REST endpoints and resources, see https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_list.htm.

### Usage

```bash
sf api request rest [url] [--json] [--flags-dir <value>] --target-org <value> [--include] [--method <value>] [--header key:value] [--file file] [--stream-to-file Example: report.xlsx] [--body file]
```

### Arguments

- `url`: Salesforce API endpoint

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-i | --include`

Include the HTTP response status and headers in the output.

- Type: boolean
- Required: no
- Exclusive with: `--stream-to-file`

#### `-X | --method=<value>`

HTTP method for the request.

- Type: option
- Required: no
- Permitted values: `GET`, `POST`, `PUT`, `PATCH`, `HEAD`, `DELETE`, `OPTIONS`, `TRACE`

#### `-H | --header=key:value`

HTTP header in "key:value" format.

- Type: option
- Required: no
- Multiple values: yes

#### `-f | --file=file`

JSON file that contains values for the request header, body, method, and URL.

Use this flag instead of specifying the request details with individual flags, such as --body or --method. This schema defines how to create the JSON file:

{
url: { raw: string } | string;
method: 'GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE';
description?: string;
header: string | Array<Record\<string, string\>>;
body: { mode: 'raw' | 'formdata'; raw: string; formdata: FormData };
}

Salesforce CLI defined this schema to be mimic Postman schemas; both share similar properties. The CLI's schema also supports Postman Collections to reuse and share requests. As a result, you can build an API call using Postman, export and save it to a file, and then use the file as a value to this flag. For information about Postman, see https://learning.postman.com/.

Here's a simple example of a JSON file that contains values for the request URL, method, and body:

{
"url": "sobjects/Account/\<Account ID\>",
"method": "PATCH",
"body" : {
"mode": "raw",
"raw": {
"BillingCity": "Boise"
}
}
}

See more examples in the plugin-api test directory, including JSON files that use "formdata" to define collections: https://github.com/salesforcecli/plugin-api/tree/main/test/test-files/data-project.

- Type: option
- Required: no
- Exclusive with: `--body`

#### `-S | --stream-to-file=Example: report.xlsx`

Stream responses to a file.

- Type: option
- Required: no
- Exclusive with: `--include`

#### `-b | --body=file`

File or content for the body of the HTTP request. Specify "-" to read from standard input or "" for an empty body. If passing a file, prefix the filename with '@'.

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

List information about limits in the org with alias "my-org":

```bash
sf api request rest 'services/data/v56.0/limits' --target-org my-org
```

List all endpoints in your default org; write the output to a file called "output.txt" and include the HTTP response status and headers:

```bash
sf api request rest '/services/data/v56.0/' --stream-to-file output.txt --include
```

Get the response in XML format by specifying the "Accept" HTTP header:

```bash
sf api request rest '/services/data/v56.0/limits' --header 'Accept: application/xml'
```

Create an account record using the POST method; specify the request details directly in the "--body" flag:

```bash
sf api request rest /services/data/v56.0/sobjects/account --body "{\"Name\" : \"Account from REST API\",\"ShippingCity\" : \"Boise\"}" --method POST
```

Create an account record using the information in a file called "info.json" (note the @ prefixing the file name):

```bash
sf api request rest '/services/data/v56.0/sobjects/account' --body @info.json --method POST
```

Update an account record using the PATCH method:

```bash
sf api request rest '/services/data/v56.0/sobjects/account/<Account ID>' --body "{\"BillingCity\": \"San Francisco\"}" --method PATCH
```

Store the values for the request header, body, and so on, in a file, which you then specify with the --file flag; see the description of --file for more information:

```bash
sf api request rest --file myFile.json
```
