
# robots-lllm-manager

robots-lllm-manager is a Strapi plugin designed to help you automatically generate and manage `robots.txt` files and LLM (Large Language Model) integrations. It enables flexible control over web crawling rules and advanced AI-powered content processing within your Strapi project.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Support](#support)
- [License](#license)

## Features

- Automatically generate and manage `robots.txt` files.
- Integrate with Large Language Models (LLM) for enhanced content processing.
- Configure crawling rules and AI settings directly from Strapi.
- Full support via Strapi admin UI.

## Installation

In your Strapi project folder, run:

```bash
npm install robots-lllm-manager
# or
yarn add robots-lllm-manager
```

Then build the plugin:

```bash
npm run build
# or
yarn build
```

Restart Strapi:

```bash
npm run develop
# or
yarn develop
```

## Configuration

After installation, a new section **Robots LLLM Manager** will appear in the Strapi admin panel.

You can:

1. Configure and generate `robots.txt` rules.
2. Set up LLM integration parameters.
3. Manage and test settings directly from the admin panel.

### Example configuration in `config/plugins.js`:

```javascript
module.exports = {
  "robots-lllm-manager": {
    robots: {
      sitemap: "https://example.com/sitemap.xml",
    },
  }
};
```

## Usage

Generate and update `robots.txt` directly from Strapi admin UI, or trigger LLM processing programmatically:

```javascript
await strapi.plugin('robots-lllm-manager').service('robots').generate();
await strapi.plugin('robots-lllm-manager').service('llm').process("Your input text");
```

## Support

For questions or issues, please open a ticket in the repository:  
[https://s///issues](https://s///issues)

## License

MIT © makolab
