import {UPDATE_FIRST_NAME, 
    UPDATE_LAST_NAME,UPDATE_EMAIL, 
    UPDATE_STREET, EXIT_WITHOUT_SAVE, UPDATE_AVATAR,
    UPDATE_CITY, UPDATE_PROVINCE, UPDATE_POSTALCODE} from "./actionTypes";

const updateFirstName = (firstName: string) => ({
    type: UPDATE_FIRST_NAME,
    payload: firstName,
});

const updateLastName = (lastName: string) => ({
    type: UPDATE_LAST_NAME,
    payload: lastName,
});

const updateEmail = (email: string) => ({
    type: UPDATE_EMAIL,
    payload: email
});

const updateStreet = (street: string) => ({
    type: UPDATE_STREET,
    payload: street
});

const updateCity = (city: string) => ({
    type: UPDATE_CITY,
    payload: city
});

const updateProvince = (province: string) => ({
    type: UPDATE_PROVINCE,
    payload: province
});

const updatePostalCode = (postalCode: string) => ({
    type: UPDATE_POSTALCODE,
    payload: postalCode
});

const exitWithoutSave = () => ({
    type: EXIT_WITHOUT_SAVE
})

const updateAvatar = (avatarUrl: string) => ({
    type: UPDATE_AVATAR,
    payload: avatarUrl
})

export {updateFirstName, 
    updateLastName, 
    updateEmail, 
    updateStreet, 
    exitWithoutSave, 
    updateAvatar,
    updateCity,
    updateProvince,
    updatePostalCode
}