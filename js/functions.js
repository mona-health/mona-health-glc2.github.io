// window.jsPDF = window.jspdf.jsPDF
// const doc = new jsPDF({unit: 'px', hotfixes: ["px_scaling"]});

async function loadImg(imageUrl) {
  let img;
  const imageLoadPromise = new Promise((resolve) => {
    img = new Image();
    img.onload = resolve;
    img.src = imageUrl;
  });

  await imageLoadPromise;
  return img;
}

function getImageDimensions(file) {
  return new Promise(function (resolved, rejected) {
    var i = new Image();
    i.onload = function () {
      resolved({ w: i.naturalWidth, h: i.naturalHeight });
    };
    i.src = file;
  });
}

// async function btnTest() {
// 	let scale = 1.2
// 	const bg = await loadImg('assets/bg.png');
// 	const marker = await loadImg('assets/marker.png');
// 	doc.addImage(bg,'PNG',0,0,793,1123);
// 	// doc.addImage(scaleIm,'PNG',100,600+100,Math.floor(scale*250),Math.floor(scale*31),'scale1');
// 	var x1 = 56 - (scale*30/2) + parseFloat(document.getElementById("sliderControlL").style.left)/95.0 * (347-56);
// 	var x2 = 446 - (scale*30/2) + parseFloat(document.getElementById("sliderControlR").style.left)/95.0 * (347-56);
// 	if (isNaN(x1)) {x1 = 56 - (scale*30/2) + 0/95.0 * (347-56);};
// 	if (isNaN(x2)) {x2 = 446 - (scale*30/2) + 0/95.0 * (347-56);};
// 	doc.addImage(marker,'PNG',Math.floor(x1),625+47,Math.floor(scale*30),Math.floor(scale*40),'marker1'); //Min = 91, max = 328
// 	doc.addImage(marker,'PNG',Math.floor(x2),625+47,Math.floor(scale*30),Math.floor(scale*40),'marker2');
// 	doc.setFont("helvetica");
// 	doc.setFontSize(15);
// 	doc.setTextColor(255,255,255);
// 	doc.text(document.getElementById("sliderTxtL").innerText,Math.floor(x1) + 4,642+47)
// 	doc.text(document.getElementById("sliderTxtR").innerText,Math.floor(x2) + 4,642+47)
// 	const im1 = document.getElementById("test-image-1").src;
// 	var dimensions1 = await getImageDimensions(im1);
// 	const im2 = document.getElementById("test-image-2").src;
// 	var dimensions2 = await getImageDimensions(im2);
// 	doc.addImage(im1,27,330,350,Math.floor(350/dimensions1.w*dimensions1.h));
// 	doc.addImage(im2,416,330,350,Math.floor(350/dimensions2.w*dimensions2.h));
// 	doc.setFontSize(14);
// 	doc.setTextColor(0,0,0);
// 	doc.text('Left:',27,320);
// 	doc.text('Right:',416,320);
// 	doc.setFontSize(20);
// 	doc.text('Name: ' + document.getElementById("name").value,46,274)
// 	doc.text('DR Scale:',46,640)
// 	doc.text(document.getElementById("DRTitle").textContent,46,770+45)
// 	doc.text(document.getElementById("DMETitle").textContent,46,890+45)
// 	doc.setFontSize(14);
// 	doc.text(doc.splitTextToSize(document.getElementById("DRText").textContent,700),46,800+45)
// 	doc.text(doc.splitTextToSize(document.getElementById("DMEText").textContent,700),46,920+45)
// 	doc.save("Report_" + document.getElementById("name").value.replace(/ /g,"_") + "_" + Date.now() + ".pdf");

// 	// const scale = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAB8CAQAAABQtVKnAAAAAmJLR0QA/4ePzL8AAA+uSURBVBgZ7cELtF0FYefh39m5eT+FEFFqaC4SUEsCaMqABAmNGAwUW2HaqkjRjrDqslanLboYRDC16nRaFOxYW6VCpdRHHUnUggLyEBRDIUUCSaDImyAJ5EEScrn3N3NX1l0h2Jx9zs3J7LPv+n9fg5a5mPPZYVljCTFiuJjz2WFZYwkxgriY89lhWWMJMYK4mPPZYVljCTGiuJjz2WFZYwkt6qF1MziKHe4lRpIZHMUO9xIjywyOYod7iZFlBkexw73ESDODo9jhXlpWEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbXXw3DM8Txi5DiSIXM8jxhJjmTIHM8jRpIjGTLH84iR5UiGoUHLPIsvExEREf+//EPjLFpUEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbXXw3CsYCkxcszlFHZYwVJiJJnLKeywgqXESDKXU9hhBUuJkWUup7A3eZZDLiNGEM9yyGXEiOJZDrmMGFE8yyGXESOMZznkMlpWEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVXEBEREbVX0LpJDBlPjCSjGDLZ8cRIMpEhE2wQI0nBkMlOJEaW8QyZaEGLGpRwIgtYwNEcwj7stInV3M4NXNdYT9SUs1nI8czlIEYxRB5mJTdxPT9tSNSS43gTCziG1zCdnbawiju4gR80niJqy14WcjyH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"
// 	// const marker = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAACgCAMAAADw11iiAAABWVBMVEUAAADbJEnfQGDjOVXmM03qK1XrJ07jK1XkNlHmM1nnMVXoLlHpLFnqNVXgM1LiMVjjL1XiM1fjMFPkL1flLlXjLVXjMlPkMVHkMFXlL1PmLlLnMFLjL1XjLlPlMFTlMFLmLlTlMVPmL1TmL1PmMlXnMVTjMFPkMFXkL1TlLlPlMVXmMFTkL1PkL1XkMVTlMFTlMFXlMFTlL1PmL1TmMVTmMFPkMFTkMFTlMVTlMFTmL1TmMVPlL1TlMVPlMFTmL1TkMVTlMFTlMFTkL1PmMFXmMFTkMFTlMFXlMFTlMFXlMFTlL1XmMFTlMVXlMFTlMFTlMFXlMFTmMVTkMFXlMFTlMFPlMFTmMFPkMFTlMFTlMFPlMFTlMFTmMFTlL1TlMFTlMFTlMFTlMFTlMFTlMFTmMFTlMFTlMFTlMFTlMFTlMFTlMFTlL1TlMFTmMFTlMFTlMFTlMFT///911GOpAAAAcXRSTlMABwgJCgwNEhMUFRYXGBkaGyMlJictLi8wMTI1Njc6Oz1ERkdISUpLTE1OcHFyc3R1gIGCg4SFhoiJjI2Rk5WXmJqbor6/wMHDxMXHyM3Oz9DR0tPY2drc3d7f4OXm5+rr7O3u7/Dx8vP09fb3+Pr7/Ea15Q0AAAABYktHRHI2Dg1YAAACYklEQVR42u3aW1sSURQG4C/QwY4eUjtbkgN2GJBQ7EAJpZZmCZSRhaVWCqLg+v83XaAPKIyCzV7rovX9gfcB9uzZe30ArrHsaHo+v7ZFZ8jWWn4+HRmz0HFuTC9V6Z9TfZ+41onaM/GJPEsu2tMmezH2hzxNKdnXBtuV2CPPszvlP819+I2MZHX8RNaXJGN50+XuDmbJYDIDbu7tdTKaX3dbu6NFMpydcCs3XCHjqYSa3TslYki56dse3CSWbBxbYb5lYkru6FaSJra8anQfEGMalrZ/lRP+Xt/Cpok1Tw7d3j1euHz5AH5BzHlWcwNFbrh0HgAwQeyJAABy/HAGAG6SQIb5n6VaJgEsScCLgFWVgKsWbBLJfURl4Md4LQOn8FYGnsMXGfgzfsjABRRl4G3sy8D7cp9Y7DcWW9VCz/Es51G+MTOIyMCPMCYDB2FVJNyqJXQCWQCQkIDjAK5LwEMAkOV3lwFA4vDj1O5O29xusXZ3wnNu+OnBNfXKLvP9+NLhzXyKF47VZyBfOd28rz59GeeE7cZ5U4rPfXl0sveRy80eKwmubvC46/1NU3KW4+bOSPPcOMQxr7ZbTuiNb52lUOtu4NZPs+7miFsbMmB0bX/od+9/zpnsnU4u28KGds+8fVrH54+XDbyPYr42as0Lsd8ev/eTvW0WuQEn4+H5ygl00l0PTy56MHmrLMSHOm/ru4NOam6lcLb/CBRWZlNOsBte510Dcg+MUVhhhRVWWGGFFVZYYYUVVlhhhRVWWGGFFVZYYYUVVlhhhRVWWGGFFVZYYYUVVlhhhRVW+L+H/wK8AF5quTmRVwAAAABJRU5ErkJggg=="
// 	// const im1 = document.getElementById("test-image-1").src;
// 	// const im2 = document.getElementById("test-image-2").src;

// 	// doc.addImage(bg,'PNG',0,0,793,1123);
// 	// doc.addImage(im1,'JPEG',0,0,50,50);
// 	// doc.addImage(scale,'PNG',100,100,250,31,'scale1');
// 	// var x = 91 + parseFloat(document.getElementById("sliderControlL").style.left)/95.0 * (328-91);
// 	// console.log(document.getElementById("sliderControlL").style.left);
// 	// doc.addImage(marker,'PNG',x,72,30,40,'marker1'); //Min = 91, max = 328
// 	// doc.text("Hello world!", 100, 100);

// }

async function loadFileLeft() {
  // console.log("image is in loadfile..");
  var fileInputElement = document.getElementById("select-file-image");
  // console.log(fileInputElement.files[0]);
  renderImage(fileInputElement.files[0], "test-image-1");
  //showPredBtn();
  showImgDiv();
  //hideUploadAndReq();
  //changeDotToGreen();
}

async function loadFileRight() {
  // console.log("image is in loadfile..");
  var fileInputElement = document.getElementById("select-file-image-2");
  // console.log(fileInputElement.files[0]);
  renderImage(fileInputElement.files[0], "test-image-2");
  showPredBtn();
  showImgDiv();
  hideUploadAndReq();
  changeDotToGreen();
  //document.getElementById("test-image-1").style.marginRight = "25px";
}

function changeDotToGreen() {
  document.getElementById("dot_top").style.backgroundColor =
    "rgb(137, 255, 110)";
  document.getElementById("dot_topTxt").innerHTML = "&#10004;";
  document.getElementById("dot_topTxt").style.color = "#000";
  document.getElementById("dot_topTxt").style.fontSize = "16px";
  document.getElementById("dot_topTxt").style.lineHeight = "20px";
}

function showImgDiv() {
  document.getElementById("imgDiv").style.display = "flex";
}

function hideUploadAndReq() {
  document.getElementById("uploadBtn").style.display = "none";
  document.getElementById("reqDiv").style.display = "none";
}

function renderImage(file, id) {
  var reader = new FileReader();
  //   console.log("image is here..");
  reader.onload = function (event) {
    img_url = event.target.result;
    // console.log("image is here2..");
    document.getElementById(id).src = img_url;
  };
  reader.readAsDataURL(file);
}

function showPredBtn() {
  document.getElementById("predBtn").style.display = "flex";
}

function showResults(dataL, dataR) {
  showResultL(dataL);
  showResultR(dataR);
  stopLoad();
  document.getElementById("predBtn").style.display = "none";

  var unroundedL = Math.round(dataL["glc_raw"] * 1000 + Number.EPSILON) / 1000;
  var unroundedR = Math.round(dataR["glc_raw"] * 1000 + Number.EPSILON) / 1000;
  const threshold = 0.73;
  if (!dataL.hasOwnProperty("glc_raw") || !dataR.hasOwnProperty("glc_raw")) {
    document.getElementById("fullResult").innerHTML =
      "Something went wrong, check below for errors.";
  } else {
    if (dataL["glc_raw"] >= threshold && dataR["glc_raw"] >= threshold) {
      document.getElementById("fullResult").innerHTML =
        "<div style='background-color: #FF3838; border-radius: 10px; padding: 8px 12px; display: inline-block;'><p id='DRTitle' style='margin: 0;'>The individual should be referred for further glaucoma screening</p></div>";
    } else if (dataL["glc_raw"] >= threshold && dataR["glc_raw"] <= threshold) {
      document.getElementById("fullResult").innerHTML =
        "<div style='background-color: #FF3838; border-radius: 10px; padding: 8px 12px; display: inline-block;'><p id='DRTitle' style='margin: 0;'>The individual should be referred for further glaucoma screening</p></div>";
    } else if (dataL["glc_raw"] <= threshold && dataR["glc_raw"] >= threshold) {
      document.getElementById("fullResult").innerHTML =
        "<div style='background-color: #FF3838; border-radius: 10px; padding: 8px 12px; display: inline-block;'><p id='DRTitle' style='margin: 0;'>The individual should be referred for further glaucoma screening</p></div>";
    } else {
      document.getElementById("fullResult").innerHTML =
        "<div style='background-color: #A0FF85; border-radius: 10px; padding: 8px 12px; display: inline-block;'><p id='DRTitle' style='margin: 0; color: black;'>The individual is not currently indicated for referral for further glaucoma screening; however, repeat evaluation is recommended in accordance with applicable national or local screening guidelines</p></div>";
    }
  }
  // document.getElementById("fullResult").innerHTML = "Predictions for glaucoma: (L: " + unroundedL.toString() + "; R: " + unroundedR.toString() + "), everything above 0.73 should be considered referable. ";

  // var unroundedLDME = Math.round( dataL['dme_raw'] * 1000 + Number.EPSILON ) / 1000;
  // var unroundedRDME = Math.round( dataR['dme_raw'] * 1000 + Number.EPSILON ) / 1000;

  // if ((dataL['dme_raw'] >= 0.38) && (dataR['dme_raw'] >= 0.381)) {
  // 	document.getElementById("fullResultDME").innerHTML = "<h3 id='DMETitle'>Referable DME detected!</h3><p id='DMEText'>Both values (L: " + unroundedLDME.toString() + "; R: " + unroundedRDME.toString() + ") are above our threshold of 0.38, the individual will be <u>referred</u>! </p>";
  // } else if ((dataL['dme_raw'] >= 0.38) && (dataR['dme_raw'] <= 0.38)){
  // 	document.getElementById("fullResultDME").innerHTML = "<h3 id='DMETitle'>Referable DME detected!</h3><p id='DMEText'>The value for the left eye (" + unroundedLDME.toString() + ") is above our threshold of 0.38, the individual will be <u>referred</u>! </p>";
  // } else if ((dataL['dme_raw'] <= 0.38) && (dataR['dme_raw'] >= 0.38)){
  // 	document.getElementById("fullResultDME").innerHTML = "<h3 id='DMETitle'>Referable DME detected!</h3><p id='DMEText'>The value for the right eye (" + unroundedRDME.toString() + ") is above our threshold of 0.38, the individual will be <u>referred</u>!</p>";
  // } else {
  // 	document.getElementById("fullResultDME").innerHTML = "<h3 id='DMETitle'>No referable DME detected!</h3><p id='DMEText'>Both values (L: " + unroundedLDME.toString() + "; R: " + unroundedRDME.toString() + ") are beneath our threshold of 0.38, the individual will <u>not</u>  be referred for DME!</p>";
  // }
}

function showResultL(data) {
  document.getElementById("resultTxt").style.display = "flex";
  // document.getElementById("sliderL").style.display = "flex";
  document.getElementById("resetBtn").style.display = "flex";
  // var dr_raw = Math.round( data['dr_raw'] * 10 + Number.EPSILON ) / 10;
  // document.getElementById("sliderTxtL").innerHTML = dr_raw.toFixed(1).toString();
  // var pos = dr_raw/4*95;
  // document.getElementById("sliderControlL").style.left = pos.toString() + "%";
  var unrounded = Math.round(data["dr_raw"] * 1000 + Number.EPSILON) / 1000;
  // console.log('L:' + unrounded.toString());
  //document.getElementById("fullResult").innerHTML = unrounded.toString();
}

function showResultR(data) {
  // document.getElementById("sliderR").style.display = "flex";
  // var dr_raw = Math.round( data['dr_raw'] * 10 + Number.EPSILON ) / 10;
  // document.getElementById("sliderTxtR").innerHTML = dr_raw.toFixed(1).toString();
  // var pos = dr_raw/4*95;
  // document.getElementById("sliderControlR").style.left = pos.toString() + "%";
  var unrounded = Math.round(data["dr_raw"] * 1000 + Number.EPSILON) / 1000;
  // console.log('L:' + unrounded.toString());
  //document.getElementById("fullResult").innerHTML = unrounded.toString();
}

function startLoad() {
  document.getElementById("content").style.display = "none";
  document.getElementById("loader").style.display = "flex";
}

function stopLoad() {
  document.getElementById("content").style.display = "block";
  document.getElementById("loader").style.display = "none";
  // document.getElementById("pdf").style.display = "inline-block";
}

async function predBtn() {
  startLoad();
  let image = document.getElementById("test-image-1");
  let image2 = document.getElementById("test-image-2");
  //console.log('xxxx')
  //console.log(image)

  let _data = {
    instances: image.src,
  };

  let _data2 = {
    instances: image2.src,
  };

  let [data1, data2] = await Promise.all([postData(_data), postData(_data2)]);

  if (data1.hasOwnProperty("error")) {
    document.getElementById("error1").innerHTML = "Error left: " + data1.error;
    document.getElementById("error1").style.display = "block";
  }

  if (data2.hasOwnProperty("error")) {
    document.getElementById("error2").innerHTML = "Error right: " + data2.error;
    document.getElementById("error2").style.display = "block";
  }

  if (data1.hasOwnProperty("message")) {
    document.getElementById("error1").innerHTML =
      "Error left: " + data1.message;
    document.getElementById("error1").style.display = "block";
  }

  if (data2.hasOwnProperty("message")) {
    document.getElementById("error2").innerHTML =
      "Error right: " + data2.message;
    document.getElementById("error2").style.display = "block";
  }

  showResults(data1, data2);

  //     fetch('https://doynj7ndmjy4ibntttu3zuhcji.apigateway.eu-frankfurt-1.oci.customer-oci.com/demo/pred', {
  //             method: "POST",
  //             body: JSON.stringify(_data),
  //             headers: {"Content-type": "application/json"}
  //         })
  //         .then(response => response.json())  // convert to json
  //         .then(json => console.log(json))    //print data to console
  //         .catch(err => console.log('Request Failed', err)); // Catch errors
}

function toggle_about() {
  var x = document.getElementById("about");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

async function postData(data = {}) {
  // Default options are marked with *
  const response = await fetch("https://glc.mona-health.be", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json();
  // console.log(jsonResp)
  // document.getElementById("prediction").innerHTML = "Prediction: " + jsonResp['prediction'].toString() + "</b>";
}
