function Pic (pictures) {
	this._pics = pictures;
	this.url = "/images/scenes/";
	this.id = "main";
	this.integer = Math.floor(pictures.length*Math.random()); 
}

Pic.prototype.url;
Pic.prototype.id;
Pic.prototype.integer;
Pic.prototype._pics;

Pic.prototype.displayPic = function() { 
	document.writeln("<img id=\"photo1\" width=\"940\" height=\"264\" /><img id=\"photo2\" width=\"940\" height=\"264\" style=\"position: absolute; zoom: 1; display: none;\" />");
	this.photo_init();
}

var opacity, ie_opac;
var photo2_x, photo2_y;

var fade_time = 1200, fade_steps = 20, hold_time = 5000;
var opacity_step = 1 / fade_steps;
var fade_step = fade_time / fade_steps;
var base_url;
var next_image = new Image;
var hide_photo2 = 0;

function position_photo2()
{
    var obj, photo1, photo2;

    photo1 = document.getElementById('photo1');
    photo2 = document.getElementById('photo2');
    photo2_x = photo2_y = 0;

    for(obj = photo1; obj != document.body; obj = obj.offsetParent)
    {
        photo2_x += obj.offsetLeft;
        photo2_y += obj.offsetTop;
    }

    photo2.style.left = photo2_x + "px";
    photo2.style.top = photo2_y + "px";
}

window.onresize = function(event) { position_photo2(); }

Pic.prototype.cycle_photo = function()
{
    var item, photo1, photo2, photoholder;

    photoholder = document.getElementById('photoholder');
    photo1 = document.getElementById('photo1');
    photo2 = document.getElementById('photo2');

    position_photo2();

    if(hide_photo2)
    {
        hide_photo2 = 0;

        photo2.style.opacity = 0;
	photo2.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)';
	photo2.style.filter = 'alpha(opacity=0)';
        photo2.style.display = 'none';
        photo2.src = next_image.src;

        setTimeout(Pic.prototype.cycle_photo, hold_time);
        return;
    }

    if(opacity >= 1)
    {
        item = photos.shift();
        photos[photos.length] = item;
        opacity = ie_opac = 0;

        photo1.src = photo2.src;
        next_image.src = base_url + photos[0];
        hide_photo2 = 1;

        setTimeout(Pic.prototype.cycle_photo, fade_step);
    }
    else
    {
        opacity += opacity_step;
	ie_opac += opacity_step*100;
        photo2.style.opacity = opacity;
	photo2.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + ie_opac + ')';
	photo2.style.filter = 'alpha(opacity=' + ie_opac + ')';
        photo2.style.display = '';
        photo2.style.zoom = 1;
        photo2.style.position = 'absolute';

        photo2.src = next_image.src;

        setTimeout(Pic.prototype.cycle_photo, fade_step);
    }
}

Pic.prototype.photo_init = function()
{
    var n = Math.round(Math.random() * photos.length);
    var item, photo1, photo2, photoholder, obj;
    var x, y;

    base_url = this.url;

    for(; n; n--)
    {
        item = photos.shift();
        photos[photos.length] = item;
    }

    photoholder = document.getElementById('photoholder');
    photo1 = document.getElementById('photo1');
    photo2 = document.getElementById('photo2');

    photo1.src = base_url + photos[0];

    item = photos.shift();
    photos[photos.length] = item;

    photo2_x = photo2_y = 0;
    photo2.style.zoom = 1;
    photo2.src = next_image.src = base_url + photos[0];

    opacity = ie_opac = 0;
    setTimeout(Pic.prototype.cycle_photo, hold_time);
}
