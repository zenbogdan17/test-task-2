import { UserContats } from '../types/redux_type';

export const handlerFilterContact = (
  contacts: UserContats[],
  filter: string
) => {
  const normalizedFilter = filter.toLowerCase().replace(/\s+/g, '');

  const filteredContacts = contacts.filter((contact) => {
    const normalizedName = contact.name.toLowerCase().replace(/\s+/g, '');
    const normalizedPhone = contact.phone.replace(/\s+/g, '');

    return (
      normalizedName.includes(normalizedFilter) ||
      normalizedPhone.includes(normalizedFilter)
    );
  });

  return filteredContacts;
};
