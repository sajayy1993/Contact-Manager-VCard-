import axios from 'axios';

export class ContactService{
    static serverURL=`http://localhost:9000`;

    static getGroups(){
        let dataURL=`${this.serverURL}/groups`;
        return axios.get(dataURL);
    }
    static getGroup(Contacts){
        let groupId=Contacts.groupId;
        let dataURL=`${this.serverURL}/groups/${groupId}`;
        return axios.get(dataURL);
    }
    
    static getAllContacts(){
        let dataURL =`${this.serverURL}/contacts`;
        return axios.get(dataURL);
    }

    static getContacts(contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`;
        return axios.get(dataURL);
    }

    static createContact(contact){

   let dataURL =`${this.serverURL}/contacts`;
   return axios.post(dataURL, contact);
    }

    static updateContact(Contacts, contactId ){
        let dataURL =`${this.serverURL}/contacts/${contactId}`;
        return axios.put(dataURL, Contacts);
    }

    static deleteContact (contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.delete(dataURL);
    }
}