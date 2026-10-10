# ui-bundle Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_ui-bundle.html

## `sf ui-bundle dev`

Preview a UI bundle locally and in real-time, without deploying it to your org.

### Description

A UI bundle refers to an application that runs on Salesforce Platform that uses a non-native UI framework, such as React.  Salesforce provides native UI frameworks, such as Lighting Web Components (LWC), to build applications that run on the Salesforce Platform. But you can also use non-native JavaScript- or TypeScript-based UI frameworks, such as React, to build a UI experience for the Salesforce Platform and that you can launch from the App Launcher.  UI bundles are defined by the UiBundle metadata type in your DX project.

This command starts a local development (dev) server so you can preview a UI bundle using the local metadata files in your DX project. Using a local preview helps you quickly develop UI bundles, because you don't have to continually deploy metadata to your org.

The command also launches a local proxy server that sits between your UI bundle and Salesforce, automatically injecting authentication headers from Salesforce CLI's stored tokens. The proxy allows your UI bundle to make authenticated API calls to Salesforce without exposing credentials.

Even though you're previewing the UI bundle locally and not deploying anything to an org, you're still required to authorize and specify an org to use this command.

### Usage

```bash
sf ui-bundle dev [--json] [--flags-dir <value>] [--name <value>] [--url <value>] [--port <value>] --target-org <value> [--open]
```

### Flags

#### `-n | --name=<value>`

Name of the UI bundle to preview.

The unique name of the UI bundle, as defined by the "name" property in the ui-bundle.json runtime configuration file.  The ui-bundle.json file is located in the "uiBundles" metadata directory of your DX project, such as force-app/main/default/uiBundles/MyBundle/ui-bundle.json.

If you don't specify this flag, the command automatically discovers the ui-bundle.json files in the current directory and subdirectories. If the command finds only one ui-bundle.json, it automatically uses it. If it finds multiple files, the command prompts you to select one.

- Type: option
- Required: no

#### `-u | --url=<value>`

URL where your developer server runs, such as https://localhost:5173. All UI, static, and hot deployment requests are forwarded to this URL.

You must specify this flag if the UI bundle's ui-bundle.json file doesn't contain a value for either the "dev.command" or "dev.url" configuration properties. All non-Salesforce API requests are forwarded to this URL.

If you specify this flag, it overrides the value in the ui-bundle.json file.

This is the order of precedence that the dev server uses for the URL:  --url flag > manifest dev.url > URL from the dev server process (which was started using either manifest dev.command or default npm run dev).

- Type: option
- Required: no

#### `-p | --port=<value>`

Local port where the proxy server listens.

Be sure your browser connects to this port, and not directly to the dev server. The proxy then forwards authenticated requests to Salesforce and other requests to your local dev server.

- Type: option
- Required: no

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `-b | --open`

Automatically open the proxy server URL in your default browser when the dev server is ready.

This flag saves you from manually copying and pasting the URL. The browser opens to the proxy URL, and not the dev server URL directly, which ensures that all requests are property authenticated.

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

Start the local development (dev) server by automatically discovering the UI bundle's ui-bundle.json file; use the org with alias "myorg":

```bash
sf ui-bundle dev --target-org myorg
```

Start the dev server by explicitly specifying the UI bundle's name:

```bash
sf ui-bundle dev --name myBundle --target-org myorg
```

Start at the specified dev server URL:

```bash
sf ui-bundle dev --name myBundle --url http://localhost:5173 --target-org myorg
```

Start with a custom proxy port and automatically open the proxy server URL in your browser:

```bash
sf ui-bundle dev --target-org myorg --port 4546 --open
```

```bash
Start with debug logging enabled by specifing the SF_LOG_LEVEL environment variable before running the command:
SF_LOG_LEVEL=debug sf ui-bundle dev --target-org myorg
```
