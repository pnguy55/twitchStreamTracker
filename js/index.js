/*Start of Header*/
/*Start of default state*/
var all=0;
var on=0;
var off=0;



/*End of default state*/



/*Start of All button*/

function toggleBtnAll() {
 
  document.getElementById('toggle-btn-all').classList.toggle('active');

  document.getElementById('btn-icon-all').classList.toggle('active');
  
  document.getElementById('btn-text-all').classList.toggle('active');
    
    
}
/*End of All button*/

/*Start of Online button*/
function toggleBtnOn() {
  
  document.getElementById('toggle-btn-on').classList.toggle('active');

  document.getElementById('btn-icon-on').classList.toggle('active');
  
  document.getElementById('btn-text-on').classList.toggle('active');
     
    


}
/*End of Online button*/

/*Start of Offline button*/
function toggleBtnOff() {
  
  document.getElementById('toggle-btn-off').classList.toggle('active');

  document.getElementById('btn-icon-off').classList.toggle('active');
  
  document.getElementById('btn-text-off').classList.toggle('active');
           

}

/*End of Offline button*/

/*Start of Master Toggle controller*/
function masterToggle(togNum){
  
  if(togNum==1){
    if(window.all==0){
      toggleBtnAll();
      window.all=1;      
    }
    if(window.on==1){
      toggleBtnOn();
      window.on=0;
    }
    if(window.off==1){
      toggleBtnOff();
      window.off=0;
    }
    
  }
  
  if(togNum==2){
    if(window.on==0){
      toggleBtnOn();
      window.on=1;
    }
    if(window.all==1){
      toggleBtnAll();
      window.all=0;
    }
    if(window.off==1){
      toggleBtnOff();
      window.off=0;
    }
    
  }
  
  if(togNum==3){
    if(window.off==0){
      toggleBtnOff();
      window.off=1;
    }
    if(window.on==1){
      toggleBtnOn();
      window.on=0;
    }
    if(window.all==1){
      toggleBtnAll();
      window.all=0;
    }
  }  
}
/*End of Master Toggle controller*/
/*End of Header*/
streamNum= 5;


masterAjax(1);





/*Start of masterAjax*/
function masterAjax(togNum){
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/helix/streams?first='+streamNum,
 headers: {
   'Client-ID': 'xjsa49wrwn0o5nhe25m6yrdx4ekskq'
 },
 success: function(val) {
   
   var offline='';
   var streamID = [];
   var streamStatus = [];
   str = JSON.stringify(val);
   obj = JSON.parse(str);
   
   masterToggle(togNum);
   
   
   for(var i =0; i<streamNum; i++){
    streamID.push(obj.data[i].user_id);
    streamStatus.push(obj.data[i].type);
   }
   
   /*Start of All list*/
   if(togNum==1){
     $('.thumbnail-wrap').empty();
     $('.display-name-wrap').empty(); 
     $('.status-wrap').empty(); 
     $('.descrip-wrap').empty(); 

     for(var ii= 0; ii<streamNum;ii++){
       
       if(streamStatus[ii]!=null){
         $('.status-wrap').append('<div class="status" ><span>'+streamStatus[ii]+'</span></div>');
       
         $('.descrip-wrap').append('<div class="descrip" ><span>'+obj.data[ii].title+'</span></div>');
       }
       
       if(streamStatus[ii]==offline){
         $('.status-wrap').append('<div class="status" ><span>offline</span></div>');
       }
     }
     getPic(streamID);
     getFCC(togNum);
   }
   /*End of All list*/
   
   /*Start of Online list*/
   if(togNum==2){
     $('.thumbnail-wrap').empty();
     $('.display-name-wrap').empty(); 
     $('.status-wrap').empty(); 
     $('.descrip-wrap').empty(); 

     for(var ii= 0; ii<streamNum;ii++){
       
       if(streamStatus[ii]!=null){
         $('.status-wrap').append('<div class="status" ><span>'+streamStatus[ii]+'</span></div>');
       
         $('.descrip-wrap').append('<div class="descrip" ><span>'+obj.data[ii].title+'</span></div>');
       }
       
       if(streamStatus[ii]==offline){
         $('.status-wrap').append('<div class="status" ><span>offline</span></div>');
       }
     }
     getPic(streamID);
     
   }
   /*End of Online list*/
   
   if(togNum==3){
     $('.thumbnail-wrap').empty();
     $('.display-name-wrap').empty(); 
     $('.status-wrap').empty(); 
     $('.descrip-wrap').empty(); 
     getFCC(togNum);
   }
   
   
   
   

 }
});
  
  
}

/*End of masterAjax*/

function getFCC(togNum){
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/helix/users?login=freecodecamp',
 headers: {
   'Client-ID': 'xjsa49wrwn0o5nhe25m6yrdx4ekskq'
 },
 success: function(val) {
   var offlineFCC='';
   var streamIDFCC = [];
   var streamStatusFCC = [];
   str = JSON.stringify(val);
   obj = JSON.parse(str);
 
   
    streamIDFCC.push(obj.data[0].user_id);
    streamStatusFCC.push(obj.data[0].type);
   
   
   if(togNum==1){
   $('.status-wrap').append('<div class="status" ><span>'+offline+'</span></div>');
     $('.descrip-wrap').append('<div class="descrip" ><span>'+obj.data[0].title+'</span></div>');
     getPic(streamIDFCC);
   }
   
   if(togNum==3){
   $('.status-wrap').append('<div class="status" ><span>'+offline+'</span></div>');
     $('.descrip-wrap').append('<div class="descrip" ><span>'+obj.data[0].title+'</span></div>');
     getPic(streamIDFCC);
   }
   
 }
});
}

/*Start of getUserInfo*/
function getPic(id){
for(var i=0;i<id.length;i++){ 
  $.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/helix/users?id='+id[i],
 headers: {
   'Client-ID': 'xjsa49wrwn0o5nhe25m6yrdx4ekskq'
 },
 success: function(val) {
   
   
   str = JSON.stringify(val);
   obj = JSON.parse(str);
   
   
   $('.thumbnail-wrap').append('<div class="thumbnail" ><a href="https://www.twitch.tv/'+obj.data[0].display_name+'" target="_blank"><img src="'+obj.data[0].profile_image_url+'"></img></a></div>');
    
   $('.display-name-wrap').append('<div class="display-name" ><span>'+obj.data[0].display_name+'</span></div>');
 }
});  
}
}
/*End of getUserInfo*/