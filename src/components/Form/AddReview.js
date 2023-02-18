import React from 'react';
import { View, Text } from 'react-native';
import { default as Button } from '../Elements/Button';
import { default as Input } from '../Elements/Input';
import {AppStyle} from '../../assets/style';
const max = 255;
export default({onSubmit = (yourName, yourReivew) => {}}) => {
    const [yourName, setYourName] = React.useState("");
    const [yourReview, setYourReview] = React.useState("");
    const [error, setError] = React.useState(null);
    const submit = () => {
        var isSubmit = true;
        if(yourName == "")
        {
            isSubmit = false;
            setError({yourName: "Your name cannot be left blank*"})
        }
        if(isSubmit)
            onSubmit(yourName, yourReview)
    }
    return <>
        <Input 
            label={"Your Name*"} 
            labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]} 
            inputContainerStyle={AppStyle.style.inputContainer}    
            inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input]}
            containerStyle={[AppStyle.style.marginBottom]} 
            value={yourName}
            changeValue={(text) => setYourName(text)}
            error={error && error.yourName? error.yourName : ""}
        />
        <Input 
            label={"Write Your Review*"} 
            labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]} 
            inputContainerStyle={AppStyle.style.inputContainer}    
            inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input, {height: 70}]}
            containerStyle={[{marginBottom: 35}]} 
            value={yourReview}
            changeValue={(text) => setYourReview(text)}
            multiline={true}
            max={max}
            error={`Maxinum Characters: ${max}`}
            errorStyle={{color: AppStyle.color.gray}}
        />
        <Button label={"Submit"} onPress={submit} />
    </>
}