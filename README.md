# Nuxt 3 Web Clock app

Simple configurable full-screen digital web clock. Created for use in
home assistant dashboard, but good for any kiosk-type display.

Uses Nuxt 3, Vue 3, and Vuetify with typescript. Preferences are
stored in local storage and there's a preferences panel to configure
font sizes and colors.

See the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Demo: https://garyo.github.io/web-clock

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000 :

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn generate
```

Locally preview production build:

```bash
yarn preview
```

Deploy to `USERNAME.github.io/REPONAME` (e.g. `https://garyo.github.com/web-clock`):

This uses the `push-dir` package to push the `.output/public` dir created by `generate` to a remote `gh-pages`
branch, so configure your github repo to publish from that branch.

```bash
yarn deploy
```
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
