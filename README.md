[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/request-timings.svg)](https://www.npmjs.com/package/@advanced-rest-client/request-timings)

[![Build Status](https://travis-ci.org/advanced-rest-client/request-timings.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/request-timings)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/request-timings)

## &lt;request-timings&gt;

An element to display request timings information as a timeline according to the HAR 1.2 spec.

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/request-timings
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/request-timings/request-timings.js';
    </script>
  </head>
  <body>
    <request-timings></request-timings>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/request-timings/request-timings.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <request-timings></request-timings>
    `;
  }

  setTimings(e) {
    const data = {
      startTime: 1483368432132,
      blocked: 7.75,
      dns: 279.38,
      connect: 883.12,
      ssl: 633.05,
      send: 0.29,
      wait: 649.88,
      receive: 1.71
    };
    const element = this.shadowRoot.querySelector('request-timings');
    element.timings = data;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/request-timings
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
