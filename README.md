# Currency Calculator Webcomponent

## About

This is a currency calculator webcomponent, where user can calculate how much of given currency they can buy with EUR.

## How to use

To add this currency calculator to a page, include the `SebCurrencyCalculator.js` file within the `<script>` tag of your page as follow (assuming both component file and HTML file are in the same folder):
`<script src="./SebCurrencyCalculator.js"></script> `

Then add its custom tags where you want to have it displayed in your page: `<seb-currency-calculator></seb-currency-calculator>`.

The components won't display anything until it gets a list of currencies throuhg Javascript. To pass it a list of currencies use its currencyList property like: `document.querySelector('seb-currency-calculator').currencyList = ['currencyListObjects']`. The list is an array of currency objects, an example can be found in the `crc-example.json` in this project's folder.

The component will take 100% width of it's parent element, so be sure to set the width of the parent element accordingly.
