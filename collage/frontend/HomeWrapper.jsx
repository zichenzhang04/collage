import React, {useState, lazy, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '@mantine/core/styles/Button.css'
import './CSS/Search.css';
import {Image} from '@mantine/core';
import { IconSearch, IconBellFilled, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Popover, Checkbox, CheckboxGroup, ScrollArea, TextInput, Flex, Title, Button, ActionIcon, rem, Group, Text} from '@mantine/core';
import fullLogo from './images/full-logo.png';
import Cookies from 'js-cookie';
// import ClassCard from './Class-Card';
const Catalog = lazy(() => import('./Explore/Catalog'));
const Network = lazy(() => import('./Network/NetworkWrapper'));
const Messages = lazy(() => import('./Messages/MessagesWrapper'));
const Profile = lazy(() => import('./UserProfile/ProfileWrapper'));

const Home = () => {
    //pass in a state to navbar that reflects the page being selected
    //also pass in search query and filters to navbar
    const searchIcon = <IconSearch style={{width: rem(16), height: rem(16)}}/>
    const [opened, setOpened] = useState(false);
    // const [schoolOpened, setSchoolOpened] = useState(false);
    // const [creditsOpened, setCreditsOpened] = useState(false);
    // const [majorOpened, setMajorOpened] = useState(false);
    const [value, setValue] = useState([]);
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState("");
    const [currData, setCurrData] = useState([]);
    const [fetchedFilters, setFetchedFilters] = useState([]);
    const [currPage, setCurrPage] = useState("Explore");
    const fetchFilters = async () => {
        const result = await fetch("/api/filters/", {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${Cookies.get('access_token')}`,
            },
          },)
          .then((response) => response.json())
          .then((data) => {console.log(data); setFetchedFilters(data);});
    }
    const handleSearch = async () => {
        const result = await fetch("/api/search/", {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${Cookies.get('access_token')}`,
            }, 
            body: JSON.stringify({search_string: search,
                                  filters: filters
            }),
          },)
          .then((response) => response.json())
          .then((data) => setCurrData(data));
    }
    useEffect(() => {handleSearch()}, [filters]);
    useEffect(() => {fetchFilters()}, []);

    return (
        <div className="main-grid">
          <div className="sidebar">
            <Image src={ fullLogo } className="collage-header"/>
          </div>
          <div className="navbar">
            <Group grow preventGrowOverflow="false" justify="space-between" style={{ width: '100%' }}>
                    {currPage == "Explore" && <>
                            <TextInput
                                // variant="filled"
                                styles={{
                                    input: { backgroundColor: '#E4E4E4'},
                                    section: {color: 'black'},
                                    root: {width: '90%', marginLeft: '30px'}
                                }}
                                onKeyDown={(e) => {if(e.key==='Enter'){handleSearch();}}}
                                value={search}
                                onChange={(e) => setSearch(e.currentTarget.value)}
                                leftSection={searchIcon}
                                radius="xl"
                                placeholder="Search for a course, professor, subject, etc."/>
                        {/* {filters.map((filter) => <Button key={filter}>{filter}</Button>)} */}
                        <Popover width={300} opened={opened} closeOnClickOutside={false} closeOnEscape={false} onClose={() => setOpened(false)} trapFocus position="bottom" withArrow shadow="md">
                        <Popover.Target>
                            <Button 
                                styles={{root: {color: "#242424", fontWeight: 'normal', width: '90px'}}} autoContrast="false" variant="filled" color="#E4E4E4" 
                                radius="xl" onClick={() => {if (opened === false) {setOpened(true); console.log("opening")} else {setOpened(false); setValue(filters);}}} rightSection={opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}>
                                All filters
                            </Button>
                        </Popover.Target>
                        <Popover.Dropdown  styles={{dropdown: {color: "black", backgroundColor: "white"}}} radius="md">
                        {/* Change the checkdowns below based on backend filters from db in the future. 
                        It will take some design to figure it out once we have classes and categories */}
                        <CheckboxGroup value={value} onChange={setValue}>
                            {fetchedFilters.map((category) => 
                                <div>
                                    <Text ta="center">{category.category}</Text>
                                    <div className='filter-borders'>
                                        <ScrollArea h={100} offsetScrollbars>
                                            {category.filters.map((filter) =>
                                                <Checkbox value={filter.filter_value} label={filter.filter_name} />
                                            )}
                                        </ScrollArea>
                                    </div>
                                </div>
                            )
                            }
                        </CheckboxGroup>
                        <div className='filters-footer'>
                            <div className='confirm-button'>
                                <Button 
                                        styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                                        radius="xl" onClick={() => {setFilters(value); setOpened(false);}} size="xs">
                                            Confirm
                                </Button>
                            </div>
                            <div className='cancel-button'>
                                <Button 
                                        styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                                        radius="xl" onClick={() => {setValue([]);}} size="xs">
                                            Clear All
                                </Button>
                            </div>
                        </div>
                        </Popover.Dropdown>
                        </Popover>
                    </>}
                    <Group gap="s" justify="right" style={{ marginRight: '10px', width: '30%' }}>
                        {/* Change these to change state instead which will render the "Some Page portion" */}
                        <Link onClick={()=>setCurrPage("Network")}>Network</Link>
                        <Link onClick={()=>setCurrPage("Explore")}>Explore</Link>
                        <Link onClick={()=>setCurrPage("Messages")}>Messages</Link>
                        <Link onClick={()=>setCurrPage("Profile")}>Profile</Link>
                        <ActionIcon color="#ECECEC" radius="md" size="lg" variant="filled">
                            <IconBellFilled fill="#3F3F3F"/>
                        </ActionIcon>
                    </Group>
            </Group>
          </div>
          {currPage == "Explore" && <Catalog/>}
          {currPage == "Network" && <Network/>}
          {currPage == "Messages" && <Messages/>}
          {currPage == "Profile" && <Profile/>}
          
        </div>
      );
};

export default Home;