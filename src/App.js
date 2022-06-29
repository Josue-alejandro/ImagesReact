import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import './header.css'
import './container.css'

function App(){

  const [photos, setPhotos] = useState([])
  const open = link => window.open(link)

  return(
    <div>
      <header>
        <Formik
        initialValues={{search: ''}}
        onSubmit={ async values => {

          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
          {
            headers:{
              'Authorization': 'Client-ID e4yqBOKmw8zOS1a4lPSRcDGykzf7-ngQ6W5PNENbTPo'
            }
          })

          const data = await response.json()
          setPhotos(data.results)
        } 
      }
        >
           <Form>
             <Field name="search" type="text" />
             <button type="submit">Search</button>
           </Form>

        </Formik>
      </header>
      <div className="container">
          <div className="center">
            {photos.map(photo => 
              <article key={photo.id} onClick={() => open(photo.links.html)}>
                <img src={photo.urls.regular} alt={photo.alt_description}/>
                <p>{[photo.description, photo.alt_description].join(' - ')}</p>
              </article>
            )}
          </div>
        </div>
    </div>
    )

}

export default App;
