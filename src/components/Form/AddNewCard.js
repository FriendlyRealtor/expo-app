import React from 'react';
import { View, Text } from 'react-native';
import {AppStyle} from '../../assets/style';
import { default as Button } from '../Elements/Button';
import { default as Input } from '../Elements/Input';
import { cardNo as convertCardNo } from '../../helper/utils/FormatUtils';
export default({onSubmit = () => {}}) => {
    const [cardHodler, setCardHolder] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [cardExDate, setCardExDate] = React.useState("");
    const [cvv, setCVV] = React.useState("");
    const [error, setError] = React.useState(null);
    const submit = async () => {
        let isSubmit = true;
        let e = {};
        if(cardHodler == "")
        {
            e.cardHodler = "You need enter your card holder.";
            isSubmit = false;
        }
        if(cardNumber == "")
        {
            e.cardNumber = "You need enter your card number.";
            isSubmit = false;
        }
        if(cardExDate == "")
        {
            e.cardExDate = "You need enter your card expiration date.";
            isSubmit = false;
        }
        if(cvv == "")
        {
            e.cvv = "You need enter your card CVV.";
            isSubmit = false;
        }
        setError(e);
        if(isSubmit)
        {
            onSubmit({
                holder: cardHodler,
                cardNo: cardNumber,
                expire: cardExDate,
                email: "",
                phone: "",
                default: false
            });
        }
    }

    return <View style={[AppStyle.style.groupContainer, AppStyle.style.paddingLarge]}>
        <Text style={[AppStyle.style.p, AppStyle.style.marginBottomLarge]}>ADD NEW CARD</Text>
        <Input 
            label="Card Holder*"
            labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]} 
            inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input]} 
            inputContainerStyle={AppStyle.style.inputContainer} 
            containerStyle={[AppStyle.style.marginBottom]} 
            value={cardHodler}
            changeValue={(text) => setCardHolder(text)}
            error={error && error.cardHodler? error.cardHodler : ""}
        />
        <Input 
            label="Card Number*" 
            labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]} 
            inputStyle={[]} 
            inputContainerStyle={AppStyle.style.inputContainer} 
            containerStyle={[AppStyle.style.marginBottom]} 
            value={convertCardNo(cardNumber, 1)}
            changeValue={(text) => setCardNumber(text.replaceAll(" ", ""))}
            error={error && error.cardNumber? error.cardNumber : ""}
        />
        <View style={{flexDirection: "row"}}>
            <Input 
                label="Expiration Date*" 
                labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]} 
                inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input]} 
                inputContainerStyle={AppStyle.style.inputContainer} 
                placeholder={"mm/yy"}
                max={5}
                containerStyle={[AppStyle.style.marginBottom, {flex: 1}]} 
                value={cardExDate}
                changeValue={(text) => setCardExDate(text)}
                error={error && error.cardExDate? error.cardExDate : ""}
            />
            <Input 
                label="CVV" 
                labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]} 
                inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input]} 
                inputContainerStyle={AppStyle.style.inputContainer} 
                containerStyle={[AppStyle.style.marginBottom, {flex: 1}]} 
                value={cvv}
                changeValue={(text) => setCVV(text)}
                error={error && error.cvv? error.cvv : ""}
                max={3}
            />
        </View>

        <Button label={"Save Card"} onPress={submit} />
    </View>
}