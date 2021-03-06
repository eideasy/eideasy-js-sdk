# Getting started

## Important !!

This package is in active development and not production ready.

## Installation

### NPM

1. Install with npm or Yarn:
<CodeGroup>
   <CodeGroupItem title="YARN" active>

```bash:no-line-numbers
yarn add @eid-easy/eideasy-browser-client
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash:no-line-numbers
npm install @eid-easy/eideasy-browser-client
```

  </CodeGroupItem>
</CodeGroup>

2. Import createClient:

```javascript
import createClient from '@eid-easy/eideasy-browser-client';
```

### CDN

1. Add the script tag:

```html:no-v-pre
<script src="https://cdn.jsdelivr.net/npm/@eid-easy/eideasy-browser-client@{{ $theme.version }}/dist/eideasy-browser-client.js" integrity="{{ $theme.sri }}" crossorigin="anonymous"></script>
```

2. Use the eidEasyBrowserClient object to access createClient:

```javascript
const createClient = window.eidEasyBrowserClient.createClient;
```

## Examples

### Create the client instance

```javascript
const eidEasyClient = window.eidEasyBrowserClient.createClient({
   countryCode: 'EE',
   sandbox: true,
   clientId: '2IaeiZXbcKzlP1KvjZH9ghty2IJKM8Lg', 
   appUrl: 'http://localhost/',
   apiEndpoints: {
      identityStart: () => 'https://eid-sample-app.test/api/identity/start',
      identityFinish: () => 'https://eid-sample-app.test/api/identity/finish',
   },
   language: 'et',
});
```

#### Client Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
countryCode | string | undefined | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code
sandbox | boolean | false | Whether to use the [sandbox](https://eideasy.com/developer-documentation/sandbox/) mode.
clientId | string | undefined | get from id.eideasy.com after signing up.
apiEndpoints.identityStart | function | undefined | This should return your server endpoint for the identity start request.
apiEndpoints.identityFinish | function | undefined | This should return your server endpoint for the identity finish request.
language | string | undefined | Two letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code.

### Identify with an ID Card

```javascript
eidEasyClient.identification.idCard.start({
   fail: (error) => {
      // do something with the error
   },
   success: (result) => {
      // do something with the result
   },
   finished: (result) => {
      // do something with the result
   },
});
```

#### idCard identification settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
fail | function | undefined | This function gets called when the authentication process failed.
success | function | undefined | This function gets called when the authentication process succeeds.
finished | function | undefined | This function gets called when the authentication process has either failed or succeeded. This means that this function gets called always, no matter the authentication result. For example, it can be useful to hide a loading spinner at the end of the authentication process or to do some other clean up work.

### Identify with Smart-ID

```javascript
eidEasyClient.identification.smartId.start({
   idcode: '10101010005',
   started: (result) => {
      // do something with the result
      // e.g. display the result.response.data.challenge code
   },
   fail: (error) => {
      // do something with the error
   },
   success: (result) => {
      // do something with the result
   },
   finished: (result) => {
      // do something with the result
   },
});
```

#### smartId identification settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
idcode | string | undefined | End user's personal identification code
started | function | undefined | This function gets called when the authentication process has started. The argument object of this function contains the challenge (response.data.challenge) you can display to the end-user.
fail | function | undefined | This function gets called when the authentication process failed.
success | function | undefined | This function gets called when the authentication process succeeds.
finished | function | undefined | This function gets called when the authentication process has either failed or succeeded. This means that this function gets called always, no matter the authentication result. For example, it can be useful to hide a loading spinner at the end of the authentication process or to do some other clean up work.

### Identify with Mobile ID

```javascript
eidEasyClient.identification.mobileId.start({
   idcode: '60001019906',
   phone: '+37200000766',
   started: (result) => {
      // do something with the result
      // e.g. display the result.response.data.challenge code
   },
   fail: (error) => {
      // do something with the error
   },
   success: (result) => {
      // do something with the result
   },
   finished: (result) => {
      // do something with the result
   },
});
```

#### mobileId identification settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
idcode | string | undefined | End user's personal identification code
phone | string | undefined | End user's phone number, must have the [country code](https://countrycode.org/) prefixed with a '+' sign, e.g. +37200000766
started | function | undefined | This function gets called when the authentication process has started. The argument object of this function contains the challenge (response.data.challenge) you can display to the end-user.
fail | function | undefined | This function gets called when the authentication process failed.
success | function | undefined | This function gets called when the authentication process succeeds.
finished | function | undefined | This function gets called when the authentication process has either failed or succeeded. This means that this function gets called always, no matter the authentication result. For example, it can be useful to hide a loading spinner at the end of the authentication process or to do some other clean up work.
