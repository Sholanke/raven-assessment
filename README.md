# Sisyphus assessment

This project was created with [Vite and React](https://vitejs.dev/guide/).

## Available Scripts

In this project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:5173/](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### `Project Tree`

Below is a tree of this project to help with easy navigation.

src/
├── assets/
│   └── fonts/
│       └── Satoshi
├── components/
│   ├── dashboard/
│   │   ├── metrics
│   │   └── trades/
│   │       ├── buy-and-sell
│   │       ├── open-orders
│   │       ├── order-book
│   │       └── trades-chart
│   └── ui/
│       ├── button
│       ├── form-elements/
│       │   ├── form-checkbox
│       │   ├── form-currency-dropdown
│       │   ├── form-input
│       │   ├── form-select-dropdown
│       │   └── form-select
│       ├── nav-bar
│       ├── tabs
│       └── tool-tip
├── hooks/
│   ├── useClickOutside
│   ├── useResizeObserver
│   └── useTabs
├── styles/
│   ├── _fonts.scss
│   ├── _form-elements.scss
│   ├── _mixins.scss
│   └── _main.scss
├── App.tsx
├── main.tsx
└── utils.ts