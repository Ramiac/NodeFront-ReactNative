import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Touchable } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

const loginValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('é necessário um nome valido'),
  email: yup
    .string()
    .email('O email nao é válido')
    .required('é necessário um email válido'),
  password: yup
    .string()
    .min(6, ({min}) => `A senha deve conter pelo menos  ${min} caractres`)
    .required('é necessário uma senha valida válido'),
})

export default function App() {
   function createUserInNodeApi() {
    var myHeaders = new Headers()
    myHeaders.append("Content-type", "application/json")

    var raw = JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    })

    var requesteOption = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      mode: 'cors'
    }

    fetch("http://localhost:8080/userAdd", requesteOption)
      .then((response) => { return response.json() })
      .then((response) => { console.log(response); })
      .catch((error) => { console.log(error); })

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FRONT-END NODE JS</Text>
      <Text style={styles.subTitle}>Trabalho final da turma de node js</Text>
      <Formik
        style={{}}
        validateOnMount={true}
        validationSchema={loginValidationSchema}
        initialValues={
          {
            name: "",
            email: "",
            password: "",
          }
        }
        //para casa 
        onSubmit={values => console.log(values)}
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
                placeholder="Digite seu nome"
              />
              {(errors.name && touched.name) &&
                <Text style={styles.titleErros}>{errors.name}</Text>
              }

              <TextInput
                name="email"
                type={"email"}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={styles.inputStyle}
                placeholder="Digite seu email"
              />
              {(errors.email && touched.email) &&
                <Text style={styles.titleErros}>{errors.email}</Text>
              }

              <TextInput
                name="password"
                type={"password"}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={styles.inputStyle}
                placeholder="Digite sua senha"
                secureTextEntry
              />
              {(errors.password && touched.password) &&
                <Text style={styles.titleErros}>{errors.password}</Text>
              }

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonTitle} >Cadastrar</Text>
              </TouchableOpacity>
            </>
          )
        }

      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    color: 'gray',
    fontWeight: '700',
    marginTop: '10%'
  },
  subTitle: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '700',
    marginTop: '2%'
  },
  inputStyle: {
    width: 200,
    height: 35,
    //backgroundColor:'#0f1b59',
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
    marginTop: '8%',
  },
  buttonTitle: {
    fontSize: 16,
    color: '#f5f5f5',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8
  },
  titleErros: {
    fontSize: 12,
    color: 'red',
    fontWeight: "600"
  }
})




{/* <Text style={styles.title}>FRONT-END NODE JS</Text>
      <Text style={styles.subTitle}>Trabalho final da turma de node js</Text>
      <TextInput
        placeholder="Digite seu nome"
        onChangeText={(name) => { setName(name) }}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Digite seu email"
        onChangeText={(email) => { setEmail(email) }}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Digite sua senha"
        onChangeText={(password) => { setPassword(password) }}
        style={styles.inputStyle}
      />
      <TouchableOpacity style={styles.button} onPress={() => { createUserInNodeApi() }}>
        <Text style={styles.buttonTitle} >Cadastrar</Text>
      </TouchableOpacity> */}