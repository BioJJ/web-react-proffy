import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PagesHeader'
import TeacherItem, {Teacher} from '../../components/TeacherItem';

import './style.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searcherTeachers(e: FormEvent) {
        e.preventDefault();

        const reponse = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(reponse.data);

    }


    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis.">
                <form id="search-teachers" onSubmit={searcherTeachers}>
                    <Select
                        name="subject"
                        label="Materia"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Matematica', label: 'Matematica' },
                            { value: 'Historia', label: 'Historia' },
                            { value: 'Fisica', label: 'Fisica' },
                            { value: 'Portugues', label: 'Portugues' },
                            { value: 'Ingles', label: 'Ingles' },
                            { value: 'Quimica', label: 'Quimica' },
                            { value: 'Informática', label: 'Informática' },
                            { value: 'Geografica', label: 'Geografica' },
                            { value: 'Espanhol', label: 'Espanhol' },

                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => { setWeek_day(e.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sabado' },

                        ]}
                    />
                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button type="submit">
                        Buscar
                    </button>

                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}

            </main>
        </div>
    )
}

export default TeacherList;