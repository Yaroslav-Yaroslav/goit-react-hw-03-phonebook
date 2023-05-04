import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Layout } from './Layout/Layout';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  addContact = newContact => {
    if (this.state.contacts.find(({ name }) => name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts`);
    }
    return this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onSave={this.addContact} />

        <h2>Contacts</h2>
        <Filter
          onChange={e =>
            this.setState({
              filter: e.target.value,
            })
          }
          value={filter}
        />
        <ContactList
          contacts={this.filterContacts()}
          onDelete={this.deleteContact}
        />
      </Layout>
    );
  }
}
