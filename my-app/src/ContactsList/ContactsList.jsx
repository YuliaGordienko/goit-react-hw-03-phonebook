import React from "react";
import s from "./contactslist.module.css";
const { v4: uuidv4 } = require("uuid");
const ContactList = ({ contacts, onDeleteContacts }) => {
  return (
    <>
      <p>Contacs:</p>
      {contacts.length > 0 && (
        <ul className={s.list}>
          {contacts.map((contact) => (
            <li key={contact.id} className={s.item}>
              <p className={s.discribe}>
                {contact.name}: {contact.number}
              </p>
              <button
                type="button"
                onClick={() => onDeleteContacts(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default ContactList;
