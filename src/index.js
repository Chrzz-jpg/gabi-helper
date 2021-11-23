import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Col, Container, Row } from "react-bootstrap";

const mespeak = require("mespeak");

export default class App extends Component {
  componentDidMount() {
    mespeak.loadConfig(require("mespeak/src/mespeak_config.json"));
    mespeak.loadVoice(require("mespeak/voices/pt.json"));
  }
  frase = [];
  state = {
    layoutName: "default",
    default: {
      default: [
        "1 2 3 4 5 6 7 8 9 0 {bksp}",
        "Q W E R T U I O P",
        "A S D F G H J K L ?",
        "Z X C V B N M , . {enter}",
        "{space}",
      ],
    },
    input: "",
    theme: "dark",
  };

  onChange = (input) => {
    this.setState({ input });

    //Mantem a frase formatada enquanto usado o componente Keyboard
    if (input !== "{space}" && input !== "{enter}") {
      this.frase = `{${input}}`;
    }
  };

  onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") this.handleShift();

    if (button === "{enter}") {
      mespeak.speak(this.frase);

      this.keyboardRef.clearInput();
      this.frase = [];
    }
  };

  handleShift = () => {
    const layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default",
    });
  };
  onKeyPressInput = (e) => {
    var key = e.keyCode || e.which;
    //Key do enter
    if (key === 13) {
      mespeak.speak(this.frase);
      this.setState({ input: "" });
      this.keyboardRef.setInput("");
      this.frase = [];
    }
  };

  onChangeInput = (event) => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboardRef.setInput(input);
    this.frase = input;
  };

  onButtonClean = () => {
    this.setState({ input: "" });
    this.frase = [];
  };

  render() {
    return (
      <Container className="container auto">
        <Row>
          <div className="input-group input-group-xl d-flex input-n-keyboard">
            <input
              type="text"
              value={this.state.input}
              className="form-control principal-input"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              onChange={this.onChangeInput}
              onKeyPress={this.onKeyPressInput}
            />
            <button
              onClick={this.onButtonClean}
              placeholder="limpar"
              className="input-group-text"
              id="inputGroup-sizing-sm"
            >
              Limpar
            </button>
          </div>
        </Row>

        <Row className={"center"}>
          <h3>
            Sugestões: ................ | ................ | .............
          </h3>
        </Row>

        <Row>
          <Col md={12}>
            <Keyboard
              keyboardRef={(r) => (this.keyboardRef = r)}
              theme={`hg-theme-default ${this.state.theme}`}
              layoutName={this.state.layoutName}
              layout={this.state.default}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

render(<App />, document.getElementById("root"));
