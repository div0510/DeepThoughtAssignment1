let taskContainer = document.getElementById('taskCont..');
let taskHeading = document.getElementById('taskHeading');
let spanDownUpIcon = '<span class="extend" id="downArrow"><i class="fas fa-angle-down  iconAD  "></i></span>';
let taskContainerHead = document.getElementById('containerHeadName');
let journeyContainer  = document.getElementById('journeyContainer');
let asideContainer= document.getElementsByClassName('aside');

let form1 = `<div class="fas fa-angle-up formHead " data-mdb-toggle="collapse" data-mdb-target="#fform">Thread A</div>
<div id="fform">
<form action="#" class="formSt">
<div class="form-outline formItem">
    <input type="email" id="typeEmail" class="form-control" />
    <label class="form-label" for="typeEmail">Email</label>
</div>
<div class="form-outline formItem">
    <input type="password" id="typePassword" class="form-control" />
    <label class="form-label" for="typePassword">Password</label>
</div>
<div class="form-outline formItem">
    <input type="tel" id="typePhone" class="form-control" />
    <label class="form-label" for="typePhone">Phone number</label>
</div>
<div>
    <button type="button" class="btn btn-primary ">  Submit</button>
</div>
</form>`

let textarea1 = `<div class="form-outline">
<textarea class="form-control" id="textAreaExample" rows="8" ></textarea>
<label class="form-label" for="textAreaExample">Reflection</label>
</div>`;


let form2 = `<div class="fas fa-angle-up formHead " data-mdb-toggle="collapse" data-mdb-target="#intro">Introduction</div>
<div id="intro">
    <textarea name="intro" id="intro"   placeholder="Introduction" rows="3"></textarea>
</div>

<div class="fas fa-angle-up formHead " data-mdb-toggle="collapse" data-mdb-target="#threadA">Thread A</div>
<div id="threadA">
    <textarea name="" id=""   placeholder="Enter Text Here" rows="3"></textarea>
    <textarea name="" id=""   placeholder="Enter Text Here" rows="3"></textarea>
</div>

<div class="fas fa-angle-up formHead " data-mdb-toggle="collapse" data-mdb-target="#conclusion">Conlusion</div>
<div id="conclusion">
    <textarea name="" id="" placeholder="Conclusion" rows="4"></textarea>
</div>
<button type="submit" class="btn btn-primary">Submit</button>
    <i class="fas fa-save    " style="font-size: 2rem;"></i>`


function init()
{

    let request = new XMLHttpRequest()
        request.open('get','https://dev.deepthought.education/assets/uploads/files/others/project.json');
        
        request.addEventListener('load',()=>{
    
            let textReceived = JSON.parse( request.responseText);
            let tasksArray = textReceived.tasks;
            
            createJourneyBoard(tasksArray);
    
            tasksArray.forEach(task=>{
                let assets = task.assets;
                taskHeading.innerHTML = task.task_title;
                onLoad(assets);
            })
            taskContainerHead.innerHTML = textReceived.title;
        })
        request.send();

    asideContainer[0].children[0].addEventListener('click',(e)=>{
                console.log(e.target);
        if(asideContainer[0].classList.contains('hideAside'))
        {
            asideContainer[0].classList.remove('hideAside');
        }
        else
        {
            asideContainer[0].classList.add('hideAside');
        }
    })
}
init();


function createJourneyBoard(tasksArray) {
    let olList = document.createElement('ol');
    olList.setAttribute('class','orderedTaskContainer');

    tasksArray.forEach(ele=>{
        let olListItem = document.createElement('li');
        olListItem.setAttribute('id','listTaskHead');
        olListItem.setAttribute('data-target',`#${ele.task_id}`);
        olListItem.innerHTML = ele.task_title;
        
        
        let ulList = document.createElement('ul');
        ulList.setAttribute('class','allTask');
        ulList.setAttribute('id',`${ele.task_id}`);
        

        olListItem.addEventListener('click',()=>{
            if(ulList.style.display==='block')
            {
                ulList.style.display='none';
            }
            else
            {
                ulList.style.display='block';
            }
        })

        ele.assets.forEach(item=>{
            let ulListItem = document.createElement('li');
            ulListItem.setAttribute('class','tasks');
            ulListItem.innerHTML = item.asset_title;
            ulList.appendChild(ulListItem);
        })

        olListItem.appendChild(ulList);
        olList.appendChild(olListItem);
    })

    journeyContainer.appendChild(olList);

}

function onLoad(assets){
    assets.forEach((ele)=>{
            createUI(ele);
    })


}

function createUI(ele)
{
    const assetContainer = document.createElement('div');
    const assetHeading = document.createElement('div');
    const assetBody = document.createElement('div');
    const assetFooter = document.createElement('div');

    assetContainer.appendChild(assetHeading);
    assetContainer.appendChild(assetBody);
    assetContainer.appendChild(assetFooter);

    assetContainer.setAttribute('class','assetContainer');
    assetHeading.setAttribute('class','assetHeading');
    assetBody.setAttribute('class','assetBody');
    
    assetFooter.setAttribute('class','assetFooter');

    

    assetHeading.innerHTML= ele.asset_title;
    assetFooter.innerHTML=spanDownUpIcon;

    switch(ele.asset_id)
    {
        case 6234:{
            assetBody.innerHTML = ele.display_asset_reflection;
            break;
        }
        case 6235:{
            assetBody.innerHTML = form1;
            break;
        }
        case 6236:{
            assetBody.innerHTML=  textarea1;
            break;
        }
        case 6237:{
            let pdfFrame = document.createElement('iframe');
            pdfFrame.setAttribute('src',ele.display_asset_docs);
            pdfFrame.setAttribute('width','100%');
            pdfFrame.setAttribute('height','90%');
            assetBody.appendChild(pdfFrame);
            break;
        }
        case 6238: {
            let image = document.createElement('img');
            image.setAttribute('src',ele.display_asset_image);
            assetBody.appendChild(image);
            break;
        }
        case 6239:{
            assetBody.innerHTML = form2;
            break;
        }
        case 6240:{
            assetBody.innerHTML = ele.asset_description;
            break;
        }
        case 6241:{
            let audio = document.createElement('audio');
            audio.setAttribute('controls','true');
            audio.setAttribute('width','100%');
            let source = document.createElement('source');
            source.setAttribute('src',ele.display_asset_url);
            audio.appendChild(source);
            assetBody.appendChild(audio);
            break;
        }
        case 6242:{
                let video =document.createElement('video')
                video.setAttribute('controls','true');
                let source = document.createElement('source')
                source.setAttribute('src',ele.display_asset_video);
                video.setAttribute('width','100%')
                video.setAttribute('height','fit-content')
                video.appendChild(source);
                assetBody.appendChild(video);
            break;
        }
        
    }

    taskContainer.appendChild(assetContainer);
    
    let extendEvent = assetFooter.children[0].children[0];
    
    extendEvent.addEventListener('click',(e)=>{extendFun(e)});
    

}
function extendFun(e){

    let assetContainer = e.target.parentNode.parentNode.parentNode;
    let assetBody=assetContainer.children[1];
    
    let angle = e.target.classList[1];
    if(angle == 'fa-angle-up')
    {
            assetBody.style.height='55%';
            e.target.classList.replace('fa-angle-up','fa-angle-down');
            
    }
    else{   
            assetBody.style.height='100%';   
            e.target.classList.replace('fa-angle-down','fa-angle-up');
    }

}

