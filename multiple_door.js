$(function () {

    var borderColor = 'rgb(255, 133, 98)';
    var $glass = $(); // jQuery объект с селекторами стёкол
    var $doorColor = $(); // jQuery объект с селекторами цвета
    var $doorInnerColor = $(); // jQuery объект с селекторами внутреннего цвета
    var $doorOuterColor = $(); // jQuery объект с селекторами внешнего цвета
    var github_url = 'https://olehmusihin.github.io/door_work/'; // путь к папке где хранятся все изображения;
    var door = ''; // название папки с дверью, берётся с картинки со страницы с #door=название, должно совпадать с названием папки где хранятся фотографии двери.
    var doorImg = ''; // селектор изображения двери.
    var color = '1'; // какой цвет двери будем искать;
    var glass = '1';  // какое стекло будем фильтровать;
    var doorInnerColor = '1'; // какой цвет внутренней двери будем искать
    var doorOuterColor = '1'; // какой цвет внешней двери будем искать


    // Add event listeners to a elements;
    $('a').filter(function (i, d) {
        if (d.href.indexOf('#glass') != -1) {
            $glass = $glass.add(d);
            return true;
        }
        if (d.href.indexOf('#doorColor') != -1) {
            $doorColor = $doorColor.add(d);
            return true;
        }
        if (d.href.indexOf('#doorInnerColor') != -1)
        {
            $doorInnerColor = $doorInnerColor.add(d);
            return true;
        }
        if (d.href.indexOf('#doorOuterColor') != -1)
        {
            $doorOuterColor = $doorOuterColor.add(d);
            return true;
        }
    })
        .on('click', function (e) {
            removeBorders(e);
            addBorder(e);
            findImageNumber(e);
            getDoorName(e);
            getDoorSelector(e);
            addDoorImage(door, color, glass, doorInnerColor, doorOuterColor, e);
        });

    function addBorder(e) {
        $(e.target).addClass('borderActive')
    }

    function removeBorders(e) {
        if (e.target.href.indexOf('#glass') != -1) {
            $glass.removeClass('borderActive');
        }
        if (e.target.href.indexOf('#doorColor') != -1) {
            $doorColor.removeClass('borderActive');
        }
        if (e.target.href.indexOf('#doorInnerColor') != -1) {
            $doorInnerColor.removeClass('borderActive');
        }
        if (e.target.href.indexOf('#doorOuterColor') != -1) {
            $doorOuterColor.removeClass('borderActive');
        }
    }

    function findImageNumber(e) {
        if (e.target.href.indexOf('#glass') != -1) {
            glass = findRegularNumber(e.target.href);
        }

        if (e.target.href.indexOf('#doorColor') != -1) {
            color = findRegularNumber(e.target.href);
        }

        if (e.target.href.indexOf('#doorInnerColor') != -1) {
            doorInnerColor = findRegularNumber(e.target.href);
        }
        if (e.target.href.indexOf('#doorOuterColor') != -1) {
            doorOuterColor = findRegularNumber(e.target.href);
        }
    }

    function findRegularNumber(linkHref) {
        const regex = /[^=]\d*$/gm;
        const str = linkHref;
        let m;
        var result;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(match)
                result = match;
                return match;
            });
        }
        return result;
    }

    function addDoorImage(door, color, glass, doorInnerColor, doorOuterColor, e) {
        // For two doors
        if (e.target.href.indexOf('#doorInnerColor') != -1 || e.target.href.indexOf('#doorOuterColor') != -1) {
            $.get(github_url + 'two_door/' + door + '/' + doorOuterColor + doorInnerColor + '.jpeg')
                .done(function () {
                    console.log('Такая фотография есть');
                    doorImg.attr('src', github_url + 'two_door/' + String(door) + '/' + String(doorOuterColor) + String(doorInnerColor) + '.jpeg'); // это переписать
                }).fail(function () {
                throw new Error('Такой фотографии нет! :/');
            })
        }
        // For one door
        if (e.target.href.indexOf('#doorColor') != -1 || e.target.href.indexOf('#glass') != -1) {
            $.get(github_url + 'one_door/' + door + '/' + color + glass + '.jpeg')
                .done(function () {
                    console.log(doorImg);
                    doorImg.attr('src', github_url + String(door) + '/' + String(color) + String(glass) + '.jpeg'); // это переписать
                }).fail(function () {
                throw new Error('Такой фотографии нет! :/');
            })
        }
        console.log(door, color, glass, doorInnerColor, doorOuterColor, e)
    }

    function getDoorSelector(e) {
        // for two doors
        if (e.target.href.indexOf('#doorInnerColor') != -1) {
            var doorImg = $('a').filter(function (i, d) {
                console.log(d)
                if (d.href.indexOf('#innerDoor=') != -1) {
                    return true;
                }
            }).attr('href').replace('#innerDoor=', '');
        }

        if (e.target.href.indexOf('#doorOuterColor') != -1) {
            var doorImg = $('a').filter(function (i, d) {
                console.log(d)
                if (d.href.indexOf('#outerDoor=') != -1) {
                    return true;
                }
            }).attr('href').replace('#outerDoor=', '');
        }

        // for one door
        if (e.target.href.indexOf('#doorColor') != -1 || e.target.href.indexOf('#glass') != -1) {
            var doorImg = $('a').filter(function (i, d) {
                console.log(d)
                if (d.href.indexOf('#door=') != -1) {
                    return true;
                }
            }).find('img')
        }
        return doorImg;
    }

    function getDoorName(e) {
        // for two doors
        if (e.target.href.indexOf('#doorInnerColor') != -1) {
            var result = $('a').filter(function (i, d) {
                console.log(d);
                if (d.href.indexOf('#innerDoor=') != -1) {
                    return true;
                }
            }).attr('href').replace('#innerDoor=', '');
        }
        if (e.target.href.indexOf('#doorOuterColor') != -1) {
            var result = $('a').filter(function (i, d) {
                console.log(d)
                if (d.href.indexOf('#outerDoor=') != -1) {
                    return true;
                }
            }).attr('href').replace('#outerDoor=', '');
        }
        // for one door
        if (e.target.href.indexOf('#doorColor') != -1 || e.target.href.indexOf('#glass') != -1) {
            var result = $('a').filter(function (i, d) {
                console.log(d)
                if (d.href.indexOf('#door=') != -1) {
                    return true;
                }
            }).attr('href').replace('#door=', '');
        }
        console.log(result)
        door = result;
        return result;
    }

    $('body').append('<style>.borderActive { border: 2px solid ' + borderColor + ' !important}</style>');
})
