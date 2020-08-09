import React, { useState, FormEvent } from 'react'
import PageHeader from '../../Components/PageHeader'
import { useHistory } from 'react-router-dom'

import './styles.css'
import Input from '../../Components/Input'

import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../Components/TextArea'
import Select from '../../Components/Select'
import api from '../../services/api'

const TeacherForm = () => {
    const history = useHistory()

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: '0', from: '', to: ''},
    ])

    const addNewScheduleItem = () => {
        setScheduleItems([...scheduleItems, {
            week_day: '5',
            from: '5:00 AM',
            to: '8:00 AM'
        }])
    }

    const handleCreateClass = (e: FormEvent) => {
        e.preventDefault()
        console.log({name, avatar, whatsapp, bio, subject, cost, scheduleItems})
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('cadastro realizado com sucesso')
            history.push('/')
        }).catch(() => {alert('erro no cadastro')})
    }

    const setScheduleItemValue = (position:number, field:string, value:string ) => {
        const updatedScheduleItems = scheduleItems.map((item, index) =>{
            if(index === position){
                return {...item, [field]: value}
            }
            return item
        })
        setScheduleItems(updatedScheduleItems)
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={(e) => {handleCreateClass(e)}}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input name="name" label="Nome completo" value={name} onChange={(event) => setName(event.target.value)} />
                        <Input name="avatar" label="Avatar" value={avatar} onChange={(event) => setAvatar(event.target.value)} />
                        <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} />
                        <Textarea name="bio" label="Biografia" value={bio} onChange={(event) => setBio(event.target.value)} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(event) => {setSubject(event.target.value)}}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'História', label: 'História' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Geografia', label: 'Geografia' },
                            ]}
                        />
                        <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(event) => {setCost(event.target.value)}} />
                    </fieldset>
                        
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={() => {addNewScheduleItem()}}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((item, index) => {return(
                            <div key={item.week_day} className="schedule-item">
                            <Select
                                name="week_day"
                                label="Dia da semana"
                                onChange={(e) => {setScheduleItemValue(index, 'week_day', e.target.value)}}
                                value={item.week_day}
                                options={[
                                    { value: '0', label: 'Domingo' },
                                    { value: '1', label: 'Segunda-feira' },
                                    { value: '2', label: 'Terça-feira' },
                                    { value: '3', label: 'Quarta-feira' },
                                    { value: '4', label: 'Quinta-feira' },
                                    { value: '5', label: 'Sexta-feira' },
                                    { value: '6', label: 'Sábado' },
                                ]}
                            />
                            <Input
                                name="from"
                                label="Das"
                                type="time"
                                value={item.from}
                                onChange={(e) => {setScheduleItemValue(index, 'from', e.target.value)}}
                            />

                            <Input
                                name="to"
                                label="Até"
                                type="time"
                                value={item.to}
                                onChange={(e) => {setScheduleItemValue(index, 'to', e.target.value)}}
                            />
                        </div>
                        )})}
                        
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm