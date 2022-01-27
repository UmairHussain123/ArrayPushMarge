import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  Button,
  IconButton,
  TextInput,
  Menu,
  Provider,
  Checkbox,
} from "react-native-paper";
import logoutIcon from "../../../assets/images/logout3.png";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
const AddReport = ({ navigation, route }) => {
  const Theme = {
    colors: { primary: "#006e51", underlineColor: "transparent" },
  };
  //APi Data Get
  const [severityData, setSeverityData] = useState([]);
  const [msg, setMsg] = useState([]);
  const [acData, setAcData] = useState([]);
  const [acRegData, setAcRegData] = useState([]);
  const [sta, setSta] = useState([]);
  // State
  const [severity, setSeverity] = useState("");
  const [acType, setAcType] = useState("");
  const [acReg, setAcReg] = useState("");

  useEffect(() => {
    const getACType = async () => {
      const severityResp = await axios.get(
        "https://apisafety.piac.com.pk/index.php/api/severity_levels"
      );
      setSeverityData(severityResp.data.data);
      const Ac_TypeResp = await axios.get(
        "https://apisafety.piac.com.pk/index.php/api/actypes"
      );
      // console.log(Ac_TypeResp.data.data);
      setAcData(Ac_TypeResp.data.data);
      const acRegResp = await axios.get(
        "https://apisafety.piac.com.pk/index.php/api/aircrafts"
      );
      // console.log(acRegResp.data.data);
      setAcRegData(acRegResp.data.data);
      // station
      const countriesResp = await axios.get(
        "https://apisafety.piac.com.pk/index.php/api/countries"
      );
      // console.log("countriesResp.data.data",countriesResp.data.data);

      const citiesResp = await axios.get(
        "https://apisafety.piac.com.pk/index.php/api/cities"
      );
      // console.log("citiesResp.data.data", citiesResp.data.data);
      // console.log(acRegResp.data.data);

      var countries = countriesResp.data.data;
      // country.push(countriesResp.data.data);
      var cities = citiesResp.data.data;

      const countries_and_cities = [];

      countries.forEach((country) => {
        const matchC = cities.filter((city) => {
          return city.country_id == country.country_id;
        });

        matchC.forEach((c) => {
          countries_and_cities.push({
            country_id: country.country_id,
            country: country.country_name,
            city: c.city_name,
            code: c.imp_code,
          });
        });
      });
      console.log(countries_and_cities);

      // const { country_id } = cities[0];
      // console.log(country_id);
      // var stations = country.filter(function (id1) {
      //   return cities.some(function (id2) {
      //     return id1.country_id === id2.country_id; // return the ones with equal id
      //   });
      // });

      // countries.forEach(({ country_id
      //  }) => {
      //   const cid = country_id;
      //   cities.forEach((cities) => {
      //     if (cities.country_id == cid) {
      //       console.log(country_id + cities.city_name);
      //     }
      //   });
      // });

      // city.push(citiesResp.data.data);
      // console.log(city[0][0]);
      // var newArry = country.filter((id) => {
      //   return id;
      // });
      // console.log(newArry[0][0].country_name);
      // console.log(newArry[4].country_name);
    };

    getACType();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      title: "Safety App",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <>
          <IconButton
            onPress={() => navigation.popToTop()}
            color="#006e51"
            icon={logoutIcon}
            size={25}
          />
        </>
      ),
    });
  }, [navigation]);
  // choose file
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: "true",
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  //Date state
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateState, setDateState] = useState("");
  const [timeState, seTimeState] = useState("");
  const [dateTime, seDateTime] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios" || Platform.OS === "web");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = "" + tempDate.getHours() + ":" + tempDate.getMinutes();
    setDateState(fDate);
    seTimeState(fTime);
    seDateTime(fDate + " " + fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  // station
  const station = [
    { id: 1, sta: "KHI" },
    { id: 2, sta: "ISB" },
    { id: 3, sta: "LAH" },
    { id: 4, sta: "MUL" },
  ];
  // station
  const [visible, setVisible] = React.useState(false);
  //
  // station Menu
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [stations, setStations] = useState("");

  const [visibleseverity, setVisibleseverity] = React.useState(false);

  const openMenuseverity = () => setVisibleseverity(true);
  const closeMenuseverity = () => setVisibleseverity(false);

  const [visibleAirType, setVisibleAirType] = React.useState(false);

  const openMenuAirType = () => setVisibleAirType(true);
  const closeMenuAirType = () => setVisibleAirType(false);

  // Aircraft Registration No

  const [visibleAirReg, setVisibleAirReg] = React.useState(false);

  const openMenuAirReg = () => setVisibleAirReg(true);
  const closeMenuAirReg = () => setVisibleAirReg(false);

  // CheckBox
  const [checked, setChecked] = React.useState(false);
  // state

  const [placeholder, setplaceHoeder] = useState(
    <Text>
      Hazard Description<Text style={{ color: "red" }}> *</Text>
    </Text>
  );
  const [hzdDes, setHzdDes] = useState("");
  const [proSol, setProSol] = useState("");
  const [fltNo, setFltNo] = useState("");

  return (
    <Provider>
      <Text
        style={{
          color: "#006e51",
          fontWeight: "bold",
          fontSize: 25,
          marginTop: 10,
          alignSelf: "center",
          textDecorationLine: "underline",
        }}
      >
        HAZARD REPORT
      </Text>
      <ScrollView>
        <View style={styles.mainView}>
          <View>
            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderRadius: 5,
                  height: 40,
                  borderColor: "gray",
                }}
              >
                <Button
                  icon="calendar"
                  color="black"
                  mode="text"
                  onPress={showDatepicker}
                  style={{ flex: 0.5 }}
                >
                  <Text style={{ textTransform: "capitalize" }}>Date</Text>{" "}
                  <Text style={{ color: "red" }}>*</Text>
                </Button>
                <Text
                  style={{
                    flex: 0.5,
                    color: "#006e51",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  {dateState}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderRadius: 5,
                  height: 40,
                  marginTop: 10,
                  borderColor: "gray",
                }}
              >
                <Button
                  icon="clock"
                  color="black"
                  mode="text"
                  style={{ flex: 0.5 }}
                  onPress={showTimepicker}
                >
                  <Text style={{ textTransform: "capitalize" }}>Time</Text>{" "}
                  <Text style={{ color: "red" }}>*</Text>
                </Button>
                <Text
                  style={{
                    flex: 0.5,
                    // marginTop: 15,
                    color: "#006e51",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  {timeState}
                </Text>
              </View>
            </View>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is12Hour={true}
                display="default"
                onChange={onChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          <TextInput
            mode="outlined"
            label={placeholder}
            // placeholder="250 characters Max"
            placeholder="250 characters Max"
            style={(styles.inputField, { height: 100, marginTop: 10 })}
            theme={Theme}
            maxLength={250}
            value={hzdDes}
            onChangeText={(text) => {
              setHzdDes(text);
            }}
            multiline
          />

          <TextInput
            mode="outlined"
            label="Proposed Solution"
            placeholder="250 characters Max"
            maxLength={250}
            style={(styles.inputField, { height: 100, marginTop: 10 })}
            theme={Theme}
            value={proSol}
            onChangeText={(text) => {
              setProSol(text);
            }}
            multiline
          />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "lightgray",
              flex: 1,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                flex: 1,
                // justifyContent: "center",
                alignSelf: "center",
                // marginLeft: 50,
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Station<Text style={{ color: "red" }}> *</Text>
            </Text>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button
                  mode="outlined"
                  onPress={openMenu}
                  style={(styles.menubtn, { flex: 0.01, borderWidth: 0 })}
                  icon="chevron-down"
                  color="black"
                >
                  <Text style={{ color: "black" }}>
                    {stations}
                    <Text style={{ color: "red" }}> </Text>
                  </Text>
                </Button>
              }
              statusBarHeight={0}
            >
              {station.map((item, id) => {
                return (
                  <Menu.Item
                    key={id}
                    onPress={() => {
                      setStations(item.sta);
                      // cascading(item.id);
                      closeMenu(false);
                    }}
                    title={item.sta}
                  />
                );
              })}
            </Menu>
          </View>
          {/* serverty */}
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "lightgray",
              flex: 1,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                flex: 1,
                // justifyContent: "center",
                alignSelf: "center",
                // marginLeft: 50,
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Severity Level<Text style={{ color: "red" }}> *</Text>
            </Text>
            <Menu
              visible={visibleseverity}
              onDismiss={closeMenuseverity}
              anchor={
                <Button
                  mode="outlined"
                  onPress={openMenuseverity}
                  style={(styles.menubtn, { flex: 0.01, borderWidth: 0 })}
                  icon="chevron-down"
                  color="black"
                >
                  <Text style={{ color: "black" }}>{severity}</Text>
                </Button>
              }
              statusBarHeight={0}
            >
              {severityData.map((item, id) => {
                return (
                  <Menu.Item
                    key={id}
                    onPress={() => {
                      setSeverity(item.level_name);
                      // cascading(item.id);
                      closeMenuseverity(false);
                    }}
                    title={item.level_name}
                  />
                );
              })}
            </Menu>
          </View>
          {severity === "Potential Risk / Risk Register" ? (
            <View
              style={{
                borderRadius: 5,
                borderWidth: 0.5,
                marginTop: 5,
                margin: 3,
                padding: 5,
                backgroundColor: "#c6e6f5",
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  padding: 3,
                }}
              >
                <Text style={{ color: "red" }}>*Severity level:</Text> The
                Hazard that being reported could casue to a possible
                accident/pronounce.
              </Text>
            </View>
          ) : severity === "Occurence" ? (
            <View
              style={{
                borderRadius: 5,
                borderWidth: 0.5,
                marginTop: 5,
                margin: 3,
                padding: 5,
                backgroundColor: "#ffdad6",
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  padding: 3,
                }}
              >
                <Text style={{ color: "red" }}>*Severity level:</Text> The
                Hazard that being reported has already taken place.
              </Text>
            </View>
          ) : (
            <Text></Text>
          )}
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              // fontSize: 20,
              marginTop: 10,
              // alignSelf: "center",
              marginLeft: 2,
            }}
          >
            If you want to tell us more:
          </Text>
          {/* Aircraft Type */}
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "lightgray",
              flex: 1,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                flex: 1,
                // justifyContent: "center",
                alignSelf: "center",
                // marginLeft: 50,
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Aircraft Type
            </Text>
            <Menu
              visible={visibleAirType}
              onDismiss={closeMenuAirType}
              anchor={
                <Button
                  mode="outlined"
                  onPress={openMenuAirType}
                  style={(styles.menubtn, { flex: 0.01, borderWidth: 0 })}
                  icon="chevron-down"
                  color="black"
                >
                  <Text style={{ color: "black" }}>{acType}</Text>
                </Button>
              }
              statusBarHeight={0}
            >
              {acData.map((item, id) => {
                return (
                  <Menu.Item
                    key={id}
                    onPress={() => {
                      setAcType(item.title);
                      // cascading(item.id);
                      closeMenuAirType(false);
                    }}
                    title={item.title}
                  />
                );
              })}
            </Menu>
          </View>

          {/* Aircraft Registration No */}
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "lightgray",
              flex: 1,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                flex: 1,
                // justifyContent: "center",
                alignSelf: "center",
                // marginLeft: 50,
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Aircraft Registration No
            </Text>
            <Menu
              visible={visibleAirReg}
              onDismiss={closeMenuAirReg}
              anchor={
                <Button
                  mode="outlined"
                  onPress={openMenuAirReg}
                  style={(styles.menubtn, { flex: 0.01, borderWidth: 0 })}
                  icon="chevron-down"
                  color="black"
                >
                  <Text style={{ color: "black" }}>{acReg}</Text>
                </Button>
              }
              statusBarHeight={0}
            >
              {/* {console.log("tempAcRegsState zubair", tempAcRegsState)} */}
              {acRegData.map((item, id) => {
                return (
                  <Menu.Item
                    key={id}
                    onPress={() => {
                      setAcReg(item.ac_title);
                      // cascading(item.id);
                      closeMenuAirReg(false);
                    }}
                    title={item.ac_title}
                  />
                );
              })}
            </Menu>
          </View>
          <TextInput
            mode="outlined"
            label="Flight No"
            maxLength={5}
            keyboardType="numeric"
            style={(styles.inputField, { marginTop: 15 })}
            theme={Theme}
            value={fltNo}
            onChangeText={(text) => {
              setFltNo(text);
            }}
          />

          <View style={{ width: 150 }}>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                borderRadius: 7,
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "lightgray",
                borderWidth: 1,
                borderColor: "gray",
              }}
            >
              <IconButton icon="file" color="#006e51" />
              <Text>Choose File</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              ></Image>
            )}
          </View>
          <View
            style={{
              marginTop: 15,
              padding: 5,
              borderWidth: 1,
              backgroundColor: "#ffdad6",
              borderColor: "red",
            }}
          >
            <Text style={{ color: "red" }}>File Attachemt:</Text>
            <Text>
              Only word, excel, pdf & images
              (doc,docx,xls,xlsx,pdf,gif,png,jpeg,jpg) are allowd
            </Text>
            <Text>Each file must not be exceed from 5mb</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setChecked(!checked);
              console.log();
              !checked
                ? alert("Selected confidentials report type")
                : alert("Selected Normal report type");
            }}
          >
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                color="#006e51"
              />
              <Text style={{ fontWeight: "bold" }}>Confidentials</Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              // fontSize: 20,
              marginTop: 5,
              // alignSelf: "center",
            }}
          >
            Mandatory Fields <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Button
              style={{ flex: 0.5 }}
              icon="cloud-upload"
              mode="contained"
              color="#006e51"
              onPress={() => console.log("Pressed")}
            >
              Submit Report
            </Button>
            <Button
              style={{ flex: 0.5, marginLeft: 5 }}
              icon="recycle"
              mode="contained"
              color="red"
              onPress={() => {
                setDateState("");
                seTimeState("");
                setFltNo("");
                setHzdDes("");
                setImage(null);
                setProSol("");
                setStations("");
                setSeverity("");
                setAcReg("");
                setAcType("");
              }}
            >
              Reset Report
            </Button>
          </View>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default AddReport;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // justifyContent: "center",
    width: Dimensions.get("screen").width - 30,
    marginBottom: 20,
    alignSelf: "center",
  },
  inputField: { height: 45, borderRadius: 7 },
  menubtn: {
    borderWidth: 1,
    // marginTop: 10,
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
  },
});
