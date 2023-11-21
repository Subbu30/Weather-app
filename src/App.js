import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'



const Application = styled.div`
background-color: rgba(0,0,0,0.1);
width:100%;
height:100vh;
position: relative;
color: #fff;

`

const Background = styled.div`
background: url("https://wallpaperaccess.com/full/1644213.jpg") no-repeat center center/cover;
width:100%;
height:100%;
top:0;
bottom:0;
position: absolute;
z-index: -1;
`

const TextContainer = styled.div`
text-align: center;
padding: 1rem;
z-index: 1;
`
const Input = styled.input`
border:2px solid rgba(255,255,255,0.6);
border-radius: 10px;
width: 20%;
height: 20px;
padding:1rem;
background: rgba(255,255,255,0.4);
color: rgba(0,0,0,0.7);
outline: none;
::placeholder {
       color: rgba(0,0,0,0.7);
   }
`
const Container = styled.div`
top: 10%;
/* max-width: 700px; */
height: 80vh;
position: relative;
margin: 1rem auto;
display: flex;
flex-direction: column;
padding: 0 1rem;
justify-content: space-evenly;
font-weight: 500;
`

const TopContainer = styled.div`

`

const Location = styled.p`
font-size: 2rem;

`
const Temperature = styled.h1`
`
const BottomContainer = styled.div`
display: flex;
text-align: center;
margin: auto;
width: 80%;
justify-content: space-evenly;
border: 2px solid rgba(255,255,255,0.6);
border-radius: 10px;
background: rgba(255,255,255,0.4);
`

const BottomContent = styled.div`
`
const BottomTexts = styled.p``



function App() {

  const [location, setLocation] = useState('')
  const [data, setData] = useState({})

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=655f5199cac5123377f2297fb30269de`

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(URL).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <Application>

      <TextContainer>
        <Input placeholder='Enter Location'
          type="text"
          value={location}
          onKeyPress={searchLocation}
          onChange={(event) => setLocation(event.target.value)}
        ></Input>
      </TextContainer>

      <Background>
        <Container>

          <TopContainer>
            <Location>{data.name}</Location>
            {data.main ? <Temperature>{data.main.temp} °F</Temperature> : null}

          </TopContainer>

          <BottomContainer>
            <BottomContent>
              <BottomTexts>Feels Like</BottomTexts>
              {data.main ? <BottomTexts>{data.main.feels_like} °F</BottomTexts> : null}
            </BottomContent>

            <BottomContent>
              <BottomTexts>Wind Speed</BottomTexts>
              {data.wind ? <BottomTexts>{data.wind.speed} km/h</BottomTexts> : null}
            </BottomContent>

            <BottomContent>
              <BottomTexts>Humidity</BottomTexts>
              {data.main ? <BottomTexts>{data.main.humidity} %</BottomTexts> : null}              
            </BottomContent>

          </BottomContainer>

        </Container>
      </Background>
    </Application>
  );
}

export default App;
