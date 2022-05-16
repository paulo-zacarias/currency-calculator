class SebCurrencyCalculator extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._currencyList = null;
  }

  get currencyList() {
    return this._currencyList;
  }

  set currencyList(value) {
    if (!this._currencyList) {
      this.render();
    }
    this._currencyList = value;
    this.addOptions();
  }

  connectedCallback() {
    // this.render();
  }

  render() {
    this.shadow.innerHTML = `
    <style>
      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type=number] {
      -moz-appearance: textfield;
      }

      .form .form-element {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      .form .form-element label {
        width: 75px;
        margin-right: 10px;
        font-size: 14px;
        font-weight: bold;
        text-shadow: 1px 0 3px rgb(179, 179, 179);
      }

      .form .form-element input {
        width: 100%;
        outline: none;
        border: 1px solid #d5dbd9;
        font-size: 15px;
        padding: 8px 10px;
        border-radius: 3px;
        transition: all 0.3s ease;
      }

      .form .form-element .custom-select{
        position: relative;
        width: 100%;
        height: 37px;
      }

      .form .form-element .custom-select::before {
        content: '';
        position: absolute;
        top: 12px;
        right: 10px;
        border: 8px solid;
        border-color: #d5dbd9 transparent transparent transparent;
        pointer-events: none;
      }

      .form .form-element .custom-select select {
        width: 100%;
        height: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        border:0px;
        padding: 8px 10px;
        font-size: 15px;
        border: 1px solid #d5dbd9;
        border-radius: 3px;
      }

      .form .form-element input:focus,
      .form .form-element .custom-select select:focus {
        border: 1px solid #52b788;
        box-shadow: 1px 0px 10px #52b788;
      }

      .form .form-element .btn {
        width: 100%;
        padding: 8px 10px;
        font-size: 15px;
        border: 1px solid #52b788;
        background:  #fff;
        color: #52b788;
        cursor: pointer;
        border-radius: 3px;
        outline: none;
        transition: all 0.3s ease;
      }

      .form .form-element .btn:hover {
          background: #52b788;
          color: #fff;
      }

      @media (max-width:420px) {
        .form .form-element {
            flex-direction: column;
            align-items: flex-start;
        }
        form .form-element label{
            margin-bottom: 5px;
        }
      }

      .error {
        color: red;
        font-size: small;
      }
    }
    </style>

    <div class="wrapper">
      <h2>Convert from Euros</h2>
      <div class="form" aria-label="Form to convert from Euros to selected currency">
        <div class="form-element">
          <label class="test" for="amount">Amount:</label>
          <input class="w-100" type="number" id="seb-amount-input" min="0" aria-label="Amount in Euros"/>
        </div>
        <div class="form-element">
          <label class="test" for="amount">From:</label>
          <div class="custom-select">
          <select aria-label="Select currency from options" name="seb-currency-select" id="seb-currency-select"></select>
          </div>
        </div>
        <div  class="form-element">
          <button class="w-100 btn" id="seb-calculate-btn" aria-label="Calculate">Calculate</button>
        </div>
        <div class="form-element">
          <p id="seb-calculated-value"></p>
        </div>
      </div>
    </div>
    `;

    let btn = this.shadow.querySelector("#seb-calculate-btn");
    btn.addEventListener("click", this.calculate.bind(this));
  }

  addOptions() {
    const selectElement = this.shadowRoot.getElementById("seb-currency-select");
    this._currencyList.forEach((element) => {
      let option = document.createElement("option");
      option.id = element.code;
      option.value = element.rate;
      option.text = element.code + " - " + element.currency;
      selectElement.appendChild(option);
    });
  }

  clearOptions(selectElement) {
    while (selectElement.length) {
      selectElement.options.remove(0);
    }
  }

  calculate() {
    const amount = this.shadowRoot.getElementById("seb-amount-input").value;
    const resultDisplay = this.shadowRoot.getElementById(
      "seb-calculated-value"
    );
    if (!amount) {
      console.log(typeof amount);
      resultDisplay.classList.add("error");
      resultDisplay.innerText = "Please insert a valid amount.";
      return;
    }
    const select = this.shadowRoot.getElementById("seb-currency-select");
    const rate = select.value;
    const currency = select.selectedOptions[0].id;
    const result = (amount * rate).toFixed(2);
    resultDisplay.classList.remove("error");
    resultDisplay.innerText = result + " " + currency;
  }
}

window.customElements.define("seb-currency-calculator", SebCurrencyCalculator);
