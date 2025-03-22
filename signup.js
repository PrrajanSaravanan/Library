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
            if(result.status==='s'){
               console.log('navigating');
               window.location.href=`/index.html/?name:${name}`; 
            }
            else if(result.status ==='em'){
                alert('An account exits at this mail');
                window.location.reload();
            }
       })
       .catch(error =>{
            console.log('Error :',error);
       }); 
    }     
});