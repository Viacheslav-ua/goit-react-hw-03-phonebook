import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import S from "./ContactForm.module.css";

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

  handleAddInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
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
        <label className={S.caption}>Name</label>

        <input
          type="text"
          name="name"
          className={S.input}
          value={this.state.name}
          onChange={this.handleAddInput}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <label className={S.caption}>Number</label>
        <input
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleAddInput}
          className={S.input}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />

        <button type="submit" className={S.btn}>
          Add contact
        </button>
      </form>
    );
  }
}
export default ContactForm;
