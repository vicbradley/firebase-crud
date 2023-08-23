import { upload } from '@testing-library/user-event/dist/upload';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage"

import { useEffect, useState } from 'react';


function App() {
  const [movieList, setMovieList] = useState([]);

  console.log(auth?.currentUser?.email)

  // New movies state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [isNewMovieAward, setIsNewMovieAward] = useState(false);

  // Update movie title state
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState("");

  // File upload state
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, 'movies');

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
      // console.log(movieList)
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMovieList();
  },[])

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        hasAnAward: isNewMovieAward,
        userId: auth?.currentUser?.uid,
      })

      getMovieList();
    } catch (err) {
      console.log(err);
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);

    getMovieList();
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title: updatedMovieTitle})

    getMovieList();
  }

  const uploadFile = async () => {
    if(!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='app'>
      <Auth />

      <div>
        <h2>Input Movie</h2>
        <input placeholder='Movie Title...' onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input placeholder='Release Date...' type='number' onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}/>
        <input type='checkbox' checked={isNewMovieAward} onChange={(e) => setIsNewMovieAward(e.target.checked)}/>
        <label>Received an Award</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      {movieList.map((movie) => (
        <div>
          <h1 style={{color: movie.hasAnAward ? "green" : "red"}} >{movie.title}</h1>
          <p>Release Date : {movie.releaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

          <input placeholder='Update Title...' onChange={(e) => setUpdatedMovieTitle(e.target.value)} />
          <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
        </div>
      ))}

      <div>
        <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload Image</button>
      </div>

    </div>
  );
}

export default App;
