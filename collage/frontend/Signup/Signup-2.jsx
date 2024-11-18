import React from 'react';
import { NumberInput, Select } from '@mantine/core';
import '../CSS/Signup.css';
import {majors} from '../Variables';

const Signup2 = ({major, setMajor, startYear, setStartYear, gradYear, setGradYear, valid, setValid}) => {
  const majors = [];
  const checkValid = (e) => {
    if (major !== ''){
      setValid(true);
    }
    else{
      setValid(false);
    }
  }
  return <div>
      <Select
        label="Major"
        placeholder="Select your major"
        data={majors}
        searchable
        valu={major}
        onChange={setMajor}
      />
      <br/>
      <div className='dropDownLine'>
        <div className='dropDown1'>
        <NumberInput value={startYear} onChange={setStartYear} label="Start year" size="lg"
                  styles={
                    {
                      label: {fontSize: 20, textAlign: 'left', alignContent: 'left', color: '#5d5d5d'},
                      input: {fontSize: 20}
                    }
                  }
                  min={2020}
                  max={2025}
        />
        </div>
        <div className='dropDown2'>
        <NumberInput value={gradYear} onChange={setGradYear} label="Expected End Year" size="lg"
                  styles={
                    {
                      label: {fontSize: 20, textAlign: 'left', alignContent: 'left', color: '#5d5d5d'},
                      input: {fontSize: 20}
                    }
                  }
                  min={2025}
                  max={2032}
        />
        </div>
      </div>
  </div>;
  //first text input is required with Label: What's your major and year? Placeholder: Major (intended or declared)
  //next is two side by side native selects with the start and grad years, both are required
  //error occurs if end year is less than start year
};

export default Signup2;