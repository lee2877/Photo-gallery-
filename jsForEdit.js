document.addEventListener('DOMContentLoaded', function(){
    var loadImage = document.getElementById('load');
    function loadInputHandler(event) {
        var imageFile = event.target.files[0];
        var imageElement = document.getElementById('image');
        imageElement.setAttribute('src', URL.createObjectURL(imageFile));
        Caman("#image", function(){
            this.revert(true);
        });

    };
    loadImage.onchange = loadInputHandler;

    function changeSliderHandler(event){
        Caman("#image", function readerCaman() {
            this[event.target.name](event.target.value).render();
        });
    };
    var ranges = document.querySelectorAll('input[type="range"]');
    ranges.forEach(function(range){
        range.onchange = changeSliderHandler;
    });

    var resetButton = document.getElementById("reset");
    function resetButtonHandler(event){
        ranges.forEach(function(range){
            range.value =0;
        });
        Caman("#image",function() {
            this.revert(true);
        });
    };
    resetButton.onclick = resetButtonHandler;

    function filterButtonHandler(event) {
        Caman('#image', function(){
            this.revert(false);
            this[event.target.id]().render();

        });
    };

    var filterButtons = document.querySelectorAll('.filter');
    filterButtons.forEach(function(filterButton){
        filterButton.onclick = filterButtonHandler;
    });

    var saveButton = document.getElementById('save');
    function saveButtonHandler(event) {
        Caman("#image", function(){
            this.render(function(){
                this.save("image.png");
            });
        });
    };
    saveButton.onclick = saveButtonHandler;

    var textInput = document.getElementById("message");

    function applyText(){
        var canvas = document.getElementById('image');
        var ctx = canvas.getContext('2d');
        ctx.fillStyle="rgba(0,0,0,0.5)";
        var boxTop = (canvas.height/2) -30;
        ctx.fillRect(0,boxTop,canvas.width,65);
        ctx.font = "50px Pacifico";
        ctx.fillStyle='white';
        ctx.textAlign='center';
        ctx.fillText(textInput.value, canvas.width/2,boxTop+50);


    };
    var submitText = document.getElementById('submit');
    submitText.onclick =applyText;
    






}, false);
