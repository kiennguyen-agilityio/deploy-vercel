# React last practice

## Overview:

- This document provides information about React basic practice.
- [Design](https://www.figma.com/file/GfGQFOHS0dXrogDWnRjMhn/UI-Kit-E-commerce---KienNguyen-Practice?type=design&node-id=16-0&t=evqWPKFyVpfXYFs5-0)

## Targets:

- Apply React hooks, custom hooks
- Understand about how React hooks + Contexts work
- Apply
  - Props & states
  - Lifecycles
  - Reusable components
  - Client & server
  - Analyze design
  - Code style

## Information:

### Timeline:

- Estimate time: 14 days.
- Actual time: 17 days

### Technical:

- [HTML5](https://en.wikipedia.org/wiki/HTML5): is a markup language used for structuring and presenting content on the World Wide Web
- [CSS3](https://www.techopedia.com/definition/28243/cascading-style-sheets-level-3-css3): is the iteration of the CSS standard used in the styling and formatting of Web pages
- [React Hook](https://reactjs.org/docs/hooks-intro.html): a new addition in React 16.8. They let you use state and other React features without writing a class.
- [React Router](https://v5.reactrouter.com/web/guides/quick-start): is a standard library for routing in React.
- [JSON server](https://www.digitalocean.com/community/tutorials/json-server): is a Node Module that you can use to create demo rest json web service in less than a minute. All you need is a JSON file for sample data.
- [Vite](https://vitejs.dev/guide): is a build tool that aims to provide a faster and leaner development experience for modern web projects.
- Editor: Visual Studio Code.

### Development environment:

- Node: version 18.16.0
- npm: version 9.5.1
- Vite: version 2.2.0
- json-server: version 0.17.3

### Document:

- [React basic practice requirements and plan](https://docs.google.com/document/d/19edq7G7RV9xx6CDaaePF6Ovu6-S0gQdDXSIRRfpIuuQ/edit)

### Main app features:

- Homepage
  - User can see list of products.
  - User can filter products when click button filter in left screen.
  - User can search by name.
  - User can sort product by:
    - Price: Lowest to Highest, Highest to Lowest
    - Name: A-Z
    - Color
    - Category , subcategory
- Product details
  - User can see product details
  - Users can adjust the number of products they want to add
  - User can choose color of the product
  - User can add products to cart
- Product cart
  - User can see product when added from product details
  - User can update quantity and color of product
  - User can see total price of product
  - User can delete product from cart

## Getting started

### 1) Clone repo and checkout branch

- Step 1: Cloning the repo
  - HTTPS:
    ```
    $ git clone https://github.com/ducpham-agilityio/kiennguyen-training.git
    ```
  - SSH:
    ```
    $ git clone git@github.com:ducpham-agilityio/kiennguyen-training.git
    ```
- Step 2: Checkout to branch develop `git checkout main`

### 2) Run server (Open new terminal tab)

- Step 1: Go to the folder server `cd data`
- Step 2: Install package `npm install`
- Step 3: Run server `npm run start-db`

### 3) Run application (Open new terminal tab)

- Step 1: Go to the folder react practice `cd my-react-app`
- Step 2: Install package `npm install`
- Step 3: Run project `npm run dev`
- Step 4: Open `http://127.0.0.1:5173/` in your browser to see the Web application.
