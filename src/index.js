import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Col, Container, Row } from "react-bootstrap";

const mespeak = require("mespeak");
mespeak.loadConfig(require("mespeak/src/mespeak_config.json"));
mespeak.loadVoice(require("mespeak/voices/pt.json"));

export default class App extends Component {
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

    let aux = 0;
    if (input !== "{space}" && input !== "{enter}") {
      this.frase[aux] = `{${input}}`;
      aux++;
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

  onChangeInput = (event) => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboardRef.setInput(input);
  };

  render() {


    return (
      <Container>
        <Row>
          <input
            value={this.state.input}
            placeholder={
              "Utilize o teclado para montar sua frase e aperte 'Enter' para falar"
            }
            onChange={this.onChangeInput}
          />
        </Row>

        <Row>
          <Col md={12}>
            <Keyboard
              keyboardRef={(r) => (this.keyboardRef = r)}
              theme={`hg-theme-default ${this.state.theme}`}
              layoutName={this.state.layoutName}
              layout={this.state.default}
              dark
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
