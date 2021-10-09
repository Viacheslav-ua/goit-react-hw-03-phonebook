import React, { Component } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import S from "./App.module.css";

type contactsType = {
  id: string;
  name: string;
  number: string;
};

interface StateType {
  contacts: contactsType[];
  filter: string;
}

class App extends Component {
  state: StateType = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  findName = (str: string): boolean => {
    return this.state.contacts.find((item) =>
      item.name.toLowerCase().includes(str.toLowerCase())
    )
      ? true
      : false;
  };

  formSubmitHandler = (data: StateType) => {
    this.setState((prevState: StateType) => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = (id: string): void => {
    this.setState((prevState: StateType) => ({
      contacts: prevState.contacts.filter((item) => item.id !== id),
    }));
  };

  render() {
    return (
      <div className={S.container}>
        <h1>Phonebook</h1>
        <ContactForm
          formSubmit={this.formSubmitHandler}
          findName={this.findName}
        />

        <h2 className={S.title}>Contacts</h2>
        <Filter
          filterValue={this.state.filter}
          handleChangeFilter={this.changeFilter}
        />
        <ContactList
          list={this.state.contacts}
          filterValue={this.state.filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
