import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput  } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'


import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'


const TeacherList = () => {

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    const [favorites, setFavorites] = useState<number[]>([])

    const [teachers, setTeachers] = useState([])

    const [isFilterVisible, setIsFilterVisible] = useState(false)

    const loadFavorites = () => {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachersIds)
            }
        })
    }
    

    const handleFiltersSubmit = async() => {
        loadFavorites()
        try {
            const response = await api.get('/classes', {
                params:{
                    week_day,
                    subject,
                    time
                }
            })
            setTeachers(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={() => {setIsFilterVisible(!isFilterVisible)}}>
                        <Feather name="filter" color="#fff" size={20} />
                    </BorderlessButton>
                )}
            >
                    { isFilterVisible && (<View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={(text) => {setSubject(text)}}
                            placeholder="Qual a matéria?"
                            placeholderTextColor= '#c1bccc'
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={(text) => {setWeekDay(text)}}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor= '#c1bccc'
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={(text) => {setTime(text)}}
                                    placeholder="Qual horário?"
                                    placeholderTextColor= '#c1bccc'
                                />
                            </View>
                        </View>


                        <RectButton style={styles.submitButton} onPress={() => {
                            handleFiltersSubmit()
                            setIsFilterVisible(false)
                            }}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                    )}

            </PageHeader>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.teacherList}
              contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 16
              }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />)
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList