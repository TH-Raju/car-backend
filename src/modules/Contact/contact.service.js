import Contact from "./contact.model.js";

const sendContact = async (contactBody) => {
  const contact = new Contact(contactBody);
  const receiveContact = await contact.save();
  return receiveContact;
};

export const contactService = {
  sendContact,
};
