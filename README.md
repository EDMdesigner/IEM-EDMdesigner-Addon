IEM-EDMdesigner-Addon
======================

An EDMdesigner addon for Interspire Email Marketer.


## Installation
 * Download the addon
 * Copy it into your IEM instance to the following folder: /admin/addons/edmdesigner
 * Get access to our dashboard
  * Get your API key and the corressponding magic word. Please read the beggining of this [article] (http://edmdesigner.com/blog/edmdesigner-integration-tutorial-1-the-basics).
 * Configure
  * In your IEM, go to Settings->Addons
  * Click on Configure in EDMdesigner's row
  * Enter the your API key and magic word
  * Enter the preferred [language code] (#supported-languages)
  * Select the closest [API server] (#api-servers) to your location
    * This is optional, you can leave http://api.edmdesigner.com there.
    * You can use http and https as well

Attention! Your server must be reachable from our servers, otherwise uploading and removing images won't be able to work! If your IEM instance is behind a firewall, please add our servers on a whitelist on port 80.

To find out the ip address of a domain, please enter the following in a terminal:
 * Linux, mac: host HOSTNAME
 * Windows: nslookup HOSTNAME
  * Check the Address field

Where HOSTNAME is the name of the API host where you connect with your addon.


## API servers:
These are the domain names of the API servers what you can use. You should pick the one which is closest to you.

 * api.edmdesigner.com
 * api-virginia.edmdesigner.com
 * api-ireland.edmdesigner.com
 * api-sydney.edmdesigner.com

Note that api.edmdesigner.com and api-virginia.edmdesigner.com are identical.

## Supported Languages
There is a difference between the supported languages in our API (the editor itself) and the addon. If you would like to help us to create more localizations, please drop us an email. If you want to change the language of the addon, you have to overwrite the language.php file. In a later release, you won't have to do this.

### API
 * English (Language code: en)
 * Dutch (Language code: nl)
 * Hungarian (Language code: hu)
 * Italian (Language code: it)
 * Romanian (Language code: ro)
 * Russian (Language code: ru)

### IEM-EDMdesigner-Addon
 * English (Language code: en)
 * Hungarian (Language code: hu)

## Known bugs
Please check out the issues part on GitHub. If you found a bug, please report that there.


## Changelog

### v1.1
 * Dynamic content - like in standard IEM
 * Lots of bugfixes
 * Lots of minor improvements
 * More stable db connection
 * More synchronized with IEM's database

### v1.0 - initial version
 * Built-in template management
 * Custom template management
 * Campaign management
 * Drag 'n' Drop email template editor
 * Previews on destop, tablet and smartphone
