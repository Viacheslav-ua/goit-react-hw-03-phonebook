import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import S from "./ContactForm.module.css";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface StateType {
  name?: string;
  number?: string;
}

interface PropsType {
  formSubmit: any;
  findName: any;
}

class ContactForm extends Component<PropsType> {
  state: StateType = {
    name: "",
    number: "",
  };

  handleAddInput = (i: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const b = new RegExp(i);
    if (b.test(e.currentTarget.value)) {
      this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    }
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.props.findName(this.state.name)) {
      alert(this.state.name + " is already in contacts");
      return;
    }
    this.props.formSubmit({ id: uuidv4(), ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <form className={S.contactsForm} onSubmit={this.handleSubmit}>
        <TextField
          label="Name"
          variant="standard"
          id="component-simple"
          name="name"
          value={this.state.name}
          onChange={this.handleAddInput("^$|^[$a-zA-Zа-яА-Я -']*$")}
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <TextField
          label="Phone number"
          variant="standard"
          id="component-simple"
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleAddInput("^$|^\\+|^\\d[\\d\\s-.]*$")}
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />

        <Button type="submit" className={S.btn} variant="contained">
          Add contact
        </Button>
      </form>
    );
  }
}
export default ContactForm;
