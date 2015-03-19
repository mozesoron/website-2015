'use strict';

var generatePath = function (element) {
  var points = [],
      offset = $(element).offset(),
      elementHeight = $(element).height(),
      windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      endPoint = {x: offset.left, y: offset.top},
    random = function (min, max) {
      return Math.random() * (max - min) + min;
    };

  for (var i = 0; i < 1; i++) {
    points.push({
      x: 0,
      y: random(-endPoint.y, windowHeight - endPoint.y - elementHeight)
    });
  }

  return {
    curviness: 1.25,
    autoRotate: false,
    values: points
  };
};

$(document).ready(function () {
  var logo_letters = $('.intro .letter'),
    scenes = [],
    controller = new ScrollMagic.Controller();

  var pinIntroScene = new ScrollMagic.Scene({duration: 900, offset: 0})
    .setPin('.intro', {pushFollowers: false});

  scenes.push(pinIntroScene);

  for (var i = 0; i < logo_letters.length; i++) {
    var letterTween = new TimelineMax()
      .add(TweenMax.from(logo_letters[i], 1.2, {
        css: {
          bezier: generatePath(logo_letters[i])
        },
        ease: Power1.easeInOut
      }));

    var letterScene = new ScrollMagic.Scene({duration: 600, offset: 0})
      .setTween(letterTween);

    scenes.push(letterScene);
  }

  var fadeInTween = new TimelineMax()
    .add(TweenMax.to('.subtitle, .datetime', 1.2, {
      css: {
        opacity: 1
      },
      ease: Power1.easeInOut
    }));

  var afterLettersScene = new ScrollMagic.Scene({duration: 100, offset: 500})
    .setTween(fadeInTween);

  scenes.push(afterLettersScene);

  var censorTween = new TimelineMax()
    .add(TweenMax.to('.will-be-censored', 1.2, {
      className: '+=hide-letter'
    }))
    .add(TweenMax.to('.will-be-censored', 1.2, {
      className: '+=is-censored'
    }));

  var censorScene = new ScrollMagic.Scene({duration: 100, offset: 600})
    .setTween(censorTween);

  scenes.push(censorScene);

  var scaleTween = new TimelineMax()
    .add(TweenMax.to('.intro', 1.2, {
      scale: 0.8,
      ease: Power1.easeInOut
    }));

  var scaleScene = new ScrollMagic.Scene({duration: 200, offset: 700})
    .setTween(scaleTween);

  scenes.push(scaleScene);

  controller.addScene(scenes);
});
