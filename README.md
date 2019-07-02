# UFTC Ultimate Functional Training Challenge

Capstone projekti.

## Ohjeet

1. kloonaa repo, mene repon kansioon
2. `npm install` asentaa noden moduulit
3. `npm run server` käynnistää json-server REST APIn
   - http://localhost:3001/challenges
   - http://localhost:3001/challenges/1/activities
   - http://localhost:3001/users/1/performances
4. `npm start` käynnistää react frontin

## Bulma CSS tyylien customointi

1. muokkaa tiedostoa `sass/mystyles.scss`
2. aja komento `npm run css-build`
3. tehty noudattaen ohjeita: https://bulma.io/documentation/customize/with-node-sass/

## Fontawesome ikonit ja React

Ikonien käyttöön Reactissa on heidän virallinen komponenttikirjasto https://github.com/FortAwesome/react-fontawesome

Asennettiin ohjeita noudattaen:

- `npm i --save @fortawesome/fontawesome-svg-core`
- `npm i --save @fortawesome/free-solid-svg-icons`
- `npm i --save @fortawesome/react-fontawesome`
- `npm i --save @fortawesome/free-brands-svg-icons`

## Reititys

Kurssimateriaalin 7. kappale neuvoo miten tuo React-router toimii: https://fullstackopen.com/osa7/react_router
