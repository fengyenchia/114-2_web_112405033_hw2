"use client"
import { useState, useEffect } from "react";

export default function Result() {
  
  // useEffect( ()=>{
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then( response => response.json() )
  //   .then( data => console.log(data) )
  //   .catch( error => console.error("Error:", error) );
  // }, []);

  const [id, setId] = useState({name: "", age: 0, city: ""});
  
  function postData(){
    fetch("http://localhost:3002/message-box", {
      method: "POST",
      body: JSON.stringify("YA"),
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }

  useEffect(()=>{
    fetch("http://localhost:3001/person?id=0")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setId(data);
      })

      postData();
  }, []);

  // name: 'John',
  // age: 20,
  // city: 'New York'
  
  return (
    <>
      test api
      <div>
        <div>name: {id.name}</div>
        <div>age: {id.age}</div>
        <div>city: {id.city}</div>
      </div>
    </>
  );

}
