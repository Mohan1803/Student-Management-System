function myFunc(e){
    e.preventDefault();
    
     Validate();

  
  
  
  
  
  //validating username
  
    function Validate(){
    const userid = document.getElementById("userid").value;
    const pwd = document.getElementById("pwd").value;
  
    if(userid.length==0){
      document.getElementById('userid').style.borderColor="#FF0000";
      document.getElementById('demo').innerHTML="Username must be between 3 to 25 characters";
    }
    else{
      document.getElementById('userid').style.borderColor="green";
      document.getElementById('demo').innerHTML="";
    }
    if(pwd.length==0){
      document.getElementById('pwd').style.borderColor="#FF0000";
      document.getElementById('demo1').innerHTML="Invalid Password";
    }
    else{
      document.getElementById('pwd').style.borderColor="green";
      document.getElementById('demo1').innerHTML="";
    }
    if(userid==mohan && pwd==333)
    {
      window.open("addstudent.ejs");
    }
  }
  
 
  

  
 
  
  
  }
    
  
   
  
  
  
    
   
  
  
  
  
  
     
        