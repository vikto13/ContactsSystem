export const MessageState = {
    message: {
        active: false,
        value: null,
        title: "",
        content: "",
        action: null,
        isAlert: false,
        cancelAction: null,
    },
    loading: false,
    messageTexts: {
        street: 'Gatvė turi būti įvesta',
        street_number: 'Gatvės numerys turi būti įvestas',
        city: 'Miestas turi būti įvestas',
        country: 'Šalis turi būti įvestas',
        name: "Pavadinimas turi būti įvestas",
        surname: "Pavardė turi būti įvesta",
        position: 'Pozicija turi būti įvesta',
        phone_number: 'Telefono numerys turi būti įvestas',
        second_password: `Slaptažodžiai turi būti vienodi`,
        password: 'Įveskite slaptažodį',
    },
    submit: false,

}