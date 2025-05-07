import React, { useState } from 'react';

// Dummy data for therapists
const therapists = [
  { id: 1, name: 'Dr. John Doe', gender: 'Male', age: 32, specialty: 'Cognitive Behavioral Therapy' },
  { id: 2, name: 'Dr. Jane Smith', gender: 'Female', age: 29, specialty: 'Psychodynamic Therapy' },
  { id: 3, name: 'Dr. Alex Brown', gender: 'Male', age: 40, specialty: 'Humanistic Therapy' },
  { id: 4, name: 'Dr. Emma White', gender: 'Female', age: 34, specialty: 'Family Therapy' },
  { id: 5, name: 'Dr. Liam Green', gender: 'Male', age: 25, specialty: 'Art Therapy' },
  { id: 6, name: 'Dr. Olivia Blue', gender: 'Female', age: 31, specialty: 'Mindfulness-Based Therapy' },
];

// TherapistFilter component
const TherapistFilter = () => {
  const [genderFilter, setGenderFilter] = useState('');
  const [ageGroupFilter, setAgeGroupFilter] = useState('');

  // Filter the therapists based on selected filters
  const filteredTherapists = therapists.filter(therapist => {
    const isGenderMatch = genderFilter ? therapist.gender === genderFilter : true;
    const isAgeGroupMatch =
      ageGroupFilter
        ? ageGroupFilter === '30-35'
          ? therapist.age >= 30 && therapist.age <= 35
          : ageGroupFilter === '25-30'
          ? therapist.age >= 25 && therapist.age <= 30
          : true
        : true;

    return isGenderMatch && isAgeGroupMatch;
  });

  return (
    <div>
      <h1>Therapist Directory</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Filter by Gender: </label>
        <select onChange={(e) => setGenderFilter(e.target.value)} value={genderFilter}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Filter by Age Group: </label>
        <select onChange={(e) => setAgeGroupFilter(e.target.value)} value={ageGroupFilter}>
          <option value="">All</option>
          <option value="30-35">30 - 35 Years</option>
          <option value="25-30">25 - 30 Years</option>
        </select>
      </div>

      <div>
        <h2>Filtered Therapists:</h2>
        <ul>
          {filteredTherapists.map((therapist) => (
            <li key={therapist.id}>
              <h3>{therapist.name}</h3>
              <p>Gender: {therapist.gender}</p>
              <p>Age: {therapist.age}</p>
              <p>Specialty: {therapist.specialty}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TherapistFilter;
