// src/Form.js
import React, { useState, useEffect } from 'react';

const Form = () => {
    const [name, setName] = useState('');
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState('');
    const [relation, setRelation] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/persons')
            .then(response => response.json())
            .then(data => {
                setPersons(data.persons);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            first_person_name: name,
            second_person_id: selectedPerson,
            relationship: relation
        };

        fetch('http://localhost:3000/api/relations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // You can add more actions here, like displaying a success message
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter Name" 
            /> is &nbsp;
            <select value={relation} onChange={(e) => setRelation(e.target.value)}>
                <option value="">Select a relation</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
            </select> of &nbsp;
            <select value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)}>
                <option value="">Select a person</option>
                {persons.map(person => (
                    <option key={person.id} value={person.id}>
                        {person.name}
                    </option>
                ))}
            </select>
            &nbsp;
            <button type="submit">Upload</button>
        </form>
    );
};

export default Form;
