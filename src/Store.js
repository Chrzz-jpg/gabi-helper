import { extendObservable } from "mobx";

const mespeak = require("mespeak");

class Store {
  componentDidMount() {
    mespeak.loadConfig(require("mespeak/src/mespeak_config.json"));
    mespeak.loadVoice(require("mespeak/voices/pt.json"));
  }
  constructor() {
    extendObservable(this, {
      phrase: [],
      state: {
        layoutName: "default",
        default: {
          default: [
            "{enter}",
            "SIM NÃO OI...TUDO,BEM? TUDO,BEM!",
            "1 2 3 4 5 6 7 8 9 0 {bksp}",
            "Á Â Ã É Ê Í Ó Ô Ú",
            "Q W E R T U I O P",
            "A S D F G H J K L ?",
            "Z X C V B N M , .",
            "{space}",
          ],
        },
        input: "",
        theme: localStorage.getItem("theme"),
      },
    });
  }

  onChange = (input) => {
    this.state.input = input;

    this.formatePrash(input);
  };

  //Mantem a frase formatada enquanto usado o componente Keyboard
  formatePrash = (input) => {
    if (input !== "{space}" && input !== "{enter}") {
      this.phrase = `{${input}}`;
    }
  };

  onKeyPress = (button) => {
    //if para considerar o estado de shift e ou caps lock
    //if (button === "{shift}" || button === "{lock}") this.handleShift();

    if (button === "{enter}") {
      this.onEnterButton();
    }
  };

  onEnterButton = () => {
    mespeak.speak(this.phrase);

    this.keyboardRef.clearInput();
    this.phrase = [];
  };

  /* //Função para mudar o estado do shift (Maisculas e minusculas)
  handleShift = () => {
    const layoutName = this.state.layoutName;

    this.state.layoutName = layoutName === "default" ? "shift" : "default";
  };
*/
  onKeyPressInput = (e) => {
    var key = e.keyCode || e.which;

    //Key do enter
    if (key === 13) {
      this.speakOnEnterKey();
    }
  };

  speakOnEnterKey = () => {
    mespeak.speak(this.phrase);
    this.state.input = "";
    this.keyboardRef.setInput("");
    this.phrase = [];
  };

  onChangeInput = (event) => {
    const input = event.target.value;
    this.state.input = input;
    //this.setState({ input });
    this.keyboardRef.setInput(input);
    this.phrase = input;
  };

  onButtonClean = () => {
    this.state.input = "";

    this.phrase = [];
  };

  themeDark = () => {
    this.state.theme = "dark";
    localStorage.setItem("theme", "dark");
  };

  themeLight = () => {
    this.state.theme = "light";
    localStorage.setItem("theme", "light");
  };
}

export default Store;
