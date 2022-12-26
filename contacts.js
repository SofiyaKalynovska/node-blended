const fs = require("fs/promises"); 
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, './db/contacts.json')

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath);
    let listOfContacts = JSON.parse(response);
    return listOfContacts;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const listOfContacts = await listContacts();
    const contact = listOfContacts.find((contact) => contact.id == contactId)
    if (contact) {
      console.log(`We found contact with id: ${contactId} `, contact)
    } else {
      console.log(`We can not find contact with id ${contactId}, please try another id`)
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const listOfContacts = await listContacts();
    await fs.writeFile(contactsPath, JSON.stringify(listOfContacts.filter((contact) => contact.id != contactId)))
    console.table(await listContacts())
  } catch (error) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  const listOfContacts = await listContacts();
  const contactNew = { id: shortid.generate(), name, email, phone }
  const updatedContactsList = JSON.stringify([contactNew, ...listOfContacts], null, '\t')

  await fs.writeFile(contactsPath, updatedContactsList, (err) => { if (err) console.error(err) })
  
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}