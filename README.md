IEM-EDMdesigner-Addon
======================

An EDMdesigner addon for Interspire Email Marketer.


## Installation
 * Download the [latest release of the addon](https://github.com/EDMdesigner/IEM-EDMdesigner-Addon/releases)
 * Copy it into your IEM instance to the following folder: /admin/addons/edmdesigner
 * Get access to our dashboard
  * Get your API key and the corressponding magic word. Please read the beggining of this [article] (http://edmdesigner.com/blog/edmdesigner-integration-tutorial-1-the-basics).
 * Configure
  * In your IEM, go to Settings->Addons
  * Click on Configure in EDMdesigner's row
  * Enter the your API key and magic word
  * Enter the preferred [language code] (#supported-languages)
  * Select the closest [API server] (#api-servers) to your location
  	* You can use http and https as well

Attention! Your server must be reachable from our servers, otherwise uploading and removing images won't be able to work! If your IEM instance is behind a firewall, please add our servers on a whitelist on port 80.

To find out the ip address of a domain, please enter the following in a terminal:
 * Linux, mac: host HOSTNAME
 * Windows: nslookup HOSTNAME
  * Check the Address field

Where HOSTNAME is the name of the API host where you connect with your addon.

## Supported Languages
There is a difference between the supported languages in our API (the editor itself) and the addon. If you would like to help us to create more localizations, please drop us an email. If you want to change the language of the addon, you have to overwrite the language.php file. In a later release, you won't have to do this.

### API
 * English (Language code: en)
 * German (Language code: de)
 * French (Language code: fr)
 * Spanish (Language code: es)
 * Hungarian (Language code: hu)
 * Italian (Language code: it)
 * Dutch (Language code: nl)
 * Polish (Language code: pl)
 * Romanian (Language code: ro)
 * Russian (Language code: ru)
 * Portuguese Brazilian (Language code: pt-BR)
 * Chinese Simplified (Language code: zh-HANS)

If the language you want to use is not available yet then please contact us with the following email address: info@edmdesigner.com

### IEM-EDMdesigner-Addon
 * English (Language code: en)
 * Hungarian (Language code: hu)

## Releases and changelog
Please check out our [releases on GitHub](https://github.com/EDMdesigner/IEM-EDMdesigner-Addon/releases).
