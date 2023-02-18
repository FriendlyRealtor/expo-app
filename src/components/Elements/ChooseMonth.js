import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { AppStyle } from "../../assets/style";
import { Modal, Portal } from "react-native-paper";

export default ({ listMonth, visible = false, onDimiss = () => {}, onPress = (item) => { } }) => {

    return <Portal>
        <Modal onDismiss={onDimiss} visible={visible} style={{backgroundColor: 'rgba(0,0,0,0.5)'}} contentContainerStyle={{ padding: 15 }}>
        <View style={[AppStyle.style.groupContainer, AppStyle.style.nonePadding, { width: '100%' }]}>
                    <View style={{ flexDirection: "row", marginBottom: 15 }}>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[0])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[0]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[1])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[1]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[2])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[2]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 15 }}>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[3])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[3]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[4])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[4]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[5])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[5]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 15 }}>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[6])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[6]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[7])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[7]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[8])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[8]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 15 }}>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[9])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[9]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[10])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[10]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[AppStyle.style.padding, { flex: 1 }]} >
                            <TouchableOpacity onPress={() => onPress(listMonth[11])} style={[AppStyle.style.contentMiddle, { flex: 1 }]}>
                                <Text style={{ paddingVertical: 15 }}>{listMonth[11]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </Modal>
    </Portal>
}