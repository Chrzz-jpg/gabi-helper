import React, { Component } from "react";
import { observer } from "mobx-react";
import Button from "react-bootstrap/Button";
import NavbarBootstrap from "react-bootstrap/Navbar";
import "./Navbar.scss";

class Navbar extends Component {
  render() {
    const { store } = this.props;

    return (
        <NavbarBootstrap bg="primary" expand={false}  >
          <NavbarBootstrap.Brand href="#home" className="btn nom">
            <img
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMZ7F4jr-UBJd4btOXlLTlpl9ZHRxdqI6Ylk1bqHFHLXgmgYLRqxPFIfSErIEjqmZdZ6Y&usqp=CAU"
              width="40"
              height="40"
              className="d-inline-block rounded-circle"
            />{" "}
            <h1 className="btn nome">Gabi Helper</h1>
          </NavbarBootstrap.Brand>
          <NavbarBootstrap.Brand>
              
          </NavbarBootstrap.Brand>
          <NavbarBootstrap.Brand>
            <Button
              className="btn-dark"
              variant="contained"
              onClick={() => store.themeDark()}
            >
              Dark Mode
            </Button>

            <Button
              className="btn-light"
              variant="contained"
              onClick={() => store.themeLight()}
            >
              Light Mode
            </Button>
          </NavbarBootstrap.Brand>
        </NavbarBootstrap>

    );
  }
}

export default observer(Navbar);
