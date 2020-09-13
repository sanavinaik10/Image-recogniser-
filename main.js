Webcam.set({
    width:350,
    height:350,
    image_format:"png",
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
   });
}
console.log("ml5 version: ",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/sJu1tJtVS/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        percentage = result[0].confidence.toFixed(3)*100;
        object = result[0].label;
        document.getElementById("result_object_name").innerHTML = object;
        console.log(percentage);
        document.getElementById("result_object_accuracy").innerHTML = percentage+"%";
        speak();
    }
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data = "I am "+percentage+"percent sure that this object is a"+object;
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}