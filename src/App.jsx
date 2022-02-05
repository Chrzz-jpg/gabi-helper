import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react";
import Navbar from "./Navbar";
import "./index.scss";

const mespeak = require("mespeak");
class App extends Component {
  componentDidMount() {
    mespeak.loadConfig(require("mespeak/src/mespeak_config.json"));
    mespeak.loadVoice(require("mespeak/voices/pt.json"));
  }

  render() {
    const { store } = this.props;

    return (
      <div className={store.state.theme}>
        <Navbar store={store} />
        <Container className="container">
          <Row>
            <div className="input-group input-group-xl d-flex input-n-keyboard">
              <input
                type="text"
                value={store.state.input}
                className={`principal-input-${store.state.theme} form-control`}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                onChange={store.onChangeInput}
                onKeyPress={store.onKeyPressInput}
                placeholder={"Digite seu texto aqui"}
              />
              <button
                onClick={store.onButtonClean}
                placeholder="limpar"
                className="input-group-text"
                id="inputGroup-sizing-sm"
              >
                Limpar
              </button>
            </div>
          </Row>
          {/*
          <Row className={"center"}>
            <h3>
              Sugestões: ................ | ................ | .............
            </h3>
          </Row>
          */}
          <Row>
            <Col md={12}>
              <Keyboard
                keyboardRef={(r) => (store.keyboardRef = r)}
                theme={`hg-theme-default ${store.state.theme}`}
                layoutName={store.state.layoutName}
                layout={store.state.default}
                onChange={store.onChange}
                onKeyPress={store.onKeyPress}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default observer(App);
