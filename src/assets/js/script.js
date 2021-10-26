

// alert('hello world!') test ok
const swal = require('sweetalert');
const axios = require('axios');
//loader 


document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
      document.querySelector("body").style.visibility = "hidden";
      document.querySelector("#loader").style.visibility = "visible";
  } else {
      document.querySelector("#loader").style.display = "none";
      document.querySelector("body").style.visibility = "visible";
  }
};


const btnBurger = document.querySelector('#menu-icon');
const navigationMenu = document.querySelector('#menu');
const navLinks = document.querySelectorAll('.link-item');

const modal = document.getElementById('modal');
 btnBurger.addEventListener('click',()=>{
    navigationMenu.classList.toggle('show')
})
navLinks.forEach((navLink)=>{
    navLink.addEventListener('click',()=>{
        navigationMenu.classList.remove('show');
        console.log(navLinks);
    }) 
})

const currentDiv =(n)=> {
    showDivs(slideIndex = n);
  }
  
  const showDivs = (n)=> {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " w3-opacity-off";
  }
  //axios 
  // form elment 
  const form = document.querySelector('#contact-form')
  // loading gif
  const btnLoading = document.querySelector('#btn-loading')
  //html input
  const email = document.querySelector('#email');
  const name = document.querySelector('#name')
  const subject=document.querySelector('#subject')
  const message = document.querySelector('#message')
  const btnSend = document.querySelector('#btn-send')

  //error field html
  const emailError = document.querySelector('#eemail')
  const nameError = document.querySelector('#ename')
  const subjectError = document.querySelector('#esubject')
  const messageError = document.querySelector('#emessage')

  btnSend.addEventListener('click',(e)=>{
    btnLoading.style.visibility="visible"
    btnSend.disabled=true;
    // alert(email.value + ' '+name.value+' '+subject.value+' '+message.value)
   e.preventDefault()
     
         axios.post('https://backend-portifo.herokuapp.com/',{
          email:email.value,
          name:name.value,
          subject:subject.value,
          message:message.value
        })
        .then((res)=>{
        //  console.log(res.data.errors[0].param)
         
        //  if(res.data.errors[0].param==='email'){
        //    emailError.innerHTML=res.data.errors[0].msg
        //  }
        btnLoading.style.visibility="hidden"
        btnSend.disabled=false;
        if(res.data.errors){
          res.data.errors.forEach((error)=>{
            if(error.param==='email'){
               emailError.innerHTML=error.msg
               email.value=error.value
               email.style.outlineColor="red"
            }else{
              emailError.innerHTML =""
              email.value =email.value
              email.style.outlineColor ="#0057FF"
            }
            if(error.param==="name"){
             nameError.innerHTML=error.msg
             name.value=error.value
             name.style.outlineColor="red"
            }
            else{
              nameError.innerHTML =""
              name.value = name.value
              name.style.outlineColor ="#0057FF"
            }
            if(error.param==="subject"){
             subjectError.innerHTML=error.msg
             subject.value=error.value
             subject.style.outlineColor = "red"
            } else{
              subjectError.innerHTML =""
              subject.value = subject.value
              subject.style.outlineColor ="#0057FF"
            }
            if(error.param==="message"){
              messageError.innerHTML=error.msg
              message.value=error.value
              message.style.outlineColor = "red"
            }
            else{
              messageError.innerHTML =""
              message.value = message.value
              message.style.outlineColor ="#0057FF"
            }
          })
        }else{
          if(res.data.success){
            swal("Good job!", "Your Message Is Succefully Sent!", "success");
            form.reset(); 

          }else{
            swal("Error", "Some Thing Was Worng Please Try leater!", "error");
          }
        }     
  })
        .catch((err)=>{
          btnLoading.style.visibility="hidden"
          btnSend.disabled=false;
         console.log(err)
        })
    
      })
      
    


    

  