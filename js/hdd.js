var values = [];
var startPos;
var rezFCFS = 0;
var rezSSTF = 0;
var rezSCAN = 0;
var rezCSCAN = 0;
var rezCLOOK = 0;


var greatestVal = 0;

function init() 
{
    var c=document.getElementById("myCanvasFCFS"); 
	var ctx=c.getContext("2d");
	drawGrid(ctx);
	
	var c=document.getElementById("myCanvasSSTF"); 
	var ctx=c.getContext("2d");
	drawGrid(ctx);

	var c=document.getElementById("myCanvasSCAN"); 
    var ctx=c.getContext("2d");
	drawGrid(ctx);

	var c=document.getElementById("myCanvasCSCAN"); 
    var ctx=c.getContext("2d");
	drawGrid(ctx);

	var c=document.getElementById("myCanvasCLOOK"); 
    var ctx=c.getContext("2d");
	drawGrid(ctx);

    startPos = document.getElementById("sPoz").value;	
	Randomizer();
}

/* Tiek apstradats lietotaja ievadits saraksts un izsauaktas algoritmu zimesanas funkcijas */
function RunCode()
{
	var strary = document.getElementById("aValues").value;
	var valary = strary.split(" ")
	console.log(valary);
	console.log(valary > 100);
	if (valary > 100)
		valary = 100;
	values = [];
    for (i=0; i<valary.length; i++)
    {
        values[i] = Number(valary[i]);
    }
	console.log(values);
	document.getElementById('aLength').value = valary.length;

    FCFS();
    SSTF();
	SCAN();
	CSCAN();
	CLOOK();
}


/* Ģenerē sarakstu, pēc nejauša gadījuma principa */
function Randomizer()
{
	var arrLength = document.getElementById("aLength").value;
	if (arrLength>100)
		arrLength = 100;
	valueString = "";
	values = [];
    for (i=0;i<arrLength;i++)
    {
        values[i] = Math.ceil(Math.random()*400);
    }
	valueString = values.join(' ');
	document.getElementById('aValues').value = valueString;
}


function FCFS()
{
	start = document.getElementById("sPoz").value;
	FCFSvalues = values.slice(0)
	FCFSvalues.unshift(start);	
	drawFCFS(FCFSvalues,0);
	document.getElementById('FCFSval').innerHTML = rezFCFS;
}


function SSTF()
{
	var arrLength = document.getElementById("aLength").value;
	if (arrLength>100)
		arrLength = 100;
	var SSTFvalues = values.slice(0)
	SSTFvalues.sort(function(a,b){return a - b});
	
	res = [];
	start = document.getElementById("sPoz").value;
	pos = start;
	var c = 0;
	res.unshift(start);
    for (var i=0; i<=arrLength; i++) {
		c = closestTo(pos, SSTFvalues);
		res.push(c);
		pos=c;
		SSTFvalues[SSTFvalues.indexOf(c)]=99999;
	}
    drawSSTF(res,0);
	document.getElementById('SSTFval').innerHTML = rezSSTF;
}

function closestTo(num, arr) {
	var curr = arr[0];
	var diff = Math.abs (num - curr);
	for (var val = 0; val < arr.length; val++) {
		var newdiff = Math.abs (num - arr[val]);
		if (newdiff < diff) {
			diff = newdiff;
			curr = arr[val];
		}
	}
	return curr;
}

function SCAN()
{
	var arrLength = document.getElementById("aLength").value;
	if (arrLength>100)
		arrLength = 100;
    var scanValues = values.slice(0);
	scanValues.push(0);
	scanValues.push(400);
	scanValues.sort(function(a,b){return a - b});
	
	var nearest = 0;
	var i=0;
	start = document.getElementById("sPoz").value;

	while (start >= scanValues[i]) {
		nearest = scanValues[i];
		i++;
	}

	var head = scanValues.slice(0, scanValues.indexOf(nearest)+1);
	var tail = scanValues.slice(scanValues.indexOf(nearest)+1, arrLength+2);

	res = [];
	res = head.reverse().concat(tail);

	start = document.getElementById("sPoz").value;
	res.unshift(start);
	
	drawSCAN(res,2);
	document.getElementById('SCANval').innerHTML = rezSCAN;
}





function CSCAN()
{
	var arrLength = document.getElementById("aLength").value;
	if (arrLength>100)
		arrLength = 100;
    var scanValues = values.slice(0);
	scanValues.push(0);
	scanValues.push(400);
	scanValues.sort(function(a,b){return a - b});
	
	var nearest = 0;
	var i=0;
	start = document.getElementById("sPoz").value;

	while (start >= scanValues[i]) {
		nearest = scanValues[i];
		i++;
	}

	var head = scanValues.slice(0, scanValues.indexOf(nearest)+1);
	console.log("head - "+head);
	
	var tail = scanValues.slice(scanValues.indexOf(nearest)+1, arrLength+2);
	console.log("tail - "+tail);
	
	res = [];
	res = head.reverse().concat(tail.reverse());

	console.log("res - "+res);
	
	start = document.getElementById("sPoz").value;
	res.unshift(start);

	console.log("res unshift - "+res);
	
	drawCSCAN(res,2);
	document.getElementById('CSCANval').innerHTML = rezCSCAN;
}


function CLOOK()
{
	var arrLength = document.getElementById("aLength").value;
	if (arrLength>100)
		arrLength = 100;
    var scanValues = values.slice(0);

	scanValues.sort(function(a,b){return a - b});
	var nearest = 0;
	var i=0;
	start = document.getElementById("sPoz").value;

	while (start >= scanValues[i]) {
		nearest = scanValues[i];
		i++;
	}

	var head = scanValues.slice(0, scanValues.indexOf(nearest)+1);
	var smallest = head[0];
	console.log("smallest - "+smallest);
	
	console.log("head - "+head);
	
	var tail = scanValues.slice(scanValues.indexOf(nearest)+1, arrLength+2);
	console.log("tail - "+tail);

	res = [];
	res = head.reverse().concat(tail.reverse());

	console.log("resclook - "+res);
	
	start = document.getElementById("sPoz").value;
	res.unshift(start);

	console.log("res unshift - "+res);
	
	drawCLOOK(res,0,smallest);
	document.getElementById('CLOOKval').innerHTML = rezCLOOK;	
}


function sortFromPivot(CSCANvalues, len)
{
	CSCANvalues.sort(function(a,b){return a - b});
	var i=0;
	var nearest = 0;

    start = document.getElementById("sPoz").value;
	while (start >= CSCANvalues[i]) {
		nearest = CSCANvalues[i];
		i++;
	}

	var head = CSCANvalues.slice(0, CSCANvalues.indexOf(nearest)+1);
	var tail = CSCANvalues.slice(CSCANvalues.indexOf(nearest)+1, len);
	
	res = [];
	res = head.reverse().concat(tail.reverse());

	return res;
}

function drawline(ctx,x,x2,y,y2)
{
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}


function drawFCFS(poz,mSize) 
{
    var c=document.getElementById("myCanvasFCFS"); 
    var ctx=c.getContext("2d");
    var prev;
    var ptSize=4;
    rezFCFS = 0;
	greatestVal = 0;
	var arrayLength = document.getElementById("aLength").value;	
	if (arrayLength > 100)
		arrayLength = 100;
	var arraySize = arrayLength-0+mSize;
    var step = Math.floor((document.getElementById("myCanvasFCFS").width-200)/arraySize);	
    ctx.clearRect(0,0,400,300);
    ctx.font="30px Arial";
    drawGrid(ctx);
    rezValue = 0;
    ctx.font = "15px Arial";
    ctx.fillStyle = 'blue';
    if (poz[0]<325)
        ctx.fillText(poz[0],poz[0]-10+20,50+10);
    else
        ctx.fillText(poz[0],poz[0]-20,50+10);
    ctx.fillStyle = 'black';
    for (i=1;i<=arraySize;i++)
    {    
        prev = poz[i-1];
        rezFCFS = rezFCFS + Math.abs(poz[i-1]-poz[i]);
		if (greatestVal<Math.abs(poz[i-1]-poz[i]))
			greatestVal = Math.abs(poz[i-1]-poz[i]);
        drawline(ctx,prev,poz[i],(50+(i*step))-step,(50+(i*step)));  
        ctx.fillStyle = 'red';
        ctx.fillRect((prev)-ptSize/2,((50+(i*step))-step)-ptSize/2,ptSize,ptSize);
        ctx.fillRect((poz[i])-ptSize/2,(50+(i*step))-ptSize/2,ptSize,ptSize);
        ctx.fillStyle = 'black';
        ctx.font = "15px Arial";
        ctx.fillStyle = 'blue';
        if(i<arraySize/2)
        {
            if (poz[i]<325)
            {
        	    ctx.fillText(poz[i],poz[i]+20,50+(i*step)+10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)+10);
            }
        }
        else
        {
            if (poz[i]<325)
            {
                ctx.fillText(poz[i],poz[i]+20,50+(i*step)-10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)-10);
            }
        }
        ctx.fillStyle = 'black';
    }    
}

function drawCSCAN(poz,mSize) 
{
    var c=document.getElementById("myCanvasCSCAN"); 
    var ctx=c.getContext("2d");
    var prev;
    var ptSize=4;
    rezCSCAN = 0;
	greatestVal = 0;
	var arrayLength = document.getElementById("aLength").value;	
	if (arrayLength > 100)
		arrayLength = 100;
	var arraySize = arrayLength-0+mSize;
    var step = Math.floor((document.getElementById("myCanvasCSCAN").width-200)/arraySize);	
    ctx.clearRect(0,0,400,300);
    ctx.font="30px Arial";
    drawGrid(ctx);
    rezValue = 0;
    ctx.font = "15px Arial";
    ctx.fillStyle = 'blue';
    if (poz[0]<325)
        ctx.fillText(poz[0],poz[0]-10+20,50+10);
    else
        ctx.fillText(poz[0],poz[0]-20,50+10);
    ctx.fillStyle = 'black';
    for (i=1;i<=arraySize;i++)
    {    
		prev = poz[i-1];
		
	if(poz[i-1]!=0){
		rezCSCAN = rezCSCAN + Math.abs(poz[i-1]-poz[i]);
	}
		
		if (greatestVal<Math.abs(poz[i-1]-poz[i]))
			greatestVal = Math.abs(poz[i-1]-poz[i]);
        drawline(ctx,prev,poz[i],(50+(i*step))-step,(50+(i*step)));  
        ctx.fillStyle = 'red';
        ctx.fillRect((prev)-ptSize/2,((50+(i*step))-step)-ptSize/2,ptSize,ptSize);
        ctx.fillRect((poz[i])-ptSize/2,(50+(i*step))-ptSize/2,ptSize,ptSize);
        ctx.fillStyle = 'black';
        ctx.font = "15px Arial";
        ctx.fillStyle = 'blue';
        if(i<arraySize/2)
        {
            if (poz[i]<325)
            {
        	    ctx.fillText(poz[i],poz[i]+20,50+(i*step)+10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)+10);
            }
        }
        else
        {
            if (poz[i]<325)
            {
                ctx.fillText(poz[i],poz[i]+20,50+(i*step)-10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)-10);
            }
        }
        ctx.fillStyle = 'black';
    }    
}

function drawCLOOK(poz,mSize,smallestsize) 
{
    var c=document.getElementById("myCanvasCLOOK"); 
    var ctx=c.getContext("2d");
    var prev;
    var ptSize=4;
    rezCLOOK = 0;
	greatestVal = 0;
	var arrayLength = document.getElementById("aLength").value;	
	if (arrayLength > 100)
		arrayLength = 100;
	var arraySize = arrayLength-0+mSize;
    var step = Math.floor((document.getElementById("myCanvasCLOOK").width-200)/arraySize);	
    ctx.clearRect(0,0,400,300);
    ctx.font="30px Arial";
    drawGrid(ctx);
    rezValue = 0;
    ctx.font = "15px Arial";
    ctx.fillStyle = 'blue';
    if (poz[0]<325)
        ctx.fillText(poz[0],poz[0]-10+20,50+10);
    else
        ctx.fillText(poz[0],poz[0]-20,50+10);
    ctx.fillStyle = 'black';
    for (i=1;i<=arraySize;i++)
    {    
        prev = poz[i-1];
		
		if(poz[i-1]!=smallestsize){
			rezCLOOK = rezCLOOK + Math.abs(poz[i-1]-poz[i]);
		}

		if (greatestVal<Math.abs(poz[i-1]-poz[i]))
			greatestVal = Math.abs(poz[i-1]-poz[i]);
        drawline(ctx,prev,poz[i],(50+(i*step))-step,(50+(i*step)));  
        ctx.fillStyle = 'red';
        ctx.fillRect((prev)-ptSize/2,((50+(i*step))-step)-ptSize/2,ptSize,ptSize);
        ctx.fillRect((poz[i])-ptSize/2,(50+(i*step))-ptSize/2,ptSize,ptSize);
        ctx.fillStyle = 'black';
        ctx.font = "15px Arial";
        ctx.fillStyle = 'blue';
        if(i<arraySize/2)
        {
            if (poz[i]<325)
            {
        	    ctx.fillText(poz[i],poz[i]+20,50+(i*step)+10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)+10);
            }
        }
        else
        {
            if (poz[i]<325)
            {
                ctx.fillText(poz[i],poz[i]+20,50+(i*step)-10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)-10);
            }
        }
        ctx.fillStyle = 'black';
	}   
	 
}

function drawSSTF(poz,mSize) 
{
    var c=document.getElementById("myCanvasSSTF"); 
    var ctx=c.getContext("2d");
    var prev;
    var ptSize=4;
    rezSSTF = 0;
	greatestVal = 0;
	var arrayLength = document.getElementById("aLength").value;	
	if (arrayLength > 100)
		arrayLength = 100;
	var arraySize = arrayLength-0+mSize;
    var step = Math.floor((document.getElementById("myCanvasSSTF").width-200)/arraySize);	
    ctx.clearRect(0,0,400,300);
    ctx.font="30px Arial";
    drawGrid(ctx);
    rezValue = 0;
    ctx.font = "15px Arial";
    ctx.fillStyle = 'blue';
    if (poz[0]<325)
        ctx.fillText(poz[0],poz[0]-10+20,50+10);
    else
        ctx.fillText(poz[0],poz[0]-20,50+10);
    ctx.fillStyle = 'black';
    for (i=1;i<=arraySize;i++)
    {    
        prev = poz[i-1];
        rezSSTF = rezSSTF + Math.abs(poz[i-1]-poz[i]);
		if (greatestVal<Math.abs(poz[i-1]-poz[i]))
			greatestVal = Math.abs(poz[i-1]-poz[i]);
        drawline(ctx,prev,poz[i],(50+(i*step))-step,(50+(i*step)));  
        ctx.fillStyle = 'red';
        ctx.fillRect((prev)-ptSize/2,((50+(i*step))-step)-ptSize/2,ptSize,ptSize);
        ctx.fillRect((poz[i])-ptSize/2,(50+(i*step))-ptSize/2,ptSize,ptSize);
        ctx.fillStyle = 'black';
        ctx.font = "15px Arial";
        ctx.fillStyle = 'blue';
        if(i<arraySize/2)
        {
            if (poz[i]<325)
            {
        	    ctx.fillText(poz[i],poz[i]+20,50+(i*step)+10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)+10);
            }
        }
        else
        {
            if (poz[i]<325)
            {
                ctx.fillText(poz[i],poz[i]+20,50+(i*step)-10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)-10);
            }
        }
        ctx.fillStyle = 'black';
    }    
}

function drawSCAN(poz,mSize) 
{
    var c=document.getElementById("myCanvasSCAN"); 
    var ctx=c.getContext("2d");
    var prev;
    var ptSize=4;
    rezSCAN = 0;
	greatestVal = 0;
	var arrayLength = document.getElementById("aLength").value;	
	if (arrayLength > 100)
		arrayLength = 100;
	var arraySize = arrayLength-0+mSize;
    var step = Math.floor((document.getElementById("myCanvasSCAN").width-200)/arraySize);	
    ctx.clearRect(0,0,400,300);
    ctx.font="30px Arial";
    drawGrid(ctx);
    rezValue = 0;
    ctx.font = "15px Arial";
    ctx.fillStyle = 'blue';
    if (poz[0]<325)
        ctx.fillText(poz[0],poz[0]-10+20,50+10);
    else
        ctx.fillText(poz[0],poz[0]-20,50+10);
    ctx.fillStyle = 'black';
    for (i=1;i<=arraySize;i++)
    {    
        prev = poz[i-1];
        rezSCAN = rezSCAN + Math.abs(poz[i-1]-poz[i]);
		if (greatestVal<Math.abs(poz[i-1]-poz[i]))
			greatestVal = Math.abs(poz[i-1]-poz[i]);
        drawline(ctx,prev,poz[i],(50+(i*step))-step,(50+(i*step)));  
        ctx.fillStyle = 'red';
        ctx.fillRect((prev)-ptSize/2,((50+(i*step))-step)-ptSize/2,ptSize,ptSize);
        ctx.fillRect((poz[i])-ptSize/2,(50+(i*step))-ptSize/2,ptSize,ptSize);
        ctx.fillStyle = 'black';
        ctx.font = "15px Arial";
        ctx.fillStyle = 'blue';
        if(i<arraySize/2)
        {
            if (poz[i]<325)
            {
        	    ctx.fillText(poz[i],poz[i]+20,50+(i*step)+10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)+10);
            }
        }
        else
        {
            if (poz[i]<325)
            {
                ctx.fillText(poz[i],poz[i]+20,50+(i*step)-10);
            }
            else
            {
                ctx.fillText(poz[i],poz[i]-20,50+(i*step)-10);
            }
        }
        ctx.fillStyle = 'black';
    }    
}

function drawGrid(ctx) 
{    	
	ctx.font="20px Arial";
	for (i=1;i<=39;i++)
	{    
		if (i%5==0)
		{
			ctx.font = "20px Arial";
		}
	}    
}

