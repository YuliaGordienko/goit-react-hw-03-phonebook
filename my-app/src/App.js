import React, { Component } from "react";
import Input from "./Input/Input";
import ContactsList from "./ContactsList/ContactsList";
import FiltrByName from "./FiltrByName/FiltrByName";
const { v4: uuidv4 } = require("uuid");

class App extends Component {
  state = {
    contacts: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    name: "",
    number: "",
    filter: "",
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    const { name, number } = this.state;
    e.preventDefault();
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    if (this.state.contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }

    this.setState({ name: "", number: "" });
  };
  arrayContacs = () => {
    const filterLowerCase = this.state.filter.toLowerCase();
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };
  handleFilterChange = (e) => {
    this.setState({ filter: e.currentTarget.value });
    console.log(this.state.filter);
  };
  deleteContacs = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  componentDidUpdate(prevState, prevProps) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const getArr = this.arrayContacs();
    return (
      <div style={{ marginLeft: "20px" }}>
        <h1>Phonebook</h1>
        <Input
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          valueName={this.state.name}
          valueNumber={this.state.number}
        />
        <FiltrByName
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <ContactsList contacts={getArr} onDeleteContacts={this.deleteContacs} />
      </div>
    );
  }
}
export default App;
