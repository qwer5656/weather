(function()
{
let header=document.getElementById("header");
let place=[
    {
        tag:"taipei_city",
        place:"臺北市",
    },
    {
        tag:"new_taipei_city",
        place:"新北市",
    },
    {
        tag:"taichung_city",
        place:"臺中市",
    },
    {
        tag:"tainan_city",
        place:"臺南市",
    },
    {
        tag:"kaohsiung_city",
        place:"高雄市",
    },
    {
        tag:"keelung_city",
        place:"基隆市",
    },
    {
        tag:"taoyuan_country",
        place:"桃園市",
    },
    {
        tag:"hsinchu_city",
        place:"新竹市",
    },
    {
        tag:"hsinchu_country",
        place:"新竹縣",
    },
    {
        tag:"miaoli_country",
        place:"苗栗縣",
    },
    {
        tag:"changhua_country",
        place:"彰化縣",
    },
    {
        tag:"nantou_country",
        place:"南投縣",
    },
    {
        tag:"yunlin_country",
        place:"雲林縣",
    },
    {
        tag:"chiayi_city",
        place:"嘉義市",
    },
    {
        tag:"chiayi_country",
        place:"嘉義縣",
    },
    {
        tag:"pingtung_country",
        place:"屏東縣",
    },
    {
        tag:"yilan_country",
        place:"宜蘭縣",
    },
    {
        tag:"hualien_country",
        place:"花蓮縣",
    },
    {
        tag:"taitung_country",
        place:"臺東縣",
    },
    {
        tag:"penghu_country",
        place:"澎湖縣",
    },
    {
        tag:"kinmen_country",
        place:"金門縣",
    },
    {
        tag:"lienchiang_country",
        place:"連江縣",
    }
];
let weatherdata=[];
let timeday=["日","一","二","三","四","五","六"];
$("#svg2600 path").click(function(e)
{
    reset();
    let target=e.target;
    let name=target.getAttribute("data-name");
    target.classList.add("clickmap");
    let filterobj=place.filter(function(el)
    {
        
           return el.tag==name;
    });
    let weather=weatherdata.filter(function(el)
    {
        
           return el.locationName==filterobj[0].place;
    })[0];
    let placename=weather.locationName;
    let maxt=weather.weatherElement[4].time[0].parameter.parameterName;
    let mint=weather.weatherElement[2].time[0].parameter.parameterName;
    let descriptionweather=weather.weatherElement[0].time[0].parameter.parameterName;
    let pop=weather.weatherElement[1].time[0].parameter.parameterName;
    let popimg=weather.weatherElement[0].time[0].parameter.parameterValue;
    popimg=popimg>=10?popimg:"0"+popimg;
    $("#tw_place").text(placename);
    $("#temp_max").text(maxt);
    $("#temp_min").text(mint);
    $("#descriptionweather").text(descriptionweather);
    $("#pop").text(pop);
    $("#weather_img").attr("src",`img/weather_${popimg}.png`);
    getweekweather(placename);
});
$("#svg2600 g").click(function(e)
{
    reset();
    let target=e.target.parentElement;
    let name=target.getAttribute("data-name");
    target.classList.add("clickmap");
    let filterobj=place.filter(function(el)
    {
        
           return el.tag==name;
    });
    let weather=weatherdata.filter(function(el)
    {
        
           return el.locationName==filterobj[0].place;
    })[0];
    let placename=weather.locationName;
    let maxt=weather.weatherElement[4].time[0].parameter.parameterName;
    let mint=weather.weatherElement[2].time[0].parameter.parameterName;
    let descriptionweather=weather.weatherElement[0].time[0].parameter.parameterName;
    let pop=weather.weatherElement[1].time[0].parameter.parameterName;
    let popimg=weather.weatherElement[0].time[0].parameter.parameterValue;
    popimg=popimg>=10?popimg:"0"+popimg;
    $("#tw_place").text(placename);
    $("#temp_max").text(maxt);
    $("#temp_min").text(mint);
    $("#descriptionweather").text(descriptionweather);
    $("#pop").text(pop);
    $("#weather_img").attr("src",`img/weather_${popimg}.png`);
    getweekweather(placename);
});
let weatherurl="https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-69332FDE-EB99-479F-8433-DA88413FE5BB&format=JSON";
fetch(weatherurl,{method:'get'}).then(function(res)
{
    return res.json();
}).then(function(res)
{
    weatherdata=res.records.location;
   
});
window.addEventListener("scroll",function()
{
    var pos=this.scrollY;
    if(pos!==0)
    {
        header.style.position="fixed";
    }
    else
    {
        header.style.position="absolute";
    }
});
function reset()
{
    let allpath=document.querySelectorAll("#svg2600 path");
    let allgpath=document.querySelectorAll("#svg2600 g");
    allpath.forEach(function(e)
    {
        e.classList.remove("clickmap");
    });
    allgpath.forEach(function(e)
    {
        e.classList.remove("clickmap");
    });
}
function getweekweather(name)
{
    let week_place=document.querySelector(".week_place");
    week_place.innerText=name;
    let url="https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?locationName="+name;
    url+="&Authorization=CWB-69332FDE-EB99-479F-8433-DA88413FE5BB&format=JSON";
    fetch(url,{method:'get'}).then(function(res)
    {
        
          return res.json();
    }).then(function(res)
    {
        let time=new Date();
        let day=time.getDay();
        let obj=res.records.locations[0].location[0].weatherElement;
        let weatherimg=obj[6];
        let temp=obj[1];
        let lowtemp=obj[8].time[0].elementValue[0].value;
        let hightemp=obj[12].time[0].elementValue[0].value;
        let weeektemp=document.querySelectorAll(".temp");
        let weeekday=document.querySelectorAll(".date");
        let weekimg=document.querySelectorAll(".weekimg");
        let week_headertemp=document.querySelector(".week_headertemp");
        let week_headerdescription=document.querySelector(".week_headerdescription");
        let week_highlowtemp=document.querySelector(".week_highlowtemp");
        let week_headerimg=document.querySelector(".week_headerimg");
        
        weeektemp.forEach(function(e,index)
        {
           let t=index*2;
           day=day%7;
           e.innerText=temp.time[t].elementValue[0].value+"°C";
           weekimg[index].setAttribute("src","img/weather_"+weatherimg.time[t].elementValue[1].value+".png");
           weeekday[index].innerText=timeday[day];
           day++;
           
        });
        week_headertemp.innerText=temp.time[0].elementValue[0].value+"°C";
        week_headerdescription.innerText=weatherimg.time[0].elementValue[0].value;
        week_headerimg.setAttribute("src","img/weather_"+weatherimg.time[0].elementValue[1].value+".png");
        week_highlowtemp.innerText=lowtemp+"°C/"+hightemp+"°C";
       
    });
}
})();
