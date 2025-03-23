document.getElementById('signin').addEventListener('submit', function(event) {
    event.preventDefault();
    //console.log('Button clicked, form submission prevented');
    
    const name = document.getElementById('name').value;
    const pass = document.getElementById('password').value;
    const data = { name,  pass };

    fetch("http://localhost:3000/signin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.status==='unf'){
            alert('invalid username');
            window.location.reload();
        }
        else if  (result.status === 'wp'){
            alert('Wrong Password');
            window.location.reload();
        }
        else if(result.status=='s'){
            console.log('navigating');
            window.location.href=`/index.html/?name:${name}`;
         }
    })
    .catch(error => {
        console.log('Error:', error);
    });
});

