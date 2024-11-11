import React, {useState} from 'react';
import { Button } from '@mantine/core';

const InterestsButton = ({title, interests, setInterests}) => {
    const [clicked, setClicked] = useState(false);
    return <>
        {!clicked && <Button size="compact-sm" key={title} onClick={(e) => {if(clicked) {setInterests(interests.filter((item) => item !== title))} else {setInterests([...interests, title])} setClicked(!clicked);}} radius="xl" variant="default">{title}</Button>}
        {clicked && <Button size="compact-sm" key={title} onClick={(e) => {if(clicked) {setInterests(interests.filter((item) => item !== title))} else {setInterests([...interests, title])} setClicked(!clicked);}} radius="xl" variant="filled">{title}</Button>}
  </>
}

export default InterestsButton;