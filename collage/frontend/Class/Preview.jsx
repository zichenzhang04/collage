import React, {useState, useEffect, lazy} from "react";
import { Button, Popover } from '@mantine/core';
import { IconBookmark, IconStar, IconBookmarkFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import '../CSS/Search.css';
import '../CSS/classPreview.css';
import '../CSS/course_tag.css';
import starFilled from '../Icons/starFilled.svg';
import starEmpty from '../Icons/starEmpty.svg';
// import fullLogo from '../images/full-logo.png';
import icon from '../images/temp.png';
const Rating = lazy(() => import('./rating'))

const Classpreview = () => {
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState(2);
    const [saved, setSaved] = useState(false);
    const updateValue = (value) => {
        setValue(value);
    }
    const handleSave = () => {
        setSaved(!saved);
    }
    const stars = Array(5).fill(0).map((_, index) => (
    <span key={index} className="star">
        {index < 3 ? (
        <img className='star' src= {starFilled} alt="S" />
        ) : (
        <img src= {starEmpty} alt="E" />
        )}
    </span>
    ));
    return (<>
        <div className="content">
            <div className="preview">
                <div className="card">
                    <div className="title-grid">
                        <img src={icon} alt="classicon" className="icon" />
                        <div className="middle">
                            <h1>Biology 212</h1>
                            <p>Plant and Human Health</p>
                            <p className="match">96% match</p>
                        </div>
                        <div className="rating-flex">
                            <div className="rate-and-save">
                                {saved && <Button variant="default" radius="xl" rightSection={<IconBookmarkFilled color="black" size={20} stroke={1}/>} onClick={()=>handleSave()}>Save</Button>}
                                {!saved && <Button variant="default" radius="xl" rightSection={<IconBookmark size={20} stroke={1}/> } onClick={()=>handleSave()}>Save</Button>}
                                <Popover width={300} opened={opened} closeOnClickOutside={false} closeOnEscape={false} onClose={() => setOpened(false)} trapFocus position="bottom" withArrow shadow="md">
                                <Popover.Target>
                                    <Button variant="default" radius="xl" rightSection={<IconStar size={20} stroke={1} onClick={()=> setOpened(true)}/>}>Rate</Button>
                                </Popover.Target>
                                    
                                    <Popover.Dropdown  styles={{dropdown: {color: "black", backgroundColor: "white"}}} radius="md">
                                    <div className="rating">
                                        <Rating fractions={2} defaultValue={5} value={value} updateValue={updateValue}/>
                                        <div className='filters-footer'>
                                            <div className='confirm-button'>
                                            <Button 
                                                    styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                                                    radius="xl" onClick={() => {console.log("confirm"); setOpened(false);}} size="xs">
                                                        Confirm
                                            </Button>
                                            </div>
                                            <div className='cancel-button'>
                                            <Button 
                                                    styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                                                    radius="xl" onClick={() => {console.log("cancel"); setOpened(false);}} size="xs">
                                                        Cancel
                                            </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Dropdown>
                                </Popover>
                                
                            </div>
                            <div className="rating-row">
                            <div>
                                {stars}
                            </div>
                                <span className='star-text'>(Out of 150 people)</span>
                            </div>
                        </div>
                    </div>
                    <div className="newLine">
                        <div className="class-info">
                            <p className="class-title">Credits</p>
                            <p className="value credits">3</p>
                        </div>
                        <div className="class-info">
                            <p className="class-title">Subject</p>
                            <p className="value subject">Biology</p>
                        </div>
                        <div className="class-info">
                            <p className="class-title">Department</p>
                            <p className="value department">LSA</p>
                        </div>
                        <div className="class-info">
                            <p className="class-title">Status</p>
                            <p className="value status">Open</p>
                        </div>
                    </div>
                </div>
                <div className="class-description">
                    <h2 className="desTitle">Course Description</h2>
                    <p className="desc">
                        This course explores basic botany, the human use of plants for food and medicine, and the relationship between environment and human health, requiring active participation in discussions, field trips, and a self-designed project for independent learning. By the end of the course, students will have gained a comprehensive understanding of the vital role plants play in sustaining life on Earth and the complex interplay between human society and the natural world.
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Classpreview