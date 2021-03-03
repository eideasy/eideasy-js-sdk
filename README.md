# Important !!
This package is in active development and not production ready.

# eID Easy js SDk
eideasy-js-sdk provides you with a simple set of functions to get the user's identity.

## Installing

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@eid-easy/eideasy-js-sdk@0.6.0/dist/eideasy-js-sdk.min.js"></script>
```


## Example

### Create the authenticator instance:
```javascript
var authenticator = window.eidEasySdk.createAuthenticator({
  countryCode: 'EE',
  sandbox: true,
  clientId: '2IaeiZXbcKzlP1KvjZH9ghty2IJKM8Lg',
  localApiEndpoints: {
    identityStart: 'http://eid-sample-app.test/api/identity/start',
    identityFinish: 'http://eid-sample-app.test/api/identity/finish',
  },
  language: 'et',
});
```

#### Authenticator Settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
countryCode | string | undefined | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code
sandbox | boolean | false | Whether to use the [sandbox](https://eideasy.com/developer-documentation/sandbox/) mode.
clientId | string | undefined | get from id.eideasy.com after signing up.
localApiEndpoints.identityStart | string | undefined | Your local API endpoint for the identity start request.
localApiEndpoints.identityFinish | string | undefined | Your local API endpoint for the identity finish request.
language | string | undefined | Two letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code.

### Authenticate with an ID Card:

```javascript
authenticator.idCard.authenticate({
  fail: (result) => {
    // do something with the result
  },
  success: (result) => {
    // do something with the result
  },
  finished: (result) => {
    // do something with the result
  },
});
```

#### idCard authentication settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
fail | function | undefined | This function gets called when the authentication process failed.
success | function | undefined | This function gets called when the authentication process succeeds.
finished | function | undefined | This function gets called when the authentication process has either failed or succeeded. This means that this function gets called always, no matter the authentication result. For example, it can be useful to hide a loading spinner at the end of the authentication process or to do some other clean up work.


### Authenticate with Smart-ID:

```javascript
authenticator.smartId.authenticate({
  idcode: '10101010005',
  countryCode: 'EE',
  started: (result) => {
    // do something with the result
    // e.g. display the result.response.data.challenge code
  },
  fail: (result) => {
    // do something with the result
  },
  success: (result) => {
    // do something with the result
  },
  finished: (result) => {
    // do something with the result
  },
});
```

#### smartId authentication settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
idcode | string | undefined | End user's personal identification code
countryCode | string |  the value set during the authenticator initialization | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code
started | function | undefined | This function gets called when the authentication process has started. The argument object of this function contains the challenge (response.data.challenge) you can display to the end-user.
fail | function | undefined | This function gets called when the authentication process failed.
success | function | undefined | This function gets called when the authentication process succeeds.
finished | function | undefined | This function gets called when the authentication process has either failed or succeeded. This means that this function gets called always, no matter the authentication result. For example, it can be useful to hide a loading spinner at the end of the authentication process or to do some other clean up work.



### Authenticate with Mobile ID:
```javascript
authenticator.mobileId.authenticate({
  idcode: '60001019906',
  phone: '+37200000766',
  countryCode: 'EE',
  started: (result) => {
    // do something with the result
    // e.g. display the result.response.data.challenge code
  },
  fail: (result) => {
    // do something with the result
  },
  success: (result) => {
    // do something with the result
  },
  finished: (result) => {
    // do something with the result
  },
});
```

#### mobileId authentication settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
idcode | string | undefined | End user's personal identification code
phone | string | undefined | End user's phone number, must have the [country code](https://countrycode.org/) prefixed with a '+' sign, e.g. +37200000766
countryCode | string | the value set during the authenticator initialization | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code
started | function | undefined | This function gets called when the authentication process has started. The argument object of this function contains the challenge (response.data.challenge) you can display to the end-user.
fail | function | undefined | This function gets called when the authentication process failed.
success | function | undefined | This function gets called when the authentication process succeeds.
finished | function | undefined | This function gets called when the authentication process has either failed or succeeded. This means that this function gets called always, no matter the authentication result. For example, it can be useful to hide a loading spinner at the end of the authentication process or to do some other clean up work.


## Development notes
https://github.com/volta-cli/volta/issues/651

volta install yarn@2.4.0
yarn set version berry

https://yarnpkg.com/cli/run
yarn run --inspect-brk webpack
