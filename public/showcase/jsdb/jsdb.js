async function jsdbsetup(){
    try {
        const response = await fetch('jsdb/spec.json');
        const data = await response.json();
        console.log(data)
        const bodyp = data.wheretexttypeid;
        const ison = data.jsdbon;
        const dest = data.destid;
        const imgon = data.imgon
        const htmlon = data.allowhtml
        const scripton = data.allowhtmlscript
        const styleon = data.allowhtmlsty
        const titleon = data.titleon
        const titlestart = data.titleid
        const titleend = data.desttitleid
        const specs = [ison, bodyp, dest,htmlon,scripton,styleon,imgon,titleon,titlestart,titleend];
        console.log(specs)
        return specs;
    } catch (error) {
        console.error("Error fetching the JSON data:", error);
    }
}

jsdbsetup().then(stuff => {
    specs = stuff
})

function jsdbsecurity(textin){
        if(!specs[3]){
            textin = textin.replace(/<[^>]*>/g, '');
        } else{
            if(!specs[4]){
                textin = textin.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            }
            if(!specs[5]){
                textin = textin.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
            }
        }
        return textin
    
}

function jsdbparse(message) {
    const container = document.createElement('div');
    message = jsdbsecurity(message);
    message = message.replace(/\[([^\]=]+)(=[^\]]+)?\](.*?)\[\/\1\]/g, (match, tag, attr, content) => {
        switch (tag.toLowerCase()) {
            case 'b':
                return `<strong>${content}</strong>`;
            case 'i':
                return `<em>${content}</em>`;
            case 'u':
                return `<u>${content}</u>`;
            case 'url':
                return `<a href="${attr}" target="_blank">${content}</a>`;
            case 'code':
                return `<code>${content}</code>`;
            case 'quote':
                    return `<blockquote>${content}</blockquote>`;
            case 'e':
                return `<img src=emojis\\${content}.png width=100 height=100></img>`;
            case 'img':
                if(specs[6]==1){
                return `<img src="${attr}" alt="${content}" target="_blank"></img>`;
                } else{
                    return content;
                }
            default:
                return content;
        }
    });

    container.innerHTML = message;
    return container.innerHTML;
}
function addbold(){
    const area = document.getElementById(specs[1]); 
    area.value += "[b][/b]";
}
function additalic(){
    const area = document.getElementById(specs[1]); 
    area.value += "[i][/i]";
}
function addemoji(){
    const area = document.getElementById(specs[1]); 
    area.value += "[e][/e]";
}
function addu(){
    const area = document.getElementById(specs[1]); 
    area.value += "[u][/u]";
}
function addurl(){
    const area = document.getElementById(specs[1]); 
    area.value += "[url=][/url]";
}
function addcode(){
    const area = document.getElementById(specs[1]); 
    area.value += "[code][/code]";
}
function addquote(){
    const area = document.getElementById(specs[1]); 
    area.value += "[quote][/quote]";
}
function addimg(){
    const area = document.getElementById(specs[1]); 
    area.value += "[img=][/img]";
}

function jsdbonoff(){
    specs[0] = !specs[0]
}
function htmlonoff(){
    specs[3] = !specs[3]
}
function scriptonoff(){
    specs[4] = !specs[4]
}
function styleonoff(){
    specs[5] = !specs[5]
}
function imgonoff(){
    specs[6] = !specs[6]
}


function jsdb(){
            if([specs[7]==1]){
                const titlearea = document.getElementById(specs[8]); 
                const displaytitle = document.getElementById(specs[9]); 
                displaytitle.innerHTML = titlearea.value
            }
            const textarea = document.getElementById(specs[1]); 

            const displayarea = document.getElementById(specs[2]); 
            if(specs[0]==1){
            displayarea.innerHTML = jsdbparse(textarea.value)
    } else{ 
    displayarea.innerHTML = textarea.value
    }
}