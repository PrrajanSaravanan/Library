document.getElementById('signin').addEventListener('submit', function(event) {
    event.preventDefault();
    //console.log('Button clicked, form submission prevented');
    
    const name = document.getElementById('name').value;
    const pass = document.getElementById('password').value;
    const data = { name, password: pass };

    fetch("http://localhost:3000/signin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if(result){
            console.log('navigating');
            window.location.href=`/index.html/?name:${name}`;
         }
    })
    .catch(error => {
        console.log('Error:', error);
    });
});

document.getElementById('signup').addEventListener('submit',function(event) {
    event.preventDefault();
    
    console.log('signup entered');
    const name=document.getElementById('s-name').value;
    const mail=document.getElementById('s-mail').value;
    const pass=document.getElementById('s-pass').value;
    const cpass=document.getElementById('s-cpass').value;
    const data ={name , mail , password:pass}
    console.log(`Data : ${name}`);
    if(pass !== cpass){
        alert("password doesn't match");
        window.location.reload();
    }
    else{
       fetch("http://localhost:3000/signup", {
           method :'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify(data)
       })
       .then(response => response.json())
       .then(result =>{
            if(result){
               console.log('navigating');
               window.location.href=`/index.html/?name:${name}`; 
            }
       })
       .catch(error =>{
            console.log('Error :',error);
       }); 
    }     
});