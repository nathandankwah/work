function toggleChat(){
    let box=document.getElementById("chatbotBox");
    box.style.display=(box.style.display==="flex")?"none":"flex";
}

function handleKey(event){
    if(event.key==="Enter"){ sendMessage(); }
}

function sendMessage(){
    let input=document.getElementById("userInput");
    let message=input.value.trim();
    if(message==="") return;

    let chat=document.getElementById("chatBody");
    chat.innerHTML+=`<div class="user-message">${message}</div>`;
    input.value="";
    showTyping();

    setTimeout(()=>{
        hideTyping();
        chat.innerHTML+=`<div class="bot-message">Thank you! Your message has been sent. We will contact you soon.</div>`;
        chat.scrollTop=chat.scrollHeight;

        // Send message to your email
        sendEmail(message);

    },1000);
}

function showTyping(){ document.getElementById("typing").style.display="block"; }
function hideTyping(){ document.getElementById("typing").style.display="none"; }

// Send feedback to email via PHP
function sendEmail(message){
    fetch('sendmail.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:'message='+encodeURIComponent(message)
    });
}