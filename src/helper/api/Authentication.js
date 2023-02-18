const required = "required";
const configAuthentication = {
    password: {
        required: {
            message: "You need to enter a password"
        },
        max: {
            value: 15,
            message: "Password from 8 - 15 characters"
        },
        min: {
            value: 8,
            message: "Password from 8 - 15 characters"
        },
        regex: {
            value: (user) => {
                var usReg = /^([a-zA-Z0-9]+)$/g;
                return usReg.test(user);
            },
            message: "Password must not contain special characters"
        }
    },
    username: {
        required: {
            message: "You need to enter a User Name"
        },
        max: {
            value: 15,
            message: "User Name from 8 - 15 characters"
        },
        min: {
            value: 8,
            message: "User Name from 8 - 15 characters"
        },
        regex: {
            value: (password) => {
                var paReg = /^([a-zA-Z0-9]+)$/g;
                return paReg.test(password);
            },
            message: "User Name must not contain special characters"
        }
    },
    phone: {
        required: {
            message: "You need to enter your phone"
        },
        regex: {
            value: (phone) => {
                var pReg = /^(\(\+[0-9]{1,3}\)){0,1}\s(\d{3,4}\-){1,2}(\d{3,4})$/g;
                return pReg.test(phone);
            },
            message: "You must enter the correct phone number format"
        }
    },
    email: {
        required: {
            message: "Your need to enter your email"
        },
        regex: {
            value: (email) => {
                var eReg = /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g;
                return eReg.test(email);
            },
            message: "You must enter the correct email format"
        }
    }
}

const getErrorLable = (config, value) => {
    if(config.required && !value)
        return config.required.message;
    if(config.max && value.length > config.max.value)
        return config.max.message;
    if(config.min && value.length < config.min.value)
        return config.min.message;
    if(config.regex && !config.regex.value(value))
    {
        return config.regex.message;
    }
    return "";
}

export default class Authentication{
    
    static check(request = { email: undefined, password: undefined, phone: undefined, user: undefined, confirmPassword: undefined }) {
        let validate = {
            errorEmail: request.email != undefined? getErrorLable(configAuthentication.email, request.email) : undefined,
            errorPassword: request.password != undefined? getErrorLable(configAuthentication.password, request.password) : undefined,
            errorPhone: request.phone != undefined? getErrorLable(configAuthentication.phone, request.phone) : undefined,
            errorUser: request.user != undefined? getErrorLable(configAuthentication.username, request.user) : undefined,
            errorConfirmPassword: ''
        };
        return validate
    }
}
