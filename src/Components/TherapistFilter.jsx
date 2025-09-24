import React, { useState } from 'react';

// Dummy data for therapists
const therapists = [
  { id: 1, name: 'Dr. John Doe', gender: 'Male', age: 32, specialty: 'Cognitive Behavioral Therapy', email: 'john.doe@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Dr. Jane Smith', gender: 'Female', age: 29, specialty: 'Psychodynamic Therapy', email: 'jane.smith@example.com', phone: '234-567-8901' },
  { id: 3, name: 'Dr. Alex Brown', gender: 'Male', age: 40, specialty: 'Humanistic Therapy', email: 'alex.brown@example.com', phone: '345-678-9012' },
  { id: 4, name: 'Dr. Emma White', gender: 'Female', age: 34, specialty: 'Family Therapy', email: 'emma.white@example.com', phone: '456-789-0123' },
  { id: 5, name: 'Dr. Liam Green', gender: 'Male', age: 25, specialty: 'Art Therapy', email: 'liam.green@example.com', phone: '567-890-1234' },
  { id: 6, name: 'Dr. Olivia Blue', gender: 'Female', age: 31, specialty: 'Mindfulness-Based Therapy', email: 'olivia.blue@example.com', phone: '678-901-2345' },
  { id: 7, name: 'Dr. Sky Grey', gender: 'Other', age: 22, specialty: 'Play Therapy', email: 'sky.grey@example.com', phone: '789-012-3456' },
  { id: 8, name: 'Dr. Noah Black', gender: 'Male', age: 18, specialty: 'Teen Counseling', email: 'noah.black@example.com', phone: '890-123-4567' },
  { id: 9, name: 'Dr. Ava Pink', gender: 'Female', age: 45, specialty: 'Grief Counseling', email: 'ava.pink@example.com', phone: '901-234-5678' },
  { id: 10, name: 'Dr. Leo Silver', gender: 'Other', age: 37, specialty: 'Trauma Therapy', email: 'leo.silver@example.com', phone: '012-345-6789' },
];

const TherapistFilter = () => {
  const [genderFilter, setGenderFilter] = useState('');
  const [ageGroupFilter, setAgeGroupFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  const filteredTherapists = therapists.filter(therapist => {
    const isGenderMatch = genderFilter ? therapist.gender === genderFilter : true;

    let isAgeGroupMatch = true;
    if (ageGroupFilter) {
      const age = therapist.age;
      switch (ageGroupFilter) {
        case '10-20':
          isAgeGroupMatch = age >= 10 && age <= 20;
          break;
        case '21-30':
          isAgeGroupMatch = age >= 21 && age <= 30;
          break;
        case '31-40':
          isAgeGroupMatch = age >= 31 && age <= 40;
          break;
        case '41+':
          isAgeGroupMatch = age >= 41;
          break;
        default:
          break;
      }
    }

    const isSpecialtyMatch = specialtyFilter ? therapist.specialty === specialtyFilter : true;

    return isGenderMatch && isAgeGroupMatch && isSpecialtyMatch;
  });

  const allSpecialties = [...new Set(therapists.map(t => t.specialty))];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
      <h1 style={{
  textAlign: 'center',
  marginBottom: '4.5rem',
  color: '#222',       // Darker text color for better visibility
  fontSize: '2rem',
  fontWeight: 'bold'
}}>
  Therapist Directory
</h1>


      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div>
          <label>Filter by Gender:</label><br />
          <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)} style={{ padding: '0.5rem' }}>
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Filter by Age Group:</label><br />
          <select value={ageGroupFilter} onChange={e => setAgeGroupFilter(e.target.value)} style={{ padding: '0.5rem' }}>
            <option value="">All</option>
            <option value="10-20">10 - 20</option>
            <option value="21-30">21 - 30</option>
            <option value="31-40">31 - 40</option>
            <option value="41+">41+</option>
          </select>
        </div>

        <div>
          <label>Filter by Specialty:</label><br />
          <select value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)} style={{ padding: '0.5rem' }}>
            <option value="">All</option>
            {allSpecialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredTherapists.length > 0 ? (
        <h2 style={{ textAlign: 'center', color: '#4caf50', marginBottom: '1rem' }}>
          Matched Therapist{filteredTherapists.length > 1 ? 's' : ''} ({filteredTherapists.length})
        </h2>
      ) : (
        <h2 style={{ textAlign: 'center', color: '#f44336', marginBottom: '1rem' }}>
          No therapists matched your filters
        </h2>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        padding: '1rem'
      }}>
        {filteredTherapists.map(therapist => (
          <div key={therapist.id} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{therapist.name}</h3>
            <p><strong>Gender:</strong> {therapist.gender}</p>
            <p><strong>Age:</strong> {therapist.age}</p>
            <p><strong>Specialty:</strong> {therapist.specialty}</p>
            <p><strong>Email:</strong> {therapist.email}</p>
            <p><strong>Phone:</strong> {therapist.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistFilter;
