import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from "yup";



const validationSchema = yup.object().shape({
  name: yup
          .string()
          .required("é necessário o nome válido"),
  email: yup
          .string()
          .email('email inválido')
          .required("é necessário o nome válido"),

  password: yup
          .string()
          .min( 6, ({min}) => `A senha deve conter pelo menos ${min} caracteres`)
          .required("é necessário o nome válido"),
})

export default function App() {
  const [result, setResult] = useState("");

  function createUserInNodeApi(values){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password
    })

    var requestOption = {
      method : 'POST',
      headers : myHeaders,
      body: raw, 
      redirect: 'follow',
      mode: 'cors',
    };

    fetch("http://localhost:8080/userAdd" , requestOption )
      .then((response) => response.json())
      .then((response) => setResult(response) )
      .catch((error) => console.log(error))
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Front End Node-JS</Text>
      <Text style={styles.subTitle}>Trabalho final de turma de NodeJS</Text>

      <Formik
        style={{}}
        validateOnMount = {true}
        validationSchema = { validationSchema }
        initialValues = {
          {
            name:"",
            email:"",
            password:"",
          }
        }
        onSubmit = {(values) => createUserInNodeApi(values)}
      >
        {
          ({ handleChange, handleBlur, errors, values, touched, handleSubmit }) => (
            <>
              <TextInput
                name="name"
                type={"name"}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                style={styles.inputStyle}
                placeholder="Nome"
              />
                {
                  (errors.name && touched.name ) &&
                  <Text style={styles.titleErrors}>{errors.name}</Text> 
                 }

              <TextInput
                name="email"
                type={"email"}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={styles.inputStyle}
                placeholder="email"
              />
                {
                  (errors.email && touched.email ) &&
                  <Text style={styles.titleErrors}>{errors.email}</Text> 
                 }

              <TextInput
                name="password"
                type={"password"}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={styles.inputStyle}
                placeholder="password"
              />
                {
                  (errors.password && touched.password ) &&
                  <Text style={styles.titleErrors}>{errors.password}</Text> 
                 }

              {
                (result.error && result.message) &&
                <View style={styles.formError}>
                  <Text>{result.message}</Text> 
                </View>
              }
              {
                (!result.error && result.message) &&
                <View style={styles.formOk}>
                  <Text>{result.message}</Text> 
                </View>
              }
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonTitle}>Cadastrar</Text>
              </TouchableOpacity>
            </>
          ) 
        }
      </Formik>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  title: {
    fontSize: 28,
    color: "grey",
    fontWeight: '700',
    marginTop: '2%',
  },
  subTitle: { 
    fontSize: 16,
    color:'gray',
    fontWeight:'700', 
    marginTop:'2%',
  },
  inputStyle:{
    width: 200,
    height: 35,
    borderRadius: 10,
    marginTop: 30,
    padding: 10,
    borderColor: '#0f1b59',
    borderWidth: 1
  },
  button: {
    width: 200,
    height: 35,
    backgroundColor: '#0f1b59',
    borderRadius: 10,
    marginTop: '1%',
  },
  buttonTitle: {
    fontSize: 16,
    color: "#f5f5f5",
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8, 
  },
  titleErrors: {
    fontSize: 12,
    color: 'red',
    fontWeight: "600"
  },
  formError: {
    margin: 30,
    borderRadius: 30,
    height: 35,
    width: 200,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(255, 0, 0, 0.5)",
  },
  formOk: {
    margin: 30,
    borderRadius: 30,
    height: 35,
    width: 300,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 204, 0, 0.5)",
  }

});


      {/* <Text style={styles.title}>Front End Node-JS</Text>
      <Text style={styles.subTitle}>Trabalho final de turma de NodeJS</Text>
      <TextInput 
        placeholder="Digite seu nome"
        onChangeText={(name) => {setName(name) }}
        style={styles.inputStyle}
        ></TextInput>
        <TextInput 
        placeholder="Digite seu email"
        onChangeText={(email) => {setEmail(setEmail) }}
        style={styles.inputStyle}
        ></TextInput>
        <TextInput 
        placeholder="Digite sea senha"
        onChangeText={(password) => {setPassword(password) }}
        style={styles.inputStyle}
        ></TextInput>
        <TouchableOpacity onPress={() => createUserInNodeApi()} style={styles.button}>
          <Text style={styles.buttonTitle}>Cadastrar</Text>
        </TouchableOpacity>
        <Text>{name}</Text>
        <Text>{email}</Text>
        <Text>{password}</Text> */}